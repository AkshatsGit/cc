// Client-Side Native Dataset for CreatorCart College Project

export const seedUsers = [
  {
    id: "user_brand_1",
    uid: "brand_aura_1",
    email: "collabs@auraskincare.com",
    name: "Aura Skincare",
    role: "brand",
    avatar: "/sunscreen-campaign.png",
    verified: true,
    createdAt: "2026-01-15T08:00:00.000Z"
  },
  {
    id: "user_influencer_1",
    uid: "inf_mia_1",
    email: "mia@creators.com",
    name: "Mia Chen",
    role: "influencer",
    avatar: "/genz-creator.png",
    verified: true,
    createdAt: "2026-01-10T11:00:00.000Z"
  },
  {
    id: "user_admin_1",
    uid: "admin_super_1",
    email: "admin@creatorcart.com",
    name: "Project Admin",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: "2026-01-01T00:00:00.000Z"
  }
];

export const seedBrands = [
  {
    id: "brand_aura_1",
    userId: "user_brand_1",
    companyName: "Aura Skincare",
    logo: "/sunscreen-campaign.png",
    industry: "Skincare & Sun Care",
    website: "https://auraskincare.com",
    about: "Aura formulates non-greasy, invisible SPF 50 daily sunscreen with Hyaluronic Acid & Niacinamide tailored for Gen Z skin types.",
    contactPerson: "Elena Vance",
    email: "collabs@auraskincare.com",
    phone: "+1 (555) 382-9921",
    location: "Los Angeles, CA",
    verified: true
  }
];

export const seedInfluencers = [
  {
    id: "inf_mia_1",
    userId: "user_influencer_1",
    fullName: "Mia Chen",
    username: "miaglows",
    bio: "Gen Z morning skincare GRWMs & honest SPF reviews. 88% Gen Z audience (18-24 y/o).",
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
      genzPercent: 88
    },
    portfolio: [
      {
        id: "p1",
        title: "Summer Morning Glow GRWM",
        type: "video",
        thumbnail: "/genz-creator.png",
        brandName: "Summer Fridays"
      }
    ],
    pricing: {
      story: 350,
      reel: 1100,
      post: 750,
      shorts: 900,
      dedicatedVideo: 2400
    }
  }
];

export const seedCampaigns = [
  {
    id: "camp_sunscreen_1",
    brandId: "brand_aura_1",
    brandName: "Aura Skincare",
    brandLogo: "/sunscreen-campaign.png",
    title: "Aura SPF 50 Daily Sunscreen GenZ TikTok Launch",
    description: "We're looking for a Gen Z creator in the Beauty & Skincare niche to test our lightweight SPF 50 sunscreen. Create a 30-60 second 'Get Ready With Me' (GRWM) video showing product application, finish (no white cast), and daily wearability.",
    category: "Beauty & Skincare",
    budget: 1800,
    requiredFollowers: 25000,
    targetAudience: "Gen Z (18-24 y/o)",
    preferredPlatform: "TikTok",
    deliverables: [
      "1 TikTok GRWM video (30-60s) demonstrating sunscreen application",
      "2 Instagram Stories with product link & tag",
      "Usage rights for digital ads"
    ],
    deadline: "2026-08-30",
    location: "United States",
    tags: ["GenZ", "Sunscreen", "SPF50", "Skincare", "TikTokGRWM"],
    status: "active",
    applicationsCount: 2,
    createdAt: "2026-07-20T10:00:00.000Z"
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
    pitch: "Hi Aura team! I use SPF daily and 88% of my 320k TikTok followers are Gen Z skincare lovers. I'd love to make an aesthetic GRWM applying the SPF 50 sunscreen with a glowing skin finish!",
    proposedRate: 1800,
    deliverablesProposed: "1 TikTok GRWM Video + 2 Instagram Stories + Raw 4K Video Footage",
    status: "accepted",
    matchScore: 98,
    matchReasons: ["88% Gen Z Audience Overlap", "High Engagement Rate (5.8%)", "Beauty Niche Fit"],
    createdAt: "2026-07-22T14:20:00.000Z"
  }
];

export const seedMessages = [
  {
    id: "msg_1",
    chatId: "chat_camp_sunscreen_1_inf_mia_1",
    campaignId: "camp_sunscreen_1",
    senderId: "brand_aura_1",
    receiverId: "inf_mia_1",
    text: "Hi Mia! We loved your profile and GRWM videos. Your Gen Z audience reach is perfect for our Aura SPF 50 launch!",
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
    text: "Thanks so much Elena! Excited to test the formula. Where should I send my shipping address for the product package?",
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
    text: "You can send it right here in chat! Sending your Aura SPF sample box today.",
    image: "/sunscreen-campaign.png",
    read: false,
    createdAt: "2026-07-23T09:40:00.000Z"
  }
];

export const seedNotifications = [
  {
    id: "notif_1",
    userId: "inf_mia_1",
    title: "Application Accepted!",
    message: "Aura Skincare accepted your application for Aura SPF 50 Daily Sunscreen GenZ TikTok Campaign.",
    type: "application_accepted",
    link: "/messages",
    read: false,
    createdAt: "2026-07-23T09:10:00.000Z"
  }
];
