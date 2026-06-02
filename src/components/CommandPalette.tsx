import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Compass, Trophy, Users, BookOpen, Clock, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32 transition-opacity">
      <div className="bg-luxury-bg w-full max-w-xl rounded-xl shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-text-main/10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <Command label="Command Menu" className="w-full">
          <div className="flex items-center px-4 py-3 border-b border-text-main/10">
            <Search className="w-5 h-5 text-text-muted mr-3" />
            <Command.Input 
              autoFocus
              placeholder="Search careers, skills, resources..." 
              className="w-full bg-transparent text-text-main text-lg placeholder:text-text-muted outline-none border-none focus:ring-0"
            />
            <div className="text-xs font-mono text-text-muted bg-text-main/10 px-2 py-1 rounded">ESC</div>
          </div>
          
          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
            <Command.Empty className="py-6 text-center text-text-muted text-sm">No results found.</Command.Empty>

            <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-text-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
              <Command.Item 
                onSelect={() => { navigate('/discover'); setOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-main hover:bg-luxury-purple/10 hover:text-luxury-purple rounded-lg cursor-pointer transition-colors aria-selected:bg-luxury-purple/10 aria-selected:text-luxury-purple"
              >
                <Compass className="w-4 h-4" /> Explore Paths
              </Command.Item>
              <Command.Item 
                onSelect={() => { navigate('/leaderboard'); setOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-main hover:bg-luxury-purple/10 hover:text-luxury-purple rounded-lg cursor-pointer transition-colors mt-1 aria-selected:bg-luxury-purple/10 aria-selected:text-luxury-purple"
              >
                <Trophy className="w-4 h-4" /> Global Leaderboard
              </Command.Item>
              <Command.Item 
                onSelect={() => { navigate('/community'); setOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-main hover:bg-luxury-purple/10 hover:text-luxury-purple rounded-lg cursor-pointer transition-colors mt-1 aria-selected:bg-luxury-purple/10 aria-selected:text-luxury-purple"
              >
                <Users className="w-4 h-4" /> Community
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-text-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider mt-2 border-t border-text-main/5">
              <Command.Item 
                onSelect={() => { navigate('/dashboard'); setOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-main hover:bg-luxury-purple/10 hover:text-luxury-purple rounded-lg cursor-pointer transition-colors aria-selected:bg-luxury-purple/10 aria-selected:text-luxury-purple"
              >
                <Activity className="w-4 h-4" /> Go to Dashboard
              </Command.Item>
            </Command.Group>

          </Command.List>
        </Command>
      </div>
      {/* Background click listener to close */}
      <div className="fixed inset-0 -z-10" onClick={() => setOpen(false)}></div>
    </div>
  );
}
