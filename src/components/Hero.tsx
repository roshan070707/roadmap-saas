import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import Scene from './Scene';

const AnimatedCounter = ({ value, label, duration = 2 }: { value: number, label: string, duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  
  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration * 1000
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {displayValue}{value > 100 ? '+' : '%'}
      </div>
      <div className="text-sm text-text-muted font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-luxury-bg">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene />
        </Canvas>
        
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-luxury-bg opacity-80 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-luxury-bg to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-purple/30 bg-luxury-purple/5 w-fit text-luxury-purple text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-purple animate-pulse"></span>
            The Standard for Career Navigation
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            YOUR FUTURE <br />
            <span className="text-gradient font-light">HAS A ROADMAP</span>
          </h1>
          
          <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-md font-light">
            Tell us where you are today. We'll show you the absolute fastest path to where you want to be.
          </p>
          
          <div className="flex flex-wrap gap-5 mt-2">
            <Link to="/generator" className="btn-premium px-8 py-4 flex items-center gap-2 group">
              Generate My Roadmap
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#pathways" className="btn-premium-secondary px-8 py-4 flex items-center gap-2 group">
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              See Example Roadmaps
            </a>
          </div>
          
          <div className="flex items-center gap-10 mt-12 pt-8 border-t border-glass-border">
            <AnimatedCounter value={10000} label="Students" duration={2.5} />
            <AnimatedCounter value={50} label="Career Paths" duration={2} />
            <AnimatedCounter value={95} label="Satisfaction" duration={2} />
          </div>
        </motion.div>

        <div className="hidden lg:block h-[600px] pointer-events-none"></div>

      </div>
    </section>
  );
};

export default Hero;
