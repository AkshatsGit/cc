# CreatorCart 🚀

> **CreatorCart** is a single-host React client application built for a college project that connects **Brands** with **Social Media Influencers** for targeted marketing collaborations. 

---

## ☀️ Core Use Case Showcase
1. **Brand Requirement**: Aura Skincare posts a requirement for a Gen Z creator (18-24 audience) for an SPF 50 Daily Sunscreen TikTok launch ($1,800 budget).
2. **Gen Z Audience Match**: Matching engine evaluates creator follower demographics and engagement rate, finding **Mia Chen (@miaglows)** with an **88% Gen Z audience ratio** and **98% match score**.
3. **Direct Collaboration**: Brand accepts application, exchanges product shipping address in direct chat, and reviews TikTok GRWM deliverables.

---

## 🛠 Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Lucide React icons
- **Data & Auth**: Firebase JS SDK + client-side state storage
- **Charts & Toast**: Recharts & React Hot Toast

---

## 🚀 How to Run & Host

```bash
# Install client dependencies
cd client
npm install

# Start local development server
npm run dev
```

### Build for Production / Hosting (Vercel / Netlify / Firebase Hosting)
```bash
# Build standalone static dist bundle
npm run build
```

---

## 🔑 Demo Account Quick Switcher
Use the navbar header buttons to switch between demo roles:
- **Brand Mode**: Aura Skincare (`collabs@auraskincare.com`)
- **Creator Mode**: Mia Chen (`mia@creators.com`)
- **Admin Mode**: Admin (`admin@creatorcart.com`)
