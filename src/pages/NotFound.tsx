import { Link } from 'react-router-dom';
import { Search, Home, Map } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-luxury-bg flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-luxury-purple/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <Map className="w-10 h-10 text-luxury-purple absolute opacity-50" />
          <span className="text-4xl font-bold text-text-main relative z-10">404</span>
        </div>
        
        <h1 className="text-3xl font-bold text-text-main mb-4">Lost your way?</h1>
        <p className="text-text-muted mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link to="/" className="btn-premium flex items-center justify-center gap-2 py-3 w-full">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <button 
            onClick={() => document.dispatchEvent(new Event('open-command-palette'))}
            className="btn-premium-secondary flex items-center justify-center gap-2 py-3 w-full"
          >
            <Search className="w-4 h-4" /> Search ROADMAP
          </button>
        </div>
      </div>
    </div>
  );
}
