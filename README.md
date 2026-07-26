# Creator Cart 🚀

> **Creator Cart** is a modern full-stack web application that connects **Brands** with **Social Media Influencers** for high-ROI marketing collaborations. Designed with SaaS aesthetics inspired by **Notion**, **Stripe**, and **LinkedIn**, Creator Cart streamlines campaign discovery, applicant vetting, contract negotiation, and real-time collaboration.

---

## 📑 Table of Contents
- [Executive Overview](#-executive-overview)
- [Tech Stack](#-tech-stack)
- [Design Theme & Aesthetics](#-design-theme--aesthetics)
- [User Roles & Capabilities](#-user-roles--capabilities)
  - [1. Brand Features](#1-brand-features)
  - [2. Influencer Features](#2-influencer-features)
  - [3. Admin Moderation Features](#3-admin-moderation-features)
- [AI Recommendation & Matching Engine](#-ai-recommendation--matching-engine)
- [Real-Time Messaging & Notifications](#-real-time-messaging--notifications)
- [System Architecture & Folder Structure](#-system-architecture--folder-structure)
- [REST API Reference Specification](#-rest-api-reference-specification)
- [Firebase Integration & Dual-Mode Store](#-firebase-integration--dual-mode-store)
- [Setup & Installation Guide](#-setup--installation-guide)
- [Demo Account Presets](#-demo-account-presets)

---

## 🌐 Executive Overview

Creator Cart bridges the gap between visionary companies scaling on digital channels and top creators across **Instagram**, **TikTok**, **YouTube**, **LinkedIn**, and **Facebook**.

Key problems solved by Creator Cart:
1. **End-to-End Campaign Lifecycle**: Brands can launch campaigns with custom deliverables checklists, minimum follower requirements, and budget caps.
2. **Data-Driven Matching**: Influencers receive personalized opportunity feeds ranked by a 7-factor compatibility algorithm (0–99% match score) with explanatory tags ("High engagement", "Same niche", "Budget matches").
3. **Transparent Rate Cards**: Creators publish customized pricing for Stories, Reels, Posts, Shorts, and Dedicated Videos.
4. **Direct Communication**: Integrated in-app messaging eliminates email back-and-forth, featuring read receipts, typing indicators, and image asset sharing.

---

## 🛠 Tech Stack

### Frontend Client (`/client`)
- **Core**: React.js 18 with Vite 8
- **Styling & Theme**: Tailwind CSS v4 with custom design tokens, dark mode persistence, custom scrollbars, and 16px radius cards (`card-creator`)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6 with role-based route protection
- **HTTP Client**: Axios with automatic bearer token and user context interceptors
- **Form Validation**: React Hook Form
- **Notifications**: React Hot Toast
- **Data Visualization**: Recharts (Bar Charts, Tooltips, Custom Grids)

### Backend API Server (`/server`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js REST API
- **Middleware**: CORS, Morgan logger, Express JSON parser, error handling middleware
- **Authentication**: Firebase Authentication (ID Token verification)
- **Database & Storage**: Firebase Firestore & Storage (with an in-memory Store Fallback Service pre-seeded with rich data)

---

## 🎨 Design Theme & Aesthetics

- **Primary Color**: Purple (`#6C63FF`) with `#5A52E0` hover states
- **Backgrounds**: Soft Slate `#F8FAFC` (Light) and Midnight `#0B0F19` (Dark)
- **Cards**: `16px` border-radius (`rounded-2xl`), subtle borders, soft shadows, and hover elevation
- **Typography**: Clean Sans-Serif font hierarchy (`Inter`) with bold metric counters and micro-badges
- **Animations**: CSS transitions, subtle skeleton loaders, and pulsing indicators for live states

---

## 👤 User Roles & Capabilities

### 1. Brand Features
- **Brand Dashboard**:
  - Live metric counters: *Active Campaigns*, *Total Applications*, *Selected Creators*, *Allocated Budget*.
  - Recharts visual chart plotting applicant demand per active campaign.
  - Quick action toolbar to publish campaigns.
- **Campaign Management (CRUD)**:
  - Create, edit, and delete campaigns.
  - Fields: *Title*, *Description*, *Category/Niche*, *Budget ($)*, *Required Followers*, *Preferred Platform*, *Deliverables List*, *Deadline*, *Location*, *Tags*.
- **Applicant Tracking & Management**:
  - View applicant proposals with creator pitch notes, proposed rates, and deliverables.
  - Status updates: **Accept**, **Reject**, **Shortlist**.
  - Direct access to message accepted creators.
- **Brand Profile**:
  - Logo URL, company name, industry, website, about summary, contact person, email, phone, location, and verified status.

### 2. Influencer Features
- **Creator Dashboard**:
  - AI Recommended Campaigns feed with match score badges and reason tooltips.
  - Applied campaign status tracker (*Pending*, *Shortlisted*, *Accepted*, *Rejected*).
  - Active collaborations list with link to direct chat.
  - Total estimated earnings calculator.
- **Media Kit & Profile**:
  - Full name, handle, bio, niche, country, languages.
  - Social media accounts: *Instagram*, *YouTube*, *TikTok*, *LinkedIn*, *Facebook*.
  - Audience metrics: *Total Followers*, *Average Reach*, *Engagement Rate (%)*, *Average Views*.
  - Portfolio items (thumbnails, video links, past brand collabs).
- **Rate Card Pricing**:
  - Story ($), Reel ($), Post ($), Shorts ($), Dedicated Video ($).
- **Creator Actions**:
  - Submit custom proposal pitch notes and proposed rates to campaigns.
  - Save/Bookmark campaigns.
  - Withdraw submitted applications.

### 3. Admin Moderation Features
- **Admin Dashboard**:
  - System metrics: *Total Users*, *Brands Count*, *Creators Count*, *Active Campaigns*, *Applications*, *Pending Reports*.
- **User Management**:
  - Ban / Unban user accounts.
  - Grant or revoke **Verified Badges**.
- **Campaign Moderation**:
  - Audit and delete non-compliant or flagged campaigns.
- **Report Moderation**:
  - Resolve or dismiss safety & content reports submitted by users.

---

## 🤖 AI Recommendation & Matching Engine

The matching engine (`server/src/services/recommendationEngine.js`) evaluates campaign requirements against creator media kits to calculate a **0–99% compatibility score**:

```
Match Score = Base (50) + Niche Match (+25) + Platform Match (+15) + Followers (+15) + Engagement Rate (+15) + Budget Alignment (+15) + Location (+15)
```

### Generated Match Reasons:
- `"Same niche (Tech & Gadgets)"`
- `"Active on preferred platform (Instagram)"`
- `"Exceeds follower criteria (988K vs 50K)"`
- `"High engagement rate (4.8%)"`
- `"Campaign budget matches rate card"`
- `"Target audience location match (United States)"`

---

## 💬 Real-Time Messaging & Notifications

### Direct Messaging (`/messages`)
- Real-time chat channel list for accepted Brand-Creator collaborations.
- Read receipt checks (`Read 09:30 AM`).
- Live typing indicator simulation (`Elena is typing...`).
- Image/File attachment upload.

### Notifications Center (`/notifications`)
- Alerts for: *Application Accepted*, *New Application Received*, *New Message*, *Profile Verification*.
- Filter by read/unread with "Mark All as Read" action.

---

## 🏗 System Architecture & Folder Structure

```
creatorcart/
├── client/                     # Vite React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── common/        # Badge, SkeletonLoader, EmptyState
│   │   │   ├── layout/        # Navbar, Sidebar, Footer
│   │   │   └── ...
│   │   ├── context/           # AuthContext (roles, demo mode), ThemeContext
│   │   ├── hooks/             # useDebounce, useAuth, useTheme
│   │   ├── pages/             # 16+ pages (Landing, Dashboards, Search, Profile, Chat, Admin)
│   │   ├── services/          # api.js (Axios), firebase.js
│   │   └── App.jsx            # Router & protected route wrappers
│   ├── index.css              # Custom Tailwind tokens & card-creator utility
│   ├── vite.config.js
│   └── package.json
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/            # Firebase Admin SDK config
│   │   ├── controllers/       # Auth, Brand, Influencer, Campaign, Application, Match, Chat, Admin
│   │   ├── middleware/        # authMiddleware, checkRole, errorHandler
│   │   ├── routes/            # Express router definitions
│   │   ├── services/          # storeService.js (fallback DB), recommendationEngine.js
│   │   └── utils/             # seedData.js (realistic initial data)
│   ├── index.js               # Express entry point
│   └── package.json
├── package.json               # Root orchestrator scripts
└── README.md
```

---

## 📡 REST API Reference Specification

| Method | Endpoint | Description | Auth / Role |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Login user & return token/profile | Public |
| `GET` | `/api/auth/me` | Get current authenticated user session | Bearer Token |
| `GET` | `/api/campaigns` | List campaigns with multi-filters & match scores | Bearer Token |
| `GET` | `/api/campaigns/:id` | Get campaign details & match breakdown | Bearer Token |
| `POST` | `/api/campaigns` | Create new campaign | Brand / Admin |
| `PUT` | `/api/campaigns/:id` | Update existing campaign | Brand / Admin |
| `DELETE` | `/api/campaigns/:id` | Delete campaign | Brand / Admin |
| `POST` | `/api/applications/apply` | Submit creator application to campaign | Influencer |
| `GET` | `/api/applications/campaign/:id` | View all applicants for a campaign | Brand / Admin |
| `PUT` | `/api/applications/:id/status` | Update applicant status (accepted/rejected/shortlist) | Brand / Admin |
| `GET` | `/api/matches/influencer` | Get tailored recommended campaigns for creator | Influencer |
| `GET` | `/api/chats/conversations` | Get active collaboration chat channels | Bearer Token |
| `GET` | `/api/chats/messages/:chatId` | Fetch messages for active chat | Bearer Token |
| `POST` | `/api/chats/messages` | Send chat message or image attachment | Bearer Token |
| `GET` | `/api/admin/stats` | Fetch system-wide platform statistics | Admin |
| `PUT` | `/api/admin/users/:id/ban` | Toggle user ban state | Admin |
| `PUT` | `/api/admin/verify/:id` | Grant or revoke verification badge | Admin |

---

## 🔒 Firebase Integration & Dual-Mode Store

The server supports two runtime execution modes:
1. **Live Firebase Mode**: Uses `firebase-admin` with Google service account credentials configured via `.env`.
2. **Seamless Fallback Mode**: When Firebase environment keys are omitted, the backend automatically uses an in-memory/JSON store pre-seeded with realistic initial data (`seedData.js`). This allows the app to be run immediately out-of-the-box with zero cloud key setup required!

---

## ⚙️ Setup & Installation Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/AkshatsGit/cc.git
cd cc
npm run install:all
```

### 2. Start Backend Server
```bash
cd server
npm start
# Server listens on http://localhost:5001
```

### 3. Start Frontend Client
```bash
cd client
npm run dev
# React Vite app runs on http://localhost:3000
```

---

## 🔑 Demo Account Presets

You can instantly test all user role features by using the **Demo Role Quick Switcher** buttons in the navbar header:

| Role | Demo Email | Name | Key Access Features |
| :--- | :--- | :--- | :--- |
| **Brand** | `collabs@techpulse.com` | TechPulse Gear | Campaign CRUD, Applicant Kanban, Recharts Analytics |
| **Influencer** | `alex.tech@creators.com` | Alex Rivera (988K Followers) | AI Recommendations, Proposals, Rate Card, Chat |
| **Admin** | `admin@creatorcart.com` | CreatorCart Admin | User Bans, Verification Badges, Moderation Panel |

---

## 📄 License
This project is released under the **MIT License**.
