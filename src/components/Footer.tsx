import { Hexagon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-8 mb-24">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Hexagon className="text-white w-6 h-6 fill-white/10" />
              <span className="text-sm font-bold tracking-[0.25em] text-white">
                ROADMAP
              </span>
            </div>
            <p className="text-text-muted text-sm font-light max-w-xs leading-relaxed mb-8">
              The deterministic engine for career acceleration. Stop guessing. Start executing.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Methodology</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Pathways</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Integrations</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Documentation</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">API Reference</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Blog</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">About</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Careers</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Changelog</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-text-muted hover:text-white text-sm font-light transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-text-muted font-light">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Systems Operational
          </div>
          
          <div className="flex items-center gap-6 text-text-muted text-xs font-light">
            <span>© 2026 ROADMAP Inc.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
