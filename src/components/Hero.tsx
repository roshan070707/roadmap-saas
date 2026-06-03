import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, Users, Rocket, Star, Code2, Database, Shield, GraduationCap, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const floatingCards = [
  {
    title: 'AI Engineer',
    icon: Sparkles,
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    position: 'top-[25%] right-[15%]',
    delay: 0,
  },
  {
    title: 'Data Science',
    icon: Database,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    position: 'top-[40%] left-[10%]',
    delay: 0.2,
  },
  {
    title: 'Full Stack Dev',
    icon: Code2,
    color: 'text-teal-400',
    bg: 'bg-teal-500/20',
    border: 'border-teal-500/30',
    position: 'top-[45%] right-[5%]',
    delay: 0.4,
  },
  {
    title: 'Cyber Security',
    icon: Shield,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/20',
    border: 'border-indigo-500/30',
    position: 'top-[55%] left-[20%]',
    delay: 0.6,
  },
  {
    title: 'MCA',
    icon: GraduationCap,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    position: 'top-[60%] right-[15%]',
    delay: 0.8,
  },
  {
    title: 'Cloud Engineer',
    icon: Cloud,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    position: 'top-[75%] left-[30%]',
    delay: 1.0,
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#0A0B10]">
      
      {/* Right Side Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden flex justify-end">
        <div 
          className="absolute right-0 top-0 w-full lg:w-[65%] h-full bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: `url('/hero-mountain.png')` }}
        />
        {/* Gradient Masks for blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B10] via-[#0A0B10]/80 to-transparent w-full lg:w-[70%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-[#0A0B10]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B10] via-transparent to-transparent h-32" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full flex-grow">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full w-fit mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-purple" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
              Your Journey. Your Future.
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Your Future<br />
            Has a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9d4edd] via-[#c77dff] to-[#ffb5a7] drop-shadow-[0_0_30px_rgba(157,78,221,0.4)]">
              Roadmap
            </span>
          </h1>
          
          <p className="text-lg text-text-muted mb-10 leading-relaxed max-w-lg font-medium">
            Roadmap helps you plan, track, and achieve your career goals with smart roadmaps and real progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link 
              to="/explore" 
              className="px-8 py-4 bg-gradient-to-r from-[#7b2cbf] to-[#c77dff] hover:from-[#5a189a] hover:to-[#9d4edd] text-white rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(123,44,191,0.4)] hover:shadow-[0_0_30px_rgba(123,44,191,0.6)] hover:scale-105"
            >
              Generate My Roadmap <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/explore" 
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md"
            >
              <Play className="w-4 h-4 fill-white" /> See Example Roadmaps
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">10,000+</div>
                <div className="text-text-muted text-xs font-medium">Students</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">50+</div>
                <div className="text-text-muted text-xs font-medium">Career Paths</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold text-lg">95%</div>
                <div className="text-text-muted text-xs font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Floating Cards Over Image */}
        <div className="hidden lg:block relative h-[600px] w-full">
          {floatingCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + card.delay, duration: 0.8 }}
              className={`absolute ${card.position} z-20`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4 + Math.random() * 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: card.delay
                }}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-xl border ${card.border} ${card.bg} shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform cursor-pointer`}
              >
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <span className="text-white font-semibold text-sm tracking-wide">{card.title}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
