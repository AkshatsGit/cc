# Creator Cart 🚀

> **Creator Cart** is a modern full-stack web application connecting Brands with Social Media Influencers for high-ROI marketing collaborations. Inspired by Notion + Stripe + LinkedIn aesthetics.

---

## 🌟 Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React, React Router DOM v6, Axios, Recharts, React Hot Toast
- **Backend**: Node.js with Express.js REST API
- **Auth & Database**: Firebase Authentication, Firestore, and Storage (with built-in seamless zero-config fallback seed data store)
- **Styling Theme**: Modern SaaS layout, White/Dark background, Purple (`#6C63FF`) primary accent, 16px rounded cards (`rounded-2xl`), soft shadows.

---

## 🚀 Key Features

### 💼 Brand Features
- **Brand Dashboard**: Active Campaigns, Total Applications, Selected Creators, and Recharts performance analytics.
- **Campaign CRUD**: Create, edit, delete, and list marketing campaigns (Deliverables checklist, budget, required followers, preferred platform).
- **Applicant Management**: Review creator profiles, proposal pitches, and rate card quotes with 1-click **Accept**, **Reject**, and **Shortlist** actions.
- **Brand Profile**: Company details, logo, industry, contact person, and verified status.

### 🌟 Influencer Features
- **Creator Dashboard**: AI Match Score recommended campaigns (0-99%), application status tracker, active collaborations, estimated earnings.
- **Media Kit & Profile**: Social media handles (Instagram, YouTube, TikTok, LinkedIn), audience reach metrics, engagement rate, portfolio items.
- **Rate Card Pricing**: Story, Reel, Post, Shorts, Dedicated Video pricing.
- **Actions**: Apply to campaigns, bookmark opportunities, withdraw applications.

### 🤖 Matching Engine
- **Recommendation Scoring Algorithm**: Evaluates niche alignment, preferred platform, follower criteria, engagement rate, and rate card budget fit.
- **Dynamic Reason Tags**: Shows why a campaign matches ("Same niche", "High engagement", "Budget matches").

### 💬 Real-Time In-App Messaging
- Direct messaging between accepted Brands and Creators.
- Features read receipts, typing indicators, image asset sharing, and campaign context.

### 🛡️ Admin Moderation Panel
- Platform statistics overview (Total Users, Brands, Creators, Campaigns, Applications).
- User management (Ban/Unban accounts, toggle Verified Badges).
- Campaign moderation and report review.

---

## 🏃 Running the Application

### 1. Install Dependencies
```bash
# From the project root
npm run install:all
```

### 2. Start Backend Server
```bash
cd server
npm start
# Express running on http://localhost:5001
```

### 3. Start Frontend Client
```bash
cd client
npm run dev
# Vite running on http://localhost:3000
```

---

## 🎭 Demo Mode Accounts (Instant Switching)

Use the top-right Quick Switcher pill in the navigation bar to test all user roles instantly:
- **Brand Demo**: `collabs@techpulse.com` (TechPulse Gear)
- **Influencer Demo**: `alex.tech@creators.com` (Alex Rivera - 988K Followers)
- **Admin Demo**: `admin@creatorcart.com` (CreatorCart Admin)
