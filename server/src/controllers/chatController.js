import { store } from '../services/storeService.js';

export async function getConversations(req, res, next) {
  try {
    const userId = req.user.id;
    // Get all accepted applications involving this user (either as brand or influencer)
    const apps = store.getApplications({ status: 'accepted' });
    const userRole = req.user.role;

    const conversations = apps.map(app => {
      const camp = store.getCampaignById(app.campaignId);
      const brand = store.getBrandById(camp?.brandId);
      const inf = store.getInfluencerById(app.influencerId);
      const chatId = `chat_${app.campaignId}_${app.influencerId}`;

      const msgs = store.getMessages(chatId);
      const lastMsg = msgs[msgs.length - 1] || null;

      return {
        chatId,
        campaignId: app.campaignId,
        campaignTitle: camp?.title || 'Collaboration Chat',
        brand: {
          id: brand?.id || camp?.brandId,
          name: brand?.companyName || camp?.brandName || 'Brand',
          logo: brand?.logo || camp?.brandLogo
        },
        influencer: {
          id: inf?.id || app.influencerId,
          name: inf?.fullName || app.influencerName,
          avatar: inf?.avatar || app.influencerAvatar,
          handle: app.influencerHandle
        },
        lastMessage: lastMsg,
        unreadCount: msgs.filter(m => m.receiverId === userId && !m.read).length
      };
    });

    return res.status(200).json({ success: true, conversations });
  } catch (error) {
    next(error);
  }
}

export async function getChatMessages(req, res, next) {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const messages = store.getMessages(chatId);
    store.markMessagesAsRead(chatId, userId);

    return res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    next(error);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { chatId, campaignId, receiverId, text, image } = req.body;
    const senderId = req.user.id;

    if (!chatId || (!text && !image)) {
      return res.status(400).json({ success: false, message: 'Message content or attachment required' });
    }

    const message = store.createMessage({
      chatId,
      campaignId,
      senderId,
      receiverId,
      text,
      image
    });

    // Notify receiver
    store.createNotification({
      userId: receiverId,
      title: 'New Message Received 💬',
      message: `${req.user.name}: "${text ? text.slice(0, 40) + '...' : 'Sent an attachment'}"`,
      type: 'new_message',
      link: '/messages'
    });

    return res.status(201).json({ success: true, message });
  } catch (error) {
    next(error);
  }
}
