import {
  seedUsers,
  seedBrands,
  seedInfluencers,
  seedCampaigns,
  seedApplications,
  seedMessages,
  seedNotifications,
  seedReports
} from '../utils/seedData.js';

class StoreService {
  constructor() {
    this.users = [...seedUsers];
    this.brands = [...seedBrands];
    this.influencers = [...seedInfluencers];
    this.campaigns = [...seedCampaigns];
    this.applications = [...seedApplications];
    this.messages = [...seedMessages];
    this.notifications = [...seedNotifications];
    this.reports = [...seedReports];
    this.bookmarks = [];
  }

  // --- Users ---
  getUsers() { return this.users; }
  getUserById(id) { return this.users.find(u => u.id === id || u.uid === id); }
  getUserByEmail(email) { return this.users.find(u => u.email?.toLowerCase() === email?.toLowerCase()); }
  createUser(userData) {
    const newUser = {
      id: userData.id || `user_${Date.now()}`,
      uid: userData.uid || userData.id || `uid_${Date.now()}`,
      email: userData.email,
      name: userData.name || userData.email.split('@')[0],
      role: userData.role || 'influencer',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: userData.verified || false,
      banned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const idx = this.users.findIndex(u => u.id === id || u.uid === id);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...updates, updatedAt: new Date().toISOString() };
      return this.users[idx];
    }
    return null;
  }

  // --- Brands ---
  getBrands() { return this.brands; }
  getBrandById(id) { return this.brands.find(b => b.id === id || b.userId === id); }
  createOrUpdateBrand(brandData) {
    const idx = this.brands.findIndex(b => b.id === brandData.id || b.userId === brandData.userId);
    if (idx !== -1) {
      this.brands[idx] = { ...this.brands[idx], ...brandData, updatedAt: new Date().toISOString() };
      return this.brands[idx];
    } else {
      const newBrand = {
        id: brandData.id || brandData.userId || `brand_${Date.now()}`,
        userId: brandData.userId || brandData.id,
        companyName: brandData.companyName || 'My Brand',
        logo: brandData.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        industry: brandData.industry || 'Marketing',
        website: brandData.website || '',
        about: brandData.about || '',
        contactPerson: brandData.contactPerson || '',
        email: brandData.email || '',
        phone: brandData.phone || '',
        location: brandData.location || 'Remote',
        verified: brandData.verified || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.brands.push(newBrand);
      return newBrand;
    }
  }

  // --- Influencers ---
  getInfluencers() { return this.influencers; }
  getInfluencerById(id) { return this.influencers.find(i => i.id === id || i.userId === id); }
  createOrUpdateInfluencer(influencerData) {
    const idx = this.influencers.findIndex(i => i.id === influencerData.id || i.userId === influencerData.userId);
    if (idx !== -1) {
      this.influencers[idx] = { ...this.influencers[idx], ...influencerData, updatedAt: new Date().toISOString() };
      return this.influencers[idx];
    } else {
      const newInfluencer = {
        id: influencerData.id || influencerData.userId || `inf_${Date.now()}`,
        userId: influencerData.userId || influencerData.id,
        fullName: influencerData.fullName || 'Creator',
        username: influencerData.username || 'creator',
        bio: influencerData.bio || 'Digital Creator',
        niche: influencerData.niche || 'Lifestyle',
        country: influencerData.country || 'United States',
        languages: influencerData.languages || ['English'],
        verified: influencerData.verified || false,
        socialMedia: influencerData.socialMedia || {
          instagram: { handle: '', followers: 0, link: '' },
          youtube: { handle: '', subscribers: 0, link: '' },
          tiktok: { handle: '', followers: 0, link: '' },
          facebook: { handle: '', followers: 0, link: '' },
          linkedIn: { handle: '', followers: 0, link: '' }
        },
        metrics: influencerData.metrics || { totalFollowers: 10000, averageReach: 3000, engagementRate: 3.5, averageViews: 2000 },
        portfolio: influencerData.portfolio || [],
        pricing: influencerData.pricing || { story: 100, reel: 300, post: 200, shorts: 250, dedicatedVideo: 800 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.influencers.push(newInfluencer);
      return newInfluencer;
    }
  }

  // --- Campaigns ---
  getCampaigns(filters = {}) {
    let result = [...this.campaigns];
    if (filters.category && filters.category !== 'All') {
      result = result.filter(c => c.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.platform && filters.platform !== 'All') {
      result = result.filter(c => c.preferredPlatform.toLowerCase() === filters.platform.toLowerCase());
    }
    if (filters.minFollowers) {
      result = result.filter(c => (c.requiredFollowers || 0) <= parseInt(filters.minFollowers));
    }
    if (filters.minBudget) {
      result = result.filter(c => c.budget >= parseInt(filters.minBudget));
    }
    if (filters.status) {
      result = result.filter(c => c.status === filters.status);
    }
    if (filters.brandId) {
      result = result.filter(c => c.brandId === filters.brandId || c.createdBy === filters.brandId);
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s) || c.category.toLowerCase().includes(s));
    }

    // Sort
    if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === 'budget_high') {
      result.sort((a, b) => b.budget - a.budget);
    } else if (filters.sortBy === 'followers_high') {
      result.sort((a, b) => b.requiredFollowers - a.requiredFollowers);
    }

    return result;
  }

  getCampaignById(id) {
    return this.campaigns.find(c => c.id === id);
  }

  createCampaign(campaignData) {
    const newCamp = {
      id: `camp_${Date.now()}`,
      brandId: campaignData.brandId,
      brandName: campaignData.brandName || 'Brand',
      brandLogo: campaignData.brandLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      title: campaignData.title,
      description: campaignData.description,
      category: campaignData.category || 'General',
      budget: Number(campaignData.budget) || 1000,
      requiredFollowers: Number(campaignData.requiredFollowers) || 10000,
      preferredPlatform: campaignData.preferredPlatform || 'Instagram',
      deliverables: Array.isArray(campaignData.deliverables) ? campaignData.deliverables : [campaignData.deliverables],
      deadline: campaignData.deadline || '2026-12-31',
      location: campaignData.location || 'Global',
      tags: campaignData.tags || [],
      status: 'active',
      applicationsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: campaignData.createdBy || campaignData.brandId
    };
    this.campaigns.unshift(newCamp);
    return newCamp;
  }

  updateCampaign(id, updates) {
    const idx = this.campaigns.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.campaigns[idx] = { ...this.campaigns[idx], ...updates, updatedAt: new Date().toISOString() };
      return this.campaigns[idx];
    }
    return null;
  }

  deleteCampaign(id) {
    const initialLen = this.campaigns.length;
    this.campaigns = this.campaigns.filter(c => c.id !== id);
    return this.campaigns.length < initialLen;
  }

  // --- Applications ---
  getApplications(filters = {}) {
    let result = [...this.applications];
    if (filters.campaignId) {
      result = result.filter(a => a.campaignId === filters.campaignId);
    }
    if (filters.influencerId) {
      result = result.filter(a => a.influencerId === filters.influencerId);
    }
    if (filters.status) {
      result = result.filter(a => a.status === filters.status);
    }
    return result;
  }

  getApplicationById(id) {
    return this.applications.find(a => a.id === id);
  }

  createApplication(appData) {
    // Check if already applied
    const existing = this.applications.find(a => a.campaignId === appData.campaignId && a.influencerId === appData.influencerId);
    if (existing) {
      return { existing: true, application: existing };
    }

    const newApp = {
      id: `app_${Date.now()}`,
      campaignId: appData.campaignId,
      influencerId: appData.influencerId,
      influencerName: appData.influencerName || 'Influencer',
      influencerAvatar: appData.influencerAvatar || '',
      influencerHandle: appData.influencerHandle || '',
      pitch: appData.pitch || '',
      proposedRate: Number(appData.proposedRate) || 0,
      deliverablesProposed: appData.deliverablesProposed || '',
      status: 'pending',
      matchScore: appData.matchScore || 85,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.applications.unshift(newApp);

    // Update campaign app count
    const camp = this.getCampaignById(appData.campaignId);
    if (camp) {
      camp.applicationsCount = (camp.applicationsCount || 0) + 1;
    }

    return { existing: false, application: newApp };
  }

  updateApplicationStatus(id, status) {
    const idx = this.applications.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.applications[idx].status = status;
      this.applications[idx].updatedAt = new Date().toISOString();
      return this.applications[idx];
    }
    return null;
  }

  withdrawApplication(id) {
    const app = this.getApplicationById(id);
    if (app) {
      this.applications = this.applications.filter(a => a.id !== id);
      const camp = this.getCampaignById(app.campaignId);
      if (camp && camp.applicationsCount > 0) {
        camp.applicationsCount -= 1;
      }
      return true;
    }
    return false;
  }

  // --- Messages ---
  getMessages(chatId) {
    return this.messages.filter(m => m.chatId === chatId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  createMessage(msgData) {
    const newMsg = {
      id: `msg_${Date.now()}`,
      chatId: msgData.chatId,
      campaignId: msgData.campaignId,
      senderId: msgData.senderId,
      receiverId: msgData.receiverId,
      text: msgData.text || '',
      image: msgData.image || null,
      read: false,
      createdAt: new Date().toISOString()
    };
    this.messages.push(newMsg);
    return newMsg;
  }

  markMessagesAsRead(chatId, userId) {
    this.messages.forEach(m => {
      if (m.chatId === chatId && m.receiverId === userId) {
        m.read = true;
      }
    });
  }

  // --- Notifications ---
  getNotifications(userId) {
    return this.notifications.filter(n => n.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createNotification(notifData) {
    const newNotif = {
      id: `notif_${Date.now()}`,
      userId: notifData.userId,
      title: notifData.title,
      message: notifData.message,
      type: notifData.type || 'info',
      link: notifData.link || '',
      read: false,
      createdAt: new Date().toISOString()
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }

  markNotificationsRead(userId) {
    this.notifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true;
      }
    });
  }

  // --- Bookmarks ---
  toggleBookmark(userId, campaignId) {
    const idx = this.bookmarks.findIndex(b => b.userId === userId && b.campaignId === campaignId);
    if (idx !== -1) {
      this.bookmarks.splice(idx, 1);
      return { bookmarked: false };
    } else {
      this.bookmarks.push({ userId, campaignId, createdAt: new Date().toISOString() });
      return { bookmarked: true };
    }
  }

  getUserBookmarks(userId) {
    const campaignIds = this.bookmarks.filter(b => b.userId === userId).map(b => b.campaignId);
    return this.campaigns.filter(c => campaignIds.includes(c.id));
  }

  // --- Reports ---
  getReports() { return this.reports; }
  createReport(reportData) {
    const newRep = {
      id: `rep_${Date.now()}`,
      reporterId: reportData.reporterId,
      reporterName: reportData.reporterName || 'User',
      targetType: reportData.targetType,
      targetId: reportData.targetId,
      targetTitle: reportData.targetTitle || '',
      reason: reportData.reason || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.reports.unshift(newRep);
    return newRep;
  }

  updateReportStatus(id, status) {
    const idx = this.reports.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.reports[idx].status = status;
      return this.reports[idx];
    }
    return null;
  }
}

export const store = new StoreService();
