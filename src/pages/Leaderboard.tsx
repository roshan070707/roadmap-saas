import { useState } from 'react';
import { motion } from 'framer-motion';
import { Medal, Flame, Clock, Loader2, Trophy } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const [metric, setMetric] = useState('reputation');
  const leaders = useQuery(api.leaderboard.getGlobalLeaderboard, { metric });
  const activeLeaders = leaders?.filter((stat: any) => stat.reputation > 0 || stat.studyTime > 0 || stat.streak > 0);

  const getBadgeColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-transparent";
  };

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Global Rankings
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Leaderboard</h1>
          <p className="text-text-muted">Compete with the community. Consistency is the key to mastery.</p>
        </div>

        <div className="flex justify-center mb-8 gap-4">
          <button onClick={() => setMetric('reputation')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${metric === 'reputation' ? 'bg-luxury-purple text-white' : 'bg-text-main/5 text-text-muted hover:text-white'}`}>Reputation</button>
          <button onClick={() => setMetric('studyTime')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${metric === 'studyTime' ? 'bg-luxury-purple text-white' : 'bg-text-main/5 text-text-muted hover:text-white'}`}>Study Time</button>
          <button onClick={() => setMetric('streak')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${metric === 'streak' ? 'bg-luxury-purple text-white' : 'bg-text-main/5 text-text-muted hover:text-white'}`}>Streaks</button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-text-main/10 text-xs font-semibold text-text-muted uppercase tracking-wider">
            <div className="col-span-2 md:col-span-1">Rank</div>
            <div className="col-span-6 md:col-span-5">Learner</div>
            <div className="col-span-4 md:col-span-6 grid grid-cols-1 md:grid-cols-3 text-right gap-2">
              <div>Reputation</div>
              <div className="hidden md:block">Study Time</div>
              <div className="hidden md:block">Streak</div>
            </div>
          </div>
          
          <div className="divide-y divide-text-main/5 min-h-[300px]">
            {leaders === undefined ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
              </div>
            ) : activeLeaders && activeLeaders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Trophy className="w-12 h-12 text-text-muted/30 mb-4" />
                <h3 className="text-xl font-bold text-text-main mb-2">No leaderboard data available yet</h3>
                <p className="text-text-muted">Start studying to secure your spot at the top!</p>
              </div>
            ) : (
              activeLeaders!.map((stat, idx) => (
                <Link to={`/profile/${stat.userId}`} key={stat._id}>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-text-main/5 transition-colors cursor-pointer"
                  >
                    <div className="col-span-2 md:col-span-1 font-bold text-lg text-text-main flex items-center gap-2">
                      #{idx + 1}
                      {idx < 3 && <Medal className={`w-5 h-5 ${getBadgeColor(idx + 1)}`} />}
                    </div>
                    <div className="col-span-6 md:col-span-5 font-semibold text-text-main flex items-center gap-3">
                      {stat.user?.image ? (
                        <img src={stat.user.image} alt={stat.user?.name} className="w-8 h-8 rounded-full border border-luxury-purple/50" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-luxury-purple/20 flex items-center justify-center text-luxury-purple font-bold text-xs">
                          {stat.user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <span className="truncate">{stat.user?.name || "Unknown"}</span>
                    </div>
                    <div className="col-span-4 md:col-span-6 grid grid-cols-1 md:grid-cols-3 text-right items-center gap-2">
                      <div className="font-mono text-luxury-purple font-bold">{stat.reputation || 0}</div>
                      <div className="hidden md:flex items-center justify-end gap-1 font-mono text-text-muted"><Clock className="w-3 h-3"/> {Math.round(stat.studyTime / 60)}h</div>
                      <div className="hidden md:flex items-center justify-end gap-1 font-mono text-luxury-gold"><Flame className="w-3 h-3"/> {stat.streak}</div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
