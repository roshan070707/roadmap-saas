import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Check } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function WaitlistModal({ isOpen, onClose, featureName }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const joinWaitlist = useMutation(api.waitlist.join);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setStatus('loading');
    try {
      await joinWaitlist({ featureName, name, email });
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setName('');
        setEmail('');
      }, 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-luxury-bg border border-text-main/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="inline-block px-3 py-1 rounded-full bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-[10px] font-bold uppercase tracking-widest mb-4">
                Notify Me
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-2">Get Notified</h2>
              <p className="text-text-muted text-sm mb-6">
                Be the first to know when <strong className="text-white">{featureName}</strong> is available.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-black/30 border border-text-main/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-purple transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-black/30 border border-text-main/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-purple transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full btn-premium py-3 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === 'success' ? (
                    <>
                      <Check className="w-5 h-5" /> Got it!
                    </>
                  ) : (
                    'Notify Me'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
