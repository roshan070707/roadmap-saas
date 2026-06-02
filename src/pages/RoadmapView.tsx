import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Loader2, PlayCircle, FileText, ExternalLink, Share2, Copy } from 'lucide-react';
import type { Id } from '../../convex/_generated/dataModel';

const RoadmapView = () => {
  const { id } = useParams();
  const roadmap = useQuery(api.roadmaps.getRoadmapById, { id: id as Id<"userRoadmaps"> });
  const toggleTopic = useMutation(api.roadmaps.toggleTopicCompletion);
  const togglePublic = useMutation(api.roadmaps.togglePublicStatus);
  const [isCopied, setIsCopied] = useState(false);

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
    // Only owner can toggle completion
    if (!roadmap.isOwner) return;
    
    await toggleTopic({
      roadmapId: roadmap._id,
      topicName,
      isCompleted: !currentStatus
    });
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
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-8 text-sm font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-16 relative">
          <div className="absolute top-0 right-0">
            {roadmap.isOwner && (
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-text-main/5 hover:bg-text-main/10 rounded-full text-sm font-semibold text-text-main transition-colors border border-text-main/10"
              >
                {isCopied ? <Copy className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                {isCopied ? 'Link Copied!' : (roadmap.isPublic ? 'Share Link' : 'Make Public & Share')}
              </button>
            )}
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-xs font-bold uppercase tracking-widest mb-6 mt-8 md:mt-0">
            Generated Roadmap
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
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
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Current Progress</div>
              <div className="text-lg font-mono text-luxury-purple">{roadmap.progress}%</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-text-main/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {roadmap.careerPath?.roadmapSteps?.map((step: any, index: number) => {
            const completedTopicsInStep = step.topics.filter((t: string) => (roadmap.completedTopics ?? []).includes(t));
            const isStepCompleted = completedTopicsInStep.length === step.topics.length && step.topics.length > 0;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div 
                  className={`absolute -left-[45px] md:-left-[61px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all bg-luxury-bg z-10 ${
                    isStepCompleted 
                      ? 'border-luxury-purple bg-luxury-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                      : 'border-text-main/20 group-hover:border-luxury-purple/50'
                  }`}
                >
                  {isStepCompleted && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className={`glass-card transition-all duration-300 border-text-main/10 hover:border-luxury-purple/30`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-mono text-luxury-gold uppercase tracking-wider">{step.phase}</div>
                    <div className="text-xs text-text-muted font-medium uppercase tracking-wider">
                      {step.duration}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isStepCompleted ? 'text-text-muted' : 'text-text-main'}`}>
                    {step.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed font-light mb-6">
                    {step.description}
                  </p>
                  
                  {/* Topics */}
                  {step.topics && step.topics.length > 0 && (
                    <div className="mb-6 space-y-2">
                      <h4 className="text-sm font-semibold text-text-main mb-3">Topics</h4>
                      {step.topics.map((topic: string, tIndex: number) => {
                        const isCompleted = (roadmap.completedTopics ?? []).includes(topic);
                        return (
                          <div 
                            key={tIndex}
                            onClick={() => handleToggle(topic, isCompleted)}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${roadmap.isOwner ? 'cursor-pointer' : 'cursor-default'} ${
                              isCompleted ? 'bg-text-main/5 border-text-main/10' : 'bg-transparent border-text-main/5 hover:border-luxury-purple/30'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                              isCompleted ? 'bg-luxury-purple border-luxury-purple text-white' : 'border-text-muted'
                            }`}>
                              {isCompleted && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className={`text-sm ${isCompleted ? 'text-text-muted line-through' : 'text-text-main'}`}>
                              {topic}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Resources */}
                  {step.resources && step.resources.length > 0 && (
                    <div className="pt-4 border-t border-text-main/5">
                      <h4 className="text-sm font-semibold text-text-main mb-3">Resources</h4>
                      <div className="flex flex-wrap gap-3">
                        {step.resources.map((resource: any, rIndex: number) => (
                          <a 
                            key={rIndex}
                            href={resource.url || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-text-main/5 border border-text-main/10 hover:bg-text-main/10 transition-colors text-xs font-medium text-text-main"
                          >
                            {resource.type === 'Video' ? <PlayCircle className="w-3.5 h-3.5" /> : 
                             resource.type === 'Documentation' || resource.type === 'Doc' ? <FileText className="w-3.5 h-3.5" /> : 
                             <ExternalLink className="w-3.5 h-3.5" />}
                            {resource.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default RoadmapView;
