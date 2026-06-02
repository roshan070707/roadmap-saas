import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Founding Engineer at Stealth",
    quote: "ROADMAP didn't just give me a list of tutorials. It provided a deterministic path. I stopped guessing what to learn and simply executed. The results were immediate.",
    journey: ["Self-Taught Beginner", "Completed React & Node Phases", "Mastered System Design", "Hired as Founding Engineer"]
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist at Scale AI",
    quote: "The visual progression and modular breakdown transformed a daunting year-long transition into a series of achievable, satisfying daily wins. Utterly indispensable.",
    journey: ["Excel Analyst", "Learned Python & Pandas", "Built 5 ML Projects", "Landed Data Scientist Role"]
  },
  {
    name: "Marcus Thorne",
    role: "Security Architect",
    quote: "I’ve tried every learning platform. This is the only one that feels like it respects my time. High signal, zero noise. Pure execution.",
    journey: ["IT Support", "Mastered Network Security", "Gained OSCP Cert", "Security Architect"]
  }
];

const SuccessStories = () => {
  return (
    <section className="py-32 relative bg-luxury-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
             <div className="text-luxury-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">Outcomes</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Proven <span className="font-light text-text-muted">Results</span>
            </h2>
          </motion.div>
        </div>

        {/* Visual Transformations */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-gradient-to-b from-transparent via-luxury-purple/30 to-transparent transform md:-translate-x-1/2"></div>
          
          <div className="space-y-24">
            {testimonials.map((t, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-luxury-purple border-4 border-luxury-bg transform -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(139,92,246,0.6)]"></div>

                  <div className={`md:w-1/2 w-full pl-16 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-card p-8 border-white/5 hover:border-luxury-purple/30 transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-purple to-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className={`flex items-center gap-4 mb-6 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        <div className="w-12 h-12 rounded-full bg-text-main/5 flex items-center justify-center font-bold text-lg text-text-main shrink-0 border border-white/5 shadow-inner">
                          {t.name.charAt(0)}
                        </div>
                        <div className={isEven ? 'md:text-right' : 'text-left'}>
                          <h4 className="text-xl font-bold text-text-main tracking-tight">{t.name}</h4>
                          <div className="text-sm text-luxury-gold font-medium">{t.role}</div>
                        </div>
                      </div>

                      <p className="text-text-muted font-light leading-relaxed mb-8 italic">
                        "{t.quote}"
                      </p>

                      {/* Mini Journey */}
                      <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                        <div className="text-xs text-text-muted uppercase tracking-widest mb-4 font-semibold">The Journey</div>
                        <div className="relative">
                          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"></div>
                          <div className="space-y-4">
                            {t.journey.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-4 relative z-10">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${sIdx === t.journey.length - 1 ? 'bg-luxury-gold/20 text-luxury-gold' : 'bg-luxury-bg text-text-muted'}`}>
                                  {sIdx === t.journey.length - 1 ? (
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                  )}
                                </div>
                                <span className={`text-sm ${sIdx === t.journey.length - 1 ? 'text-white font-semibold' : 'text-text-muted'}`}>{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  <div className="md:w-1/2 w-full"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SuccessStories;
