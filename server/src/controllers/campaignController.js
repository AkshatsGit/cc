import { store } from '../services/storeService.js';
import { calculateMatchScore } from '../services/recommendationEngine.js';

export async function getCampaigns(req, res, next) {
  try {
    const filters = {
      category: req.query.category,
      platform: req.query.platform,
      minFollowers: req.query.minFollowers,
      minBudget: req.query.minBudget,
      status: req.query.status || 'active',
      search: req.query.search,
      sortBy: req.query.sortBy || 'newest',
      brandId: req.query.brandId
    };

    let campaigns = store.getCampaigns(filters);

    // If influencer is logged in, attach match scores
    if (req.user && req.user.role === 'influencer') {
      const influencer = store.getInfluencerById(req.user.id);
      if (influencer) {
        const myApps = store.getApplications({ influencerId: influencer.id }).map(a => a.campaignId);
        campaigns = campaigns.map(c => {
          const { score, reasons } = calculateMatchScore(c, influencer);
          return {
            ...c,
            matchScore: score,
            matchReasons: reasons,
            hasApplied: myApps.includes(c.id)
          };
        });

        if (filters.sortBy === 'highest_match') {
          campaigns.sort((a, b) => b.matchScore - a.matchScore);
        }
      }
    }

    return res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns
    });
  } catch (error) {
    next(error);
  }
}

export async function getCampaignById(req, res, next) {
  try {
    const { id } = req.params;
    const campaign = store.getCampaignById(id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    let matchInfo = null;
    let hasApplied = false;

    if (req.user && req.user.role === 'influencer') {
      const influencer = store.getInfluencerById(req.user.id);
      if (influencer) {
        matchInfo = calculateMatchScore(campaign, influencer);
        const myApps = store.getApplications({ campaignId: id, influencerId: influencer.id });
        hasApplied = myApps.length > 0;
      }
    }

    const brand = store.getBrandById(campaign.brandId) || { companyName: campaign.brandName, logo: campaign.brandLogo };

    return res.status(200).json({
      success: true,
      campaign,
      brand,
      matchInfo,
      hasApplied
    });
  } catch (error) {
    next(error);
  }
}

export async function createCampaign(req, res, next) {
  try {
    const brandId = req.user.id;
    const brand = store.getBrandById(brandId);
    const campaignData = {
      ...req.body,
      brandId,
      brandName: brand?.companyName || req.user.name,
      brandLogo: brand?.logo || req.user.avatar
    };

    const campaign = store.createCampaign(campaignData);
    return res.status(201).json({ success: true, message: 'Campaign created successfully', campaign });
  } catch (error) {
    next(error);
  }
}

export async function updateCampaign(req, res, next) {
  try {
    const { id } = req.params;
    const campaign = store.getCampaignById(id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    if (campaign.brandId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this campaign' });
    }

    const updated = store.updateCampaign(id, req.body);
    return res.status(200).json({ success: true, message: 'Campaign updated', campaign: updated });
  } catch (error) {
    next(error);
  }
}

export async function deleteCampaign(req, res, next) {
  try {
    const { id } = req.params;
    const campaign = store.getCampaignById(id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    if (campaign.brandId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this campaign' });
    }

    store.deleteCampaign(id);
    return res.status(200).json({ success: true, message: 'Campaign deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function toggleBookmark(req, res, next) {
  try {
    const userId = req.user.id;
    const { campaignId } = req.body;
    const result = store.toggleBookmark(userId, campaignId);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

export async function getBookmarks(req, res, next) {
  try {
    const userId = req.user.id;
    const bookmarks = store.getUserBookmarks(userId);
    return res.status(200).json({ success: true, bookmarks });
  } catch (error) {
    next(error);
  }
}
