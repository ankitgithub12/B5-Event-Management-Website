import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('b5_cookie_consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('b5_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('b5_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 overflow-hidden bg-primary-dark/95 backdrop-blur-md border border-accent/20 rounded-3xl p-6 md:p-8 shadow-gold"
        >
          {/* Subtle Accent Glow Top Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50" />
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-accent-light p-3 rounded-2xl text-accent">
              <Cookie className="w-6 h-6 stroke-[1.5]" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-white font-heading font-semibold text-lg">
                  We Use Cookies
                </h4>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-white/40 hover:text-white/80 transition-colors p-1 rounded-lg hover:bg-white/5"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/70 font-body text-xs leading-relaxed mb-6">
                We use cookies to optimize our website, analyze traffic, and personalize your experience. By clicking "Accept All", you agree to our use of cookies.
              </p>
              
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={handleDecline}
                  className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-white/80 hover:text-white text-[11px] font-body font-semibold tracking-wider uppercase transition-all duration-300"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-primary-dark text-[11px] font-body font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
