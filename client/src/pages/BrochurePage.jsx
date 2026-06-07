import { useEffect } from 'react';
import { Phone, Mail, MapPin, Sparkles, Printer, Check } from 'lucide-react';
import logo from '../assets/B5_logo.png';

const BrochurePage = () => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Auto trigger print dialog after content loads
    const timer = setTimeout(() => {
      window.print();
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: 'Exotic Floral & Decor',
      description: 'Luxury design, themed decor layouts, and breathtaking floral installations tailored to create unforgettable atmospheres.',
      features: ['Custom Stage Designs', 'Premium Floral Accents', 'Ambient Lighting Accents']
    },
    {
      title: 'Gourmet Catering & Bar',
      description: 'A curated culinary journey featuring multi-cuisine delicacies, exquisite presentation, and professional mixology services.',
      features: ['Signature Cocktails', 'Customizable Menus', 'Five-Star Hospitality']
    },
    {
      title: 'Cinematic Photography & Film',
      description: 'Capturing moments, raw emotions, and details with cinematic storytelling, high-resolution cameras, and premium highlight reels.',
      features: ['Pre-wedding Shoots', 'Candid Coverage', 'Drone/4K Videography']
    },
    {
      title: 'Celebrity & Entertainment',
      description: 'Curating world-class entertainment, artist coordination, live acoustic performances, and state-of-the-art stage setups.',
      features: ['Artist Management', 'Sound & Light Production', 'Choreographed Performances']
    },
    {
      title: 'Seamless Logistics & Hospitality',
      description: 'End-to-end guest assistance, RSVP management, venue coordination, and smooth execution on the event day.',
      features: ['24/7 Guest Helpdesk', 'Transport Logistics', 'Vendor Operations']
    }
  ];

  const packages = [
    {
      name: 'Grand Celebration',
      subtitle: 'The Ultimate Luxury Experience',
      price: 'Bespoke Pricing',
      description: 'Complete end-to-end planning with premium decor, high-end catering, cinematic coverage, and live entertainment.',
      features: ['Unlimited custom design reviews', 'Full venue takeover management', 'VVIP guest coordination & premium lounge', 'Full wedding video highlight & prints']
    },
    {
      name: 'Classic Elegance',
      subtitle: 'Perfect Premium Balance',
      price: 'Standard Tier',
      description: 'Elegant setups with premium decor, curated menus, candid photography coverage, and seamless logistics.',
      features: ['Choice of 3 theme palettes', 'Standard 5-course gourmet menu', 'Full day photo & video coverage', 'Dedicated event coordinator']
    },
    {
      name: 'Intimate Affair',
      subtitle: 'Boutique & Classy',
      price: 'Essential Tier',
      description: 'Curated styling and logistical coordination for boutique gatherings, engagements, and private parties.',
      features: ['Elegant minimal backdrop design', 'Cocktail style catering & bites', 'Professional candid photographer', 'On-day coordinator (8 hours)']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-body antialiased print:bg-white print:text-black">
      {/* Print Instructions Bar */}
      <div className="bg-primary text-white py-4 px-6 sticky top-0 z-50 flex items-center justify-between shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <Sparkles className="text-accent animate-pulse" size={20} />
          <div>
            <h1 className="font-heading font-bold text-sm tracking-wider uppercase">B5 Eventory Brochure</h1>
            <p className="text-xs text-white/70">Press Ctrl+P if the print prompt did not open automatically.</p>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-accent hover:bg-white hover:text-primary text-primary px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Printer size={14} /> Print / Save PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 bg-white shadow-xl my-8 rounded-3xl border border-gray-100 print:shadow-none print:my-0 print:py-4 print:px-2 print:border-none print:rounded-none">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center border-b-2 border-accent/20 pb-8 gap-6 print:pb-6">
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="B5 Eventory" 
              className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-xl border border-accent/20 bg-white"
            />
            <div>
              <h2 className="text-3xl font-heading font-extrabold tracking-tight text-primary uppercase">B5 Eventory</h2>
              <p className="text-accent font-semibold tracking-[3px] text-xs uppercase mt-0.5">Luxury Event Planners</p>
            </div>
          </div>
          <div className="text-center md:text-right text-sm text-gray-600 print:text-xs">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-1.5">
              <Phone size={14} className="text-accent" />
              <span className="font-semibold">+91 9414644988</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 mb-1.5">
              <Mail size={14} className="text-accent" />
              <span>B5eventory@gmail.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2">
              <MapPin size={14} className="text-accent" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
          </div>
        </header>

        {/* Intro */}
        <section className="my-10 text-center print:my-6">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mb-3">Your Dream Event, Crafted to Perfection</h3>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base print:text-xs">
            At B5 Eventory, we don't just plan events — we choreograph experiences. Based in Jaipur, we specialize in high-end destination weddings, corporate galas, and bespoke parties, combining signature design, exquisite gastronomy, and seamless execution.
          </p>
        </section>

        {/* Services */}
        <section className="my-12 print:my-8">
          <div className="flex items-center gap-3 mb-6 border-b border-accent/10 pb-2">
            <span className="w-2.5 h-6 bg-accent rounded-full"></span>
            <h4 className="text-lg font-heading font-extrabold text-primary uppercase tracking-wider">Our Signature Services</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between print:bg-white print:border-gray-200 print:p-4 print:rounded-xl">
                <div>
                  <h5 className="font-heading font-bold text-base text-primary mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {service.title}
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((feat, fIdx) => (
                    <span key={fIdx} className="text-[10px] bg-accent/10 text-primary px-2.5 py-0.5 rounded-full font-medium print:border print:border-accent/20">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Package Tiers */}
        <section className="my-12 page-break print:my-8">
          <div className="flex items-center gap-3 mb-6 border-b border-accent/10 pb-2">
            <span className="w-2.5 h-6 bg-accent rounded-full"></span>
            <h4 className="text-lg font-heading font-extrabold text-primary uppercase tracking-wider">Pricing & Packages</h4>
          </div>

          <div className="space-y-6">
            {packages.map((pkg, index) => (
              <div key={index} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between gap-6 print:bg-white print:border-gray-200 print:p-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h5 className="font-heading font-bold text-lg text-primary">{pkg.name}</h5>
                    <span className="text-xs uppercase font-bold tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full w-fit">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mb-3 italic">{pkg.subtitle}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{pkg.description}</p>
                </div>
                
                <div className="md:w-64 flex flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-gray-200/60 pt-4 md:pt-0 md:pl-6">
                  <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Features Included:</span>
                  <ul className="space-y-1.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-[11px] text-gray-700 flex items-start gap-1.5 leading-snug">
                        <Check size={12} className="text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer info / Terms / CTA */}
        <footer className="mt-16 pt-8 border-t-2 border-accent/20 text-center print:mt-10 print:pt-6">
          <p className="text-sm font-heading font-extrabold text-primary mb-2 uppercase">Ready to start planning?</p>
          <p className="text-xs text-gray-500 max-w-lg mx-auto mb-6">
            Contact our dedicated coordinators today for a complimentary event audit & custom design consultation. Let's make your vision a stellar reality.
          </p>
          
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-center text-left text-xs bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-3xl mx-auto print:bg-white print:border-gray-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Corporate Website</span>
              <a href="https://b5eventory.com" className="text-accent font-bold hover:underline">b5eventory.com</a>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Phone Booking</span>
              <span className="text-primary font-bold">+91 9414644988</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Email Inquiry</span>
              <span className="text-primary font-bold">B5eventory@gmail.com</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Location Hub</span>
              <span className="text-primary font-bold">Jaipur, RJ, India</span>
            </div>
          </div>

          <div className="mt-8 text-[10px] text-gray-400">
            © {new Date().getFullYear()} B5 Eventory Private Limited. All rights reserved.
          </div>
        </footer>

      </div>
    </div>
  );
};

export default BrochurePage;
