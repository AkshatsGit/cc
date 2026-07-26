import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import BrandDashboard from './pages/BrandDashboard';
import InfluencerDashboard from './pages/InfluencerDashboard';
import CampaignListPage from './pages/CampaignListPage';
import CampaignDetailsPage from './pages/CampaignDetailsPage';
import CampaignFormPage from './pages/CampaignFormPage';
import ApplicantManagementPage from './pages/ApplicantManagementPage';

import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import AdminDashboard from './pages/AdminDashboard';
import SettingsPage from './pages/SettingsPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors">
            <Navbar />
            <div className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/campaigns" element={<CampaignListPage />} />
                <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
                <Route path="/saved-campaigns" element={<CampaignListPage />} />

                {/* Brand Routes */}
                <Route
                  path="/brand/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['brand', 'admin']}>
                      <BrandDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/brand/campaigns"
                  element={
                    <ProtectedRoute allowedRoles={['brand', 'admin']}>
                      <BrandDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/brand/campaigns/new"
                  element={
                    <ProtectedRoute allowedRoles={['brand', 'admin']}>
                      <CampaignFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/brand/campaigns/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={['brand', 'admin']}>
                      <CampaignFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/brand/campaigns/:campaignId/applicants"
                  element={
                    <ProtectedRoute allowedRoles={['brand', 'admin']}>
                      <ApplicantManagementPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/brand/applicants"
                  element={
                    <ProtectedRoute allowedRoles={['brand', 'admin']}>
                      <ApplicantManagementPage />
                    </ProtectedRoute>
                  }
                />

                {/* Influencer Routes */}
                <Route
                  path="/influencer/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['influencer', 'admin']}>
                      <InfluencerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Shared User Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/campaigns"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/verification"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
