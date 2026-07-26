import { store } from '../services/storeService.js';
import { calculateMatchScore } from '../services/recommendationEngine.js';

export async function getRecommendationsForInfluencer(req, res, next) {
  try {
    const influencerId = req.params.influencerId || req.user.id;
    const influencer = store.getInfluencerById(influencerId) || store.getInfluencers()[0];

    const activeCampaigns = store.getCampaigns({ status: 'active' });
    const myApps = store.getApplications({ influencerId: influencer.id }).map(a => a.campaignId);

    const matches = activeCampaigns.map(camp => {
      const match = calculateMatchScore(camp, influencer);
      return {
        campaign: camp,
        matchScore: match.score,
        reasons: match.reasons,
        hasApplied: myApps.includes(camp.id)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({ success: true, count: matches.length, matches });
  } catch (error) {
    next(error);
  }
}

export async function getRecommendationsForCampaign(req, res, next) {
  try {
    const { campaignId } = req.params;
    const campaign = store.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    const influencers = store.getInfluencers();
    const matches = influencers.map(inf => {
      const match = calculateMatchScore(campaign, inf);
      return {
        influencer: inf,
        matchScore: match.score,
        reasons: match.reasons
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({ success: true, campaign, count: matches.length, matches });
  } catch (error) {
    next(error);
  }
}
