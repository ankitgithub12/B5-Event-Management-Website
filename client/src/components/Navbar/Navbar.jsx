import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Briefcase, Image, MessageCircle, Calendar, Phone } from 'lucide-react';
import logo from '../../assets/B5 logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Services', path: '/services', icon: <LayoutGrid size={22} /> },
    { name: 'Packages', path: '/packages', icon: <Briefcase size={22} /> },
    { name: 'Planner', path: '/planner', icon: <Calendar size={22} /> },
    { name: 'Portfolio', path: '/portfolio', icon: <Image size={22} /> },
    { name: 'Contact', path: '/contact', icon: <MessageCircle size={22} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Header - Desktop and Mobile (Logo only) */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="B5 Logo" 
              className="h-10 w-10 md:h-14 md:w-14 object-cover rounded-xl shadow-md border-2 border-white" 
            />
            <div className="hidden sm:block">
              <span className="block text-primary font-bold text-lg leading-none tracking-tight font-serif">B5 EVENTORY</span>
              
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                className={`text-sm font-bold tracking-wide transition-all duration-300 relative group ${
                  isActive(link.path) ? 'text-[#C5A06B]' : 'text-primary hover:text-[#C5A06B]'
                }`}
              >
                {link.name.toUpperCase()}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#C5A06B] transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact" className="bg-[#C5A06B] text-white px-8 py-2.5 text-sm font-bold rounded-full shadow-lg hover:bg-[#B38F5A] transition-colors">
              BOOK CONSULTATION
            </Link>
          </div>

          {/* Mobile Quick Call (Top Right) */}
          <div className="lg:hidden">
            <a href="tel:+91XXXXXXXXXX" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform">
              <Phone size={18} fill="currentColor" />
            </a>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.08)] rounded-t-[32px]">
        <div className="flex justify-around items-center h-20 px-2">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 flex-1 h-full relative ${
                isActive(link.path) ? 'text-accent' : 'text-gray-400'
              }`}
            >
              <div className={`transition-all duration-300 ${isActive(link.path) ? 'scale-110 -translate-y-1' : ''}`}>
                {link.icon}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive(link.path) ? 'opacity-100' : 'opacity-70'}`}>
                {link.name}
              </span>
              {isActive(link.path) && (
                <div className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;


