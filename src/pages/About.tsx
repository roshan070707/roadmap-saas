import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Company
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">About ROADMAP</h1>
          <p className="text-text-muted text-xl mb-12 font-light">Building the future of targeted education.</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-8 border-text-main/10">
              <h3 className="text-2xl font-bold text-text-main mb-4">Our Mission</h3>
              <p className="text-text-muted">To eliminate the guesswork in education and provide everyone with a deterministic path to their dream career.</p>
            </div>
            <div className="glass-card p-8 border-text-main/10">
              <h3 className="text-2xl font-bold text-text-main mb-4">Our Vision</h3>
              <p className="text-text-muted">A world where anyone, regardless of background, can acquire the exact skills needed to succeed in the modern economy.</p>
            </div>
          </div>

          <div className="glass-card p-8 border-text-main/10">
            <h2 className="text-2xl font-bold text-text-main mb-4">Why ROADMAP exists</h2>
            <p className="text-text-muted mb-4">
              We started ROADMAP because we noticed a critical flaw in modern learning: abundance of resources, but a severe lack of direction. 
              People spend more time figuring out *what* to learn rather than actually learning it.
            </p>
            <p className="text-text-muted">
              ROADMAP solves this by providing AI-generated, perfectly structured paths that guide you step-by-step from beginner to expert.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
