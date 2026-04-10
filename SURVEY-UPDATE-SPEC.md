# Connie Training Survey - 19 Question Update Specification

**Task:** Update the existing 8-question training survey to Andrea's comprehensive 19-question NSS feedback form.

## Repository Context
- **Repo:** `https://github.com/ConnieML/connie-comet`
- **Branch:** `main`
- **Current Survey:** `/dataroom/surveys/connie-training`
- **Framework:** Next.js 15 + PayloadCMS + TypeScript
- **Deployment:** AWS Amplify (auto-deploys on push to main)

## Files to Update

1. **Survey Form:** `src/app/(frontend)/dataroom/surveys/connie-training/page.tsx`
2. **Payload Collection:** `src/collections/TrainingSurveys.ts`
3. **API Route:** `src/app/api/training-survey/route.ts`
4. **Email Template:** `emails/templates/connie-training-survey-notification.tsx` (minor update)

## Current State (8 Questions - Generic)

```typescript
{
  name, email, phone, organization,
  servicesUsed: array,
  overallSatisfaction: 1-5,
  staffProfessionalism: 1-5,
  communicationEase: text,
  whatWorking: text,
  whatImprove: text,
  wouldRecommend: text,
  additionalComments: text
}
```

## New State (19 Questions - NSS-Specific)

### Section 1: Onboarding & First Impressions (4 questions)

**Q1:** How would you rate the onboarding/training process?
- Type: Number (1-5 scale)
- Field: `trainingRating`
- Required: Yes
- Follow-up: Optional text field `trainingRatingComment`

**Q2:** After the training, did you feel confident using Connie on your own?
- Type: Radio (Yes / No / Somewhat)
- Field: `trainingConfidence`
- Required: Yes
- Follow-up: Optional text field `trainingConfidenceComment`

**Q3:** What was the most helpful part of the training?
- Type: Textarea
- Field: `trainingHelpful`
- Required: No

**Q4:** What part of the training could have been clearer or more detailed?
- Type: Textarea
- Field: `trainingClearer`
- Required: No

---

### Section 2: Before vs. After (3 questions)

**Q5:** Before Connie, how did you typically communicate with clients/families?
- Type: Checkbox (multi-select)
- Options: Phone, Email, Text, Paper, Other
- Field: `oldCommMethods` (array)
- Required: Yes

**Q6:** Compared to your previous method, how would you rate Connie for:
- Type: Three sub-ratings (1-5 each)
- Fields:
  - `connieSpeedRating` (Speed of communication)
  - `connieReachRating` (Ease of reaching clients)
  - `connieHistoryRating` (Tracking conversation history)
- Required: Yes for all three

**Q7:** Has Connie changed how quickly you can respond to client questions or requests?
- Type: Radio (Yes / No / Not sure)
- Field: `connieResponseSpeed`
- Required: Yes
- Follow-up: Optional text field `connieResponseSpeedComment`

---

### Section 3: What's Working Well (2 questions)

**Q8:** Which Connie feature(s) have been most useful so far?
- Type: Checkbox (multi-select)
- Options: Messaging, Broadcast, Contact Management, Conversation History, Other
- Field: `usefulFeatures` (array)
- Required: Yes

**Q9:** What's one thing Connie does better than your old system?
- Type: Textarea
- Field: `connieBetter`
- Required: No

---

### Section 4: Challenges & Friction Points (3 questions)

**Q10:** Have you experienced any technical issues using Connie?
- Type: Radio (Yes / No)
- Field: `hasTechnicalIssues`
- Required: Yes
- Follow-up: If "Yes", show text field `technicalIssuesDescription`

**Q11:** Which feature(s) felt confusing or hard to use at first?
- Type: Textarea
- Field: `confusingFeatures`
- Required: No

**Q12:** Is there anything that slowed you down or made a task harder than expected?
- Type: Textarea
- Field: `slowdowns`
- Required: No

---

### Section 5: Support & Training Needs (2 questions)

**Q13:** What additional training or resources would help you use Connie more effectively?
- Type: Textarea
- Field: `additionalTraining`
- Required: No

**Q14:** Would you prefer: (select all that apply)
- Type: Checkbox (multi-select)
- Options: Follow-up training sessions, Written guides, Video tutorials, 1-on-1 help
- Field: `preferredTrainingFormat` (array)
- Required: No

---

### Section 6: Overall Satisfaction (3 questions)

**Q15:** Overall, how satisfied are you with Connie so far?
- Type: Number (1-5 scale)
- Field: `overallSatisfaction`
- Required: Yes

**Q16:** How likely are you to recommend Connie to other departments at NSS?
- Type: Number (0-10 NPS scale)
- Field: `npsScore`
- Required: Yes
- Display: 11 buttons (0-10) with labels "Not at all likely" (0) and "Extremely likely" (10)

**Q17:** Any other feedback, suggestions, or concerns?
- Type: Textarea
- Field: `otherFeedback`
- Required: No

---

### Section 7: Role-Specific Context (2 questions - Optional)

**Q18:** What is your primary role at NSS?
- Type: Dropdown/Select
- Options: Case Manager, Outreach Coordinator, Admin, Other
- Field: `primaryRole`
- Required: No

**Q19:** Roughly how many clients do you communicate with in a typical week?
- Type: Text (number or range)
- Field: `weeklyClientCount`
- Required: No
- Placeholder: "e.g., 20-30"

---

## UI/UX Requirements

### Multi-Step Wizard Structure
- **Step 0:** Welcome screen (existing)
- **Step 1:** Contact Info + Role (name, email, phone, org, Q18)
- **Step 2:** Onboarding (Q1-Q4)
- **Step 3:** Before/After (Q5-Q7)
- **Step 4:** What's Working (Q8-Q9)
- **Step 5:** Challenges (Q10-Q12)
- **Step 6:** Support (Q13-Q14)
- **Step 7:** Satisfaction (Q15-Q17) + Q19

**Total:** 8 steps (Welcome + 7 sections)

### Design Consistency
- Keep existing slate gradient background
- Keep white card UI with backdrop blur
- Keep progress bar at bottom
- Keep navigation buttons (Back/Next/Submit)
- Keep validation error display
- Keep success screen after submission

### Validation Rules
- Step 1: name, email, organization required
- Step 2: Q1 required
- Step 3: Q5, Q6 (all 3 sub-ratings), Q7 required
- Step 4: Q8 required
- Step 5: No required fields
- Step 6: No required fields
- Step 7: Q15, Q16 required

## Payload Collection Schema Update

Update `src/collections/TrainingSurveys.ts`:

```typescript
export const TrainingSurveys: CollectionConfig = {
  slug: 'training-surveys',
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'overallSatisfaction', 'npsScore', 'createdAt'],
  },
  fields: [
    // Contact Info
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'organization', type: 'text', required: true },
    
    // Section 1: Onboarding
    { name: 'trainingRating', type: 'number', min: 1, max: 5, required: true },
    { name: 'trainingRatingComment', type: 'textarea' },
    { name: 'trainingConfidence', type: 'text', required: true },
    { name: 'trainingConfidenceComment', type: 'textarea' },
    { name: 'trainingHelpful', type: 'textarea' },
    { name: 'trainingClearer', type: 'textarea' },
    
    // Section 2: Before/After
    { 
      name: 'oldCommMethods', 
      type: 'array',
      fields: [{ name: 'method', type: 'text' }]
    },
    { name: 'connieSpeedRating', type: 'number', min: 1, max: 5, required: true },
    { name: 'connieReachRating', type: 'number', min: 1, max: 5, required: true },
    { name: 'connieHistoryRating', type: 'number', min: 1, max: 5, required: true },
    { name: 'connieResponseSpeed', type: 'text', required: true },
    { name: 'connieResponseSpeedComment', type: 'textarea' },
    
    // Section 3: What's Working
    { 
      name: 'usefulFeatures', 
      type: 'array',
      fields: [{ name: 'feature', type: 'text' }]
    },
    { name: 'connieBetter', type: 'textarea' },
    
    // Section 4: Challenges
    { name: 'hasTechnicalIssues', type: 'text', required: true },
    { name: 'technicalIssuesDescription', type: 'textarea' },
    { name: 'confusingFeatures', type: 'textarea' },
    { name: 'slowdowns', type: 'textarea' },
    
    // Section 5: Support
    { name: 'additionalTraining', type: 'textarea' },
    { 
      name: 'preferredTrainingFormat', 
      type: 'array',
      fields: [{ name: 'format', type: 'text' }]
    },
    
    // Section 6: Satisfaction
    { name: 'overallSatisfaction', type: 'number', min: 1, max: 5, required: true },
    { name: 'npsScore', type: 'number', min: 0, max: 10, required: true },
    { name: 'otherFeedback', type: 'textarea' },
    
    // Section 7: Role Context
    { name: 'primaryRole', type: 'text' },
    { name: 'weeklyClientCount', type: 'text' },
  ],
  timestamps: true,
}
```

## API Route Update

Update `src/app/api/training-survey/route.ts` to map all new fields when creating Payload document and sending email.

Key changes:
- Map all 19 new fields to Payload structure
- Update email template to highlight: trainingRating, overallSatisfaction, npsScore
- Keep existing error handling

## Email Template Update

Update `emails/templates/connie-training-survey-notification.tsx`:

Add to summary table:
- Training Rating: {trainingRating}/5
- Overall Satisfaction: {overallSatisfaction}/5
- NPS Score: {npsScore}/10
- Would recommend: {npsScore >= 9 ? '✅ Promoter' : npsScore >= 7 ? '😐 Passive' : '❌ Detractor'}

## Testing Checklist

Before pushing:
- [ ] All 19 questions display correctly
- [ ] Multi-step navigation works (Back/Next)
- [ ] Validation catches missing required fields
- [ ] Conditional fields show/hide properly (Q2, Q7, Q10 follow-ups)
- [ ] Submit saves to Payload collection
- [ ] Emails sent to admin@connie.direct and andrea@connie.tel
- [ ] Success screen displays
- [ ] Admin UI shows all fields at /admin/collections/training-surveys
- [ ] Test on mobile (responsive)

## Deployment

1. Commit changes: `git add . && git commit -m "Update training survey to 19-question NSS feedback form"`
2. Push to main: `git push origin main`
3. AWS Amplify auto-deploys in ~5-7 minutes
4. Verify live at: https://connie.one/dataroom/surveys/connie-training

## Notes

- Keep existing UI styling (don't reinvent the wheel)
- Follow patterns from current implementation
- NPS scale: 0-10 is standard (11 options total)
- All textarea fields should have reasonable maxLength (e.g., 2000 chars)
- Dropdown for role should allow "Other" with optional text field
- Consider adding character counters for long text fields

## Questions?

Contact SPOK (spok@onreb.ai) or Chris (CEO)
