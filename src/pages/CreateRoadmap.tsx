import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Loader2, Save } from 'lucide-react';

export default function CreateRoadmap() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  
  const [steps, setSteps] = useState([
    { phase: 'Phase 1', title: '', description: '', duration: '', topics: [''], resources: [] as any[] }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createRoadmap = useMutation(api.roadmaps.createCustomRoadmap);
  const navigate = useNavigate();

  const handleAddStep = () => {
    setSteps([...steps, { phase: `Phase ${steps.length + 1}`, title: '', description: '', duration: '', topics: [''], resources: [] }]);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    // Renumber phases
    newSteps.forEach((s, i) => s.phase = `Phase ${i + 1}`);
    setSteps(newSteps);
  };

  const handleStepChange = (index: number, field: string, value: string) => {
    const newSteps = [...steps];
    (newSteps[index] as any)[field] = value;
    setSteps(newSteps);
  };

  const handleAddTopic = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].topics.push('');
    setSteps(newSteps);
  };

  const handleTopicChange = (stepIndex: number, topicIndex: number, value: string) => {
    const newSteps = [...steps];
    newSteps[stepIndex].topics[topicIndex] = value;
    setSteps(newSteps);
  };

  const handleRemoveTopic = (stepIndex: number, topicIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].topics.splice(topicIndex, 1);
    setSteps(newSteps);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !duration || steps.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const cleanedSteps = steps.map(step => ({
        ...step,
        topics: step.topics.filter(t => t.trim() !== ''),
        resources: step.resources.filter(r => r.name.trim() !== '')
      }));

      const roadmapId = await createRoadmap({
        title,
        description,
        duration,
        roadmapSteps: cleanedSteps
      });
      navigate(`/roadmap/${roadmapId}`);
    } catch (error) {
      console.error("Failed to create roadmap", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-8 text-sm font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-main mb-4">Create Custom Roadmap</h1>
          <p className="text-text-muted">Design a personalized learning path tailored exactly to your goals.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Info */}
          <div className="glass-card p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Roadmap Title</label>
              <input 
                required
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Senior Go Developer"
                className="w-full bg-text-main/5 border border-text-main/10 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple transition-colors"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Estimated Duration</label>
                <input 
                  required
                  type="text" 
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  placeholder="e.g., 6 Months"
                  className="w-full bg-text-main/5 border border-text-main/10 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Description</label>
              <textarea 
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What is the ultimate goal of this roadmap?"
                rows={3}
                className="w-full bg-text-main/5 border border-text-main/10 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple transition-colors"
              />
            </div>
          </div>

          {/* Steps / Chapters */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-main">Chapters & Topics</h2>
              <button 
                type="button"
                onClick={handleAddStep}
                className="btn-premium px-4 py-2 text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Chapter
              </button>
            </div>

            {steps.map((step, sIndex) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={sIndex} 
                className="glass-card p-6 border-l-4 border-l-luxury-purple"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="text-xs font-mono text-luxury-gold uppercase tracking-wider">{step.phase}</div>
                  {steps.length > 1 && (
                    <button type="button" onClick={() => handleRemoveStep(sIndex)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Chapter Title</label>
                    <input 
                      required
                      type="text" 
                      value={step.title}
                      onChange={e => handleStepChange(sIndex, 'title', e.target.value)}
                      placeholder="e.g., Fundamentals of Go"
                      className="w-full bg-text-main/5 border border-text-main/10 rounded-lg px-3 py-2 text-text-main text-sm focus:outline-none focus:border-luxury-purple transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Duration</label>
                    <input 
                      required
                      type="text" 
                      value={step.duration}
                      onChange={e => handleStepChange(sIndex, 'duration', e.target.value)}
                      placeholder="e.g., 2 Weeks"
                      className="w-full bg-text-main/5 border border-text-main/10 rounded-lg px-3 py-2 text-text-main text-sm focus:outline-none focus:border-luxury-purple transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</label>
                  <textarea 
                    value={step.description}
                    onChange={e => handleStepChange(sIndex, 'description', e.target.value)}
                    placeholder="Brief overview of this chapter"
                    rows={2}
                    className="w-full bg-text-main/5 border border-text-main/10 rounded-lg px-3 py-2 text-text-main text-sm focus:outline-none focus:border-luxury-purple transition-colors"
                  />
                </div>

                {/* Topics */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Topics to Cover</label>
                    <button type="button" onClick={() => handleAddTopic(sIndex)} className="text-luxury-purple hover:text-luxury-purple/80 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add Topic
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {step.topics.map((topic, tIndex) => (
                      <div key={tIndex} className="flex gap-3">
                        <input 
                          required
                          type="text" 
                          value={topic}
                          onChange={e => handleTopicChange(sIndex, tIndex, e.target.value)}
                          placeholder="e.g., Goroutines and Channels"
                          className="flex-grow bg-text-main/5 border border-text-main/10 rounded-lg px-3 py-2 text-text-main text-sm focus:outline-none focus:border-luxury-purple transition-colors"
                        />
                        {step.topics.length > 1 && (
                          <button type="button" onClick={() => handleRemoveTopic(sIndex, tIndex)} className="text-text-muted hover:text-red-400 p-2 shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          <div className="flex justify-end pt-8 border-t border-text-main/10">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-premium px-8 py-4 flex items-center gap-3 w-full md:w-auto justify-center"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSubmitting ? 'Creating Roadmap...' : 'Save & Generate Roadmap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
