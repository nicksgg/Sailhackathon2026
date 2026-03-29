# Perplexity v1 — UI Build Plan
**Branch:** `perplexity_v1`  
**Date:** 2026-03-29  
**Author:** Perplexity Computer (AI agent)

---

## Project Overview

**Project Lighthouse** is a Singapore real estate mobile buyer app built as a React + TypeScript + Tailwind CSS SPA. The Figma design covers 12 screens (M1–M12). The original `main` branch ships only 2 wired routes (Landing + Discover); the remaining 10 screens exist as `.tsx` files but are not routed.

The `perplexity_v1` branch delivers:
1. All 12 screens fully routed and navigable
2. All bottom-nav tabs enabled
3. UnitDetail screen (M3) with full image carousel and tab content
4. Shortlist (M4) with add/remove state management
5. Compare (M4b) side-by-side unit comparison
6. Advisor Chat (M5) — already complete, just routed
7. Affordability Calculator (M6) — already complete, just routed
8. Appointment Booking (M7) — already complete, just routed
9. EOI Submission (M8) — complete form flow
10. My Profile (M9) — user dashboard
11. Notifications (M10) — notification list with read/unread states
12. Site Plan (M11) — interactive block/floor map
13. Documents (M12) — document download list

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18.3.1 |
| Router | React Router 7.13.0 (Data mode) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| UI Primitives | Radix UI (via shadcn/ui) |
| Icons | Lucide React |
| Charts | Recharts |
| Build | Vite 6 |

---

## Design System (from PROJECT_INFO.md)

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#01696F` | CTAs, active states |
| Primary Dark | `#0C4E54` | Hover/pressed |
| Background | `#FFFFFF` | Page background |
| Surface | `#F5F5F5` | Cards, inputs |
| Text Primary | `#1A1A2E` | Headings, body |
| Success | `#10B981` | Confirmations |
| Warning | `#F59E0B` | Alerts, promos |
| Error | `#EF4444` | Errors |

**Layout:** Mobile-first 390×844px · 16px h-padding · 72px bottom nav · 12px button radius · 16px card radius

---

## Screen Inventory

| # | Screen | Route | Status (before v1) | v1 Action |
|---|--------|-------|--------------------|-----------|
| M1 | Landing | `/` | ✅ Complete | Keep |
| M2 | Discover | `/discover` | ✅ Complete | Keep + connect shortlist state |
| M3 | Unit Detail | `/unit/:id` | ❌ Not routed | Route + enhance |
| M4 | Shortlist | `/shortlist` | ❌ Not routed | Route + state |
| M4b | Compare | `/compare` | ❌ Not routed | Route + build |
| M5 | Advisor Chat | `/advisor` | ❌ Not routed | Route |
| M6 | Affordability Calc | `/calculator` | ❌ Not routed | Route |
| M7 | Appointment Booking | `/booking` | ❌ Not routed | Route |
| M8 | EOI Submission | `/eoi` | ❌ Not routed | Route + build |
| M9 | My Profile | `/profile` | ❌ Not routed | Route + build |
| M10 | Notifications | `/notifications` | ❌ Not routed | Route + build |
| M11 | Site Plan | `/siteplan` | ❌ Not routed | Route + build |
| M12 | Documents | `/documents` | ❌ Not routed | Route + build |

---

## State Architecture

Global state is managed via React Context (`AppContext`) to share:
- `shortlist: ShortlistedUnit[]` — units the user has saved
- `notifications: Notification[]` — unread count badge
- `compareList: Unit[]` — up to 3 units queued for comparison

This avoids prop-drilling across the router boundary.

---

## Routing Structure

```
/ (AppLayout)
├── /                    → Landing
├── /discover            → Discover
├── /unit/:id            → UnitDetail
├── /shortlist           → Shortlist
├── /compare             → Compare
├── /advisor             → AdvisorChat
├── /calculator          → AffordabilityCalculator
├── /booking             → AppointmentBooking
├── /eoi                 → EOISubmission
├── /profile             → MyProfile
├── /notifications       → Notifications
├── /siteplan            → SitePlan
└── /documents           → Documents
```

---

## Delivery Checklist

- [x] `perplexity_v1` branch created and pushed
- [x] PERPLEXITY_V1_PLAN.md (this file)
- [ ] `AppContext.tsx` — global state provider
- [ ] `routes.tsx` — all 13 routes wired
- [ ] `AppLayout.tsx` — all nav tabs enabled
- [ ] `UnitDetail.tsx` — full implementation
- [ ] `Shortlist.tsx` — full implementation
- [ ] `Compare.tsx` — full implementation
- [ ] `EOISubmission.tsx` — full implementation
- [ ] `MyProfile.tsx` — full implementation
- [ ] `Notifications.tsx` — full implementation
- [ ] `SitePlan.tsx` — full implementation
- [ ] `Documents.tsx` — full implementation
- [ ] All changes committed and pushed to `perplexity_v1`

---

## Singapore Property Context

Key terms used throughout the UI:
- **CPF** — Central Provident Fund (mandatory savings, usable for property payments)
- **OTP** — Option to Purchase (legal exclusive-right document)
- **TOP** — Temporary Occupation Permit (building completion certificate)
- **BSD** — Buyer's Stamp Duty (property purchase tax)
- **TDSR** — Total Debt Servicing Ratio (max 55% of income for loans)
- **PSF** — Price per square foot
- **LTV** — Loan-to-Value ratio (typically 75% for first property)
- **EOI** — Expression of Interest (buyer registration of interest)
