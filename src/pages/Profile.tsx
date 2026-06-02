import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Loader2, Flame, Clock, Target, Star, Compass, Crown, Zap, Calendar } from 'lucide-react';
import type { Id } from '../../convex/_generated/dataModel';

export default function Profile() {
  const { userId } = useParams();
  
  const profile = useQuery(api.profiles.getUserProfile, { 
    profileId: userId as Id<"users"> 
  });

  if (profile === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
      </div>
    );
  }

  if (profile === null) {
    return <Navigate to="/dashboard" />;
  }

  const { user, stats, achievements } = profile;

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="glass-card mb-8 text-center flex flex-col items-center p-12">
          {user.image ? (
            <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full mb-6 border-2 border-luxury-purple/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
          ) : (
            <div className="w-24 h-24 rounded-full mb-6 border-2 border-luxury-purple/50 bg-luxury-purple/10 flex items-center justify-center text-3xl font-bold text-luxury-purple shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              {user.name?.charAt(0) || 'U'}
            </div>
          )}
          <h1 className="text-3xl font-bold text-text-main mb-2">{user.name}</h1>
          <div className="text-sm text-text-muted flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Joined {new Date(user._creationTime).toLocaleDateString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-card p-6 text-center">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-luxury-purple"/> Study Time</div>
            <div className="text-2xl font-bold text-text-main">{stats.studyTime} <span className="text-sm font-normal text-text-muted">min</span></div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Flame className="w-4 h-4 text-luxury-gold"/> Current Streak</div>
            <div className="text-2xl font-bold text-text-main">{stats.streak} <span className="text-sm font-normal text-text-muted">Days</span></div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Target className="w-4 h-4 text-green-500"/> Completed</div>
            <div className="text-2xl font-bold text-text-main">{stats.roadmapCompletion} <span className="text-sm font-normal text-text-muted">Topics</span></div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Star className="w-4 h-4 text-blue-500"/> Roadmaps</div>
            <div className="text-2xl font-bold text-text-main">{stats.roadmapsCount}</div>
          </div>
        </div>

        {/* Achievements */}
        <h3 className="text-xl font-bold text-text-main mb-6">Achievements</h3>
        {achievements.length === 0 ? (
          <div className="glass-card p-8 text-center text-text-muted">
            No achievements unlocked yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((ach: any) => {
              const Icon = ach.detail?.icon === 'Star' ? Star : 
                           ach.detail?.icon === 'Compass' ? Compass :
                           ach.detail?.icon === 'Crown' ? Crown :
                           ach.detail?.icon === 'Flame' ? Flame :
                           ach.detail?.icon === 'Zap' ? Zap : Star;
              return (
                <div key={ach._id} className="glass-card flex items-center gap-4 p-4 border-luxury-gold/30 bg-luxury-gold/5">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main">{ach.detail?.title}</h4>
                    <p className="text-xs text-text-muted">{ach.detail?.description}</p>
                    <p className="text-[10px] text-luxury-gold mt-1">Unlocked {new Date(ach.unlockedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
