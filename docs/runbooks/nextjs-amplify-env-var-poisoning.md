# Runbook: Silent NEXT_PUBLIC_* Env Var Poisoning on Amplify

**Last hit:** 2026-04-17 (Connie webchat widget — "We're Currently Away" shown for every visitor since Dec 2025)

## TL;DR

If a feature using `process.env.NEXT_PUBLIC_*` works locally but silently misbehaves in production on Amplify, suspect `amplify.yml` preBuild has `${VAR:-default}` and the variable isn't set in the Amplify console. The literal string `"default"` gets compiled into the client bundle.

## Symptom

- Feature works in local dev (`pnpm dev`) — you've set the var in `.env.local`.
- Deploys successfully — Amplify build is green.
- In production the feature silently fails, often in a way that degrades gracefully (fetch returns 404, widget shows offline message, button does nothing). No server error — the code ran; the value was just wrong.

## Fastest diagnostic (≤ 60 seconds)

1. Open production site. DevTools → Sources → Ctrl/Cmd-F across all loaded files.
2. Search for the string `"default"` (including quotes).
3. If you see lines like `let s="default"` inside your own component's chunk, you've found it. The `NEXT_PUBLIC_*` value was replaced with the literal string `"default"` at build time.

Also check Amplify console → App settings → Environment variables. Any `NEXT_PUBLIC_*` not present there but referenced by code → baked as "default" if `amplify.yml` has the `:-default` pattern.

## Root cause

`amplify.yml` frequently contains a "graceful" preBuild stanza like:

```yaml
preBuild:
  commands:
    - echo "NEXT_PUBLIC_FOO=${NEXT_PUBLIC_FOO:-default}" >> .env.production
```

The intent is "don't break the build if this var is missing." The effect: when the var is unset in Amplify, shell expands `${NEXT_PUBLIC_FOO:-default}` to the literal string `default`, which is written to `.env.production`. Next.js then substitutes the client-side reference `process.env.NEXT_PUBLIC_FOO` with the string `"default"` at build time (this is how Next's build-time env inlining works — it's not a runtime lookup).

Source-level fallbacks like `process.env.NEXT_PUBLIC_FOO || ''` **never fire** because the value isn't empty — it's the non-empty string `"default"`.

## Fix (this class of bug, not just one occurrence)

**In `amplify.yml`:** change every `NEXT_PUBLIC_*` line from `${VAR:-default}` to `${VAR:-}` (empty fallback). Server-only vars (no `NEXT_PUBLIC_` prefix) can keep `:-default` if the code has runtime guards — they fail loudly in the server, not silently in the browser.

```yaml
# Bad — client bundle gets "default"
- echo "NEXT_PUBLIC_FOO=${NEXT_PUBLIC_FOO:-default}" >> .env.production

# Good — client bundle gets empty string; source-level `|| ''` guards work
- echo "NEXT_PUBLIC_FOO=${NEXT_PUBLIC_FOO:-}" >> .env.production
```

**In the Amplify console:** set the actual env var. Don't rely on the fallback.

**In the source:** the pattern `const FOO = process.env.NEXT_PUBLIC_FOO || ''` only protects against the empty-fallback case. Pair with an explicit runtime guard that logs and no-ops when `!FOO`.

## Prevention

1. **Deploy verification is mandatory.** "Deployed" ≠ "works." Every change to a user-facing feature needs at least one click-through in production before marking done. The CLAUDE.md in this repo said "Webchat 3.x — COMPLETE — DEPLOYED TO PRODUCTION (Build #72)" but no one had actually clicked the chat button post-deploy for ~4 months.

2. **Smoke-test the production bundle for the string "default".** If a `NEXT_PUBLIC_*` var is unset in Amplify and the yml has a `:-default` fallback, this string will appear inside the chunk. A 10-line CI step that greps the built `.next` directory would have caught this.

3. **Never use `:-default` on `NEXT_PUBLIC_*` vars.** Full stop. Use `:-""` and let runtime guards handle the unset case.

4. **When env vars drive client behavior, prefer a single server-side API route** (e.g. `/api/chat/availability`) over direct `NEXT_PUBLIC_*` URLs. Server routes can be fixed with a code push; a client-bundled URL requires a full rebuild.

## Why GOOGLE_PRIVATE_KEY is a related landmine

Same file has this pattern for the Google service account private key:

```yaml
- echo "GOOGLE_PRIVATE_KEY=${GOOGLE_PRIVATE_KEY:-default}" >> .env.production
```

If the var is unset, the build continues but any Google API call crashes with `error:1E08010C:DECODER routines::unsupported` — OpenSSL trying to parse the literal string `"default"` as a PEM key. Different failure mode (loud runtime exception, not silent UI degradation), but same class.

Separately, the `GOOGLE_PRIVATE_KEY` value itself has a formatting landmine — it must be a single-line string with literal `\n` characters, not actual newlines. See the "CRITICAL: Private Key Environment Variable Format" section in this repo's root `CLAUDE.md` for the full protocol if you're ever rotating that key.

**When updating Amplify env vars via AWS CLI**, always merge into the full env map rather than replace, and verify `GOOGLE_PRIVATE_KEY` hash is byte-identical before/after:

```bash
# Safe env var merge pattern
aws amplify get-app --app-id <ID> --region <REGION> \
  --query 'app.environmentVariables' --output json > /tmp/env-before.json

BEFORE_HASH=$(jq -r '.GOOGLE_PRIVATE_KEY // ""' /tmp/env-before.json | shasum -a 256 | awk '{print $1}')

jq '. + { "NEW_VAR": "value" }' /tmp/env-before.json > /tmp/env-after.json

AFTER_HASH=$(jq -r '.GOOGLE_PRIVATE_KEY // ""' /tmp/env-after.json | shasum -a 256 | awk '{print $1}')
[ "$BEFORE_HASH" = "$AFTER_HASH" ] || { echo "KEY MUTATED — ABORT"; exit 1; }

aws amplify update-app --app-id <ID> --region <REGION> \
  --environment-variables "file:///tmp/env-after.json"
```

## References

- `amplify.yml` (repo root)
- `src/components/WebchatWidget/index.tsx` — the component that was silently broken
- `src/app/api/chat/availability/route.ts` — the availability endpoint created as part of the 2026-04-17 fix
- Repo root `CLAUDE.md` — "Webchat 3.x Implementation" section (was stale for 4 months before this runbook was written)
