import { store } from '../services/storeService.js';

export async function getBrandProfile(req, res, next) {
  try {
    const { id } = req.params;
    const brand = store.getBrandById(id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand profile not found' });
    }
    const campaigns = store.getCampaigns({ brandId: brand.id });
    return res.status(200).json({ success: true, brand, campaigns });
  } catch (error) {
    next(error);
  }
}

export async function updateBrandProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const updated = store.createOrUpdateBrand({ ...req.body, userId, id: userId });
    return res.status(200).json({ success: true, message: 'Brand profile updated', brand: updated });
  } catch (error) {
    next(error);
  }
}

export async function getBrandDashboard(req, res, next) {
  try {
    const userId = req.user.id;
    const campaigns = store.getCampaigns({ brandId: userId });
    const campIds = campaigns.map(c => c.id);
    const allApps = store.getApplications().filter(a => campIds.includes(a.campaignId));
    const selectedCreators = allApps.filter(a => a.status === 'accepted');

    return res.status(200).json({
      success: true,
      stats: {
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
        totalCampaigns: campaigns.length,
        totalApplications: allApps.length,
        selectedInfluencers: selectedCreators.length
      },
      campaigns,
      recentApplications: allApps.slice(0, 5)
    });
  } catch (error) {
    next(error);
  }
}
