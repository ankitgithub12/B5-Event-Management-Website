import { Link } from 'react-router-dom';
import { MessageSquare, Sparkles, Sliders, ArrowRight, CalendarCheck, Heart, UserCheck } from 'lucide-react';

const FloatingGoldParticles = () => (
  <div className="particles-container">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="particle" />
    ))}
  </div>
);

const highlights = [
  {
    icon: CalendarCheck,
    stat: '500+',
    label: 'Events Delivered',
    desc: 'Flawlessly executed across India',
  },
  {
    icon: Heart,
    stat: '100%',
    label: 'Client Satisfaction',
    desc: 'Because your vision is our mission',
  },
  {
    icon: UserCheck,
    stat: 'Dedicated',
    label: 'Event Manager',
    desc: 'One point of contact, start to finish',
  },
];

const EventCTA = () => {
  return (
    <section id="event-cta" className="py-12 md:py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #1a0e2e 0%, #241235 30%, #3B1E54 60%, #2d1645 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 12s ease-in-out infinite'
    }}>
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-accent/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      {/* Floating particles */}
      <FloatingGoldParticles />

      {/* Floating sparkles */}
      <div className="absolute top-16 left-[8%] text-accent/15 text-xl md:text-3xl sparkle-float">✦</div>
      <div className="absolute bottom-16 right-[12%] text-accent/12 text-2xl md:text-4xl sparkle-float-delayed">✦</div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-8 justify-between">
          
          {/* Left Content — Trust Highlights */}
          <div className="lg:w-5/12 text-center lg:text-left text-white font-body">
            <div className="inline-block relative mb-4 md:mb-6">
              <span className="absolute -left-8 -top-8 text-4xl text-accent/25 sparkle-float hidden lg:block">✦</span>
              <h2 className="text-3xl md:text-5xl font-heading mb-3 md:mb-4 leading-tight">
                Ready to Create<br/>Something Epic?
              </h2>
              <span className="absolute -right-12 top-4 text-3xl text-accent/25 sparkle-float-delayed hidden lg:block">✦</span>
            </div>
            
            <p className="text-white/70 mb-6 md:mb-10 text-sm md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              From intimate gatherings to grand celebrations — we bring your ideas to life with precision, passion, and a personal touch.
            </p>

            {/* Mobile: compact 3-column grid | Desktop: vertical list */}
            <div className="grid grid-cols-3 gap-3 lg:flex lg:flex-col lg:gap-5 lg:items-start">
              {highlights.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-center gap-2 lg:gap-4 p-3 lg:p-0 rounded-xl lg:rounded-none bg-white/5 lg:bg-transparent border border-white/10 lg:border-0 group">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/5 lg:bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark group-hover:shadow-[0_0_20px_rgba(200,158,98,0.3)] transition-all duration-500 shrink-0">
                    <item.icon size={18} className="lg:!w-5 lg:!h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {/* Mobile: stacked centered text | Desktop: inline row */}
                  <div>
                    <p className="font-semibold font-body text-accent text-lg md:text-xl lg:text-lg leading-tight">
                      {item.stat}
                    </p>
                    <p className="font-semibold font-body text-white/90 text-[11px] md:text-xs lg:text-base leading-tight mt-0.5">
                      {item.label}
                    </p>
                    <p className="text-white/45 text-[10px] lg:text-xs mt-0.5 hidden lg:block">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action Menu */}
          <div className="lg:w-6/12 w-full">
            <div className="glass-card rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative border border-white/10">
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
              
              <h3 className="text-xl md:text-2xl font-heading text-white mb-2">Get Started</h3>
              <p className="text-white/55 text-xs md:text-sm mb-5 md:mb-8">Choose how you'd like to begin planning your next unforgettable celebration.</p>

              <div className="space-y-3 md:space-y-4">
                
                {/* Option 1: Consultation */}
                <Link 
                  to="/contact" 
                  className="flex items-center gap-3 md:gap-4 p-3.5 md:p-5 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:shadow-[0_0_25px_rgba(200,158,98,0.08)]"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <MessageSquare size={18} className="md:!w-[22px] md:!h-[22px] stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-sm md:text-base group-hover:text-accent transition-colors">
                      Book Free Consultation
                    </h4>
                    <p className="text-white/50 text-xs mt-0.5">
                      Chat with our planning experts to outline your custom layout, date, and ideas.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </Link>

                {/* Option 2: Custom Planner */}
                <Link 
                  to="/planner" 
                  className="flex items-center gap-3 md:gap-4 p-3.5 md:p-5 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:shadow-[0_0_25px_rgba(200,158,98,0.08)]"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Sliders size={18} className="md:!w-[22px] md:!h-[22px] stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-sm md:text-base group-hover:text-accent transition-colors">
                      Customize Your Package
                    </h4>
                    <p className="text-white/50 text-xs mt-0.5">
                      Select specific vendor options and get an automated pricing quote instantly.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </Link>

                {/* Option 3: Standard Packages */}
                <Link 
                  to="/packages" 
                  className="flex items-center gap-3 md:gap-4 p-3.5 md:p-5 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:shadow-[0_0_25px_rgba(200,158,98,0.08)]"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Sparkles size={18} className="md:!w-[22px] md:!h-[22px] stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-sm md:text-base group-hover:text-accent transition-colors">
                      Browse Curated Packages
                    </h4>
                    <p className="text-white/50 text-xs mt-0.5">
                      Explore our popular, pre-designed pricing plans for weddings and corporate galas.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </Link>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default EventCTA;
