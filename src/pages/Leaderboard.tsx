import { motion } from 'framer-motion';
import { Medal, Flame, Clock } from 'lucide-react';

export default function Leaderboard() {
  // In a real app, we'd fetch actual users. We'll use mock data to demonstrate the UI for now
  // since the user schema might not have all these fields explicitly yet.
  const mockLeaders = [
    { rank: 1, name: "Alex Chen", score: 14500, streak: 42, time: "240h", badge: "Gold" },
    { rank: 2, name: "Sarah Smith", score: 12200, streak: 15, time: "180h", badge: "Silver" },
    { rank: 3, name: "David Kim", score: 10500, streak: 8, time: "150h", badge: "Bronze" },
    { rank: 4, name: "Emily Watson", score: 9800, streak: 3, time: "120h" },
    { rank: 5, name: "Michael Chang", score: 8400, streak: 1, time: "90h" },
  ];

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Global Rankings
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Leaderboard</h1>
          <p className="text-text-muted">Compete with the community. Consistency is the key to mastery.</p>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-text-main/10 text-xs font-semibold text-text-muted uppercase tracking-wider">
            <div className="col-span-2 md:col-span-1">Rank</div>
            <div className="col-span-5 md:col-span-5">Learner</div>
            <div className="col-span-5 md:col-span-6 grid grid-cols-3 text-right">
              <div>Score</div>
              <div className="hidden md:block">Study Time</div>
              <div>Streak</div>
            </div>
          </div>
          
          <div className="divide-y divide-text-main/5">
            {mockLeaders.map((user, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={user.rank} 
                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-text-main/5 transition-colors"
              >
                <div className="col-span-2 md:col-span-1 font-bold text-lg text-text-main flex items-center gap-2">
                  #{user.rank}
                  {user.badge === 'Gold' && <Medal className="w-5 h-5 text-yellow-400" />}
                  {user.badge === 'Silver' && <Medal className="w-5 h-5 text-gray-400" />}
                  {user.badge === 'Bronze' && <Medal className="w-5 h-5 text-amber-600" />}
                </div>
                <div className="col-span-5 md:col-span-5 font-semibold text-text-main flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-luxury-purple/20 flex items-center justify-center text-luxury-purple font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  {user.name}
                </div>
                <div className="col-span-5 md:col-span-6 grid grid-cols-3 text-right items-center">
                  <div className="font-mono text-luxury-purple font-bold">{user.score}</div>
                  <div className="hidden md:flex items-center justify-end gap-1 font-mono text-text-muted"><Clock className="w-3 h-3"/> {user.time}</div>
                  <div className="flex items-center justify-end gap-1 font-mono text-luxury-gold"><Flame className="w-3 h-3"/> {user.streak}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
