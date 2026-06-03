import { Hexagon, Mail, Code, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Hexagon className="text-white w-6 h-6 fill-white/10" />
              <span className="text-sm font-bold tracking-[0.25em] text-white">
                ROADMAP
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/methodology" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Methodology</Link></li>
              <li><Link to="/explore" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Pathways</Link></li>
              <li><Link to="/integrations" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Integrations</Link></li>
              <li><Link to="/pricing" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4">Company & Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/community" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Community</Link></li>
              <li><Link to="/about" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>About</Link></li>
              <li><Link to="/contact" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Contact</Link></li>
              <li><Link to="/privacy" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Privacy Policy</Link></li>
              <li><Link to="/terms" className="group flex items-center text-text-muted hover:text-luxury-gold text-sm font-light transition-all duration-300 hover:translate-x-1"><span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-luxury-gold mr-0 group-hover:mr-1">›</span>Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-6 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center text-text-muted text-sm font-light space-y-4">
            <span className="font-semibold text-text-main cursor-default text-base">Built by Roshan Manjani</span>
            <div className="flex items-center gap-6">
              <a href="mailto:roshanmanjani9@gmail.com" className="flex items-center gap-2 text-text-muted hover:text-luxury-purple transition-colors">
                <Mail className="w-4 h-4" /> Email
              </a>
              <a href="https://github.com/roshan070707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors">
                <Code className="w-4 h-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/manjani-roshan-483958399" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-muted hover:text-blue-500 transition-colors">
                <Briefcase className="w-4 h-4" /> LinkedIn
              </a>
            </div>
            <span className="text-xs pt-2">© {new Date().getFullYear()} ROADMAP</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
