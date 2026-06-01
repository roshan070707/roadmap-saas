import { motion } from 'framer-motion';
import { Check, Circle, Activity, ChevronRight, Lock } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <section id="platform" className="py-32 relative bg-luxury-bg border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-luxury-purple text-sm font-semibold tracking-[0.2em] uppercase mb-4">Platform</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Command Center for <span className="font-light text-text-muted">Your Career</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Experience a frictionless, distraction-free interface designed for absolute focus. Track velocity, conquer milestones, and monitor your skill acquisition in real-time.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto rounded-[2rem] p-px bg-gradient-to-b from-white/10 via-white/5 to-transparent"
        >
          <div className="bg-[#080808] rounded-[2rem] overflow-hidden shadow-2xl relative">
            
            {/* Top Bar */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#050505]">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                </div>
                <div className="w-px h-4 bg-white/10 mx-2"></div>
                <div className="text-xs font-mono text-text-muted tracking-wider flex items-center gap-2">
                  <Lock className="w-3 h-3" /> ROADMAP / WORKSPACE
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-luxury-purple/10 text-luxury-purple text-xs font-semibold rounded-md border border-luxury-purple/20">
                  Sprint 4 Active
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20"></div>
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="grid md:grid-cols-4 h-full min-h-[500px]">
              
              {/* Sidebar */}
              <div className="hidden md:block border-r border-white/5 bg-[#050505] p-6 space-y-8">
                <div>
                  <div className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-4">Progress</div>
                  <div className="text-3xl font-light text-white mb-2">72<span className="text-text-muted text-xl">%</span></div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-luxury-purple w-[72%] relative">
                      <div className="absolute inset-0 bg-white/20 w-1/2 animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-4">Metrics</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted font-light">Velocity</span>
                      <span className="text-sm text-white font-mono flex items-center gap-1"><Activity className="w-3 h-3 text-luxury-gold" /> High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted font-light">Focus Time</span>
                      <span className="text-sm text-white font-mono">24h 12m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted font-light">Modules</span>
                      <span className="text-sm text-white font-mono">18/25</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-3 p-8 bg-[#080808]">
                <h3 className="text-xl font-light mb-8 text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-luxury-purple animate-pulse"></span>
                  Current Objective: <span className="font-semibold">Advanced Systems Design</span>
                </h3>

                <div className="space-y-3 relative">
                  {/* Task line background */}
                  <div className="absolute left-6 top-6 bottom-6 w-px bg-white/5"></div>

                  {/* Task 1 */}
                  <div className="relative flex items-center gap-6 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                    <div className="w-6 h-6 rounded-full bg-white/10 text-text-muted flex items-center justify-center shrink-0 z-10 border border-white/5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-text-muted line-through font-light">Study CAP Theorem</div>
                    </div>
                  </div>

                  {/* Task 2 Active */}
                  <div className="relative flex items-center gap-6 p-4 rounded-xl border border-luxury-purple/30 bg-luxury-purple/5 shadow-[0_0_15px_rgba(139,92,246,0.05)] transition-all">
                    <div className="w-6 h-6 rounded-full bg-luxury-purple flex items-center justify-center shrink-0 z-10 shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium mb-1">Implement Raft Consensus Algorithm in Go</div>
                      <div className="text-xs text-text-muted font-light flex items-center gap-3">
                        <span className="flex items-center gap-1"><Circle className="w-3 h-3 fill-luxury-gold text-luxury-gold" /> Estimated: 4h</span>
                        <span>•</span>
                        <span className="text-luxury-purple">Resource: MIT 6.824</span>
                      </div>
                    </div>
                    <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Task 3 */}
                  <div className="relative flex items-center gap-6 p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-colors group opacity-50">
                    <div className="w-6 h-6 rounded-full bg-transparent border border-white/20 flex items-center justify-center shrink-0 z-10"></div>
                    <div className="flex-1">
                      <div className="text-sm text-text-muted font-light group-hover:text-white transition-colors">Distributed Caching Patterns</div>
                    </div>
                  </div>
                  
                  {/* Task 4 */}
                  <div className="relative flex items-center gap-6 p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-colors group opacity-50">
                    <div className="w-6 h-6 rounded-full bg-transparent border border-white/20 flex items-center justify-center shrink-0 z-10"></div>
                    <div className="flex-1">
                      <div className="text-sm text-text-muted font-light group-hover:text-white transition-colors">Message Queues & Event Streaming</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-luxury-purple/50 to-transparent blur-sm"></div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default DashboardPreview;
