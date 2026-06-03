import Footer from '../components/Footer';

export default function Changelog() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Company
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Changelog</h1>
          <p className="text-text-muted text-xl mb-12 font-light">The evolution of ROADMAP.</p>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-luxury-purple bg-luxury-purple/20 text-luxury-purple shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-luxury-purple animate-pulse"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 border-text-main/10 hover:border-luxury-purple/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-text-main text-xl">Version 2</h3>
                  <span className="text-xs font-mono text-luxury-purple">Current</span>
                </div>
                <p className="text-text-muted text-sm">Complete platform overhaul. New aesthetic, real-time sync with Convex, and advanced roadmap generation algorithms.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-luxury-bg text-text-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-text-muted"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 border-text-main/10 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-text-main text-xl">Phase 6</h3>
                  <span className="text-xs font-mono text-text-muted">Past</span>
                </div>
                <p className="text-text-muted text-sm">Community features and leaderboard implementations.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-luxury-bg text-text-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-text-muted"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 border-text-main/10 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-text-main text-xl">Phase 1-5</h3>
                  <span className="text-xs font-mono text-text-muted">Past</span>
                </div>
                <p className="text-text-muted text-sm">Initial MVP, basic roadmap tracking, user authentication, and early feedback cycles.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-luxury-bg text-text-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-text-muted"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 border-text-main/10 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-text-main text-xl">Version 1</h3>
                  <span className="text-xs font-mono text-text-muted">Legacy</span>
                </div>
                <p className="text-text-muted text-sm">The original proof of concept.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
