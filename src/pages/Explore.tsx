import { motion } from 'framer-motion';
import { Compass, Code, Brain, Database, Shield, Layout, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Loader2 } from 'lucide-react';

const categories = [
  { name: 'Engineering', icon: Code, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'AI & ML', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { name: 'Data Science', icon: Database, color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'Cyber Security', icon: Shield, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Design', icon: Layout, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { name: 'Product', icon: Briefcase, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];
import { useState } from 'react';

const categoryKeywords: Record<string, string[]> = {
  'Engineering': ['Developer', 'Software', 'Full Stack', 'Frontend', 'Backend', 'Engineer', 'Web', 'MCA', 'NIMCET'],
  'AI & ML': ['AI', 'Machine Learning', 'Intelligence', 'Neural'],
  'Data Science': ['Data', 'Analytics', 'Scientist', 'Analyst'],
  'Cyber Security': ['Security', 'Cyber', 'Hacker', 'Penetration'],
  'Design': ['Design', 'UI', 'UX'],
  'Product': ['Product', 'Manager', 'Management']
};

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const careerPaths = useQuery(api.roadmaps.getCareerPaths);

  const filteredPaths = careerPaths?.filter(path => {
    if (!selectedCategory) return true;
    const keywords = categoryKeywords[selectedCategory] || [];
    const searchString = `${path.title} ${path.description}`.toLowerCase();
    return keywords.some(kw => searchString.includes(kw.toLowerCase()));
  });
  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Explore
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Find Your Journey</h1>
          <p className="text-text-muted text-xl max-w-2xl font-light">Discover curated roadmaps across various industries. Learn the exact skills needed to land your dream role.</p>
        </div>

        <h3 className="text-xl font-bold text-text-main mb-8 flex items-center gap-2"><Compass className="w-5 h-5 text-luxury-purple"/> Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`glass-card p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                  selectedCategory === cat.name 
                    ? 'border-luxury-purple bg-luxury-purple/10 scale-105 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                    : 'border-text-main/10 hover:border-luxury-purple/30 hover:scale-105'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${cat.bg} ${cat.color} flex items-center justify-center mb-4 transition-transform ${selectedCategory === cat.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-text-main">{cat.name}</span>
              </motion.div>
            )
          })}
        </div>

        <h3 className="text-xl font-bold text-text-main mb-8 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-luxury-purple"/> Trending Paths</h3>
        {filteredPaths === undefined ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
          </div>
        ) : filteredPaths.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center glass-card">
            <Compass className="w-12 h-12 text-text-muted mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-text-main mb-2">No paths found</h3>
            <p className="text-text-muted">We couldn't find any career paths in this category yet.</p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-6 text-sm text-luxury-purple hover:text-luxury-gold transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPaths.map((path, idx) => (
              <motion.div 
                key={path._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 group border-text-main/10 hover:border-luxury-purple/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold text-text-main group-hover:text-luxury-purple transition-colors">{path.title}</h4>
                    <span className="px-3 py-1 bg-text-main/5 rounded-full text-xs font-semibold text-text-muted">{path.difficulty}</span>
                  </div>
                  <p className="text-text-muted mb-6 line-clamp-2">{path.description}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-xs text-text-muted font-mono bg-text-main/5 px-2 py-1 rounded">Est. {path.duration}</div>
                  <Link to={`/generator?preset=${path.title.toLowerCase().replace(/ /g, '-')}`} className="btn-premium-secondary px-6 py-2 w-max text-sm">Start Path</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
