import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import logo from '../../assets/B5_logo.png';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative text-gray-200 pt-12 md:pt-20" style={{
      background: 'linear-gradient(180deg, #1a0e2e 0%, #241235 100%)'
    }}>
      {/* Decorative Wave SVG Separator */}
      <div className="absolute -top-[1px] left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60" className="w-full h-auto block" preserveAspectRatio="none">
          <path fill="#241235" d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* Animated gold gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-gradient-shift" style={{ backgroundSize: '200% 100%' }} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-12 relative z-10">

        {/* Brand & Socials */}
        <div className="col-span-2 lg:col-span-5">
          <Link to="/" className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 group">
            <img
              src={logo}
              alt="B5 Eventory Logo"
              className="h-12 w-12 md:h-20 md:w-20 object-contain rounded-2xl shadow-2xl border-2 border-white bg-white p-1 group-hover:shadow-[0_0_25px_rgba(200,158,98,0.3)] transition-all duration-500"
              width={80}
              height={80}
              loading="lazy"
            />
            <div>
              <span className="block text-white font-bold text-lg md:text-2xl tracking-tighter font-body group-hover:text-accent transition-colors duration-300">B5 EVENTORY</span>
              <p className="text-[0.5rem] md:text-[0.6rem] tracking-[1.5px] md:tracking-[2px] text-accent uppercase m-0 mt-1 font-semibold">WHERE EVERY EVENT BECOMES A STORY</p>
            </div>
          </Link>
          <div className="flex gap-3 md:gap-4">
            <a href="https://www.facebook.com/profile.php?id=61590305528572" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(24,119,242,0.3)] transition-all duration-300">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/bfive_eventory/" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(225,48,108,0.3)] transition-all duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="mailto:movi062026@gmail.com" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-accent hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(200,158,98,0.3)] transition-all duration-300">
              <MessageCircle size={20} />
            </a>
            <a href="https://www.youtube.com/@B5EVENTORY" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-[#FF0000] hover:border-[#FF0000] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,0,0,0.3)] transition-all duration-300">
              <FaYoutube size={20} />
            </a>
            <a href="https://www.linkedin.com/company/b5eventory/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(10,102,194,0.3)] transition-all duration-300">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 lg:col-span-2">
          <h3 className="font-body text-sm font-semibold tracking-[1px] text-white mb-3 md:mb-6 uppercase">QUICK LINKS</h3>
          <ul className="flex flex-col gap-2 md:gap-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: 'Packages', path: '/packages' },
              { name: 'Custom Planner', path: '/planner' },
              { name: 'Portfolio', path: '/#portfolio' },
              { name: 'Hospitality', path: '/hospitality' },
              { name: 'Contact', path: '/contact' }
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="text-sm text-white/60 hover:text-accent relative group inline-block transition-colors duration-300">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent/50 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="col-span-1 lg:col-span-2">
          <h3 className="font-body text-sm font-semibold tracking-[1px] text-white mb-3 md:mb-6 uppercase">OUR SERVICES</h3>
          <ul className="flex flex-col gap-2 md:gap-3">
            {[
              { name: 'College Events', path: '/portfolio?filter=college' },
              { name: 'Corporate Events', path: '/portfolio?filter=corporate' },
              { name: 'Private Parties', path: '/portfolio?filter=party' },
              { name: 'Weddings', path: '/portfolio?filter=wedding' },
              { name: 'Product Launches', path: '/portfolio?filter=product' },
              { name: 'Exhibitions', path: '/gallery?filter=exhibition' }
            ].map((service, i) => (
              <li key={i}>
                <Link to={service.path} className="text-sm text-white/60 hover:text-accent relative group inline-block transition-colors duration-300">
                  {service.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent/50 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="col-span-2 lg:col-span-3">
          <h3 className="font-body text-sm font-semibold tracking-[1px] text-white mb-3 md:mb-6 uppercase">CONTACT US</h3>
          <ul className="flex flex-col gap-3 md:gap-4">
            <li className="flex items-start gap-3 text-sm text-white/60 group">
              <Phone size={18} className="text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-white/80 transition-colors duration-300">+91 9414644988</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60 group">
              <Mail size={18} className="text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-white/80 transition-colors duration-300">B5eventory@gmail.com</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/60 group">
              <MapPin size={18} className="text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-white/80 transition-colors duration-300">Jaipur, Rajasthan</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/8 py-4 md:py-6 px-4 text-center text-xs md:text-sm text-white/40 relative z-10">
        <p className="mb-0 inline">&copy; {new Date().getFullYear()} B5 Eventory. All Rights Reserved.</p>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 lg:bottom-8 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-[#d4ad6e] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(200,158,98,0.35)] hover:shadow-[0_12px_35px_rgba(200,158,98,0.5)] hover:-translate-y-1 transition-all duration-500 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
