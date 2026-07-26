import { store } from '../services/storeService.js';
import { calculateMatchScore } from '../services/recommendationEngine.js';

export async function applyToCampaign(req, res, next) {
  try {
    const influencerId = req.user.id;
    const influencer = store.getInfluencerById(influencerId) || store.getInfluencers()[0];
    const { campaignId, pitch, proposedRate, deliverablesProposed } = req.body;

    const campaign = store.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    const { score } = calculateMatchScore(campaign, influencer);

    const result = store.createApplication({
      campaignId,
      influencerId: influencer.id || influencerId,
      influencerName: influencer.fullName || req.user.name,
      influencerAvatar: req.user.avatar,
      influencerHandle: influencer.socialMedia?.instagram?.handle || `@${influencer.username || 'creator'}`,
      pitch,
      proposedRate: proposedRate || campaign.budget,
      deliverablesProposed: deliverablesProposed || campaign.deliverables.join(', '),
      matchScore: score
    });

    if (result.existing) {
      return res.status(400).json({ success: false, message: 'You have already applied to this campaign.' });
    }

    // Create notification for brand
    store.createNotification({
      userId: campaign.brandId,
      title: 'New Campaign Application',
      message: `${influencer.fullName || 'A creator'} applied for "${campaign.title}"`,
      type: 'new_application',
      link: `/brand/campaigns/${campaign.id}/applicants`
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application: result.application
    });
  } catch (error) {
    next(error);
  }
}

export async function getCampaignApplicants(req, res, next) {
  try {
    const { campaignId } = req.params;
    const campaign = store.getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    const applications = store.getApplications({ campaignId });
    // Enrich with full influencer details
    const enriched = applications.map(app => {
      const inf = store.getInfluencerById(app.influencerId);
      return {
        ...app,
        influencerProfile: inf || null
      };
    });

    return res.status(200).json({
      success: true,
      campaign,
      count: enriched.length,
      applications: enriched
    });
  } catch (error) {
    next(error);
  }
}

export async function updateApplicationStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body; // accepted, rejected, shortlisted

    if (!['accepted', 'rejected', 'shortlisted', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updated = store.updateApplicationStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const campaign = store.getCampaignById(updated.campaignId);

    // Create Notification for Influencer
    let notifTitle = 'Application Update';
    let notifMsg = `Your application status for "${campaign?.title || 'campaign'}" is now ${status}.`;

    if (status === 'accepted') {
      notifTitle = 'Application Accepted! 🎉';
      notifMsg = `Congratulations! Your application for "${campaign?.title}" was accepted by the brand. Check your messages to start collaboration!`;
    } else if (status === 'rejected') {
      notifTitle = 'Application Status Update';
      notifMsg = `Your application for "${campaign?.title}" was not selected. Keep applying to recommended campaigns!`;
    }

    store.createNotification({
      userId: updated.influencerId,
      title: notifTitle,
      message: notifMsg,
      type: status === 'accepted' ? 'application_accepted' : 'application_rejected',
      link: status === 'accepted' ? '/messages' : '/influencer/dashboard'
    });

    return res.status(200).json({
      success: true,
      message: `Application marked as ${status}`,
      application: updated
    });
  } catch (error) {
    next(error);
  }
}

export async function withdrawApplication(req, res, next) {
  try {
    const { id } = req.params;
    const withdrawn = store.withdrawApplication(id);
    if (!withdrawn) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    return res.status(200).json({ success: true, message: 'Application withdrawn successfully' });
  } catch (error) {
    next(error);
  }
}
