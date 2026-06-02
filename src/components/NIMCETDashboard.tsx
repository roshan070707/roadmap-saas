import { motion } from 'framer-motion';
import { Target, Calendar, BarChart3 } from 'lucide-react';

export const NIMCETDashboard = () => {
  // Mock Data for now (can be moved to Convex `mockTests` table)
  const mockTests = [
    { name: 'Mock 1', score: 320, maxScore: 1000 },
    { name: 'Mock 2', score: 450, maxScore: 1000 },
    { name: 'Mock 3', score: 600, maxScore: 1000 },
    { name: 'Mock 4', score: 680, maxScore: 1000 },
  ];

  const examDate = new Date('2027-06-08T00:00:00Z'); // Example date
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
        <Target className="w-5 h-5 text-luxury-purple" /> NIMCET Command Center
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exam Countdown */}
        <div className="glass-card bg-luxury-purple/5 border-luxury-purple/20 p-6 flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
            <Calendar className="w-24 h-24" />
          </div>
          <div className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Exam Countdown</div>
          <div className="text-5xl font-mono font-bold text-luxury-purple drop-shadow-md mb-2">{daysLeft}</div>
          <div className="text-sm text-text-muted">Days Remaining</div>
        </div>

        {/* Mock Test Performance */}
        <div className="glass-card md:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-luxury-gold" /> Mock Test Trajectory
            </div>
            <button className="text-xs text-luxury-purple hover:text-white transition-colors">Add Score +</button>
          </div>
          
          <div className="flex items-end gap-2 h-32 relative">
            {/* Y-Axis lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              <div className="border-t border-white w-full"></div>
              <div className="border-t border-white w-full"></div>
              <div className="border-t border-white w-full"></div>
            </div>
            
            {mockTests.map((test, i) => {
              const height = `${(test.score / test.maxScore) * 100}%`;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer z-10">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-luxury-purple/20 to-luxury-purple rounded-t-sm relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                      {test.score} / {test.maxScore}
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">{test.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
