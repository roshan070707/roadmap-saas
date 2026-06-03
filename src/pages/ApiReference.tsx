import Footer from '../components/Footer';

export default function ApiReference() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">API Reference</h1>
          <p className="text-text-muted text-xl mb-12 font-light">Build on top of the ROADMAP ecosystem.</p>
          
          <div className="glass-card p-8 mb-8 border-text-main/10">
            <h2 className="text-2xl font-bold text-text-main mb-4">Convex Architecture</h2>
            <p className="text-text-muted mb-4">
              We use Convex as our real-time database and backend function runner. This ensures ACID compliance and seamless real-time updates across all clients.
            </p>
          </div>

          <div className="glass-card p-8 mb-8 border-text-main/10">
            <h2 className="text-2xl font-bold text-text-main mb-4">Database Schemas</h2>
            <p className="text-text-muted mb-4">
              Our core entities include Users, Roadmaps, Sections, and Tasks. Full schema definitions will be published in Phase 3.
            </p>
          </div>

          <div className="glass-card p-8 border-text-main/10">
            <h2 className="text-2xl font-bold text-text-main mb-4">Future API Plans</h2>
            <p className="text-text-muted">
              We are working on a public REST API and webhooks to allow developers to integrate ROADMAP directly into their own applications.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
