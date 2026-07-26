import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Bell, Lock, Sun, Moon, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [inAppNotifs, setInAppNotifs] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings updated successfully');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-4xl">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Account Settings</h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Theme */}
          <div className="card-creator p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Appearance & Theme</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-slate-400">Toggle dark UI visual aesthetics</p>
              </div>
              <button
                type="button"
                onClick={toggleDarkMode}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Notifications Preference */}
          <div className="card-creator p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Email Campaign Alerts</p>
                <p className="text-xs text-slate-400">Receive instant email when applicant applies or accepts offer</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 accent-[#6C63FF]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">In-App Popover Alerts</p>
                <p className="text-xs text-slate-400">Show notification bell badges</p>
              </div>
              <input
                type="checkbox"
                checked={inAppNotifs}
                onChange={(e) => setInAppNotifs(e.target.checked)}
                className="w-4 h-4 accent-[#6C63FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md"
          >
            Save Preferences
          </button>
        </form>
      </main>
    </div>
  );
}
