import Footer from '../components/Footer';

export default function Methodology() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Our Methodology</h1>
          <p className="text-text-muted text-xl mb-12 font-light">The deterministic engine for career acceleration.</p>
          
          <div className="glass-card p-8 mb-8 border-text-main/10">
            <h2 className="text-2xl font-bold text-text-main mb-4">How it works</h2>
            <p className="text-text-muted mb-4">
              Our learning methodology is built on three core pillars: structured roadmaps, active recall, and continuous progression tracking.
              We break down complex skills into manageable, actionable steps.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
