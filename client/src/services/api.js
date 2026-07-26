import { clientStore } from './clientService';

// Client-side simulated API wrapper (No external server needed)
const api = {
  get: async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('creatorcart_user')) || clientStore.getUserById('user_brand_1');

        if (url === '/auth/me') {
          const profile = user.role === 'brand' ? clientStore.getBrandById(user.id) : clientStore.getInfluencerById(user.id);
          resolve({ data: { success: true, user, profile } });
        } else if (url.startsWith('/brands/dashboard')) {
          const campaigns = clientStore.getCampaigns({ brandId: user.id });
          const applications = clientStore.getApplications();
          resolve({
            data: {
              success: true,
              stats: {
                activeCampaigns: campaigns.filter(c => c.status === 'active').length,
                totalCampaigns: campaigns.length,
                totalApplications: applications.length,
                selectedInfluencers: applications.filter(a => a.status === 'accepted').length
              },
              campaigns,
              recentApplications: applications.slice(0, 5)
            }
          });
        } else if (url.startsWith('/influencers/dashboard')) {
          const myApps = clientStore.getApplications({ influencerId: user.id });
          const activeCollabs = myApps.filter(a => a.status === 'accepted');
          const recs = clientStore.getCampaigns({ status: 'active' }).map(c => ({
            ...c,
            matchScore: 98,
            matchReasons: ['88% Gen Z Audience', 'High Engagement (5.8%)', 'Skincare Niche Fit'],
            hasApplied: myApps.some(a => a.campaignId === c.id)
          }));

          resolve({
            data: {
              success: true,
              stats: {
                appliedCount: myApps.length,
                activeCollabsCount: activeCollabs.length,
                totalEarnings: activeCollabs.reduce((sum, a) => sum + (a.proposedRate || 0), 0),
                recommendedCount: recs.length
              },
              recommendedCampaigns: recs,
              myApplications: myApps,
              activeCollaborations: activeCollabs
            }
          });
        } else if (url.startsWith('/campaigns?')) {
          const params = new URLSearchParams(url.split('?')[1]);
          const campaigns = clientStore.getCampaigns({
            search: params.get('search'),
            category: params.get('category')
          }).map(c => ({
            ...c,
            matchScore: 98,
            matchReasons: ['88% Gen Z Audience', 'High Engagement (5.8%)', 'Skincare Niche Fit']
          }));
          resolve({ data: { success: true, count: campaigns.length, campaigns } });
        } else if (url.startsWith('/campaigns/')) {
          const id = url.split('/campaigns/')[1];
          const campaign = clientStore.getCampaignById(id);
          const brand = clientStore.getBrandById(campaign.brandId);
          const myApps = clientStore.getApplications({ campaignId: id, influencerId: user.id });
          resolve({
            data: {
              success: true,
              campaign,
              brand,
              matchInfo: { score: 98, reasons: ['88% Gen Z Audience Overlap', 'High Engagement Rate', 'Niche Fit'] },
              hasApplied: myApps.length > 0
            }
          });
        } else if (url.startsWith('/applications/campaign/')) {
          const campId = url.split('/applications/campaign/')[1];
          const campaign = clientStore.getCampaignById(campId);
          const applications = clientStore.getApplications({ campaignId: campId });
          resolve({ data: { success: true, campaign, applications } });
        } else if (url === '/chats/conversations') {
          const apps = clientStore.getApplications({ status: 'accepted' });
          const conversations = apps.map(app => {
            const camp = clientStore.getCampaignById(app.campaignId);
            const brand = clientStore.getBrandById(camp?.brandId);
            const inf = clientStore.getInfluencerById(app.influencerId);
            const chatId = `chat_${app.campaignId}_${app.influencerId}`;
            const msgs = clientStore.getMessages(chatId);
            return {
              chatId,
              campaignId: app.campaignId,
              campaignTitle: camp?.title || 'Collaboration Chat',
              brand: { id: brand?.id, name: brand?.companyName || 'Aura Skincare', logo: brand?.logo || '/sunscreen-campaign.png' },
              influencer: { id: inf?.id, name: inf?.fullName || 'Mia Chen', avatar: inf?.avatar || '/genz-creator.png', handle: app.influencerHandle },
              lastMessage: msgs[msgs.length - 1] || null
            };
          });
          resolve({ data: { success: true, conversations } });
        } else if (url.startsWith('/chats/messages/')) {
          const chatId = url.split('/chats/messages/')[1];
          const messages = clientStore.getMessages(chatId);
          resolve({ data: { success: true, messages } });
        } else if (url === '/notifications') {
          const notifications = clientStore.getNotifications(user.id);
          resolve({ data: { success: true, notifications } });
        } else if (url === '/admin/stats') {
          const users = clientStore.users;
          const campaigns = clientStore.campaigns;
          resolve({
            data: {
              success: true,
              stats: {
                totalUsers: users.length,
                brandsCount: clientStore.brands.length,
                influencersCount: clientStore.influencers.length,
                totalCampaigns: campaigns.length,
                totalApplications: clientStore.applications.length
              },
              users,
              campaigns,
              reports: []
            }
          });
        } else if (url.startsWith('/brands/profile/')) {
          const id = url.split('/brands/profile/')[1];
          const brand = clientStore.getBrandById(id);
          resolve({ data: { success: true, brand } });
        } else if (url.startsWith('/influencers/profile/')) {
          const id = url.split('/influencers/profile/')[1];
          const influencer = clientStore.getInfluencerById(id);
          resolve({ data: { success: true, influencer } });
        } else {
          resolve({ data: { success: true } });
        }
      }, 50);
    });
  },

  post: async (url, body) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('creatorcart_user')) || clientStore.getUserById('user_brand_1');

        if (url === '/auth/login') {
          const result = clientStore.login(body.email, body.role);
          resolve({ data: { success: true, ...result, token: result.user.id } });
        } else if (url === '/campaigns') {
          const campaign = clientStore.createCampaign(body, user);
          resolve({ data: { success: true, campaign } });
        } else if (url === '/applications/apply') {
          const result = clientStore.applyToCampaign(body, user);
          resolve({ data: { success: true, ...result } });
        } else if (url === '/chats/messages') {
          const message = clientStore.sendMessage(body, user);
          resolve({ data: { success: true, message } });
        } else if (url === '/campaigns/bookmark') {
          const bookmarked = clientStore.toggleBookmark(user.id, body.campaignId);
          resolve({ data: { success: true, bookmarked } });
        } else {
          resolve({ data: { success: true } });
        }
      }, 50);
    });
  },

  put: async (url, body) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem('creatorcart_user')) || clientStore.getUserById('user_brand_1');

        if (url.startsWith('/applications/') && url.endsWith('/status')) {
          const id = url.split('/applications/')[1].split('/status')[0];
          const application = clientStore.updateApplicationStatus(id, body.status);
          resolve({ data: { success: true, application } });
        } else if (url === '/brands/profile') {
          const brand = clientStore.updateBrand(user.id, body);
          resolve({ data: { success: true, brand } });
        } else if (url === '/influencers/profile') {
          const influencer = clientStore.updateInfluencer(user.id, body);
          resolve({ data: { success: true, influencer } });
        } else if (url === '/notifications/read-all') {
          clientStore.markNotificationsRead(user.id);
          resolve({ data: { success: true } });
        } else {
          resolve({ data: { success: true } });
        }
      }, 50);
    });
  },

  delete: async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.startsWith('/campaigns/')) {
          const id = url.split('/campaigns/')[1];
          clientStore.deleteCampaign(id);
          resolve({ data: { success: true } });
        } else {
          resolve({ data: { success: true } });
        }
      }, 50);
    });
  }
};

export default api;
