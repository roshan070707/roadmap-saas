import { useState } from 'react';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';
import { WaitlistModal } from '../components/WaitlistModal';

export default function Pricing() {
  const [waitlistFeature, setWaitlistFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-luxury-bg flex flex-col">
      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-bold uppercase tracking-widest mb-6">
              Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">Simple, transparent pricing</h1>
            <p className="text-text-muted text-xl font-light">Start for free. Upgrade when you need more power.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 border-text-main/10 flex flex-col">
              <h3 className="text-2xl font-bold text-text-main mb-2">Free</h3>
              <p className="text-text-muted mb-6">For individual learners</p>
              <div className="text-4xl font-bold text-white mb-6">₹0<span className="text-lg text-text-muted font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> 3 Active Roadmaps</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Basic Study Timer</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Community Access</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Standard Analytics</li>
              </ul>
              <button className="w-full py-3 rounded-full bg-text-main text-luxury-bg font-bold">Current Plan</button>
            </div>
            
            <div className="glass-card p-8 border-luxury-purple bg-luxury-purple/5 flex flex-col relative">
              <div className="absolute top-0 right-0 bg-luxury-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">Coming Soon</div>
              <h3 className="text-2xl font-bold text-text-main mb-2">Pro</h3>
              <p className="text-text-muted mb-6">For serious professionals</p>
              <div className="text-4xl font-bold text-white mb-6">₹299<span className="text-lg text-text-muted font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Unlimited Roadmaps</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Advanced Analytics & Health Score</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Export Roadmap as PDF</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Premium Themes</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> AI Recommendations</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Priority Support</li>
              </ul>
              <button onClick={() => setWaitlistFeature('ROADMAP Pro')} className="w-full py-3 rounded-full bg-luxury-purple/20 text-luxury-purple font-bold border border-luxury-purple/30 hover:bg-luxury-purple/30 transition-colors">Notify Me</button>
            </div>
            
            <div className="glass-card p-8 border-text-main/10 flex flex-col relative">
              <div className="absolute top-0 right-0 bg-text-main/10 text-text-muted text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">Coming Soon</div>
              <h3 className="text-2xl font-bold text-text-main mb-2">Team</h3>
              <p className="text-text-muted mb-6">For organizations</p>
              <div className="text-4xl font-bold text-white mb-6">₹999<span className="text-lg text-text-muted font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Everything in Pro</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Shared Roadmaps & Team Leaderboard</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Team Study Analytics & Goals</li>
                <li className="flex items-center gap-3 text-text-muted"><Check className="w-5 h-5 text-luxury-purple" /> Team Achievements</li>
              </ul>
              <button onClick={() => setWaitlistFeature('ROADMAP for Teams')} className="w-full py-3 rounded-full bg-text-main/5 text-text-muted font-bold border border-text-main/10 hover:bg-text-main/10 transition-colors">Notify Me</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WaitlistModal 
        isOpen={!!waitlistFeature} 
        onClose={() => setWaitlistFeature(null)} 
        featureName={waitlistFeature || ''} 
      />
    </div>
  );
}
