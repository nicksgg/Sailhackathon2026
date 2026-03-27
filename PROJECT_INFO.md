# Project Lighthouse - Real Estate Buyer App

A professional mobile property application for Singapore property buyers, built with React, TypeScript, and Tailwind CSS.

## Features

### Core Screens (12 Total)
1. **Landing (M1)** - Project overview with hero image, CTAs, and key selling points
2. **Discover (M2)** - Unit search and filtering with advanced filters
3. **Unit Detail (M3)** - Detailed unit information with image carousel and tabs
4. **Shortlist & Compare (M4)** - Save favorite units and compare side-by-side
5. **Advisor Chat (M5)** - AI-powered chatbot for property inquiries
6. **Affordability Calculator (M6)** - Singapore-specific financial calculations
7. **Appointment Booking (M7)** - Multi-step booking flow for showflat visits
8. **EOI Submission (M8)** - Expression of Interest form with document uploads
9. **My Profile (M9)** - User account and activity dashboard
10. **Notifications (M10)** - Real-time updates and alerts
11. **Site Plan (M11)** - Interactive development map with facilities
12. **Documents (M12)** - Download e-brochures and view saved reports

## Singapore Property Terms

- **CPF**: Central Provident Fund - Singapore's mandatory savings scheme
- **OTP**: Option to Purchase - A legal document giving buyer exclusive right to purchase
- **TOP**: Temporary Occupation Permit - Building completion certificate
- **BSD**: Buyer's Stamp Duty - Tax on property purchases
- **TDSR**: Total Debt Servicing Ratio - Max 55% of monthly income for loan payments
- **PSF**: Price per square foot
- **LTV**: Loan-to-Value ratio - Typically 75% for first property

## Design System

### Colors
- **Primary**: `#01696F` (Teal) - CTAs, active states, links
- **Primary Dark**: `#0C4E54` - Hover/pressed states
- **Background**: `#FFFFFF` - Main background
- **Surface**: `#F5F5F5` - Cards, input fields
- **Text Primary**: `#1A1A2E` - Headings, body text
- **Success**: `#10B981` - Confirmations
- **Warning**: `#F59E0B` - Alerts, promo badges
- **Error**: `#EF4444` - Errors

### Layout
- Mobile-first design (390×844px - iPhone 14)
- Fixed bottom navigation (72px height)
- 16px horizontal padding
- Rounded corners (12px buttons, 16px cards)

## Mock Data
- 600 realistic property units across 3 blocks
- Multiple bedroom configurations (1BR to 4BR)
- Singapore-based pricing and locations
- Realistic amenities and facilities

## Navigation
Bottom tab navigation with 5 sections:
- Home - Landing page
- Discover - Browse units
- Shortlist - Saved units
- Advisor - AI chat
- Me - Profile & settings

## Technology Stack
- React 18.3.1
- React Router 7.13.0 (Data mode)
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Lucide React icons
