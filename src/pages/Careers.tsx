import Footer from '../components/Footer';

export default function Careers() {
  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
            Careers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Currently not hiring</h1>
          <p className="text-text-muted text-xl mb-8 font-light">
            We are a small, focused team dedicated to building the best possible product. At this time, we do not have any open positions.
          </p>
          
          <div className="glass-card p-8 border-text-main/10 text-left">
            <h3 className="text-xl font-bold text-text-main mb-2">Want to stay in touch?</h3>
            <p className="text-text-muted mb-6">
              If you're passionate about what we're building and want to be considered for future roles, feel free to reach out.
            </p>
            <a href="mailto:hello@roadmap.com" className="btn-premium-secondary block text-center py-3 px-6 w-full font-bold">Contact Us</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
