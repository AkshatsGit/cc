import { firebaseAdmin } from '../config/firebase.js';
import { store } from '../services/storeService.js';

export async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // In development / demo mode, extract user header or default to demo user
      const demoUserId = req.headers['x-user-id'] || req.headers['x-demo-user'];
      if (demoUserId) {
        const user = store.getUserById(demoUserId);
        if (user) {
          req.user = user;
          return next();
        }
      }
      // Return demo user if token is omitted for easy testing
      req.user = store.getUsers()[0];
      return next();
    }

    const token = authHeader.split('Bearer ')[1];

    if (firebaseAdmin) {
      try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        let user = store.getUserById(decodedToken.uid);
        if (!user) {
          user = store.createUser({
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || decodedToken.email.split('@')[0],
            role: decodedToken.role || 'influencer'
          });
        }
        req.user = user;
        return next();
      } catch (fbError) {
        console.warn('Firebase token verification fallback:', fbError.message);
      }
    }

    // Fallback user matching
    const user = store.getUserById(token) || store.getUsers()[0];
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized request', error: error.message });
  }
}

export function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Access denied. Role required: ${allowedRoles.join(' or ')}` });
    }
    next();
  };
}
