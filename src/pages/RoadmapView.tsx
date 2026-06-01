import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Loader2 } from 'lucide-react';
import type { Id } from '../../convex/_generated/dataModel';

const RoadmapView = () => {
  const { id } = useParams();
  const roadmap = useQuery(api.roadmaps.getRoadmapById, { id: id as Id<"userRoadmaps"> });
  const toggleStep = useMutation(api.roadmaps.toggleStepCompletion);

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
        <h2 className="text-2xl font-bold text-white mb-4">Roadmap Not Found</h2>
        <Link to="/dashboard" className="text-luxury-purple hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  if (!roadmap.careerPath) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <h2 className="text-2xl font-bold text-white">Career Path Data Missing</h2>
      </div>
    );
  }

  const handleToggle = async (stepTitle: string, currentStatus: boolean) => {
    await toggleStep({
      roadmapId: roadmap._id,
      stepTitle,
      isCompleted: !currentStatus
    });
  };

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-8 text-sm font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-xs font-bold uppercase tracking-widest mb-6">
            Generated Roadmap
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {roadmap.careerPath.title}
          </h1>
          <p className="text-xl text-text-muted font-light leading-relaxed max-w-2xl">
            {roadmap.careerPath.description}
          </p>
          
          <div className="flex gap-8 mt-8 pt-8 border-t border-white/5">
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Estimated Duration</div>
              <div className="text-lg font-mono text-white">{roadmap.careerPath.duration}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Difficulty</div>
              <div className="text-lg font-mono text-white">{roadmap.careerPath.difficulty}</div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Current Progress</div>
              <div className="text-lg font-mono text-luxury-purple">{roadmap.progress}%</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {roadmap.careerPath.roadmapSteps.map((step: any, index: number) => {
            const isCompleted = roadmap.completedSteps.includes(step.title);
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <button 
                  onClick={() => handleToggle(step.title, isCompleted)}
                  className={`absolute -left-[45px] md:-left-[61px] w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all bg-luxury-bg z-10 ${
                    isCompleted 
                      ? 'border-luxury-purple bg-luxury-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                      : 'border-white/20 group-hover:border-luxury-purple/50'
                  }`}
                >
                  {isCompleted && <Check className="w-3.5 h-3.5" />}
                </button>

                <div className={`glass-card transition-all duration-300 cursor-pointer ${
                  isCompleted ? 'opacity-60 hover:opacity-100' : 'border-white/10 hover:border-luxury-purple/30'
                }`}
                onClick={() => handleToggle(step.title, isCompleted)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-mono text-luxury-gold uppercase tracking-wider">{step.phase}</div>
                    <div className="text-xs text-text-muted font-medium uppercase tracking-wider">
                      {isCompleted ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isCompleted ? 'text-text-muted line-through' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed font-light">
                    {step.description}
                  </p>
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
