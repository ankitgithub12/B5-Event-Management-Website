import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Briefcase, Image, MessageCircle, Calendar, Phone } from 'lucide-react';
import logo from "../../assets/B5_logo.png";

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

  const isHomePage = location.pathname === '/';
  const isSolid = isScrolled || !isHomePage;

  return (
    <>
      {/* Top Header - Desktop and Mobile */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isSolid
          ? 'bg-white/80 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(59,30,84,0.08)] border-b border-accent/10'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt="B5 Logo"
                className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-xl shadow-xl border-2 border-white bg-white transition-transform duration-500 group-hover:scale-105"
                width={64}
                height={64}
              />
              <div className="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_25px_rgba(200,158,98,0.5)] transition-all duration-500"></div>
              {/* Gold glow ring on hover */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <span className={`block font-bold text-xl md:text-2xl leading-none tracking-tight font-body transition-all duration-500 ${isSolid
                ? 'text-gradient-gold'
                : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
                }`}>
                B5 EVENTORY
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`text-sm font-bold tracking-wide transition-all duration-300 relative group ${isActive(link.path)
                  ? 'text-accent'
                  : (isSolid ? 'text-primary hover:text-accent' : 'text-white hover:text-accent drop-shadow-md')
                  }`}
              >
                {link.name.toUpperCase()}
                {/* Animated underline — expand from center */}
                <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-400 ${isActive(link.path) ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button with Shimmer */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="relative overflow-hidden bg-gradient-to-r from-accent to-[#d4ad6e] text-white px-8 py-2.5 text-sm font-bold rounded-full shadow-[0_8px_25px_rgba(200,158,98,0.35)] hover:shadow-[0_12px_35px_rgba(200,158,98,0.5)] hover:-translate-y-0.5 transition-all duration-400 group"
            >
              <span className="relative z-10">BOOK CONSULTATION</span>
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            </Link>
          </div>

          {/* Mobile Quick Call */}
          <div className="lg:hidden">
            <a href="tel:+919414644988" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300 glow-accent">
              <Phone size={18} fill="currentColor" />
            </a>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/85 backdrop-blur-xl border-t border-accent/10 z-50 pb-safe shadow-[0_-8px_30px_rgba(59,30,84,0.1)] rounded-t-[32px]">
        <div className="flex justify-around items-center h-20 px-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 flex-1 h-full relative ${isActive(link.path) ? 'text-accent' : 'text-gray-400'
                }`}
            >
              <div className={`transition-all duration-300 ${isActive(link.path) ? 'scale-110 -translate-y-1' : ''}`}>
                {link.icon}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive(link.path) ? 'opacity-100' : 'opacity-70'}`}>
                {link.name}
              </span>
              {isActive(link.path) && (
                <>
                  <div className="absolute -bottom-0 w-8 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
                </>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
