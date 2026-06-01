import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Founding Engineer at Stealth",
    quote: "ROADMAP didn't just give me a list of tutorials. It provided a deterministic path. I stopped guessing what to learn and simply executed. The results were immediate."
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist at Scale AI",
    quote: "The visual progression and modular breakdown transformed a daunting year-long transition into a series of achievable, satisfying daily wins. Utterly indispensable."
  },
  {
    name: "Marcus Thorne",
    role: "Security Architect",
    quote: "I’ve tried every learning platform. This is the only one that feels like it respects my time. High signal, zero noise. Pure execution."
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-colors group"
            >
              {/* Subtle top highlight */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="mb-8">
                <svg className="w-8 h-8 text-luxury-purple/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className="text-text-muted font-light leading-relaxed mb-8 min-h-[120px] text-lg">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm border border-white/5">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-text-muted text-xs font-mono">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default SuccessStories;
