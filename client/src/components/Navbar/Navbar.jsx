import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/BE5 logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PACKAGES', path: '/packages' },
    { name: 'CUSTOM PLANNER', path: '/planner' },
    { name: 'PORTFOLIO', path: '/#portfolio' },
    { name: 'CONTACT', path: '/#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-primary">
          <img src={logo} alt="BE5 Eventory Logo" className="h-12 md:h-14 w-auto object-contain rounded" />
          <div className="hidden sm:block">
            <p className="text-[0.6rem] tracking-[1px] text-gray-500 uppercase m-0 leading-tight">WHERE EVERY EVENT<br/>BECOMES A STORY</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.path} 
              className="text-sm font-semibold text-gray-800 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a href="/#contact" className="btn btn-primary">BOOK NOW</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-primary p-0 bg-transparent focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-[-1] flex flex-col items-center justify-center transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.path} 
              className="font-heading text-2xl text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/#contact" 
            className="btn btn-primary mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            BOOK NOW
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
