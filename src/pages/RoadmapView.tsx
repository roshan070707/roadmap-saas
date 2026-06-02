import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, Loader2, PlayCircle, FileText, ExternalLink, Share2, Copy, ChevronDown, Briefcase, Zap, TrendingUp, Code2, FileCode, CheckCircle2, X } from 'lucide-react';
import type { Id } from '../../convex/_generated/dataModel';

// Predefined deterministic insights mapped by career keyword
const CAREER_INSIGHTS: Record<string, { salary: string; demand: string; skills: string[] }> = {
  "Full Stack": { salary: "$100k - $160k", demand: "Very High", skills: ["System Design", "Databases", "APIs"] },
  "Data Scientist": { salary: "$120k - $180k", demand: "High", skills: ["Machine Learning", "Statistics", "Python"] },
  "Cyber Security": { salary: "$110k - $170k", demand: "Very High", skills: ["Cryptography", "Network Security", "Ethical Hacking"] },
  "AI Engineer": { salary: "$140k - $220k", demand: "Extremely High", skills: ["Deep Learning", "NLP", "Neural Networks"] },
  "NIMCET": { salary: "Top MCA Placements", demand: "Competitive", skills: ["Advanced Math", "Logical Reasoning", "Speed & Accuracy"] },
};

function getInsights(title: string) {
  for (const [key, value] of Object.entries(CAREER_INSIGHTS)) {
    if (title.includes(key)) return value;
  }
  return { salary: "Varies by region", demand: "Growing", skills: ["Problem Solving", "Core Fundamentals", "Adaptability"] };
}

export default function RoadmapView() {
  const { id } = useParams();
  const roadmap = useQuery(api.roadmaps.getRoadmapById, { id: id as Id<"userRoadmaps"> });
  const togglePublic = useMutation(api.roadmaps.togglePublicStatus);
  const verifyTopic = useMutation(api.roadmaps.verifyTopicCompletion);
  const [isCopied, setIsCopied] = useState(false);
  
  // Verification Modal State
  const [verifyingTopic, setVerifyingTopic] = useState<string | null>(null);
  const [submissionType, setSubmissionType] = useState<string>('github');
  const [submissionContent, setSubmissionContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track expanded steps
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});

  // Auto-expand first incomplete step
  useEffect(() => {
    if (roadmap?.careerPath?.roadmapSteps) {
      let firstIncomplete = -1;
      roadmap.careerPath.roadmapSteps.forEach((step: any, index: number) => {
        const isCompleted = step.topics && step.topics.length > 0 && step.topics.every((t: string) => (roadmap.completedTopics ?? []).includes(t));
        if (!isCompleted && firstIncomplete === -1) {
          firstIncomplete = index;
        }
      });
      if (firstIncomplete !== -1) {
        setExpandedSteps(prev => ({ ...prev, [firstIncomplete]: true }));
      } else {
        // If all complete, expand first
        setExpandedSteps(prev => ({ ...prev, 0: true }));
      }
    }
  }, [roadmap?.careerPath?.roadmapSteps]);

  const toggleStep = (index: number) => {
    setExpandedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (roadmap === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
      </div>
    );
  }

  if (roadmap === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-bg pt-20">
        <h2 className="text-2xl font-bold text-text-main mb-4">Roadmap Not Found</h2>
        <Link to="/dashboard" className="text-luxury-purple hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  if (!roadmap.careerPath) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <h2 className="text-2xl font-bold text-text-main">Career Path Data Missing</h2>
      </div>
    );
  }

  const handleToggle = async (topicName: string, currentStatus: boolean) => {
    if (!roadmap.isOwner || currentStatus) return; // Only allow verifying, not un-verifying
    setVerifyingTopic(topicName);
    setSubmissionContent('');
  };

  const handleVerifySubmit = async () => {
    if (!verifyingTopic || !submissionContent) return;
    setIsSubmitting(true);
    try {
      await verifyTopic({
        roadmapId: roadmap._id,
        topicName: verifyingTopic,
        submissionType,
        submissionContent
      });
      setVerifyingTopic(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (!roadmap.isPublic) {
      await togglePublic({ roadmapId: roadmap._id, isPublic: true });
    }
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-8 text-sm font-semibold uppercase tracking-wider group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-16 relative">
          <div className="absolute top-0 right-0">
            {roadmap.isOwner && (
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-text-main/5 hover:bg-text-main/10 rounded-full text-sm font-semibold text-text-main transition-colors border border-text-main/10 hover:border-text-main/20 shadow-sm"
              >
                {isCopied ? <Copy className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                {isCopied ? 'Link Copied!' : (roadmap.isPublic ? 'Share Link' : 'Make Public & Share')}
              </button>
            )}
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-xs font-bold uppercase tracking-widest mb-6 mt-8 md:mt-0">
            Premium Journey
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 tracking-tight">
            {roadmap.careerPath.title}
          </h1>
          <p className="text-xl text-text-muted font-light leading-relaxed max-w-2xl">
            {roadmap.careerPath.description}
          </p>
          
          <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-text-main/5">
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Estimated Duration</div>
              <div className="text-lg font-mono text-text-main">{roadmap.careerPath.duration}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Difficulty</div>
              <div className="text-lg font-mono text-text-main">{roadmap.careerPath.difficulty}</div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between items-end mb-2">
                <div className="text-xs text-text-muted uppercase tracking-wider">Current Progress</div>
                <div className="text-lg font-mono text-luxury-purple font-bold">{roadmap.progress}%</div>
              </div>
              <div className="h-2 w-full bg-text-main/5 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full bg-gradient-to-r from-luxury-purple to-luxury-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${roadmap.progress}%` }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like easing
                />
              </div>
            </div>
          </div>
        </div>

        {/* Career Insights Panel */}
        <div className="mb-16 grid md:grid-cols-3 gap-4">
          {(() => {
            const insights = getInsights(roadmap.careerPath.title);
            return (
              <>
                <div className="glass-card p-6 bg-gradient-to-br from-luxury-purple/10 to-transparent border-luxury-purple/20">
                  <div className="text-luxury-purple text-xs uppercase tracking-wider mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Market Demand</div>
                  <div className="text-xl font-bold text-text-main">{insights.demand}</div>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
                  <div className="text-green-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Avg. Compensation</div>
                  <div className="text-xl font-bold text-text-main">{insights.salary}</div>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-luxury-gold/10 to-transparent border-luxury-gold/20">
                  <div className="text-luxury-gold text-xs uppercase tracking-wider mb-3 flex items-center gap-2"><Zap className="w-4 h-4" /> Key Skills Gained</div>
                  <div className="flex flex-wrap gap-2">
                    {insights.skills.map((s, i) => (
                      <span key={i} className="text-xs font-semibold px-2 py-1 bg-white/5 border border-white/10 rounded text-text-main">{s}</span>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        {/* Skill Tree Network Visualization */}
        <div className="relative mt-20 max-w-2xl mx-auto py-12">
          
          {/* SVG connecting lines for the Skill Tree */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {roadmap.careerPath!.roadmapSteps?.map((_: any, index: number) => {
              if (index === roadmap.careerPath!.roadmapSteps.length - 1) return null;
              
              const isEven = index % 2 === 0;
              // X positions: 20% or 80% (zigzag)
              const x1 = isEven ? '30%' : '70%';
              const x2 = isEven ? '70%' : '30%';
              
              // Y positions based on height (approximate spacing)
              const nodeHeight = 220; // roughly 220px per node vertically
              const y1 = index * nodeHeight + 80;
              const y2 = (index + 1) * nodeHeight + 80;

              return (
                <path
                  key={index}
                  d={`M ${x1} ${y1} C ${x1} ${y2}, ${x2} ${y1}, ${x2} ${y2}`}
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  className="text-text-main/10"
                />
              );
            })}
          </svg>

          {roadmap.careerPath?.roadmapSteps?.map((step: any, index: number) => {
            const completedTopicsInStep = step.topics.filter((t: string) => (roadmap.completedTopics ?? []).includes(t));
            const isStepCompleted = completedTopicsInStep.length === step.topics.length && step.topics.length > 0;
            const isExpanded = !!expandedSteps[index];
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className={`relative z-10 flex ${isEven ? 'justify-start' : 'justify-end'} mb-16`}
              >
                <div className={`w-[85%] md:w-[70%] glass-card transition-all duration-300 ${
                    isExpanded 
                      ? 'border-luxury-purple/40 shadow-[0_10px_40px_rgba(139,92,246,0.2)] ring-1 ring-luxury-purple/20' 
                      : 'border-text-main/10 hover:border-luxury-purple/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] cursor-pointer'
                  } overflow-hidden`}
                >
                  
                  {/* Step Header (Always Visible) */}
                  <div 
                    className="p-6 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer relative overflow-hidden"
                    onClick={() => toggleStep(index)}
                  >
                    {isStepCompleted && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-purple/20 blur-[50px] pointer-events-none"></div>
                    )}
                    
                    <div className="shrink-0 relative">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                        isStepCompleted 
                          ? 'bg-gradient-to-br from-luxury-purple to-luxury-gold text-white shadow-luxury-purple/30 scale-105' 
                          : 'bg-text-main/5 border border-white/5 text-text-muted group-hover:bg-text-main/10'
                      }`}>
                        {isStepCompleted ? <Check className="w-6 h-6" /> : <div className="font-mono font-bold text-lg">{index + 1}</div>}
                      </div>
                    </div>

                    <div className="flex-1 relative z-10">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className="text-xs font-mono text-luxury-gold uppercase tracking-wider">{step.phase}</div>
                        <div className="text-[10px] text-text-main font-semibold uppercase tracking-widest bg-text-main/5 border border-white/5 px-2.5 py-1 rounded-full backdrop-blur-md">
                          {step.duration}
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold tracking-tight transition-colors ${isStepCompleted ? 'text-text-main line-through decoration-text-main/30' : 'text-text-main'}`}>
                        {step.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-text-muted font-light mt-2 line-clamp-1 text-sm">
                          {step.description}
                        </p>
                      )}
                    </div>

                    <div className={`shrink-0 ml-auto transition-transform duration-500 ease-[0.16,1,0.3,1] ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-luxury-purple' : 'text-text-muted'}`} />
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="px-6 pb-6 relative z-10"
                      >
                        <p className="text-text-muted leading-relaxed font-light mb-8 pt-2 border-t border-white/5">
                          {step.description}
                        </p>
                        
                        {/* Topics */}
                        {step.topics && step.topics.length > 0 && (
                          <div className="mb-8 space-y-3">
                            <h4 className="text-xs font-semibold text-text-main uppercase tracking-widest mb-4 flex items-center gap-3">
                              <span className="w-6 h-[1px] bg-luxury-purple"></span> Topics to Master
                            </h4>
                            {step.topics.map((topic: string, tIndex: number) => {
                              const isCompleted = (roadmap.completedTopics ?? []).includes(topic);
                              return (
                                <motion.div 
                                  whileHover={{ scale: roadmap.isOwner ? 1.01 : 1, x: roadmap.isOwner ? 4 : 0 }}
                                  whileTap={{ scale: roadmap.isOwner ? 0.99 : 1 }}
                                  key={tIndex}
                                  onClick={() => handleToggle(topic, isCompleted)}
                                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${roadmap.isOwner ? 'cursor-pointer' : 'cursor-default'} ${
                                    isCompleted ? 'bg-luxury-purple/5 border-luxury-purple/20' : 'bg-transparent border-text-main/10 hover:border-luxury-purple/40 hover:bg-text-main/5'
                                  }`}
                                >
                                  <div className={`relative w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                                    isCompleted ? 'bg-luxury-purple border-luxury-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'border-text-muted group-hover:border-luxury-purple'
                                  }`}>
                                    <AnimatePresence>
                                      {isCompleted && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                          <Check className="w-3.5 h-3.5" />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  <span className={`text-sm font-medium transition-colors duration-300 ${isCompleted ? 'text-text-muted line-through' : 'text-text-main'}`}>
                                    {topic}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}

                        {/* Resources */}
                        {step.resources && step.resources.length > 0 && (
                          <div className="pt-6 border-t border-text-main/5">
                            <h4 className="text-xs font-semibold text-text-main uppercase tracking-widest mb-4 flex items-center gap-3">
                              <span className="w-6 h-[1px] bg-luxury-gold"></span> Curated Resources
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                              {step.resources.map((resource: any, rIndex: number) => (
                                <a 
                                  key={rIndex}
                                  href={resource.url || "#"}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-text-main/10 bg-text-main/5 hover:bg-text-main/10 transition-all"
                                >
                                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-text-main group-hover:text-luxury-gold transition-colors shadow-sm">
                                    {resource.type === 'Video' ? <PlayCircle className="w-4 h-4" /> : 
                                     resource.type === 'Documentation' || resource.type === 'Doc' ? <FileText className="w-4 h-4" /> : 
                                     <ExternalLink className="w-4 h-4" />}
                                  </div>
                                  <span className="text-sm font-semibold text-text-main line-clamp-1">{resource.name}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Verification Modal */}
      <AnimatePresence>
        {verifyingTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setVerifyingTopic(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-card border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-purple to-luxury-gold"></div>
              
              <button 
                onClick={() => setVerifyingTopic(null)}
                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-text-main mb-2 tracking-tight">Verify Learning</h3>
              <p className="text-text-muted text-sm mb-6">
                Prove your mastery of <span className="text-luxury-purple font-semibold">{verifyingTopic}</span> before marking it complete.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setSubmissionType('github')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${submissionType === 'github' ? 'bg-luxury-purple/10 border-luxury-purple shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                >
                  <Code2 className={`w-6 h-6 mb-2 ${submissionType === 'github' ? 'text-luxury-purple' : 'text-text-muted'}`} />
                  <span className={`text-xs font-semibold ${submissionType === 'github' ? 'text-white' : 'text-text-muted'}`}>Project Repo</span>
                </button>
                <button 
                  onClick={() => setSubmissionType('notes')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${submissionType === 'notes' ? 'bg-luxury-gold/10 border-luxury-gold shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                >
                  <FileCode className={`w-6 h-6 mb-2 ${submissionType === 'notes' ? 'text-luxury-gold' : 'text-text-muted'}`} />
                  <span className={`text-xs font-semibold ${submissionType === 'notes' ? 'text-white' : 'text-text-muted'}`}>Study Notes</span>
                </button>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-widest mb-2">
                  {submissionType === 'github' ? 'Repository URL' : 'Key Takeaways'}
                </label>
                {submissionType === 'github' ? (
                  <input 
                    type="url"
                    placeholder="https://github.com/username/project"
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-text-main placeholder-text-muted/50 focus:outline-none focus:border-luxury-purple transition-colors"
                  />
                ) : (
                  <textarea 
                    rows={4}
                    placeholder="What are the 3 most important things you learned?"
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-text-main placeholder-text-muted/50 focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                  />
                )}
              </div>

              <button 
                onClick={handleVerifySubmit}
                disabled={!submissionContent.trim() || isSubmitting}
                className="w-full btn-premium py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                {isSubmitting ? 'Verifying...' : 'Submit Proof of Work'}
              </button>
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
