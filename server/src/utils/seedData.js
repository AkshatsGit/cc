// Seed Data for Creator Cart Backend & In-Memory Store Fallback

export const seedUsers = [
  {
    id: "user_brand_1",
    uid: "brand_tech_1",
    email: "collabs@techpulse.com",
    name: "TechPulse Gear",
    role: "brand",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-07-20T10:00:00.000Z"
  },
  {
    id: "user_brand_2",
    uid: "brand_glow_2",
    email: "partner@glowskin.io",
    name: "Glow & Co. Beauty",
    role: "brand",
    avatar: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: "2026-02-01T09:30:00.000Z",
    updatedAt: "2026-07-22T14:15:00.000Z"
  },
  {
    id: "user_influencer_1",
    uid: "inf_alex_1",
    email: "alex.tech@creators.com",
    name: "Alex Rivera",
    role: "influencer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: "2026-01-10T11:00:00.000Z",
    updatedAt: "2026-07-25T16:00:00.000Z"
  },
  {
    id: "user_influencer_2",
    uid: "inf_sophia_2",
    email: "sophia.fits@creators.com",
    name: "Sophia Vance",
    role: "influencer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: "2026-02-15T12:00:00.000Z",
    updatedAt: "2026-07-24T18:30:00.000Z"
  },
  {
    id: "user_admin_1",
    uid: "admin_super_1",
    email: "admin@creatorcart.com",
    name: "CreatorCart Admin",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-07-26T00:00:00.000Z"
  }
];

export const seedBrands = [
  {
    id: "brand_tech_1",
    userId: "user_brand_1",
    companyName: "TechPulse Gear",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    industry: "Consumer Electronics & Gadgets",
    website: "https://techpulsegear.example.com",
    about: "TechPulse creates premium minimalist wireless accessories, smart desk setups, and audio gear for digital creators.",
    contactPerson: "Elena Rostova",
    email: "collabs@techpulse.com",
    phone: "+1 (555) 382-9921",
    location: "San Francisco, CA, USA",
    verified: true,
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-07-20T10:00:00.000Z"
  },
  {
    id: "brand_glow_2",
    userId: "user_brand_2",
    companyName: "Glow & Co. Beauty",
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80",
    industry: "Skincare & Cosmetics",
    website: "https://glowskin.example.com",
    about: "Clean, vegan skincare formulations backed by botanical science and sustainable zero-waste packaging.",
    contactPerson: "Marcus Vance",
    email: "partner@glowskin.io",
    phone: "+1 (555) 948-2231",
    location: "New York, NY, USA",
    verified: true,
    createdAt: "2026-02-01T09:30:00.000Z",
    updatedAt: "2026-07-22T14:15:00.000Z"
  }
];

export const seedInfluencers = [
  {
    id: "inf_alex_1",
    userId: "user_influencer_1",
    fullName: "Alex Rivera",
    username: "alextech",
    bio: "Tech reviewer, desk setup enthusiast, and everyday EDC curator. Unboxing future tech every Tuesday & Friday.",
    niche: "Tech & Gadgets",
    country: "United States",
    languages: ["English", "Spanish"],
    verified: true,
    socialMedia: {
      instagram: { handle: "@alexrivera.tech", followers: 185000, link: "https://instagram.com" },
      youtube: { handle: "AlexRiveraTech", subscribers: 420000, link: "https://youtube.com" },
      tiktok: { handle: "@alexriveratech", followers: 310000, link: "https://tiktok.com" },
      facebook: { handle: "alexriveratech", followers: 45000, link: "https://facebook.com" },
      linkedIn: { handle: "alex-rivera-tech", followers: 28000, link: "https://linkedin.com" }
    },
    metrics: {
      totalFollowers: 988000,
      averageReach: 240000,
      engagementRate: 4.8,
      averageViews: 180000
    },
    portfolio: [
      {
        id: "p1",
        title: "Mechanical Keyboard Review with Keychron",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
        url: "https://youtube.com/watch?v=demo",
        brandName: "Keychron"
      },
      {
        id: "p2",
        title: "Ultimate 2026 Desk Setup Tour",
        type: "image",
        thumbnail: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
        url: "https://instagram.com/p/demo",
        brandName: "Grovemade"
      }
    ],
    pricing: {
      story: 450,
      reel: 1200,
      post: 850,
      shorts: 950,
      dedicatedVideo: 3200
    },
    createdAt: "2026-01-10T11:00:00.000Z",
    updatedAt: "2026-07-25T16:00:00.000Z"
  },
  {
    id: "inf_sophia_2",
    userId: "user_influencer_2",
    fullName: "Sophia Vance",
    username: "sophiawellness",
    bio: "Holistic wellness, aesthetic skincare, and daily mindful routines. Helping you glow from inside out ✨",
    niche: "Beauty & Skincare",
    country: "United States",
    languages: ["English"],
    verified: true,
    socialMedia: {
      instagram: { handle: "@sophia.vance", followers: 240000, link: "https://instagram.com" },
      youtube: { handle: "SophiaVanceGlow", subscribers: 110000, link: "https://youtube.com" },
      tiktok: { handle: "@sophia.wellness", followers: 520000, link: "https://tiktok.com" },
      facebook: { handle: "sophia.vance.official", followers: 15000, link: "https://facebook.com" },
      linkedIn: { handle: "sophia-vance", followers: 8000, link: "https://linkedin.com" }
    },
    metrics: {
      totalFollowers: 893000,
      averageReach: 310000,
      engagementRate: 5.6,
      averageViews: 290000
    },
    portfolio: [
      {
        id: "p3",
        title: "7-Day Glass Skin Transformation",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80",
        url: "https://tiktok.com/@demo",
        brandName: "Summer Fridays"
      }
    ],
    pricing: {
      story: 500,
      reel: 1400,
      post: 900,
      shorts: 1100,
      dedicatedVideo: 3500
    },
    createdAt: "2026-02-15T12:00:00.000Z",
    updatedAt: "2026-07-24T18:30:00.000Z"
  }
];

export const seedCampaigns = [
  {
    id: "camp_1",
    brandId: "brand_tech_1",
    brandName: "TechPulse Gear",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    title: "Launch Campaign: ANC Wireless Studio Headphones v2",
    description: "We are looking for tech, lifestyle, and music creators to showcase our newest active noise-canceling headphones. Deliverables include high-energy unboxings, sound test demos, and desk setup integration.",
    category: "Tech & Gadgets",
    budget: 2500,
    requiredFollowers: 50000,
    preferredPlatform: "Instagram",
    deliverables: ["1 Instagram Reel (60s)", "2 Instagram Stories with swipe-up/link", "1 High-res photo for brand usage"],
    deadline: "2026-08-30",
    location: "Global / Worldwide",
    tags: ["Tech", "Headphones", "Audio", "Unboxing", "Lifestyle"],
    status: "active", // active, paused, completed, closed
    applicationsCount: 8,
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-25T12:00:00.000Z",
    createdBy: "brand_tech_1"
  },
  {
    id: "camp_2",
    brandId: "brand_glow_2",
    brandName: "Glow & Co. Beauty",
    brandLogo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80",
    title: "Summer Hydration Glow Serum TikTok Challenge",
    description: "Promote our best-selling Hyaluronic Botanical Serum! Show your morning routine before/after transformation in a catchy 30-second TikTok video with trending audio.",
    category: "Beauty & Skincare",
    budget: 1800,
    requiredFollowers: 30000,
    preferredPlatform: "TikTok",
    deliverables: ["1 TikTok Video with brand hashtag", "3 TikTok Story updates", "Product feature review in bio link"],
    deadline: "2026-08-15",
    location: "United States, Canada",
    tags: ["Skincare", "TikTokChallenge", "GlowRoutine", "CleanBeauty"],
    status: "active",
    applicationsCount: 14,
    createdAt: "2026-07-10T14:30:00.000Z",
    updatedAt: "2026-07-24T09:00:00.000Z",
    createdBy: "brand_glow_2"
  },
  {
    id: "camp_3",
    brandId: "brand_tech_1",
    brandName: "TechPulse Gear",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    title: "YouTube Dedicated Video: Smart Ergonomic Desk Stand",
    description: "Full in-depth video review (8-10 minutes) highlighting our aluminum laptop stand & dual-monitor arm setup.",
    category: "Tech & Gadgets",
    budget: 4500,
    requiredFollowers: 100000,
    preferredPlatform: "YouTube",
    deliverables: ["1 Dedicated YouTube Video (8-12 min)", "Product placement link in top line of description"],
    deadline: "2026-09-10",
    location: "United States",
    tags: ["Workspace", "DeskSetup", "Ergonomics", "TechReview"],
    status: "active",
    applicationsCount: 5,
    createdAt: "2026-07-15T11:00:00.000Z",
    updatedAt: "2026-07-26T08:00:00.000Z",
    createdBy: "brand_tech_1"
  }
];

export const seedApplications = [
  {
    id: "app_1",
    campaignId: "camp_1",
    influencerId: "inf_alex_1",
    influencerName: "Alex Rivera",
    influencerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    influencerHandle: "@alexrivera.tech",
    pitch: "Hey TechPulse team! I've been following your ANC releases for months. My audience of 185k Instagram followers loves audio gear unboxings and my engagement rate is sitting strong at 4.8%. Would love to showcase these headphones in a sleek cinematic reel!",
    proposedRate: 2200,
    deliverablesProposed: "1 Cinematic Reel + 3 Instagram Stories + Raw 4K footage for brand ads",
    status: "accepted", // pending, accepted, rejected, shortlisted
    matchScore: 94,
    createdAt: "2026-07-05T15:20:00.000Z",
    updatedAt: "2026-07-06T09:10:00.000Z"
  },
  {
    id: "app_2",
    campaignId: "camp_2",
    influencerId: "inf_sophia_2",
    influencerName: "Sophia Vance",
    influencerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    influencerHandle: "@sophia.wellness",
    pitch: "Glow & Co skincare is right in my niche! My TikTok skin routine videos average 250k+ views. I can create an engaging morning glow transition video using the serum.",
    proposedRate: 1800,
    deliverablesProposed: "1 TikTok Video + 3 Stories + Bio Link for 14 days",
    status: "shortlisted",
    matchScore: 96,
    createdAt: "2026-07-12T16:45:00.000Z",
    updatedAt: "2026-07-14T11:30:00.000Z"
  }
];

export const seedMessages = [
  {
    id: "msg_1",
    chatId: "chat_camp1_alex",
    campaignId: "camp_1",
    senderId: "brand_tech_1",
    receiverId: "inf_alex_1",
    text: "Hi Alex! We loved your application for the ANC Studio Headphones campaign. Your previous Keychron reel was incredible!",
    image: null,
    read: true,
    createdAt: "2026-07-06T09:15:00.000Z"
  },
  {
    id: "msg_2",
    chatId: "chat_camp1_alex",
    campaignId: "camp_1",
    senderId: "inf_alex_1",
    receiverId: "brand_tech_1",
    text: "Thank you so much Elena! excited to get started. Where should I send the shipping details for the sample unit?",
    image: null,
    read: true,
    createdAt: "2026-07-06T09:30:00.000Z"
  },
  {
    id: "msg_3",
    chatId: "chat_camp1_alex",
    campaignId: "camp_1",
    senderId: "brand_tech_1",
    receiverId: "inf_alex_1",
    text: "Awesome! You can drop your address here. We'll send out the package with tracking today.",
    image: null,
    read: false,
    createdAt: "2026-07-06T09:40:00.000Z"
  }
];

export const seedNotifications = [
  {
    id: "notif_1",
    userId: "inf_alex_1",
    title: "Application Accepted! 🎉",
    message: "TechPulse Gear accepted your application for ANC Wireless Studio Headphones v2.",
    type: "application_accepted",
    link: "/messages",
    read: false,
    createdAt: "2026-07-06T09:10:00.000Z"
  },
  {
    id: "notif_2",
    userId: "brand_tech_1",
    title: "New Application Received",
    message: "Alex Rivera applied to campaign: Launch Campaign: ANC Wireless Studio Headphones v2",
    type: "new_application",
    link: "/brand/campaigns/camp_1/applicants",
    read: true,
    createdAt: "2026-07-05T15:20:00.000Z"
  }
];

export const seedReports = [
  {
    id: "rep_1",
    reporterId: "user_influencer_2",
    reporterName: "Sophia Vance",
    targetType: "campaign",
    targetId: "camp_fake_99",
    targetTitle: "Unverified Crypto Product Promotion",
    reason: "Suspicious non-verified external payment request outside platform guidelines",
    status: "pending",
    createdAt: "2026-07-20T14:00:00.000Z"
  }
];
