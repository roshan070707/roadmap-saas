import { Users, BookOpen, Clock, Activity, TrendingUp, AlertCircle, Bell } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function AdminDashboard() {
  const waitlistUsers = useQuery(api.waitlist.getWaitlist);
  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-bold text-text-main">Admin Overview</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 border-text-main/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-muted text-sm uppercase tracking-wider font-semibold">Total Users</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-4xl font-bold text-white">1,248</div>
            <div className="text-green-400 text-sm mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12% this week</div>
          </div>
          
          <div className="glass-card p-6 border-text-main/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-muted text-sm uppercase tracking-wider font-semibold">Active Roadmaps</span>
              <BookOpen className="w-5 h-5 text-luxury-purple" />
            </div>
            <div className="text-4xl font-bold text-white">3,892</div>
            <div className="text-green-400 text-sm mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +5% this week</div>
          </div>

          <div className="glass-card p-6 border-text-main/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-text-muted text-sm uppercase tracking-wider font-semibold">Total Study Hours</span>
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-4xl font-bold text-white">14.2k</div>
            <div className="text-green-400 text-sm mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +18% this week</div>
          </div>

          <div className="glass-card p-6 border-luxury-purple/30 bg-luxury-purple/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-luxury-purple text-sm uppercase tracking-wider font-semibold">Waitlist Signups</span>
              <Bell className="w-5 h-5 text-luxury-purple" />
            </div>
            <div className="text-4xl font-bold text-white">{waitlistUsers ? waitlistUsers.length : 0}</div>
            <div className="text-luxury-purple/70 text-sm mt-2 flex items-center gap-1">Interest captured</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 border-text-main/10">
            <h3 className="text-xl font-bold text-text-main mb-6">Most Popular Paths</h3>
            <div className="space-y-4">
              {[
                { name: 'Full Stack Web Development', users: 842 },
                { name: 'Machine Learning Engineering', users: 512 },
                { name: 'Cloud Architecture (AWS)', users: 389 },
                { name: 'Cybersecurity Analyst', users: 275 },
              ].map((path, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-text-main/5 rounded-lg border border-white/5">
                  <span className="text-text-main font-semibold">{path.name}</span>
                  <span className="text-luxury-purple font-mono">{path.users} users</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 border-text-main/10">
            <h3 className="text-xl font-bold text-text-main mb-6">Latest Waitlist Signups</h3>
            <div className="space-y-4">
              {waitlistUsers === undefined ? (
                <div className="text-text-muted">Loading waitlist...</div>
              ) : waitlistUsers.length === 0 ? (
                <div className="text-text-muted">No signups yet.</div>
              ) : (
                waitlistUsers.slice(0, 5).map((user: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-text-main/5 rounded-lg border border-white/5">
                    <div>
                      <div className="text-text-main font-semibold">{user.name || "Anonymous"}</div>
                      <div className="text-xs text-text-muted">{user.email}</div>
                    </div>
                    <span className="text-luxury-purple font-mono text-xs px-2 py-1 bg-luxury-purple/10 rounded">{user.featureName}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-card p-8 border-text-main/10">
            <h3 className="text-xl font-bold text-text-main mb-6">Recent Community Activity</h3>
            <div className="space-y-6">
              {[
                { user: 'Alex', action: 'completed a roadmap', target: 'Frontend Developer', time: '2 mins ago' },
                { user: 'Sarah', action: 'reached a 7-day streak', target: '', time: '15 mins ago' },
                { user: 'David', action: 'unlocked an achievement', target: 'Deep Focus', time: '1 hour ago' },
                { user: 'Maria', action: 'shared a custom roadmap', target: 'Go Microservices', time: '3 hours ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-purple/20 flex flex-shrink-0 items-center justify-center">
                    <Activity className="w-5 h-5 text-luxury-purple" />
                  </div>
                  <div>
                    <p className="text-text-main">
                      <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-semibold text-white">{activity.target}</span>
                    </p>
                    <span className="text-text-muted text-xs">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
