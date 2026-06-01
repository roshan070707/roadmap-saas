import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '@convex-dev/auth/react';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';

const questions = [
  {
    id: 'degree',
    title: 'What is your current degree?',
    options: ['BCA', 'BSc', 'BTech', 'Other']
  },
  {
    id: 'semester',
    title: 'Which semester are you in?',
    options: ['1st - 2nd', '3rd - 4th', '5th - 6th', '7th - 8th', 'Graduated']
  },
  {
    id: 'skills',
    title: 'Select your current skill level.',
    options: ['Absolute Beginner', 'Some Basics (HTML/CSS/C++)', 'Intermediate (Built Projects)', 'Advanced']
  },
  {
    id: 'targetCareer',
    title: 'Select your target career path.',
    options: ['MCA via NIMCET', 'Full Stack Developer', 'Cyber Security', 'Data Analyst', 'AI Engineer', 'Software Engineer']
  },
  {
    id: 'studyHours',
    title: 'Available study hours per day?',
    options: ['1 - 2 Hours', '3 - 4 Hours', '5 - 6 Hours', '8+ Hours']
  }
];

const RoadmapGenerator = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAuthenticated } = useConvexAuth();
  const { signIn } = useAuthActions();
  const generateRoadmap = useMutation(api.roadmaps.generateRoadmap);
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    const currentQ = questions[step];
    setFormData(prev => ({ ...prev, [currentQ.id]: option }));
  };

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      if (!isAuthenticated) {
        // If not authenticated, require sign in before generating
        void signIn("google");
        return;
      }
      
      setIsSubmitting(true);
      try {
        const roadmapId = await generateRoadmap({
          degree: formData.degree || '',
          semester: formData.semester || '',
          skills: formData.skills || '',
          targetCareer: formData.targetCareer || '',
          studyHours: formData.studyHours || '',
        });
        navigate(`/roadmap/${roadmapId}`);
      } catch (error) {
        console.error("Failed to generate roadmap", error);
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const currentQ = questions[step];
  const isSelected = (option: string) => formData[currentQ.id] === option;
  const canProceed = !!formData[currentQ.id];

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-12 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-2xl w-full relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
            <span>Step {step + 1} of {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-luxury-purple"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-card min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-light text-white mb-8">{currentQ.title}</h2>
              
              <div className="grid gap-4">
                {currentQ.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected(option) 
                        ? 'border-luxury-purple bg-luxury-purple/10 shadow-[0_0_20px_rgba(139,92,246,0.1)] text-white' 
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5 text-text-muted'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    {isSelected(option) && <Check className="w-5 h-5 text-luxury-purple" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t border-white/5">
            <button
              onClick={handleBack}
              disabled={step === 0 || isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                step === 0 ? 'opacity-50 cursor-not-allowed text-text-muted' : 'text-white hover:bg-white/5'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className={`btn-premium px-8 py-3 flex items-center gap-2 ${
                !canProceed || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>Generating... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : step === questions.length - 1 ? (
                isAuthenticated ? 'Generate Roadmap' : 'Sign in to Generate'
              ) : (
                <>Next <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;
