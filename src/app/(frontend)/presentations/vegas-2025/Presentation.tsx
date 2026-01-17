'use client'

import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import { StatCard } from './components/StatCard'
import { FlowDiagram } from './components/FlowDiagram'
import { PricingCard } from './components/PricingCard'
import { Users, Smartphone, Hospital, Layers, TrendingUp, UserCheck, CheckCircle, Cloud, Plug, ArrowRight, Network, BarChart, Activity, Maximize, MapPin, Mail } from 'lucide-react'

export default function Presentation() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!deckRef.current) return

    const deck = new Reveal(deckRef.current, {
      hash: true,
      transition: 'fade',
      transitionSpeed: 'fast',
      controls: false,
      progress: true,
      center: true,
      width: 1920,
      height: 1080,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
    })

    deck.initialize()

    return () => {
      deck.destroy()
    }
  }, [])

  return (
    <div className="reveal" ref={deckRef}>
      <img className="presentation-logo" src="/connie-logo-black-strong.svg" alt="Connie" />

      {/* Global Footer Logos - NSS + ASA */}
      <div className="presentation-footer-logos">
        <img src="/presentations/vegas-2025/images/nevada-senior-svs-logo-round.png" alt="Nevada Senior Services" />
        <img src="/presentations/vegas-2025/images/asa-logo-trans.png" alt="American Society on Aging" />
      </div>

      <div className="slides">
        {/* Slide 1: Title */}
        <section className="title-slide">
          <h1>Helping Nonprofits Weather The Digital Storm</h1>

          {/* TODO: Replace with actual tornado/storm illustration */}
          <div className="storm-placeholder">
            Digital Storm Illustration Needed<br/>
            (tornado with social media icons, CBO building)
          </div>

          <h2>Presented @ Engaging With Aging Conference<br/>December 9-10, 2025 | Durango Resort, Las Vegas</h2>
        </section>

        {/* Slide 2: Confidentiality (NEW - was missing) */}
        <section className="confidentiality-slide">
          <h1>Confidentiality</h1>
          <div className="confidentiality-content">
            <div className="confidentiality-subtitle">Before viewing this information, we kindly request:</div>
            <ol className="confidentiality-list">
              <li>Not distributing or sharing any Connie™ content with anyone outside your company (without written permission from Nevada Senior Services (NSS)).</li>
              <li>Only distributing/sharing this with certain members of your company who need it and only after underscoring confidentiality.</li>
            </ol>
            <p className="confidentiality-note">
              This presentation and any/all accompanying remarks and/or demonstrations are not intended to be public. Any unauthorized viewing, copying, recording, photographing, note-taking, distributing, or <u>use of any of this content is strictly prohibited.</u>
            </p>
            <p className="confidentiality-contact">
              To request an NDA or for more information please contact NSS CTO &amp; Connie Technical Lead: <a href="mailto:cberno@nevadaseniorservices.org">cberno@nevadaseniorservices.org</a>
            </p>
          </div>
        </section>

        {/* Slide 3: Welcome - CBO + Cycle + People */}
        <section>
          <h1>Welcome To Connie!</h1>
          <h2>Empowering CBOs to Serve a New Generation of Older Adults</h2>
          <div className="welcome-flow">
            <div className="welcome-flow-item">
              <img src="/presentations/vegas-2025/images/cbo.png" alt="CBO Building" style={{ height: '140px' }} />
              <div className="welcome-flow-label">CBO</div>
            </div>
            <div className="welcome-flow-arrow">→</div>
            <div className="welcome-flow-item">
              <div className="welcome-cycle">
                <div className="cycle-word">Connect</div>
                <div className="cycle-word">Engage</div>
                <div className="cycle-word">Serve</div>
              </div>
            </div>
            <div className="welcome-flow-arrow">→</div>
            <div className="welcome-flow-item">
              <img src="/presentations/vegas-2025/images/community-partner-building (1).png" alt="Community Partners" style={{ height: '140px' }} />
              <div className="welcome-flow-label">Community</div>
            </div>
          </div>
        </section>

        {/* Slide 4: About Us Timeline */}
        <section>
          <div className="section-tag">About Us</div>
          <h1>Our Purpose is To Deliver Excellence in Service and Execution</h1>
          <div className="timeline-grid">
            <div className="timeline-item">
              <img src="/presentations/vegas-2025/images/Connie-R&D.png" alt="2022 Research" style={{ width: '100%', borderRadius: '12px' }} />
              <div className="timeline-year year-2022">2022</div>
              <div className="timeline-desc">Vision born, research &amp; planning</div>
            </div>
            <div className="timeline-item">
              <img src="/presentations/vegas-2025/images/connie-inclusive-bubbles.png" alt="2024 Team" style={{ width: '100%', borderRadius: '12px' }} />
              <div className="timeline-year year-2024">2024</div>
              <div className="timeline-desc">Prototype built, UAT discovery</div>
            </div>
            <div className="timeline-item">
              <img src="/presentations/vegas-2025/images/connie-sender-pool-maps.png" alt="2025 Rollout" style={{ width: '100%', borderRadius: '12px' }} />
              <div className="timeline-year year-2025">2025</div>
              <div className="timeline-desc">MVP launch, targeted rollout</div>
            </div>
          </div>
        </section>

        {/* Slide 5: Problem - 4 Powerful Market Forces */}
        <section>
          <div className="section-tag">The Problem</div>
          <h1>4 Powerful Market Forces</h1>
          <h2>Driving unprecedented demand for CBO services</h2>
          <div className="market-forces-layout">
            <div className="market-forces-stats">
              <div className="market-stat-big">&gt;300%</div>
              <div className="market-stat-label">Y.O.Y Inc. Demand For Older<br/>Adult Care Services</div>
              <div className="force-pills">
                <div className="force-pill">
                  <Users size={16} /> Aging Society
                </div>
                <div className="force-pill">
                  <Smartphone size={16} /> Tech Adoption
                </div>
                <div className="force-pill">
                  <Hospital size={16} /> SDOH &amp; C.I.S.
                </div>
              </div>
            </div>
            <div className="market-forces-visual">
              <img src="/presentations/vegas-2025/images/beatup-cbo.png" alt="CBO in digital storm" style={{ maxHeight: '350px', width: 'auto' }} />
            </div>
          </div>
        </section>

        {/* Slide 6: Perfect Storm */}
        <section>
          <div className="section-tag">The Problem</div>
          <h1>CBOs are Caught In A &quot;Perfect Storm&quot;</h1>
          {/* Paper CRM visual showing manual/chaotic state */}
          <img
            src="/presentations/vegas-2025/images/paper-crm.png"
            alt="Paper-based CRM - sticky note"
            style={{ position: 'absolute', top: '80px', right: '40px', width: '120px', transform: 'rotate(8deg)', opacity: 0.85, zIndex: 10 }}
          />
          <div className="perfect-storm-layout">
            <div className="storm-column">
              <h3>CBO Staff Told Us ...</h3>
              <div className="storm-stat-item fragment">
                <div className="storm-stat-icon">✕</div>
                <div className="storm-stat-content">
                  <div className="storm-stat-number">89%</div>
                  <div className="storm-stat-desc">say they need better technology to keep up.</div>
                </div>
              </div>
              <div className="storm-stat-item fragment">
                <div className="storm-stat-icon">✕</div>
                <div className="storm-stat-content">
                  <div className="storm-stat-number">74%</div>
                  <div className="storm-stat-desc">CBOs have critical position vacancies. Fatigue / Burnout = Top drivers of staff attrition.</div>
                </div>
              </div>
            </div>
            <div className="storm-column">
              <h3>CBO Customer Told Us ...</h3>
              <div className="storm-stat-item fragment">
                <div className="storm-stat-icon">✕</div>
                <div className="storm-stat-content">
                  <div className="storm-stat-number">78%</div>
                  <div className="storm-stat-desc">placed multiple calls for status updates.</div>
                </div>
              </div>
              <div className="storm-stat-item fragment">
                <div className="storm-stat-icon">✕</div>
                <div className="storm-stat-content">
                  <div className="storm-stat-number">8-10 Days</div>
                  <div className="storm-stat-desc">response times. 10-14 Months wait for Adult Day Care.</div>
                </div>
              </div>
              <div className="storm-stat-item fragment">
                <div className="storm-stat-icon">✕</div>
                <div className="storm-stat-content">
                  <div className="storm-stat-number">Increasing Abandon Rate</div>
                  <div className="storm-stat-desc">Only 1/6 eligible older adults are enrolled in a program. 1/10 for people of color and non-native English speakers.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="storm-bottom-line fragment">
            <div className="storm-bottom-line-text">Bottom Line: CBOs Need Better Communication Technology.</div>
          </div>
        </section>

        {/* Slide 6: Vision (NEW) */}
        <section>
          <h1>Building the Essential Infrastructure for an Aging America</h1>
          <div className="quote-text">
            &ldquo;Three powerful forces are reshaping our nation: an aging population, a digital-first world,
            and healthcare&apos;s growing reliance on community-based organizations. Connie sits at the
            intersection of all three.&rdquo;
          </div>
          <svg viewBox="0 0 400 400" className="concentric-circles">
            {/* Outermost circle - Aging Population */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="var(--accent-tertiary)" strokeWidth="2" opacity="0.6" />
            <text x="200" y="30" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent-tertiary)">Aging Population</text>

            {/* Third circle - Digital-First World */}
            <circle cx="200" cy="200" r="140" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" opacity="0.7" />
            <text x="200" y="80" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent-secondary)">Digital-First World</text>

            {/* Second circle - CBOs */}
            <circle cx="200" cy="200" r="90" fill="none" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.8" />
            <text x="200" y="130" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent-primary)">CBOs</text>

            {/* Innermost circle - Connie */}
            <circle cx="200" cy="200" r="40" fill="var(--accent-primary)" opacity="0.9" />
            <text x="200" y="205" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Connie</text>
          </svg>
        </section>

        {/* Slide 7: Solution Intro (NEW) */}
        <section>
          <div className="section-tag">The Solution</div>
          <h1>Welcome To Connie</h1>
          <h2>The Future Requires a New Model: Where CBOs Can Connect, Engage &amp; Serve Online</h2>
          <FlowDiagram steps={['CBO', 'Process', 'Community Partner']} />
        </section>

        {/* Slide 9: Say Hello To Connie - THE KEY SLIDE */}
        <section>
          <div className="section-tag">The Solution</div>
          <h1>The Solution: Say Hello To Connie! 👋</h1>
          <h2>A cloud-based communication application that helps CBOs CONNECT, ENGAGE &amp; SERVE Older Adults online.</h2>

          <div className="say-hello-layout">
            <div className="say-hello-features">
              <div className="say-hello-feature fragment">
                <div className="say-hello-feature-icon">
                  <CheckCircle size={18} />
                </div>
                <div className="say-hello-feature-content">
                  <h4>Unified Communications From One Single Screen.</h4>
                  <p>CBO staff access all client &amp; partner communications across all channels (voice, email, text, chat, social, fax) from one browser screen.</p>
                </div>
              </div>

              <div className="say-hello-feature fragment">
                <div className="say-hello-feature-icon">
                  <CheckCircle size={18} />
                </div>
                <div className="say-hello-feature-content">
                  <h4>Connect Staff &amp; Clients From Anywhere</h4>
                  <p>Connie is cloud-based so staff can access &amp; deliver support from any connected web browser, from any location.</p>
                </div>
              </div>

              <div className="say-hello-feature fragment">
                <div className="say-hello-feature-icon">
                  <CheckCircle size={18} />
                </div>
                <div className="say-hello-feature-content">
                  <h4>Integration Ready</h4>
                  <p>Incorporate Connie into your existing C.R.M., E.H.R., messaging and email apps to streamline operations, boost staff productivity and improve client and partner experience.</p>
                </div>
              </div>

              {/* Integration Logos */}
              <div className="integration-logos fragment">
                {/* TODO: Replace with actual integration partner logos */}
                <div className="integration-logo-placeholder">Google Workspace</div>
                <div className="integration-logo-placeholder">Microsoft Teams</div>
                <div className="integration-logo-placeholder">HubSpot</div>
                <div className="integration-logo-placeholder">Zoho CRM</div>
              </div>
            </div>

            <div className="say-hello-visual">
              {/* Laptop with Connie UI screenshot - using the beautiful pre-made image */}
              <img
                src="/presentations/vegas-2025/images/connie-browser-actvie-voicemail-task.png"
                alt="Connie Platform Interface"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          </div>
        </section>

        {/* Slide 10: How It Works - Workflow */}
        <section>
          <div className="section-tag">The Solution</div>
          <h1>From Initial Contact to A Promise Fulfilled</h1>
          <h2>Connie transforms fragmented, manual processes into an efficient, trackable, and data-driven workflow. Every client interaction becomes a manageable task within a cohesive system.</h2>

          <div className="workflow-steps">
            <div className="workflow-step fragment">
              <div className="workflow-step-number">1</div>
              <div className="workflow-step-icon">Icon</div>
              <div className="workflow-step-title">Inbound / Outbound Flow</div>
              <div className="workflow-step-desc">A client or partner request arrives from any channel (voice, email, SMS, webchat). Connie collects, prioritizes, and routes the request into a task queue.</div>
            </div>
            <div className="workflow-step fragment">
              <div className="workflow-step-number">2</div>
              <div className="workflow-step-icon">Icon</div>
              <div className="workflow-step-title">Task Creation</div>
              <div className="workflow-step-desc">Requests are packaged into tasks, sorted by type, and routed to the correct agent or department. All tasks are logged and time-stamped for full lifecycle tracking.</div>
            </div>
            <div className="workflow-step fragment">
              <div className="workflow-step-number">3</div>
              <div className="workflow-step-icon">Icon</div>
              <div className="workflow-step-title">Task Processing</div>
              <div className="workflow-step-desc">Tasks are displayed to available staff based on skill and availability. An agent accepts the task and has all client information populated on-screen.</div>
            </div>
            <div className="workflow-step fragment">
              <div className="workflow-step-number">4</div>
              <div className="workflow-step-icon">Icon</div>
              <div className="workflow-step-title">Administration</div>
              <div className="workflow-step-desc">Managers have tools to administer workflow, manage staff schedules, monitor performance in real-time, report on KPIs, and integrate with 3rd party software.</div>
            </div>
          </div>
        </section>

        {/* Slide 10: CIE Explanation */}
        <section>
          <h1>Beyond a Platform: Connie is the Nexus of a Thriving Community Ecosystem</h1>
          <div className="two-col-layout">
            <div className="column">
              <div className="cie-definition">
                <h3>What is a CIE?</h3>
                <p>Community Information Exchange: A secure network connecting healthcare, social services, and community organizations to coordinate care and share information.</p>
              </div>
            </div>
            <div className="column">
              <div className="before-after">
                <div>
                  <div className="before-after-label">Before: Fragmented</div>
                  <svg viewBox="0 0 200 120" className="before-after-svg">
                    <circle cx="40" cy="40" r="20" fill="none" stroke="var(--accent-tertiary)" strokeWidth="2" opacity="0.6" />
                    <circle cx="160" cy="40" r="20" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" opacity="0.6" />
                    <circle cx="70" cy="90" r="20" fill="none" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.6" />
                    <circle cx="130" cy="90" r="20" fill="none" stroke="var(--text-muted)" strokeWidth="2" opacity="0.4" />
                  </svg>
                </div>
                <div>
                  <div className="before-after-label">After: Connected</div>
                  <svg viewBox="0 0 200 120" className="before-after-svg">
                    <circle cx="100" cy="60" r="35" fill="var(--accent-primary)" opacity="0.9" />
                    <text x="100" y="65" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Connie</text>
                    <circle cx="40" cy="30" r="15" fill="none" stroke="var(--accent-tertiary)" strokeWidth="2" />
                    <circle cx="160" cy="30" r="15" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" />
                    <circle cx="40" cy="90" r="15" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
                    <circle cx="160" cy="90" r="15" fill="none" stroke="var(--text)" strokeWidth="2" opacity="0.6" />
                    <line x1="65" y1="60" x2="55" y2="40" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.7" />
                    <line x1="135" y1="60" x2="145" y2="40" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.7" />
                    <line x1="65" y1="60" x2="55" y2="80" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.7" />
                    <line x1="135" y1="60" x2="145" y2="80" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 11: Results Overview */}
        <section>
          <div className="section-tag">Delivers Results</div>
          <h1>Better Results For CBOs = Better Outcomes For People In Need</h1>
          <div className="results-grid">
            <div className="fragment">
              <StatCard icon={TrendingUp} stat="60%" desc="Increase Connection Rates" />
            </div>
            <div className="fragment">
              <StatCard icon={Users} stat="3x" desc="Improve Client Engagement" />
            </div>
            <div className="fragment">
              <StatCard icon={Maximize} stat="10/10" desc="Scale Program & Service Delivery" />
            </div>
          </div>
          <div className="callout-box fragment">
            <div className="callout-text">Cascading Benefits: Better data, better decisions, better outcomes</div>
          </div>
        </section>

        {/* Slide 12: Data & Analytics */}
        <section>
          <div className="section-tag">Delivers Results</div>
          <h1>Real-Time Insights &amp; Interaction Replay</h1>
          <div className="two-col-layout">
            <div className="placeholder-iframe">
              <div className="placeholder-iframe-icon">
                <BarChart size={48} />
              </div>
              <div className="placeholder-iframe-title">Analytics Dashboard</div>
              <div className="placeholder-iframe-desc">Real-time insights</div>
              {/* Future: Analytics iframe */}
            </div>
            <div className="placeholder-iframe">
              <div className="placeholder-iframe-icon">
                <Activity size={48} />
              </div>
              <div className="placeholder-iframe-title">Playback Machine</div>
              <div className="placeholder-iframe-desc">Interaction replay</div>
              {/* Future: Playback iframe */}
            </div>
          </div>
        </section>

        {/* Slide 14: Measurement Infrastructure */}
        <section>
          <div className="section-tag">Delivers Results</div>
          <h1>Building the Measurement Infrastructure the Sector Needs</h1>
          <h2>&quot;Last year we presented a theory of change. This year we&apos;re collecting the data to prove it.&quot;</h2>

          <div className="measurement-cards">
            <div className="measurement-card fragment">
              <div className="measurement-card-header past">2024: THE PROMISE</div>
              <div className="measurement-card-title">Theory of Change</div>
              <ul className="measurement-card-list">
                <li>Jobs-to-be-Done framework</li>
                <li>Feedback loop design</li>
                <li>Impact measurement vision</li>
                <li>&quot;We&apos;ll measure what matters&quot;</li>
              </ul>
            </div>
            <div className="measurement-card active fragment">
              <div className="measurement-card-header current">2025: THE FOUNDATION</div>
              <div className="measurement-card-title">Data Collection Active</div>
              <ul className="measurement-card-list">
                <li>Real-time supervisor dashboards</li>
                <li>2,810+ transactions analyzed</li>
                <li>Multi-channel tracking live</li>
                <li>Enterprise analytics (Flex Insights)</li>
                <li>Multi-tenant data isolation</li>
              </ul>
            </div>
            <div className="measurement-card fragment">
              <div className="measurement-card-header future">2026+: THE PROOF</div>
              <div className="measurement-card-title">Network Intelligence</div>
              <ul className="measurement-card-list">
                <li>Cross-CBO benchmarking</li>
                <li>Sector-wide standards</li>
                <li>Outcome correlation studies</li>
                <li>Evidence-based models</li>
              </ul>
            </div>
          </div>

          <div className="callout-box fragment" style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.9))', border: 'none' }}>
            <div className="callout-text" style={{ color: 'white' }}>
              Every interaction on the Connie network generates structured data.<br/>
              As more nonprofits join, we move from operational reporting to sector-wide impact analysis.
            </div>
          </div>

          <div className="scale-viz">
            <span className="fragment"><strong>1 CBO</strong><br/><span style={{ fontSize: '0.7em', color: 'var(--text-muted)' }}>Operational Dashboard</span></span>
            <span className="scale-arrow fragment"><ArrowRight size={24} /></span>
            <span className="fragment"><strong>10 CBOs</strong><br/><span style={{ fontSize: '0.7em', color: 'var(--text-muted)' }}>Benchmarking Data</span></span>
            <span className="scale-arrow fragment"><ArrowRight size={24} /></span>
            <span className="fragment"><strong>100 CBOs</strong><br/><span style={{ fontSize: '0.7em', color: 'var(--text-muted)' }}>Sector-Wide Standards</span></span>
          </div>
        </section>

        {/* Slide 15: Roadmap */}
        <section>
          <div className="section-tag">Short-term Roadmap</div>
          <h1>From Prototype &amp; UAT To MVP</h1>
          <h2>With a working prototype &amp; successful proof of concept, the Connie team is set to move into the UAT Development Phase @ Targeted Locations.</h2>

          <div className="roadmap-map-container">
            {/* TODO: Replace with actual interactive map or screenshot */}
            <div className="roadmap-map-placeholder">
              <MapPin size={48} style={{ marginBottom: '1em', color: 'var(--accent-primary)' }} />
              <div><strong>Connie UAT / Beta Program Location Map</strong></div>
              <div style={{ marginTop: '0.5em' }}>Strategic opportunity zones: <span style={{ color: '#ec4899' }}>CIS infrastructure</span> ready for integration,<br/>
              <span style={{ color: '#94a3b8' }}>migration-based</span> senior growth, and <span style={{ color: '#06b6d4' }}>organic aging-in-place</span> markets</div>
            </div>
            <div className="roadmap-map-legend">
              <div className="roadmap-legend-item">
                <span className="roadmap-legend-dot cis"></span>
                <span>CIS Infrastructure - Community Information Systems in place</span>
              </div>
              <div className="roadmap-legend-item">
                <span className="roadmap-legend-dot migration"></span>
                <span>Migration-Based - Retirees moving in from other areas</span>
              </div>
              <div className="roadmap-legend-item">
                <span className="roadmap-legend-dot aging"></span>
                <span>Aging in Place - Existing residents growing older</span>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 15: Pricing */}
        <section>
          <h1>A Sustainable Social Enterprise with a Simple, Affordable Business Model</h1>
          <h2>A B2B recurring revenue (SaaS) model that&apos;s affordable for CBOs and sustainable for ASA.</h2>
          <div className="pricing-grid">
            <div className="fragment">
              <PricingCard
                plan="Standard User"
                price="$950/month"
                features={['ASA Members', 'Up to 2,000 clients', 'Full platform access']}
                highlighted={false}
              />
            </div>
            <div className="fragment">
              <PricingCard
                plan="Super User"
                price="$1,550/month"
                features={['Over 2,000 clients', 'Non-ASA organizations', 'Full platform access']}
                highlighted={true}
              />
            </div>
          </div>
          <div className="pricing-footer fragment">
            <div>$1,000 onboarding fee for all plans</div>
            <div style={{ marginTop: '0.5em' }}>All organizations using Connie become members of ASA</div>
          </div>
        </section>

        {/* Slide 16: Call to Action */}
        <section>
          <h1>Partner With Us to Build a More Connected Future for Aging</h1>
          <div className="cta-layout">
            <div className="cta-column">
              <div className="cta-section fragment">
                <h3>The Opportunity</h3>
                <p>
                  We are at a pivotal moment. An aging population, digital-first expectations, and the growing importance of community-based care have created unprecedented demand. Connie is purpose-built to meet this moment—transforming how CBOs connect, engage, and serve older adults.
                </p>
              </div>
              <div className="cta-section fragment">
                <h3>The Invitation</h3>
                <p>
                  We invite you to join us as a partner, pilot site, or supporter. Together, we can build the infrastructure that America&apos;s aging population needs—and that community-based organizations deserve.
                </p>
              </div>
            </div>
            <div className="cta-column fragment">
              <div className="cta-contact">
                <h3>Get In Touch</h3>
                <div className="cta-contact-name">Dee Goldstein</div>
                <a href="mailto:agoldstein@asaging.org" className="cta-contact-email">
                  <Mail size={16} style={{ marginRight: '0.5em', verticalAlign: 'middle' }} />
                  agoldstein@asaging.org
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 18: Get Involved */}
        <section className="centered">
          <h1>Get Involved!</h1>
          <h2>Our Mission: <span style={{ color: 'var(--accent-tertiary)' }}>Help Nonprofits Deliver Community Based Programs &amp; Services Online.</span></h2>

          <div className="qr-code-container fragment">
            <img
              src="/presentations/vegas-2025/images/QR-connie-UAT.png"
              alt="Scan to learn more about Connie"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </section>

        {/* Slide 19: Thank You */}
        <section className="thank-you-slide">
          {/* TODO: Replace with cloud illustration with Connie logo */}
          <div className="thank-you-cloud" style={{ width: '250px', height: '150px', background: 'linear-gradient(180deg, #bae6fd 0%, #7dd3fc 50%, #38bdf8 100%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <img src="/connie-logo-black-strong.svg" alt="Connie" style={{ height: '50px', marginTop: '-10px' }} />
          </div>
          <h1 className="fragment">THANK YOU</h1>
          <a href="https://www.connieconnect.com" className="website fragment" target="_blank" rel="noopener noreferrer">
            www.connieconnect.com
          </a>
          <div className="fragment" style={{ marginTop: '2em' }}>
            <div style={{ fontSize: '0.5em', color: 'var(--text-muted)', marginBottom: '0.5em' }}>A Project of</div>
            <img
              src="/presentations/vegas-2025/images/asa-logo-trans.png"
              alt="American Society on Aging"
              style={{ maxHeight: '80px', width: 'auto' }}
            />
          </div>
        </section>
      </div>
      <div className="presentation-copyright">Copyright © 2025 Nevada Senior Services, All rights reserved.</div>
    </div>
  )
}
