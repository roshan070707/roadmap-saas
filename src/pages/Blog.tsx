import Footer from '../components/Footer';

export default function Blog() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Blog</h1>
          <p className="text-text-muted text-xl mb-12 font-light">Updates, guides, and insights.</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 border-luxury-purple/30 bg-luxury-purple/5 text-center cursor-pointer hover:bg-luxury-purple/10 transition-colors">
              <h3 className="font-bold text-luxury-purple">Product Updates</h3>
            </div>
            <div className="glass-card p-6 border-text-main/10 text-center cursor-pointer hover:bg-text-main/5 transition-colors">
              <h3 className="font-bold text-text-main">Learning Guides</h3>
            </div>
            <div className="glass-card p-6 border-text-main/10 text-center cursor-pointer hover:bg-text-main/5 transition-colors">
              <h3 className="font-bold text-text-main">Career Tips</h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 border-text-main/10 hover:border-luxury-purple/30 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-text-main group-hover:text-luxury-purple transition-colors">ROADMAP V2 is Here</h3>
                <span className="text-sm text-text-muted">May 15, 2026</span>
              </div>
              <p className="text-text-muted mb-4">We are thrilled to announce the launch of ROADMAP V2, featuring a complete design overhaul, real-time sync, and an improved generation engine.</p>
              <span className="text-luxury-purple font-semibold text-sm">Read More →</span>
            </div>
            
            <div className="glass-card p-8 border-text-main/10 hover:border-luxury-purple/30 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-text-main group-hover:text-luxury-purple transition-colors">How to Break into AI in 2026</h3>
                <span className="text-sm text-text-muted">Apr 28, 2026</span>
              </div>
              <p className="text-text-muted mb-4">A comprehensive guide on leveraging ROADMAP to learn Machine Learning and Artificial Intelligence from scratch.</p>
              <span className="text-luxury-purple font-semibold text-sm">Read More →</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
