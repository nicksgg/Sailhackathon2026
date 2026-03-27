# Figma Mobile Prototype Prompt — Real Estate Buyer App

> **Design System:** Modern, professional real estate mobile app for Singapore property buyers. Clean white/light grey backgrounds, teal accent (#01696F) for primary CTAs, dark text (#1A1A2E). Use Inter or SF Pro for typography. Cards with subtle shadows (elevation 2). Rounded corners (12px buttons, 16px cards). Bottom navigation with 5 tabs. Status bar + safe area respected on all screens. Design at 390×844 (iPhone 14 standard). Consistent 16px horizontal padding. 

---

## M1 — Landing / Project Overview

```
[STATUS BAR]
[HEADER]
  Logo: "Project Lighthouse" (left)
  [≡ Hamburger menu] (right)

[HERO IMAGE — full bleed, 16:9 ratio]
  Overlay gradient (bottom dark)
  Project name: "Project Lighthouse"
  Tagline: "Your new address in District 15"

[PRIMARY CTA — full width, teal filled]
  "Explore Units"

[SECONDARY CTA — full width, teal outlined]
  "Talk to an Advisor"

[SECTION: Project Highlights — horizontal scroll chips]
  📍 Marine Parade, D15
  💰 From $1.28M
  📜 99-year leasehold
  🏗 TOP 2028

[SECTION: Key Selling Points — 3 cards, vertical stack]
  Card 1: "5-min walk to MRT" + icon + brief text
  Card 2: "Full condo facilities" + icon + brief text
  Card 3: "Near top schools" + icon + brief text

[SECTION: Quick Links — 2×2 grid of icon buttons]
  View Floor Plans
  Calculate Affordability
  Book Showflat
  Download E-Brochure

[SECTION: Developer Info — minimal card]
  Developer logo + name
  "Track record: 20+ projects since 1990"

[FOOTER]
  Contact Us | FAQ | Privacy Policy | Terms
  © 2026 [Developer Name]

[BOTTOM NAV — 5 tabs, teal active state]
  Home | Discover | Shortlist | Advisor | Me
```

---

## M2 — Discover (Search + Filters)

```
[STATUS BAR]
[HEADER: "Discover Units"]
  [← Back] [🔔 Notification bell]

[SEARCH BAR — rounded, icon left]
  Placeholder: "Search by unit no., type, or price"

[FILTER CHIPS — horizontal scroll]
  Bedrooms ▾ | Price ▾ | Floor ▾ | Facing ▾ | Size ▾ | Promo ▾

[ACTIVE FILTER STATE example]
  When "Bedrooms" tapped → bottom sheet:
    ○ Studio  ○ 1BR  ● 2BR  ○ 3BR  ○ 4BR  ○ Penthouse
    [Reset] [Apply]

[SORT BAR — inline, right-aligned]
  Sort by: Price ▾ | Grid/List toggle icons

[RESULTS COUNT]
  "42 units found"

[UNIT CARD LIST — vertical scroll]
  ┌─────────────────────────────────────┐
  │ [Thumbnail image]                    │
  │ #12-03 · 2 Bedroom                  │
  │ 678 sqft · North-facing · High floor│
  │ $1,980,000  ($2,920 psf)            │
  │ [Tag: "Early Bird"] [Tag: "Balcony"]│
  │                                      │
  │ [♡ Shortlist]          [View →]      │
  └─────────────────────────────────────┘

  ┌─────────────────────────────────────┐
  │ [Thumbnail image]                    │
  │ #10-05 · 2 Bedroom                  │
  │ 657 sqft · South-facing · Mid floor │
  │ $1,920,000  ($2,922 psf)            │
  │ [Tag: "Pool view"]                   │
  │                                      │
  │ [♡ Shortlist]          [View →]      │
  └─────────────────────────────────────┘

  (repeat pattern...)

[BOTTOM NAV]
  Home | Discover● | Shortlist | Advisor | Me
```

---

## M3 — Unit Detail

```
[STATUS BAR]
[HEADER — transparent overlay on carousel]
  [← Back] [♡ Shortlist] [↗ Share]

[IMAGE CAROUSEL — full width, swipeable]
  Dots indicator: ● ○ ○ ○ ○
  Tab pills below: Photos | 3D Tour | Layout | Video

[UNIT INFO SECTION]
  Unit: #12-03
  Type: 2 Bedroom + Study
  $1,980,000
  [PROMO BADGE: "Early Bird — save $30K"]

[KEY FACTS — 4-column grid]
  678 sqft     │ North     │ Floor 12  │ $6,800/mo*
  Size         │ Facing    │ Level     │ Est. mortgage

[CTA ROW — sticky bottom area]
  [♡ Shortlist]  [⚖ Compare]  [📅 Book Viewing]

[TABS — scrollable]
  Overview | Floor Plan | Payments | Similar

  ── Tab: Overview ──
  • Layout highlights (bullet points)
  • Nearest amenities (map chip + distance)
  • View direction illustration
  • Finishes & fittings summary

  ── Tab: Floor Plan ──
  • Zoomable floor plan image
  • Room dimensions overlay
  • Furniture placement suggestion

  ── Tab: Payments ──
  • Progressive payment schedule (timeline visual)
    Booking fee → OTP → Exercise → Construction stages → TOP → Final
  • Each stage: % and $ amount
  • CPF/Cash breakdown toggle
  • Estimated stamp duty

  ── Tab: Similar Units ──
  • Horizontal scroll of similar unit cards
  • Filter: same type / same floor range / same price range
```

---

## M4 — Shortlist + Compare

```
[STATUS BAR]
[HEADER: "My Shortlist"]
  [← Back] [Edit]

[SHORTLIST COUNTER]
  "3 units shortlisted"

[UNIT CARDS — checkbox selectable, vertical list]
  ┌──────────────────────────────────┐
  │ [☑] [Thumb] #12-03 · 2BR        │
  │     678 sqft · $1,980,000       │
  │     North · Floor 12            │
  │     [Remove]                     │
  └──────────────────────────────────┘

  ┌──────────────────────────────────┐
  │ [☑] [Thumb] #10-05 · 2BR        │
  │     657 sqft · $1,920,000       │
  │     South · Floor 10            │
  │     [Remove]                     │
  └──────────────────────────────────┘

  ┌──────────────────────────────────┐
  │ [☐] [Thumb] #15-01 · 3BR        │
  │     980 sqft · $2,650,000       │
  │     East · Floor 15             │
  │     [Remove]                     │
  └──────────────────────────────────┘

[CTA — enabled when 2+ selected]
  "Compare Selected (2)"

─── COMPARE VIEW (modal or new screen) ───

[HEADER: "Compare Units"]
  [← Back to Shortlist]

[COMPARISON TABLE — horizontal scroll]
  ┌──────────┬──────────┬──────────┐
  │          │ #12-03   │ #10-05   │
  │          │ [thumb]  │ [thumb]  │
  ├──────────┼──────────┼──────────┤
  │ Type     │ 2BR+S    │ 2BR      │
  │ Price    │ $1.98M   │ $1.92M   │
  │ Size     │ 678 sqft │ 657 sqft │
  │ PSF      │ $2,920   │ $2,922   │
  │ Facing   │ North    │ South    │
  │ Floor    │ 12       │ 10       │
  │ Est.     │ $6,800   │ $6,590   │
  │ monthly  │          │          │
  │ Promo    │ Early    │ —        │
  │          │ Bird     │          │
  │ Balcony  │ Yes      │ No       │
  └──────────┴──────────┴──────────┘

  [Highlight: winning value in each row = teal bold]

[CTA]
  "Ask Advisor About Differences"

[BOTTOM NAV]
  Home | Discover | Shortlist● | Advisor | Me
```

---

## M5 — Advisor Chat

```
[STATUS BAR]
[CHAT HEADER]
  [← Back]
  Avatar: "Lighthouse Advisor" (AI badge)
  [⋮ Menu: Save transcript | Clear chat]

[CHAT BODY — scrollable]

  [BOT BUBBLE — left aligned, light grey bg]
  "Welcome to Project Lighthouse 👋
   I can help you find the right unit.
   What matters most to you?"

  [QUICK REPLY CHIPS — horizontal scroll]
  "High floor" | "Pool view" | "Under $2M" | "3 bedrooms"

  [USER BUBBLE — right aligned, teal bg, white text]
  "High floor, avoid west sun, budget $2M"

  [BOT BUBBLE]
  "Based on your preferences, here are
   3 units that match:"

  [INLINE UNIT CARDS — compact, within chat]
  ┌────────────────────────────┐
  │ #12-03 · 2BR · $1.98M     │
  │ North · Floor 12 · 678sqft│
  │ [View] [♡ Shortlist]       │
  └────────────────────────────┘
  (repeat for 2 more units)

  [BOT BUBBLE]
  "Would you like to compare these,
   or shall I refine the search?"

[SUGGESTED ACTIONS — persistent chips]
  Show 3 best matches
  Explain payment stages
  Estimate monthly installment
  Book showflat slot
  Compare shortlisted units

[INPUT BAR — sticky bottom]
  [📎 Attach] [Type a message...] [Send →]

[STICKY CTA — above input bar, dismissible]
  "Share my shortlist with a human consultant →"

[BOTTOM NAV]
  Home | Discover | Shortlist | Advisor● | Me
```

---

## M6 — Affordability Calculator

```
[STATUS BAR]
[HEADER: "Affordability Calculator"]
  [← Back] [ℹ Info tooltip]

[SECTION: Your Financial Profile]

  Household Monthly Income
  [$ __________ ] (number input)

  Cash Available for Property
  [$ __________ ] (number input)

  CPF Ordinary Account Balance
  [$ __________ ] (number input)

  Loan Tenure
  [●━━━━━━━━━━━○] 25 years
  (slider: 5–30 years)

  Interest Rate
  [●━━━━━━━━━━━○] 4.0% p.a.
  (slider: 2.5%–5.5%, default 4.0%)

  Number of Existing Property Loans
  [0 ▾] (dropdown: 0, 1, 2+)

[CTA — full width, teal]
  "Calculate"

─── RESULTS (appears below or as new section) ───

[SECTION: Your Estimated Budget]

  ┌─────────────────────────────┐
  │ ESTIMATED MAX BUDGET        │
  │ $2,150,000                  │
  │ ▲ You can afford 28 of 120  │
  │   available units           │
  └─────────────────────────────┘

[RESULT CARDS — 2×2 grid]
  ┌──────────────┐ ┌──────────────┐
  │ Monthly       │ │ Down Payment  │
  │ Instalment    │ │ Breakdown     │
  │ $5,890/mo     │ │ Cash: $215K   │
  │               │ │ CPF: $322K    │
  └──────────────┘ └──────────────┘
  ┌──────────────┐ ┌──────────────┐
  │ Total Debt    │ │ Stress Test   │
  │ Servicing     │ │ at +1% Rate   │
  │ Ratio: 42%    │ │ $6,480/mo     │
  │ (Limit: 55%)  │ │ Still OK ✓    │
  └──────────────┘ └──────────────┘

[ADDITIONAL COSTS BREAKDOWN — expandable]
  Buyer Stamp Duty (BSD): $64,600
  Additional BSD (if applicable): —
  Legal fees (est.): $3,000
  Valuation fee: $500

[CTA ROW]
  [Save as Scenario] [Send to Consultant]

[LINK]
  "View units within my budget →"

[BOTTOM NAV]
  Home | Discover | Shortlist | Advisor | Me
```

---

## M7 — Appointment Booking

```
[STATUS BAR]
[HEADER: "Book an Appointment"]
  [← Back]

[PROGRESS INDICATOR — 3 steps]
  ● Purpose → ○ Date/Time → ○ Confirm
  (Step 1 active)

─── STEP 1: Choose Purpose ───

[OPTION CARDS — single select, vertical]
  ┌─────────────────────────────────┐
  │ 🏠 Visit Showflat               │
  │ Walk through the show unit      │
  │ in person (est. 45 min)         │
  │                           [●]   │
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ 💻 Virtual Consultation          │
  │ Video call with a sales         │
  │ consultant (est. 30 min)        │
  │                           [○]   │
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ 💰 Financial Consultation        │
  │ Discuss loan, CPF, and          │
  │ payment options (est. 45 min)   │
  │                           [○]   │
  └─────────────────────────────────┘

[CTA] "Next →"

─── STEP 2: Pick Date & Time ───

[PROGRESS: ● Done → ● Date/Time → ○ Confirm]

[CALENDAR — month view]
  ◀ March 2026 ▶
  (Available dates highlighted in teal)
  (Unavailable dates greyed out)
  Selected date: teal filled circle

[TIME SLOTS — grid of chips]
  Morning:    [10:00] [10:30] [11:00] [11:30]
  Afternoon:  [13:00] [13:30] [14:00] [14:30]
              [15:00] [15:30] [16:00]
  Evening:    [18:00] [18:30] [19:00]
  (Selected = teal filled, unavailable = grey)

[CTA] "Next →"

─── STEP 3: Your Details ───

[PROGRESS: ● Done → ● Done → ● Confirm]

  Full Name
  [____________________]

  Mobile Number
  [+65 ________________]

  Email Address
  [____________________]

  Preferred Language
  [English ▾] (dropdown: English, Chinese, Malay, Tamil)

  Notes to Consultant (optional)
  [____________________]
  [____________________]

  [☐] I agree to the Privacy Policy and Terms

[CTA] "Confirm Booking"

─── CONFIRMATION SCREEN ───

[SUCCESS ICON — large teal checkmark]

  "Booking Confirmed!"

  📅 Saturday, 28 Mar 2026
  🕐 2:00 PM
  📍 Showflat at 123 Marine Parade Rd

  Your consultant:
  [Avatar] Sarah Tan | +65 9123 4567

[ACTION BUTTONS — vertical stack]
  [📅 Add to Calendar (ICS)]
  [💬 WhatsApp Consultant]
  [🗺 Get Directions]
  [📧 Email Confirmation Sent]

[CTA] "Back to Home"

[BOTTOM NAV]
```

---

## M8 — EOI Submission + Status

```
[STATUS BAR]
[HEADER: "Expression of Interest"]
  [← Back] [ℹ Help]

[EOI STATUS TIMELINE — horizontal]
  ●━━━━━○━━━━━○━━━━━○
  Draft   Submitted  Reviewed  Confirmed
  (Current step highlighted)

─── EOI FORM ───

[SECTION: Purchaser Details]

  Full Legal Name (as per NRIC)
  [____________________]

  NRIC / Passport No.
  [____________________]

  Nationality
  [Singapore Citizen ▾]

  Date of Birth
  [DD/MM/YYYY]

  Current Address
  [____________________]
  [____________________]

  Contact Number
  [+65 ________________]

  Email
  [____________________]

[SECTION: Co-Purchaser (optional)]
  [+ Add Co-Purchaser]

[SECTION: Preferred Units — ranked list]
  1st Choice: [Select unit ▾] → #12-03 2BR $1.98M
  2nd Choice: [Select unit ▾] → #10-05 2BR $1.92M
  3rd Choice: [Select unit ▾] → (optional)

[SECTION: Financing]
  Payment method: [Bank loan ▾]
  Estimated loan quantum: [$________]

[SECTION: Required Documents — checklist]
  [✓] NRIC (front & back)           [Uploaded ✓]
  [✓] Proof of income (3 months)    [Uploaded ✓]
  [ ] Proof of funds / CPF statement [Upload →]
  [ ] Option fee cheque / transfer   [Upload →]
  (Each item: tap to upload, shows preview thumbnail)

[SECTION: Declaration]
  [☐] I declare that the information provided is
      true and accurate.
  [☐] I consent to the collection and use of my
      personal data per the PDPA.
  [☐] I understand this EOI is non-binding until
      the Option to Purchase is exercised.

[CTA — full width, teal, disabled until complete]
  "Submit EOI"

─── AFTER SUBMISSION ───

[STATUS SCREEN]
  [STATUS TIMELINE — updated]
  ●━━━━━●━━━━━○━━━━━○
  Draft   Submitted  Reviewed  Confirmed

  Submitted: 27 Mar 2026, 3:15 PM
  Reference: EOI-2026-0342

[ACTION CARDS]
  ┌─────────────────────────────┐
  │ 📄 Upload Additional Docs    │
  │ 2 of 4 documents uploaded   │
  │ [Upload remaining →]         │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │ 📊 Track EOI Status          │
  │ Currently: Under Review     │
  │ Est. response: 3 working    │
  │ days                         │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │ 💬 Contact Your Consultant   │
  │ Sarah Tan                    │
  │ [Call] [WhatsApp] [Email]    │
  └─────────────────────────────┘

[BOTTOM NAV]
```

---

## M9 — My Profile / Account (ADDITIONAL)

```
[STATUS BAR]
[HEADER: "My Account"]

[PROFILE SECTION]
  [Avatar circle — initials or photo]
  John Tan
  john.tan@email.com
  +65 9123 4567
  [Edit Profile →]

[SECTION: My Activity — card list]
  ┌─────────────────────────────┐
  │ 🏠 Shortlisted Units     (3) │
  │ ♡ Last added: #12-03 2BR    │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │ 📅 Appointments           (1) │
  │ Next: Sat 28 Mar, 2:00 PM   │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │ 📝 EOI Status             (1) │
  │ EOI-2026-0342: Under Review  │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │ 💰 Saved Scenarios        (2) │
  │ Last: Budget $2.15M scenario │
  └─────────────────────────────┘

[SECTION: Resources]
  📥 Download E-Brochure
  📋 Payment Schedule Guide
  📞 Contact Sales Gallery
  ❓ FAQ

[SECTION: Settings]
  🔔 Notifications Preferences
  🌐 Language: English
  🔒 Privacy Settings
  📄 Terms & Conditions

[SIGN OUT — text button, red]
  "Sign Out"

[BOTTOM NAV]
  Home | Discover | Shortlist | Advisor | Me●
```

---

## M10 — Notifications Centre (ADDITIONAL)

```
[STATUS BAR]
[HEADER: "Notifications"]
  [← Back] [Mark all read]

[FILTER TABS]
  All | Units | Appointments | EOI | Promos

[NOTIFICATION LIST — chronological]

  TODAY
  ┌─────────────────────────────────┐
  │ 🔴 EOI Update                    │
  │ Your EOI-2026-0342 is now       │
  │ under review. Est. 3 working    │
  │ days for response.              │
  │ 2 hours ago                      │
  └─────────────────────────────────┘

  ┌─────────────────────────────────┐
  │ 🔴 Appointment Reminder          │
  │ Showflat visit tomorrow at      │
  │ 2:00 PM. Tap for directions.    │
  │ 5 hours ago                      │
  └─────────────────────────────────┘

  YESTERDAY
  ┌─────────────────────────────────┐
  │ ○ Price Update                   │
  │ New early bird pricing for      │
  │ 2BR units. Starts from $1.88M. │
  │ 1 day ago                        │
  └─────────────────────────────────┘

  ┌─────────────────────────────────┐
  │ ○ Unit Availability              │
  │ #08-02 3BR is now available.    │
  │ Matches your saved search.      │
  │ 1 day ago                        │
  └─────────────────────────────────┘

[BOTTOM NAV]
```

---

## M11 — Site Plan / Facilities (ADDITIONAL)

```
[STATUS BAR]
[HEADER: "Site Plan & Facilities"]
  [← Back]

[INTERACTIVE SITE PLAN — zoomable/pannable]
  Bird's eye illustration of the development
  Tap on blocks → highlight and show unit availability
  Legend: Available (teal) | Sold (grey) | Selected (gold)

[BLOCK SELECTOR — horizontal pills]
  Block A | Block B | Block C

[SELECTED BLOCK INFO]
  Block A — 25 storeys, 120 units
  Available: 42 units
  [View units in Block A →]

[SECTION: Facilities — icon grid, 3 columns]
  🏊 50m Lap Pool
  🏋 Gym
  🌳 Garden Deck
  🎾 Tennis Court
  👶 Kids' Playground
  🍳 BBQ Pavilion
  🧘 Yoga Deck
  🏃 Jogging Track
  🅿 Basement Parking

[SECTION: Neighbourhood — map embed]
  Interactive map showing:
  • MRT stations (with walking time)
  • Schools (primary, secondary)
  • Shopping malls
  • Parks
  • Hospitals/clinics

  [Filter chips on map]
  Transport | Schools | Shopping | F&B | Healthcare

[BOTTOM NAV]
```

---

## M12 — Document Vault / Downloads (ADDITIONAL)

```
[STATUS BAR]
[HEADER: "Documents"]
  [← Back]

[SECTION: Project Documents]
  ┌─────────────────────────────────┐
  │ 📄 E-Brochure                    │
  │ 45 pages · PDF · 12.3 MB       │
  │ [View] [Download]               │
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ 📄 Floor Plan Book               │
  │ All unit types · PDF · 8.1 MB  │
  │ [View] [Download]               │
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ 📄 Price List                    │
  │ Updated 25 Mar 2026 · PDF      │
  │ [View] [Download]               │
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ 📄 Payment Schedule              │
  │ Progressive payment breakdown   │
  │ [View] [Download]               │
  └─────────────────────────────────┘

[SECTION: My Documents]
  ┌─────────────────────────────────┐
  │ 📝 EOI Form (Draft)             │
  │ Saved 27 Mar 2026              │
  │ [Continue editing →]            │
  └─────────────────────────────────┘
  ┌─────────────────────────────────┐
  │ 📊 Affordability Report          │
  │ Generated 26 Mar 2026          │
  │ [View] [Share with consultant]  │
  └─────────────────────────────────┘

[BOTTOM NAV]
```

---

## Design System Summary for Figma

### Colours
| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#01696F` | CTAs, active states, links |
| Primary Dark | `#0C4E54` | Hover/pressed states |
| Background | `#FFFFFF` | Main background |
| Surface | `#F5F5F5` | Cards, input fields |
| Text Primary | `#1A1A2E` | Headings, body text |
| Text Secondary | `#6B7280` | Captions, metadata |
| Text Muted | `#9CA3AF` | Placeholders |
| Success | `#10B981` | Confirmations, available |
| Warning | `#F59E0B` | Alerts, attention |
| Error | `#EF4444` | Errors, required fields |
| Sold/Unavailable | `#D1D5DB` | Greyed-out states |
| Promo Badge | `#F59E0B` bg + `#92400E` text | Promotional tags |

### Typography (Inter / SF Pro)
| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 28px | Bold (700) | Page titles |
| H2 | 22px | SemiBold (600) | Section headers |
| H3 | 18px | SemiBold (600) | Card titles, unit names |
| Body | 16px | Regular (400) | Body text |
| Body Small | 14px | Regular (400) | Metadata, secondary info |
| Caption | 12px | Medium (500) | Tags, labels, timestamps |
| Price | 24px | Bold (700) | Price display |
| CTA | 16px | SemiBold (600) | Button labels |

### Component Library
| Component | Spec |
|-----------|------|
| Button Primary | Teal filled, 48px height, 12px radius, white text |
| Button Secondary | Teal outline, 48px height, 12px radius, teal text |
| Button Ghost | No border, teal text, 48px height |
| Card | White bg, 1px #E5E7EB border, 16px radius, 12px padding, subtle shadow |
| Chip (filter) | 36px height, 20px horiz padding, 18px radius, grey border (default), teal fill (active) |
| Tag | 24px height, 8px horiz padding, 6px radius, coloured bg |
| Input Field | 48px height, 12px radius, #F5F5F5 bg, 1px #D1D5DB border |
| Bottom Nav | 56px height, 5 items, teal active icon+label, grey inactive |
| Bottom Sheet | 24px top radius, drag handle, overlay bg |
| Status Indicator | 8px circle — teal (active), grey (pending), green (done) |
| Avatar | 40px circle, initials fallback |

### Spacing
| Token | Value |
|-------|-------|
| Page padding | 16px |
| Section gap | 24px |
| Card gap | 12px |
| Inner card padding | 16px |
| Between label and input | 8px |

### Icons
Use Phosphor Icons (regular weight) or SF Symbols for consistency.

### Interaction Notes for Prototype
- Bottom nav: persist across all screens, highlight active tab
- Filter chips → open bottom sheet with options
- Swipe on carousel images
- Tap unit card → navigate to M3 Unit Detail
- Shortlist heart → toggle fill with micro-animation
- Compare button → enabled only when 2+ units selected
- Calculator sliders → real-time output update
- Chat → auto-scroll, quick reply chips disappear after selection
- Booking steps → progress bar advances
- EOI timeline → updates based on status
- Pull-to-refresh on Discover list
- Skeleton loading states for all data screens

---

## Screen Flow / Navigation Map

```
M1 (Landing)
 ├── M2 (Discover) ──→ M3 (Unit Detail) ──→ M4 (Shortlist/Compare)
 ├── M5 (Advisor Chat)
 ├── M6 (Affordability Calculator)
 ├── M7 (Appointment Booking)
 ├── M11 (Site Plan)
 ├── M12 (Documents)
 │
 ├── M4 (Shortlist) ──→ M3 (Unit Detail)
 │                   ──→ M5 (Advisor — "Ask about differences")
 │
 ├── M8 (EOI) ──→ M12 (Upload docs)
 │
 ├── M9 (My Account)
 │   ├── M4 (Shortlist)
 │   ├── M7 (Appointments)
 │   ├── M8 (EOI Status)
 │   └── M10 (Notifications)
 │
 └── M10 (Notifications) ──→ relevant screen based on type
```

---

## Figma Setup Instructions

1. **Frame size:** iPhone 14 — 390 × 844px
2. **Create a component page** with all design tokens above
3. **Use Auto Layout** for all lists, cards, and form sections
4. **Set up variants** for: buttons (default/hover/disabled), chips (active/inactive), cards (default/selected), inputs (empty/filled/error)
5. **Prototype connections:** wire all CTAs to target screens, set bottom nav interactions, add smart animate for transitions
6. **Use overlays** for bottom sheets (filters, confirmations)
7. **Add scroll behaviour** on Discover list, Chat, and EOI form
