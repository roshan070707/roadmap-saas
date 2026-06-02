import { Map, Target, CheckCircle2, Flame, Users } from 'lucide-react';

const features = [
  {
    icon: Map,
    title: 'Smart Roadmaps',
    desc: 'Personalized roadmaps built for your goals.',
    iconBg: 'bg-[#1e1b4b]',
    iconColor: 'text-[#818cf8]'
  },
  {
    icon: Target,
    title: 'Track Progress',
    desc: 'Smart tracking to keep you consistent.',
    iconBg: 'bg-[#1e1b4b]',
    iconColor: 'text-[#818cf8]'
  },
  {
    icon: CheckCircle2,
    title: 'Verify & Master',
    desc: 'Prove your skills with projects and notes.',
    iconBg: 'bg-[#2e1065]',
    iconColor: 'text-[#c084fc]'
  },
  {
    icon: Flame,
    title: 'Stay Motivated',
    desc: 'Streaks, achievements, and real progress.',
    iconBg: 'bg-[#1e1b4b]',
    iconColor: 'text-[#818cf8]'
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Learn together. Grow together.',
    iconBg: 'bg-[#1e1b4b]',
    iconColor: 'text-[#818cf8]'
  }
];

const FeatureRibbon = () => {
  return (
    <div className="bg-[#0A0B10] px-6 pb-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#11131A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-[#8b949e] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureRibbon;
