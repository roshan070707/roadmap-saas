import { motion } from 'framer-motion';
import { Database, Code2, ShieldAlert, Brain, Laptop, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const paths = [
  { 
    title: 'MCA via NIMCET', 
    icon: <GraduationCap className="w-6 h-6" />, 
    difficulty: 'High', 
    duration: '12 Months',
    skills: 'Algebra, Calculus, DSA, Mock Tests'
  },
  { 
    title: 'Full Stack Developer', 
    icon: <Code2 className="w-6 h-6" />, 
    difficulty: 'Medium', 
    duration: '8 Months',
    skills: 'HTML, CSS, JavaScript, React, Node.js'
  },
  { 
    title: 'Cyber Security', 
    icon: <ShieldAlert className="w-6 h-6" />, 
    difficulty: 'High', 
    duration: '10 Months',
    skills: 'Networking, Linux, Ethical Hacking, Forensics'
  },
  { 
    title: 'Data Analyst', 
    icon: <Database className="w-6 h-6" />, 
    difficulty: 'Medium', 
    duration: '6 Months',
    skills: 'SQL, Python, Excel, Tableau, Statistics'
  },
  { 
    title: 'AI Engineer', 
    icon: <Brain className="w-6 h-6" />, 
    difficulty: 'Very High', 
    duration: '14 Months',
    skills: 'Python, Linear Algebra, PyTorch, LLMs'
  },
  { 
    title: 'Software Engineer', 
    icon: <Laptop className="w-6 h-6" />, 
    difficulty: 'High', 
    duration: '12 Months',
    skills: 'Java/C++, DSA, System Design, Cloud'
  },
];

const CareerPaths = () => {
  return (
    <section id="pathways" className="py-32 relative bg-luxury-bg border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luxury-purple/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl"
          >
            <div className="text-luxury-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">Pathways</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              High-Velocity <span className="font-light text-text-muted">Careers</span>
            </h2>
            <p className="text-text-muted text-lg font-light leading-relaxed">
              We exclusively map routes to the most impactful, highest-leverage roles in the modern technology sector.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-luxury-purple/20 group-hover:text-luxury-purple group-hover:border-luxury-purple/30 transition-all duration-500 shadow-inner">
                    {path.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">{path.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-text-muted font-light">Difficulty</span>
                    <span className={`font-mono ${path.difficulty === 'Very High' ? 'text-red-400' : path.difficulty === 'High' ? 'text-luxury-gold' : 'text-green-400'}`}>{path.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-text-muted font-light">Duration</span>
                    <span className="text-white font-mono">{path.duration}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-text-muted text-xs uppercase tracking-wider block mb-2">Key Skills</span>
                    <span className="text-sm text-white/80 leading-relaxed block">{path.skills}</span>
                  </div>
                </div>
              </div>
              
              <Link to="/generator" className="w-full text-center py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold tracking-wide transition-all duration-300">
                View Roadmap
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default CareerPaths;
