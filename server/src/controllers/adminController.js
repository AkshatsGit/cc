import { store } from '../services/storeService.js';

export async function getAdminStats(req, res, next) {
  try {
    const users = store.getUsers();
    const brands = store.getBrands();
    const influencers = store.getInfluencers();
    const campaigns = store.getCampaigns();
    const applications = store.getApplications();
    const reports = store.getReports();

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers: users.length,
        brandsCount: brands.length,
        influencersCount: influencers.length,
        totalCampaigns: campaigns.length,
        totalApplications: applications.length,
        pendingReports: reports.filter(r => r.status === 'pending').length
      },
      users,
      campaigns,
      reports
    });
  } catch (error) {
    next(error);
  }
}

export async function toggleUserBan(req, res, next) {
  try {
    const { userId } = req.params;
    const { banned } = req.body;
    const user = store.updateUser(userId, { banned: Boolean(banned) });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: `User ${banned ? 'banned' : 'unbanned'} successfully`, user });
  } catch (error) {
    next(error);
  }
}

export async function toggleVerificationBadge(req, res, next) {
  try {
    const { id } = req.params;
    const { type, verified } = req.body; // type: brand / influencer

    let profile = null;
    if (type === 'brand') {
      profile = store.createOrUpdateBrand({ id, userId: id, verified: Boolean(verified) });
    } else {
      profile = store.createOrUpdateInfluencer({ id, userId: id, verified: Boolean(verified) });
    }

    return res.status(200).json({ success: true, message: `Verification status updated`, profile });
  } catch (error) {
    next(error);
  }
}

export async function moderateReport(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body; // resolved, dismissed
    const report = store.updateReportStatus(id, status);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    return res.status(200).json({ success: true, message: `Report status set to ${status}`, report });
  } catch (error) {
    next(error);
  }
}

export async function submitReport(req, res, next) {
  try {
    const reporterId = req.user.id;
    const report = store.createReport({
      reporterId,
      reporterName: req.user.name,
      ...req.body
    });
    return res.status(201).json({ success: true, message: 'Report submitted for admin review', report });
  } catch (error) {
    next(error);
  }
}
