import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Building2, Library, Landmark, School, X, Users, Activity } from 'lucide-react';

const universities = [
  { name: 'IIT Delhi', icon: Building2, students: '1,240', success: '94%', paths: ['AI Engineer', 'Full Stack'] },
  { name: 'IIT Bombay', icon: Library, students: '1,532', success: '96%', paths: ['Data Scientist', 'Full Stack'] },
  { name: 'IIT Madras', icon: Landmark, students: '1,120', success: '92%', paths: ['Cyber Security', 'AI Engineer'] },
  { name: 'BITS Pilani', icon: BookOpen, students: '980', success: '91%', paths: ['Full Stack', 'Cloud Engineer'] },
  { name: 'NIT Trichy', icon: School, students: '840', success: '89%', paths: ['Software Engineer', 'Data Analyst'] },
  { name: 'IIIT Hyderabad', icon: GraduationCap, students: '1,650', success: '98%', paths: ['AI Engineer', 'Machine Learning'] }
];

const UniversityTrust = () => {
  const [selectedUni, setSelectedUni] = useState<typeof universities[0] | null>(null);

  return (
    <>
      <div className="bg-[#0A0B10] w-full py-12 border-b border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#8b949e] font-medium text-sm mb-10">
            Trusted by students from top universities
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {universities.map((uni, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedUni(uni)}
                className="flex flex-col items-center gap-3 transition-all duration-300 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:text-luxury-gold text-[#8b949e] cursor-pointer hover:-translate-y-1"
              >
                <uni.icon className="w-8 h-8" />
                <span className="text-xs font-bold tracking-wide uppercase">{uni.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedUni && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedUni(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm glass-card border-white/10 shadow-2xl p-6 md:p-8 overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-purple to-luxury-gold"></div>
              
              <button 
                onClick={() => setSelectedUni(null)}
                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                  <selectedUni.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-main leading-none">{selectedUni.name}</h3>
                  <div className="text-xs text-text-muted mt-1 uppercase tracking-wider">Partner University</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <div className="text-xs text-text-muted uppercase flex items-center gap-2 mb-1"><Users className="w-3 h-3" /> Students</div>
                  <div className="text-lg font-mono font-bold text-white">{selectedUni.students}</div>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                  <div className="text-xs text-text-muted uppercase flex items-center gap-2 mb-1"><Activity className="w-3 h-3" /> Success Rate</div>
                  <div className="text-lg font-mono font-bold text-green-400">{selectedUni.success}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Popular Roadmaps</div>
                <div className="flex flex-wrap gap-2">
                  {selectedUni.paths.map((path, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple rounded-full font-medium">
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UniversityTrust;
