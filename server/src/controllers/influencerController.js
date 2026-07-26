import { store } from '../services/storeService.js';
import { calculateMatchScore } from '../services/recommendationEngine.js';

export async function getInfluencerProfile(req, res, next) {
  try {
    const { id } = req.params;
    const influencer = store.getInfluencerById(id);
    if (!influencer) {
      return res.status(404).json({ success: false, message: 'Influencer profile not found' });
    }
    return res.status(200).json({ success: true, influencer });
  } catch (error) {
    next(error);
  }
}

export async function updateInfluencerProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const updated = store.createOrUpdateInfluencer({ ...req.body, userId, id: userId });
    return res.status(200).json({ success: true, message: 'Influencer profile updated', influencer: updated });
  } catch (error) {
    next(error);
  }
}

export async function getInfluencerDashboard(req, res, next) {
  try {
    const userId = req.user.id;
    const influencer = store.getInfluencerById(userId) || store.getInfluencers()[0];

    const myApplications = store.getApplications({ influencerId: influencer.id });
    const appliedCampIds = myApplications.map(a => a.campaignId);

    const activeCollabs = myApplications.filter(a => a.status === 'accepted');

    // Recommendation feed
    const allCampaigns = store.getCampaigns({ status: 'active' });
    const recommended = allCampaigns
      .map(camp => {
        const { score, reasons } = calculateMatchScore(camp, influencer);
        return {
          ...camp,
          matchScore: score,
          matchReasons: reasons,
          hasApplied: appliedCampIds.includes(camp.id)
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    // Earnings calculation
    const totalEarnings = activeCollabs.reduce((acc, app) => acc + (app.proposedRate || 0), 0);

    return res.status(200).json({
      success: true,
      stats: {
        appliedCount: myApplications.length,
        activeCollabsCount: activeCollabs.length,
        totalEarnings,
        recommendedCount: recommended.length
      },
      recommendedCampaigns: recommended.slice(0, 6),
      myApplications,
      activeCollaborations: activeCollabs
    });
  } catch (error) {
    next(error);
  }
}
