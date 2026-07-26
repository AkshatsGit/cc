import {
  seedUsers,
  seedBrands,
  seedInfluencers,
  seedCampaigns,
  seedApplications,
  seedMessages,
  seedNotifications
} from '../utils/seedData';

class ClientStorageService {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('cc_users')) || seedUsers;
    this.brands = JSON.parse(localStorage.getItem('cc_brands')) || seedBrands;
    this.influencers = JSON.parse(localStorage.getItem('cc_influencers')) || seedInfluencers;
    this.campaigns = JSON.parse(localStorage.getItem('cc_campaigns')) || seedCampaigns;
    this.applications = JSON.parse(localStorage.getItem('cc_applications')) || seedApplications;
    this.messages = JSON.parse(localStorage.getItem('cc_messages')) || seedMessages;
    this.notifications = JSON.parse(localStorage.getItem('cc_notifications')) || seedNotifications;
    this.bookmarks = JSON.parse(localStorage.getItem('cc_bookmarks')) || [];
  }

  save() {
    localStorage.setItem('cc_users', JSON.stringify(this.users));
    localStorage.setItem('cc_brands', JSON.stringify(this.brands));
    localStorage.setItem('cc_influencers', JSON.stringify(this.influencers));
    localStorage.setItem('cc_campaigns', JSON.stringify(this.campaigns));
    localStorage.setItem('cc_applications', JSON.stringify(this.applications));
    localStorage.setItem('cc_messages', JSON.stringify(this.messages));
    localStorage.setItem('cc_notifications', JSON.stringify(this.notifications));
    localStorage.setItem('cc_bookmarks', JSON.stringify(this.bookmarks));
  }

  // Users & Auth
  getUserById(id) {
    return this.users.find(u => u.id === id || u.uid === id);
  }

  login(email, role = 'influencer') {
    let user = this.users.find(u => u.email?.toLowerCase() === email?.toLowerCase());
    if (!user) {
      user = {
        id: `user_${Date.now()}`,
        uid: `uid_${Date.now()}`,
        email,
        name: email.split('@')[0],
        role,
        avatar: role === 'brand' ? '/sunscreen-campaign.png' : '/genz-creator.png',
        verified: true,
        createdAt: new Date().toISOString()
      };
      this.users.push(user);
    } else if (role && user.role !== role) {
      user.role = role;
    }
    this.save();

    let profile = user.role === 'brand' ? this.getBrandById(user.id) : this.getInfluencerById(user.id);
    return { user, profile };
  }

  // Brands
  getBrandById(id) {
    return this.brands.find(b => b.id === id || b.userId === id) || this.brands[0];
  }

  updateBrand(userId, data) {
    const idx = this.brands.findIndex(b => b.userId === userId || b.id === userId);
    if (idx !== -1) {
      this.brands[idx] = { ...this.brands[idx], ...data };
    } else {
      this.brands.push({ id: userId, userId, ...data });
    }
    this.save();
    return this.getBrandById(userId);
  }

  // Influencers
  getInfluencerById(id) {
    return this.influencers.find(i => i.id === id || i.userId === id) || this.influencers[0];
  }

  updateInfluencer(userId, data) {
    const idx = this.influencers.findIndex(i => i.id === userId || i.userId === userId);
    if (idx !== -1) {
      this.influencers[idx] = { ...this.influencers[idx], ...data };
    } else {
      this.influencers.push({ id: userId, userId, ...data });
    }
    this.save();
    return this.getInfluencerById(userId);
  }

  // Campaigns
  getCampaigns(filters = {}) {
    let list = [...this.campaigns];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    }
    if (filters.category && filters.category !== 'All') {
      list = list.filter(c => c.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.brandId) {
      list = list.filter(c => c.brandId === filters.brandId);
    }
    return list;
  }

  getCampaignById(id) {
    return this.campaigns.find(c => c.id === id) || this.campaigns[0];
  }

  createCampaign(data, user) {
    const brand = this.getBrandById(user.id);
    const newCamp = {
      id: `camp_${Date.now()}`,
      brandId: user.id,
      brandName: brand?.companyName || user.name,
      brandLogo: brand?.logo || user.avatar,
      title: data.title,
      description: data.description,
      category: data.category || 'Beauty & Skincare',
      budget: Number(data.budget) || 1500,
      requiredFollowers: Number(data.requiredFollowers) || 25000,
      targetAudience: data.targetAudience || 'Gen Z (18-24 y/o)',
      preferredPlatform: data.preferredPlatform || 'TikTok',
      deliverables: Array.isArray(data.deliverables) ? data.deliverables : [data.deliverables],
      deadline: data.deadline || '2026-08-30',
      location: data.location || 'United States',
      tags: data.tags || ['GenZ', 'Sunscreen'],
      status: 'active',
      applicationsCount: 0,
      createdAt: new Date().toISOString()
    };
    this.campaigns.unshift(newCamp);
    this.save();
    return newCamp;
  }

  deleteCampaign(id) {
    this.campaigns = this.campaigns.filter(c => c.id !== id);
    this.save();
  }

  // Applications
  getApplications(filters = {}) {
    let list = [...this.applications];
    if (filters.campaignId) {
      list = list.filter(a => a.campaignId === filters.campaignId);
    }
    if (filters.influencerId) {
      list = list.filter(a => a.influencerId === filters.influencerId);
    }
    return list;
  }

  applyToCampaign(data, user) {
    const inf = this.getInfluencerById(user.id);
    const existing = this.applications.find(a => a.campaignId === data.campaignId && a.influencerId === user.id);
    if (existing) return { existing: true, application: existing };

    const newApp = {
      id: `app_${Date.now()}`,
      campaignId: data.campaignId,
      influencerId: user.id,
      influencerName: inf?.fullName || user.name,
      influencerAvatar: user.avatar,
      influencerHandle: inf?.socialMedia?.tiktok?.handle || `@${inf?.username || 'creator'}`,
      pitch: data.pitch,
      proposedRate: Number(data.proposedRate) || 1500,
      deliverablesProposed: data.deliverablesProposed || '1 TikTok GRWM + 2 Stories',
      status: 'pending',
      matchScore: 98,
      matchReasons: ['88% Gen Z Audience Overlap', 'High Engagement Rate', 'Niche Fit'],
      createdAt: new Date().toISOString()
    };

    this.applications.unshift(newApp);
    const camp = this.getCampaignById(data.campaignId);
    if (camp) camp.applicationsCount = (camp.applicationsCount || 0) + 1;
    this.save();
    return { existing: false, application: newApp };
  }

  updateApplicationStatus(id, status) {
    const app = this.applications.find(a => a.id === id);
    if (app) {
      app.status = status;
      this.save();
    }
    return app;
  }

  // Messages
  getMessages(chatId) {
    return this.messages.filter(m => m.chatId === chatId);
  }

  sendMessage(data, senderUser) {
    const newMsg = {
      id: `msg_${Date.now()}`,
      chatId: data.chatId,
      campaignId: data.campaignId,
      senderId: senderUser.id,
      receiverId: data.receiverId,
      text: data.text,
      image: data.image || null,
      read: false,
      createdAt: new Date().toISOString()
    };
    this.messages.push(newMsg);
    this.save();
    return newMsg;
  }

  // Notifications
  getNotifications(userId) {
    return this.notifications.filter(n => n.userId === userId);
  }

  markNotificationsRead(userId) {
    this.notifications.forEach(n => { if (n.userId === userId) n.read = true; });
    this.save();
  }

  // Bookmarks
  toggleBookmark(userId, campaignId) {
    const idx = this.bookmarks.findIndex(b => b.userId === userId && b.campaignId === campaignId);
    if (idx !== -1) {
      this.bookmarks.splice(idx, 1);
      this.save();
      return false;
    } else {
      this.bookmarks.push({ userId, campaignId });
      this.save();
      return true;
    }
  }
}

export const clientStore = new ClientStorageService();
