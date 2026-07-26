import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let firebaseAdmin = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log('🔥 Firebase Admin SDK initialized successfully');
  } else {
    console.log('ℹ️ Firebase environment variables missing. Running in seamless Store Fallback Mode.');
  }
} catch (error) {
  console.warn('⚠️ Firebase Admin Initialization Warning:', error.message);
}

export { firebaseAdmin, admin };
