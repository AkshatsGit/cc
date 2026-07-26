import { store } from '../services/storeService.js';

export async function getUserNotifications(req, res, next) {
  try {
    const userId = req.user.id;
    const notifications = store.getNotifications(userId);
    return res.status(200).json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    next(error);
  }
}

export async function markNotificationsRead(req, res, next) {
  try {
    const userId = req.user.id;
    store.markNotificationsRead(userId);
    return res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
}
