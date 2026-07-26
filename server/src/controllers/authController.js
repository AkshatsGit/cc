import { store } from '../services/storeService.js';

export async function loginUser(req, res, next) {
  try {
    const { email, role, uid, name } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    let user = store.getUserByEmail(email);

    if (!user) {
      user = store.createUser({
        uid: uid || `uid_${Date.now()}`,
        email,
        name: name || email.split('@')[0],
        role: role || 'influencer'
      });

      // Create profile record
      if (user.role === 'brand') {
        store.createOrUpdateBrand({ userId: user.id, companyName: user.name, email: user.email });
      } else {
        store.createOrUpdateInfluencer({ userId: user.id, fullName: user.name, email: user.email });
      }
    } else if (role && user.role !== role) {
      user = store.updateUser(user.id, { role });
    }

    if (user.banned) {
      return res.status(403).json({ success: false, message: 'This account has been suspended by administration.' });
    }

    // Get role profile
    let profile = null;
    if (user.role === 'brand') {
      profile = store.getBrandById(user.id) || store.createOrUpdateBrand({ userId: user.id, companyName: user.name });
    } else if (user.role === 'influencer') {
      profile = store.getInfluencerById(user.id) || store.createOrUpdateInfluencer({ userId: user.id, fullName: user.name });
    }

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user,
      profile,
      token: user.id
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = req.user;
    let profile = null;
    if (user.role === 'brand') {
      profile = store.getBrandById(user.id);
    } else if (user.role === 'influencer') {
      profile = store.getInfluencerById(user.id);
    }

    return res.status(200).json({
      success: true,
      user,
      profile
    });
  } catch (error) {
    next(error);
  }
}
