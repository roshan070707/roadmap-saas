import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Briefcase, Book, Code, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Mock data for search
  const mockCareers = [
    { title: 'Frontend Engineer', type: 'Career Path', icon: Briefcase },
    { title: 'Backend Developer', type: 'Career Path', icon: Briefcase },
  ];
  const mockSkills = [
    { title: 'React.js', type: 'Skill', icon: Code },
    { title: 'TypeScript', type: 'Skill', icon: Code },
  ];
  const mockTopics = [
    { title: 'Understanding Promises', type: 'Roadmap Topic', icon: Book },
    { title: 'CSS Flexbox vs Grid', type: 'Roadmap Topic', icon: Book },
  ];

  const allResults = [...mockCareers, ...mockSkills, ...mockTopics];
  const filtered = query 
    ? allResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase()))
    : allResults;

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Search</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto font-light">Find career paths, required skills, and specific roadmap topics.</p>
        </div>

        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-luxury-purple" />
          </div>
          <input
            type="text"
            className="w-full bg-text-main/5 border border-text-main/10 rounded-full py-5 pl-16 pr-8 text-lg text-text-main placeholder-text-muted/50 focus:outline-none focus:border-luxury-purple/50 transition-colors shadow-lg"
            placeholder="Search careers, courses, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2 mb-4">Results</h3>
          
          {filtered.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <p className="text-text-muted">No results found for "{query}"</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx}
                  onClick={() => navigate('/explore')}
                  className="glass-card p-4 hover:border-luxury-purple/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-text-main/5 flex items-center justify-center text-text-main group-hover:bg-luxury-purple/10 group-hover:text-luxury-purple transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main group-hover:text-luxury-purple transition-colors">{item.title}</h4>
                      <div className="text-xs text-text-muted">{item.type}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-luxury-purple transition-all transform group-hover:translate-x-1" />
                </motion.div>
              )
            })
          )}
        </div>

      </div>
    </div>
  );
}
