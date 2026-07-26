// Minimalist Creator Cart Beta Seed Dataset

export const seedUsers = [
  {
    id: "user_brand_1",
    uid: "brand_aura_1",
    email: "collabs@auraskincare.com",
    name: "AURA Skincare",
    role: "brand",
    avatar: "/sunscreen-campaign.png",
    verified: true,
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-07-26T10:00:00.000Z"
  },
  {
    id: "user_influencer_1",
    uid: "inf_mia_1",
    email: "mia@creators.com",
    name: "Mia Chen",
    role: "influencer",
    avatar: "/genz-creator.png",
    verified: true,
    createdAt: "2026-01-10T11:00:00.000Z",
    updatedAt: "2026-07-26T10:00:00.000Z"
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
    id: "brand_aura_1",
    userId: "user_brand_1",
    companyName: "AURA Skincare",
    logo: "/sunscreen-campaign.png",
    industry: "GenZ Skincare & Sun Defense",
    website: "https://auraskincare.example.com",
    about: "AURA formulates clean, non-greasy SPF 50 daily sunscreen enriched with Hyaluronic Acid & Niacinamide designed specifically for Gen Z skin.",
    contactPerson: "Elena Vance",
    email: "collabs@auraskincare.com",
    phone: "+1 (555) 382-9921",
    location: "Los Angeles, CA",
    verified: true,
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-07-26T10:00:00.000Z"
  }
];

export const seedInfluencers = [
  {
    id: "inf_mia_1",
    userId: "user_influencer_1",
    fullName: "Mia Chen",
    username: "miaglows",
    bio: "Gen Z skincare routine GRWMs, sun protection tips, & aesthetic lifestyle. 88% Gen Z audience (18-24).",
    niche: "Beauty & Skincare",
    country: "United States",
    languages: ["English"],
    verified: true,
    socialMedia: {
      tiktok: { handle: "@miaglows", followers: 320000, link: "https://tiktok.com" },
      instagram: { handle: "@mia.glows", followers: 185000, link: "https://instagram.com" }
    },
    metrics: {
      totalFollowers: 505000,
      averageReach: 140000,
      engagementRate: 5.8,
      averageViews: 210000,
      genzAudiencePercent: 88
    },
    portfolio: [
      {
        id: "p1",
        title: "Summer Morning Glow Routine",
        type: "video",
        thumbnail: "/genz-creator.png",
        url: "https://tiktok.com/@demo",
        brandName: "Summer Fridays"
      }
    ],
    pricing: {
      story: 350,
      reel: 1100,
      post: 750,
      shorts: 900,
      dedicatedVideo: 2400
    },
    createdAt: "2026-01-10T11:00:00.000Z",
    updatedAt: "2026-07-26T10:00:00.000Z"
  }
];

export const seedCampaigns = [
  {
    id: "camp_sunscreen_1",
    brandId: "brand_aura_1",
    brandName: "AURA Skincare",
    brandLogo: "/sunscreen-campaign.png",
    title: "AURA SPF 50 Daily Sunscreen GenZ TikTok Campaign",
    description: "We are seeking a Gen Z Beauty & Skincare creator to showcase our new non-greasy SPF 50 Hydrating Daily Defense Sunscreen. Looking for authentic 'Get Ready With Me' (GRWM) TikToks and Reels demonstrating no white cast & glowing finish.",
    category: "Beauty & Skincare",
    budget: 1800,
    requiredFollowers: 30000,
    targetAudience: "GenZ (18-24 y/o)",
    preferredPlatform: "TikTok",
    deliverables: [
      "1 TikTok GRWM Video (30-60s) showing sunscreen application",
      "2 Instagram Stories with product tag & link",
      "Usage rights for digital ads"
    ],
    deadline: "2026-08-20",
    location: "United States",
    tags: ["GenZ", "Sunscreen", "SPF50", "Skincare", "TikTokGRWM"],
    status: "active",
    applicationsCount: 3,
    createdAt: "2026-07-20T10:00:00.000Z",
    updatedAt: "2026-07-26T10:00:00.000Z",
    createdBy: "brand_aura_1"
  }
];

export const seedApplications = [
  {
    id: "app_sunscreen_1",
    campaignId: "camp_sunscreen_1",
    influencerId: "inf_mia_1",
    influencerName: "Mia Chen",
    influencerAvatar: "/genz-creator.png",
    influencerHandle: "@miaglows",
    pitch: "Hey AURA team! I'm obsessed with lightweight SPF formulations. 88% of my 320k TikTok followers are Gen Z skincare enthusiasts who love non-greasy sunscreen recommendations. I can film a aesthetic beachside GRWM video demonstrating the invisible SPF 50 application!",
    proposedRate: 1800,
    deliverablesProposed: "1 TikTok GRWM Video + 2 Instagram Stories + Raw 4K footage",
    status: "accepted",
    matchScore: 98,
    matchReasons: ["88% Gen Z Audience Overlap", "High Engagement Rate (5.8%)", "Skincare Niche Fit"],
    createdAt: "2026-07-22T14:20:00.000Z",
    updatedAt: "2026-07-23T09:10:00.000Z"
  }
];

export const seedMessages = [
  {
    id: "msg_1",
    chatId: "chat_camp_sunscreen_1_inf_mia_1",
    campaignId: "camp_sunscreen_1",
    senderId: "brand_aura_1",
    receiverId: "inf_mia_1",
    text: "Hi Mia! We loved your profile and GRWM videos. Your Gen Z audience reach is exactly what we need for the AURA SPF 50 launch!",
    image: null,
    read: true,
    createdAt: "2026-07-23T09:15:00.000Z"
  },
  {
    id: "msg_2",
    chatId: "chat_camp_sunscreen_1_inf_mia_1",
    campaignId: "camp_sunscreen_1",
    senderId: "inf_mia_1",
    receiverId: "brand_aura_1",
    text: "Thank you so much! I'm super excited to try the SPF 50 formula. Where should I send my shipping address for the product package?",
    image: null,
    read: true,
    createdAt: "2026-07-23T09:30:00.000Z"
  },
  {
    id: "msg_3",
    chatId: "chat_camp_sunscreen_1_inf_mia_1",
    campaignId: "camp_sunscreen_1",
    senderId: "brand_aura_1",
    receiverId: "inf_mia_1",
    text: "You can drop it right here in chat! Sending out the AURA SPF sample kit today.",
    image: "/sunscreen-campaign.png",
    read: false,
    createdAt: "2026-07-23T09:40:00.000Z"
  }
];

export const seedNotifications = [
  {
    id: "notif_1",
    userId: "inf_mia_1",
    title: "Application Accepted! 🎉",
    message: "AURA Skincare accepted your application for AURA SPF 50 Daily Sunscreen GenZ TikTok Campaign.",
    type: "application_accepted",
    link: "/messages",
    read: false,
    createdAt: "2026-07-23T09:10:00.000Z"
  }
];

export const seedReports = [];
