import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-invert prose-p:text-text-muted prose-headings:text-text-main">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Terms of Service</h1>
          <p className="text-text-muted text-sm mb-12">Last updated: May 15, 2026</p>
          
          <div className="glass-card p-8 border-text-main/10 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-muted mb-4">
                By accessing or using ROADMAP, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-text-muted mb-4">
                ROADMAP provides an AI-powered platform for generating and tracking educational paths. We reserve the right to modify or discontinue the service at any time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
              <p className="text-text-muted mb-4">
                You agree not to use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
