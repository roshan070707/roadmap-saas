import { useState } from 'react';
import { User, Bell, Palette, Globe, Shield, Save } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-text-main mb-8">Settings</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="glass-card p-2 border-text-main/10 flex flex-col gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-left ${
                      activeTab === tab.id 
                        ? 'bg-luxury-purple/10 text-luxury-purple border border-luxury-purple/20' 
                        : 'text-text-muted hover:bg-text-main/5 hover:text-text-main'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow glass-card p-8 border-text-main/10 min-h-[500px]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-main mb-6">Profile Settings</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-text-main/10 border border-white/20 flex items-center justify-center text-3xl font-bold text-text-muted">
                    U
                  </div>
                  <button className="btn-premium-secondary px-4 py-2 text-sm">Change Avatar</button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Display Name</label>
                    <input type="text" defaultValue="User" className="w-full bg-black/30 border border-text-main/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-purple" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Email</label>
                    <input type="email" disabled defaultValue="user@example.com" className="w-full bg-black/30 border border-text-main/10 rounded-lg px-4 py-3 text-text-muted cursor-not-allowed" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Bio</label>
                    <textarea rows={4} className="w-full bg-black/30 border border-text-main/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-purple"></textarea>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end">
                  <button className="btn-premium flex items-center gap-2 px-6 py-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-main mb-6">Appearance</h2>
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Theme</label>
                  <div className="flex gap-4">
                    <button className="p-4 rounded-lg border-2 border-luxury-purple bg-black text-white font-bold w-32 flex justify-center">Dark</button>
                    <button className="p-4 rounded-lg border-2 border-transparent hover:border-text-main/20 bg-white text-black font-bold w-32 flex justify-center opacity-50 cursor-not-allowed">Light (Soon)</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-main mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { id: 'email_updates', label: 'Product Updates (Email)', defaultChecked: true },
                    { id: 'email_activity', label: 'Activity Summaries (Email)', defaultChecked: true },
                    { id: 'push_streaks', label: 'Streak Reminders (Push)', defaultChecked: false },
                    { id: 'push_community', label: 'Community Interactions (Push)', defaultChecked: true },
                  ].map(pref => (
                    <div key={pref.id} className="flex items-center justify-between p-4 border border-text-main/10 rounded-lg">
                      <span className="text-text-main font-medium">{pref.label}</span>
                      <input type="checkbox" defaultChecked={pref.defaultChecked} className="w-5 h-5 accent-luxury-purple bg-black/30 border-text-main/20" />
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-end">
                  <button className="btn-premium flex items-center gap-2 px-6 py-2">
                    <Save className="w-4 h-4" /> Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-main mb-6">Global Preferences</h2>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-muted uppercase tracking-wider">Timezone</label>
                    <select className="w-full bg-black/30 border border-text-main/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-purple">
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>PST (Pacific Standard Time)</option>
                      <option>EST (Eastern Standard Time)</option>
                      <option>IST (Indian Standard Time)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-main mb-6">Privacy Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-text-main/10 rounded-lg">
                    <div>
                      <h4 className="text-text-main font-bold mb-1">Public Profile</h4>
                      <p className="text-text-muted text-sm">Allow others to view your profile and achievements on the leaderboard.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-luxury-purple" />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-text-main/10 rounded-lg">
                    <div>
                      <h4 className="text-text-main font-bold mb-1">Share Learning Data</h4>
                      <p className="text-text-muted text-sm">Allow anonymous data collection to improve roadmap generation AI.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-luxury-purple" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
