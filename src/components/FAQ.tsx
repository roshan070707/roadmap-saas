import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the roadmap generation actually work?",
    answer: "We use a proprietary competency matrix that evaluates your current skill delta against the requirements of your target role. The system then queries a graph database of learning modules to construct the mathematically shortest path to proficiency."
  },
  {
    question: "Is the platform suitable for absolute beginners?",
    answer: "Yes. If your baseline is zero, the engine simply plots a longer trajectory, starting with fundamental primitives before escalating to advanced architectural concepts."
  },
  {
    question: "Can I adjust my daily velocity?",
    answer: "Absolutely. Your dashboard allows you to calibrate your 'Focus Hours'. The timeline automatically recalculates milestones based on your available bandwidth."
  },
  {
    question: "Do you provide infrastructure for project execution?",
    answer: "While we provide the architectural blueprints and acceptance criteria for projects, we expect you to build them in your own local environment to simulate real-world engineering workflows."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative bg-luxury-bg border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked <span className="font-light text-text-muted">Questions</span>
            </h2>
          </motion.div>
        </div>

        <div className="space-y-2 border-t border-white/5 pt-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-white/5"
            >
              <button
                className="w-full py-6 text-left flex justify-between items-center focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-lg text-white group-hover:text-luxury-purple transition-colors">{faq.question}</span>
                <div className="text-text-muted group-hover:text-luxury-purple transition-colors ml-4 shrink-0">
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 text-text-muted font-light leading-relaxed pr-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FAQ;
