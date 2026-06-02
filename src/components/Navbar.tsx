import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon, LogOut, Moon, Sun, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConvexAuth } from 'convex/react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useTheme } from './ThemeProvider';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleLogoMouseLeave = () => {
    setLogoHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();
  const user = useQuery(api.users.current);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    void signIn("google");
  };

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled ? 'bg-luxury-bg/80 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Premium Magnetic Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 cursor-pointer group relative py-2"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={handleLogoMouseLeave}
          onMouseMove={handleLogoMouseMove}
        >
          {/* Animated Glow Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-luxury-purple/20 blur-xl rounded-full"
            animate={{ 
              opacity: logoHovered ? 0.8 : 0,
              scale: logoHovered ? 1.5 : 0.8 
            }}
            transition={{ duration: 0.5 }}
          />
          
          <motion.div
            animate={{ 
              x: logoHovered ? mousePosition.x * 0.15 : 0,
              y: logoHovered ? mousePosition.y * 0.15 : [0, -3, 0],
              scale: logoHovered ? 1.05 : 1
            }}
            transition={{ 
              duration: logoHovered ? 0.1 : 4, 
              repeat: logoHovered ? 0 : Infinity, 
              ease: logoHovered ? "linear" : "easeInOut" 
            }}
            className="z-10"
          >
            <Hexagon className={`w-7 h-7 transition-colors duration-500 ${logoHovered ? 'text-luxury-purple fill-luxury-purple/30' : 'text-text-main fill-transparent'}`} />
          </motion.div>
          
          <motion.div
            animate={{
              x: logoHovered ? mousePosition.x * 0.08 : 0,
              y: logoHovered ? mousePosition.y * 0.08 : 0,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="overflow-hidden relative flex items-center z-10"
          >
            <span className={`text-lg font-bold tracking-[0.25em] transition-all duration-500 ${logoHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-luxury-purple to-luxury-gold drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'text-text-main'}`}>
              ROADMAP
            </span>
            {/* Shine Sweep Animation */}
            <motion.div 
              className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 skew-x-[-20deg]"
              initial={{ left: '-100%' }}
              animate={logoHovered ? { left: '200%' } : { left: '-100%' }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-6 lg:gap-8">
            <button 
              onClick={() => document.dispatchEvent(new Event('open-command-palette'))}
              className="hidden lg:flex items-center gap-2 bg-text-main/5 hover:bg-text-main/10 border border-text-main/10 px-4 py-1.5 rounded-full text-xs text-text-muted transition-colors mr-4"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="ml-2 px-1.5 py-0.5 bg-text-main/10 rounded font-mono text-[10px]">Ctrl K</kbd>
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-text-muted hover:text-text-main transition-colors text-xs font-semibold uppercase tracking-[0.15em]"
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link to="/dashboard" className="text-luxury-gold hover:text-luxury-purple transition-colors text-xs font-semibold uppercase tracking-[0.15em]">
                Dashboard
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-text-muted hover:text-text-main transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="flex items-center gap-2">
                  <img src={user?.image || "https://i.pravatar.cc/150"} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
                  <span className="text-sm font-medium text-text-main hidden lg:block">{user?.name}</span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="text-text-muted hover:text-text-main transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-text-muted hover:text-text-main transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handleSignIn}
                  className="bg-text-main text-luxury-bg px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-[0.15em] hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign In
              </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-muted hover:text-text-main transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-bg/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <button
                className="text-left text-text-muted hover:text-white transition-colors text-sm font-semibold uppercase tracking-[0.15em] flex items-center gap-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.dispatchEvent(new Event('open-command-palette'));
                }}
              >
                <Search className="w-4 h-4" /> Search
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-text-muted hover:text-white transition-colors text-sm font-semibold uppercase tracking-[0.15em]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated && (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-luxury-gold hover:text-text-main transition-colors text-sm font-semibold uppercase tracking-[0.15em]">
                  Dashboard
                </Link>
              )}
              
              <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-text-muted hover:text-text-main transition-colors text-sm font-semibold uppercase tracking-[0.15em] flex items-center gap-2"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              
              <div className="h-px bg-text-main/5 w-full my-2"></div>
              
              {!isLoading && (
                isAuthenticated ? (
                  <button onClick={() => signOut()} className="text-left text-text-muted hover:text-white transition-colors text-sm font-semibold uppercase tracking-[0.15em] flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                ) : (
                  <button onClick={handleSignIn} className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-[0.15em] text-center w-full flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    </svg>
                    Sign in with Google
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
