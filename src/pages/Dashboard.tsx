import { useQuery, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { Activity, Check, ChevronRight, Loader2, Clock, Flame, Target } from 'lucide-react';
import { NIMCETDashboard } from '../components/NIMCETDashboard';

const Dashboard = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const roadmaps = useQuery(api.roadmaps.getUserRoadmaps);
  const user = useQuery(api.users.current);
  const studyStats = useQuery(api.study.getStats);
  const timeByTopic = useQuery(api.study.getTimeByTopic);
  const activities = useQuery(api.activities.getRecentActivities);
  
  const friends = useQuery(api.friends.getFriends);
  const pendingRequests = useQuery(api.friends.getPendingRequests);
  const notifications = useQuery(api.notifications.getUserNotifications);
  const sharedRoadmaps = useQuery(api.collaboration.getSharedRoadmaps);
  const globalLeaderboard = useQuery(api.leaderboard.getGlobalLeaderboard, { metric: 'studyTime' });
  const intelligence = useQuery(api.intelligence.getDashboardIntelligence);
  const recommendations = useQuery(api.intelligence.getRecommendations);

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
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-light text-text-main mb-2">
              Welcome back, <span className="font-semibold">{user?.name?.split(' ')[0] || 'Explorer'}</span>
            </h1>
            <p className="text-text-muted">Here is your career trajectory and progress.</p>
          </div>
          {roadmaps !== undefined && activeRoadmap && (
            <Link to="/create" className="hidden md:flex btn-premium-secondary px-6 py-2 text-sm items-center gap-2">
              Create Custom Roadmap
            </Link>
          )}
        </div>

        {/* Intelligence Motivation Banner */}
        {intelligence?.motivation && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-xl border flex items-center gap-4 ${
              intelligence.motivation.type === 'streak_recovery' 
                ? 'bg-red-500/10 border-red-500/20 text-red-200'
                : intelligence.motivation.type === 'consistent'
                ? 'bg-luxury-gold/10 border-luxury-gold/20 text-luxury-gold'
                : 'bg-luxury-purple/10 border-luxury-purple/20 text-luxury-purple'
            }`}
          >
            {intelligence.motivation.type === 'streak_recovery' ? <Flame className="w-5 h-5 text-red-400" /> : <Check className="w-5 h-5" />}
            <span className="font-medium text-sm">{intelligence.motivation.message}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-4">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-luxury-purple"/> Daily Study</div>
            <div className="text-2xl font-bold text-text-main">{studyStats?.dailyTime || 0} <span className="text-sm font-normal text-text-muted">min</span></div>
          </div>
          <div className="glass-card p-4">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-luxury-purple"/> Weekly Study</div>
            <div className="text-2xl font-bold text-text-main">{studyStats?.weeklyTime || 0} <span className="text-sm font-normal text-text-muted">min</span></div>
          </div>
          <div className="glass-card p-4">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center gap-2"><Flame className="w-4 h-4 text-luxury-gold"/> Current Streak</div>
            <div className="text-2xl font-bold text-text-main">{studyStats?.streak || 0} <span className="text-sm font-normal text-text-muted">Days</span></div>
          </div>
          <div className="glass-card p-4">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-green-500"/> Total Sessions</div>
            <div className="text-2xl font-bold text-text-main">{studyStats?.sessionsCount || 0}</div>
          </div>
          <div className="glass-card p-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-luxury-purple" /> Health Score
            </div>
            <div className="text-2xl font-bold text-text-main flex items-end gap-1">
              {intelligence?.healthScore ?? 0}
              <span className="text-xs text-text-muted font-normal mb-1">/100</span>
            </div>
          </div>
        </div>

        {/* Social Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-4">
            <div className="text-text-muted text-[10px] uppercase tracking-wider mb-2">Friends</div>
            <div className="text-xl font-bold text-text-main">{friends?.length || 0}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-text-muted text-[10px] uppercase tracking-wider mb-2">Pending Requests</div>
            <div className="text-xl font-bold text-text-main text-luxury-gold">{pendingRequests?.length || 0}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-text-muted text-[10px] uppercase tracking-wider mb-2">Shared Roadmaps</div>
            <div className="text-xl font-bold text-text-main text-blue-400">{sharedRoadmaps?.length || 0}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-text-muted text-[10px] uppercase tracking-wider mb-2">Unread Alerts</div>
            <div className="text-xl font-bold text-text-main text-red-400">{notifications?.filter((n: any) => !n.read).length || 0}</div>
          </div>
          <div className="glass-card p-4 bg-luxury-gold/5 border-luxury-gold/20">
            <div className="text-luxury-gold text-[10px] uppercase tracking-wider mb-2">Global Rank</div>
            <div className="text-xl font-bold text-luxury-gold">
              {globalLeaderboard ? (
                (() => {
                  const rank = globalLeaderboard.findIndex((s: any) => s.userId === user?._id);
                  return rank !== -1 ? `#${rank + 1}` : 'Unranked';
                })()
              ) : '...'}
            </div>
          </div>
        </div>

        {roadmaps === undefined ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
          </div>
        ) : !activeRoadmap || !activeRoadmap.careerPath ? (
          <div className="glass-card flex flex-col items-center justify-center py-20 text-center mx-4 lg:mx-0">
            <div className="w-16 h-16 rounded-full bg-text-main/5 border border-text-main/10 flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-text-muted" />
            </div>
            <h3 className="text-2xl font-bold text-text-main mb-4">No Active Roadmaps</h3>
            <p className="text-text-muted max-w-md mx-auto mb-8">
              You haven't generated any career roadmaps yet. Start your journey by generating a personalized path or creating your own.
            </p>
            <div className="flex gap-4">
              <Link to="/generator" className="btn-premium px-8 py-3">
                Generate My Roadmap
              </Link>
              <Link to="/create" className="btn-premium-secondary px-8 py-3">
                Create Custom Roadmap
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar / Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card">
                <div className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-4">Current Target</div>
                <h3 className="text-xl font-bold text-text-main mb-6">{activeRoadmap.careerPath.title}</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-muted">Progress</span>
                    <span className="text-text-main font-mono">{activeRoadmap.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-text-main/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-luxury-purple"
                      initial={{ width: 0 }}
                      animate={{ width: `${activeRoadmap.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-text-main/5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Difficulty</span>
                    <span className="text-luxury-gold font-mono">{activeRoadmap.careerPath.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Est. Duration</span>
                    <span className="text-text-main font-mono">{activeRoadmap.careerPath.duration}</span>
                  </div>
                </div>
              </div>
              
              <Link to={`/roadmap/${activeRoadmap._id}`} className="glass-card flex items-center justify-between group cursor-pointer hover:bg-text-main/5">
                <span className="text-sm font-semibold text-text-main">View Full Roadmap</span>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-text-main transition-colors" />
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {intelligence?.dailyPlan ? (
                <div className="glass-card border-luxury-purple/30 bg-gradient-to-b from-luxury-purple/5 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Target className="w-24 h-24 text-luxury-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-main mb-2 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-luxury-purple animate-pulse"></span>
                    Smart Daily Planner
                  </h3>
                  <p className="text-sm text-text-muted mb-6">Based on your {studyStats?.dailyTime || 0}m daily goal, here is your objective for today from <strong>{intelligence.dailyPlan.roadmapTitle}</strong>:</p>
                  
                  <div className="space-y-3 relative z-10">
                    {intelligence.dailyPlan.topics.map((topic, i) => (
                      <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-4 hover:border-luxury-purple/50 transition-colors">
                        <div className="w-6 h-6 rounded-full border border-luxury-purple/50 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 bg-luxury-purple rounded-full"></div>
                        </div>
                        <span className="text-text-main font-medium">{topic}</span>
                      </div>
                    ))}
                    <div className="pt-4 flex justify-end">
                      <Link to="/timer" className="btn-premium px-6 py-2 text-sm flex items-center gap-2">
                        Start Session <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card">
                  <h3 className="text-lg font-semibold text-text-main mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    All Caught Up!
                  </h3>
                  <p className="text-sm text-text-muted">You have completed all topics in your active roadmaps. Great job!</p>
                </div>
              )}
            </div>

            {/* Activity Feed */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-text-main mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {activities === undefined ? (
                    <Loader2 className="w-5 h-5 text-luxury-purple animate-spin" />
                  ) : activities.length === 0 ? (
                    <p className="text-text-muted text-sm font-light">No recent activity.</p>
                  ) : (
                    activities.map((activity: any, index: number) => (
                      <div key={index} className="pb-4 border-b border-text-main/5 last:border-0 last:pb-0">
                        <div className="text-xs text-luxury-purple font-semibold mb-1">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-text-main font-medium">{activity.title}</div>
                        {activity.description && <div className="text-xs text-text-muted mt-1">{activity.description}</div>}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Time by Topic Analytics */}
              <div className="glass-card mt-6">
                <h3 className="text-lg font-semibold text-text-main mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-luxury-gold" /> Topic Analytics
                </h3>
                {timeByTopic === undefined ? (
                  <div className="flex justify-center"><Loader2 className="w-5 h-5 text-luxury-purple animate-spin" /></div>
                ) : timeByTopic.length === 0 ? (
                  <p className="text-sm text-text-muted">No topic data available yet.</p>
                ) : (
                  <div className="space-y-4">
                    {timeByTopic.slice(0, 5).map((item: any, i: number) => {
                      const maxDuration = Math.max(timeByTopic[0].duration, 1);
                      const percentage = Math.round((item.duration / maxDuration) * 100);
                      
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-main truncate max-w-[70%]">{item.topic}</span>
                            <span className="text-text-muted font-mono">{item.duration}m</span>
                          </div>
                          <div className="h-1.5 w-full bg-text-main/5 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-luxury-gold"
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* NIMCET Specialization */}
        {activeRoadmap && activeRoadmap.careerPath && activeRoadmap.careerPath.title.toLowerCase().includes("nimcet") && (
          <NIMCETDashboard />
        )}

        {/* AI Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-light text-text-main mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-luxury-purple" />
              Recommended Next Steps
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((rec, i) => (
                <div key={i} className="glass-card hover:border-luxury-purple/30 transition-colors group cursor-pointer relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-luxury-purple/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                  <h4 className="text-lg font-semibold text-text-main mb-2">{rec.title}</h4>
                  <p className="text-sm text-text-muted mb-4">{rec.reason}</p>
                  <Link to={`/generator?preset=${rec.title.toLowerCase().replace(/ /g, '-')}`} className="text-luxury-purple text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Generate Roadmap <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
