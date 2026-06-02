import { BookOpen, GraduationCap, Building2, Library, Landmark, School } from 'lucide-react';

const universities = [
  { name: 'IIT Delhi', icon: Building2 },
  { name: 'IIT Bombay', icon: Library },
  { name: 'IIT Madras', icon: Landmark },
  { name: 'BITS Pilani', icon: BookOpen },
  { name: 'NIT Trichy', icon: School },
  { name: 'IIIT Hyderabad', icon: GraduationCap }
];

const UniversityTrust = () => {
  return (
    <div className="bg-[#0A0B10] w-full py-12 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-[#8b949e] font-medium text-sm mb-10">
          Trusted by students from top universities
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {universities.map((uni, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 transition-colors hover:text-white text-[#8b949e] cursor-default">
              <uni.icon className="w-8 h-8" />
              <span className="text-xs font-bold tracking-wide uppercase">{uni.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityTrust;
