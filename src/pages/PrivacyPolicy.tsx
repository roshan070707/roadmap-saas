import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-invert prose-p:text-text-muted prose-headings:text-text-main">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Privacy Policy</h1>
          <p className="text-text-muted text-sm mb-12">Last updated: May 15, 2026</p>
          
          <div className="glass-card p-8 border-text-main/10 space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-text-muted mb-4">
                We collect information you provide directly to us, such as when you create or modify your account, use our services, or communicate with us. This includes your name, email address, and learning preferences.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Information</h2>
              <p className="text-text-muted mb-4">
                We use the information we collect to provide, maintain, and improve our services, such as generating personalized roadmaps and tracking your progress.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-text-muted mb-4">
                We do not share your personal information with third parties except as described in this privacy policy, such as with your consent or as required by law.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
