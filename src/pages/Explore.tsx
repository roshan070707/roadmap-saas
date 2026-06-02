import { motion } from 'framer-motion';
import { Compass, Code, Brain, Database, Shield, Layout, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Engineering', icon: Code, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'AI & ML', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { name: 'Data Science', icon: Database, color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'Cyber Security', icon: Shield, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Design', icon: Layout, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { name: 'Product', icon: Briefcase, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
];

const trendingPaths = [
  { title: 'Full Stack Engineer', users: '12.5k', diff: 'Intermediate' },
  { title: 'AI Engineer', users: '8.2k', diff: 'Advanced' },
  { title: 'Data Scientist', users: '6.1k', diff: 'Intermediate' },
  { title: 'UI/UX Designer', users: '4.8k', diff: 'Beginner' },
];

export default function Explore() {
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
                className="glass-card p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform cursor-pointer group border-text-main/10 hover:border-luxury-purple/30"
              >
                <div className={`w-12 h-12 rounded-full ${cat.bg} ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-text-main">{cat.name}</span>
              </motion.div>
            )
          })}
        </div>

        <h3 className="text-xl font-bold text-text-main mb-8 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-luxury-purple"/> Trending Paths</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {trendingPaths.map((path, idx) => (
            <motion.div 
              key={path.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 group border-text-main/10 hover:border-luxury-purple/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-text-main group-hover:text-luxury-purple transition-colors">{path.title}</h4>
                  <span className="px-3 py-1 bg-text-main/5 rounded-full text-xs font-semibold text-text-muted">{path.diff}</span>
                </div>
                <p className="text-text-muted mb-6">Join {path.users} learners on this path.</p>
              </div>
              <Link to="/generator" className="btn-premium-secondary px-6 py-2 w-max text-sm">Start Path</Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
