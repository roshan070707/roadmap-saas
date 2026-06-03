import Footer from '../components/Footer';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Documentation</h1>
          <p className="text-text-muted text-xl mb-12 font-light">Learn how to use ROADMAP to accelerate your career.</p>
          
          <div className="space-y-6">
            <div className="glass-card p-6 border-text-main/10">
              <h3 className="text-xl font-bold text-text-main mb-2">How roadmap generation works</h3>
              <p className="text-text-muted">Our deterministic engine uses AI to analyze your goals and generate a step-by-step learning path tailored to your specific career aspirations.</p>
            </div>
            <div className="glass-card p-6 border-text-main/10">
              <h3 className="text-xl font-bold text-text-main mb-2">Study Timer</h3>
              <p className="text-text-muted">Use the built-in study timer to track your focus sessions and accumulate hours towards your weekly goals.</p>
            </div>
            <div className="glass-card p-6 border-text-main/10">
              <h3 className="text-xl font-bold text-text-main mb-2">Progress Tracking</h3>
              <p className="text-text-muted">Mark tasks as complete to visualize your journey. Your progress is permanently stored in our secure database.</p>
            </div>
            <div className="glass-card p-6 border-text-main/10">
              <h3 className="text-xl font-bold text-text-main mb-2">Dashboard</h3>
              <p className="text-text-muted">The central hub for all your active roadmaps, recent activity, and overall career statistics.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
