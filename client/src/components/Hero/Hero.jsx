import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Top Gradient for navbar visibility */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-20 pointer-events-none"></div>

      {/* Split Background */}
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        <div className="flex-1 relative group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1530023367847-a683933f4172"
            alt="Wedding Celebration"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors duration-500"></div>
        </div>
        <div className="flex-1 relative group overflow-hidden">
          <img
            src="https://www.bfivewarriors.com/assets/images/gallery/image16.png"
            alt="Birthday Party"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors duration-500"></div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-semibold text-xs md:text-sm tracking-[3px] uppercase mb-8 animate-fade-in">
            <span>✨</span> WE DESIGN. YOU CELEBRATE.
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-8 leading-tight drop-shadow-2xl">
            Where Every  <br />Event  Becomes a <span className="text-accent italic font-serif">Story</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
            Weddings • Engagements • Birthdays • Anniversaries • Corporate Events
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#contact" className="btn bg-accent text-white hover:bg-accent-hover px-10 py-4 text-lg shadow-gold transition-all duration-300 group">
              Start Planning <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/packages" className="btn border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg backdrop-blur-sm transition-all duration-300">
              View Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient for smoothness */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;

