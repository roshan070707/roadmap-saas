import { motion } from 'framer-motion';
import { Target, Search, Route, TrendingUp } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Define Destination',
    description: 'Select your ultimate career goal. Whether it is an AI Researcher at DeepMind or a Security Engineer at Stripe.',
    icon: <Target className="w-6 h-6 text-white" />
  },
  {
    id: '02',
    title: 'Baseline Analysis',
    description: 'Our engine assesses your current degree, projects, and skill gaps using a sophisticated competency matrix.',
    icon: <Search className="w-6 h-6 text-white" />
  },
  {
    id: '03',
    title: 'Path Generation',
    description: 'We compute the mathematically shortest path to your goal, optimizing for high-yield learning and project building.',
    icon: <Route className="w-6 h-6 text-white" />
  },
  {
    id: '04',
    title: 'Continuous Navigation',
    description: 'Execute the plan. The roadmap dynamically adjusts based on your velocity and changing industry requirements.',
    icon: <TrendingUp className="w-6 h-6 text-white" />
  }
];

const HowItWorks = () => {
  return (
    <section id="methodology" className="py-32 relative bg-luxury-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="max-w-2xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-luxury-purple text-sm font-semibold tracking-[0.2em] uppercase mb-4">Methodology</div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
              Precision-Engineered <br/><span className="font-bold">Career Navigation</span>
            </h2>
            <p className="text-text-muted text-lg leading-relaxed font-light">
              We replace generic advice with a deterministic, data-driven approach to career progression.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-luxury-purple/50 via-white/10 to-transparent -translate-x-1/2" />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                
                {/* Left content (empty for odd, populated for even on desktop) */}
                <div className={`md:w-5/12 hidden md:block ${index % 2 !== 0 ? 'order-1 text-right' : 'order-3'}`}>
                  {index % 2 !== 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-text-muted leading-relaxed font-light">{step.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Center Node */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-2xl bg-luxury-bg border border-white/10 z-10 group-hover:border-luxury-purple/50 group-hover:bg-luxury-purple/10 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] md:order-2"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-luxury-purple/20 to-luxury-gold/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    {step.icon}
                  </div>
                </motion.div>

                {/* Right content (populated for odd, empty for even on desktop, always visible on mobile) */}
                <div className={`pl-24 md:pl-0 md:w-5/12 ${index % 2 !== 0 ? 'md:hidden' : 'order-1 md:order-3'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-luxury-purple font-mono text-xs mb-2 opacity-70">PHASE {step.id}</div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-text-muted leading-relaxed font-light">{step.description}</p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorks;
