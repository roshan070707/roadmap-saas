import { useQuery, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { Activity, Check, ChevronRight, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const roadmaps = useQuery(api.roadmaps.getUserRoadmaps);
  const user = useQuery(api.users.current);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const activeRoadmap = roadmaps?.[0]; // Assuming the most recent one is active

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-light text-white mb-2">
            Welcome back, <span className="font-semibold">{user?.name?.split(' ')[0] || 'Explorer'}</span>
          </h1>
          <p className="text-text-muted">Here is your career trajectory and progress.</p>
        </div>

        {roadmaps === undefined ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
          </div>
        ) : !activeRoadmap || !activeRoadmap.careerPath ? (
          <div className="glass-card flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-text-muted" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Active Roadmaps</h3>
            <p className="text-text-muted max-w-md mx-auto mb-8">
              You haven't generated any career roadmaps yet. Start your journey by generating a personalized path.
            </p>
            <Link to="/generator" className="btn-premium px-8 py-3">
              Generate My Roadmap
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar / Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card">
                <div className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-4">Current Target</div>
                <h3 className="text-xl font-bold text-white mb-6">{activeRoadmap.careerPath.title}</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-muted">Progress</span>
                    <span className="text-white font-mono">{activeRoadmap.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-luxury-purple"
                      initial={{ width: 0 }}
                      animate={{ width: `${activeRoadmap.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Difficulty</span>
                    <span className="text-luxury-gold font-mono">{activeRoadmap.careerPath.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Est. Duration</span>
                    <span className="text-white font-mono">{activeRoadmap.careerPath.duration}</span>
                  </div>
                </div>
              </div>
              
              <Link to={`/roadmap/${activeRoadmap._id}`} className="glass-card flex items-center justify-between group cursor-pointer hover:bg-white/[0.02]">
                <span className="text-sm font-semibold text-white">View Full Roadmap</span>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-luxury-purple animate-pulse"></span>
                  Action Plan
                </h3>

                <div className="space-y-4">
                  {activeRoadmap.careerPath.roadmapSteps.map((step: any, index: number) => {
                    const isCompleted = activeRoadmap.completedSteps.includes(step.title);
                    return (
                      <div 
                        key={index} 
                        className={`p-5 rounded-xl border transition-all ${
                          isCompleted 
                            ? 'bg-white/5 border-white/10' 
                            : 'bg-luxury-purple/5 border-luxury-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.05)]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isCompleted ? 'bg-white/10 text-white' : 'bg-luxury-purple text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                          }`}>
                            {isCompleted ? <Check className="w-3.5 h-3.5" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <div>
                            <div className="text-xs font-mono text-luxury-gold mb-1">{step.phase}</div>
                            <h4 className={`text-base font-semibold mb-2 ${isCompleted ? 'text-text-muted line-through' : 'text-white'}`}>
                              {step.title}
                            </h4>
                            <p className="text-sm text-text-muted font-light leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
