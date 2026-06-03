import { useState } from 'react';
import { Users, Plus, Trophy, Activity, Target } from 'lucide-react';
import { WaitlistModal } from '../components/WaitlistModal';

export default function Team() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
              Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">Team Dashboard</h1>
            <p className="text-text-muted text-xl font-light max-w-2xl">Collaborate on roadmaps, track team progress, and hit organizational goals together.</p>
          </div>
          <button onClick={() => setWaitlistOpen(true)} className="btn-premium flex items-center gap-2">
            <Plus className="w-5 h-5" /> Invite Members
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 border-text-main/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-text-muted font-semibold uppercase text-xs tracking-wider">Members</span>
              <Users className="w-5 h-5 text-luxury-purple" />
            </div>
            <div className="text-3xl font-bold text-white">1</div>
          </div>
          <div className="glass-card p-6 border-text-main/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-text-muted font-semibold uppercase text-xs tracking-wider">Shared Roadmaps</span>
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">0</div>
          </div>
          <div className="glass-card p-6 border-text-main/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-text-muted font-semibold uppercase text-xs tracking-wider">Team Study Hours</span>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white">0h</div>
          </div>
          <div className="glass-card p-6 border-text-main/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-text-muted font-semibold uppercase text-xs tracking-wider">Leaderboard Rank</span>
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white">#--</div>
          </div>
        </div>

        <div className="glass-card p-12 border-text-main/10 flex flex-col items-center justify-center text-center">
          <Users className="w-16 h-16 text-text-muted mb-6 opacity-50" />
          <h2 className="text-2xl font-bold text-text-main mb-4">ROADMAP for Teams is coming soon</h2>
          <p className="text-text-muted mb-8 max-w-md">We're building the ultimate platform for technical teams to upskill and cross-train together.</p>
          <button onClick={() => setWaitlistOpen(true)} className="btn-premium px-8">Join the Teams Waitlist</button>
        </div>
      </div>
      
      <WaitlistModal 
        isOpen={waitlistOpen} 
        onClose={() => setWaitlistOpen(false)} 
        featureName="ROADMAP for Teams" 
      />
    </div>
  );
}
