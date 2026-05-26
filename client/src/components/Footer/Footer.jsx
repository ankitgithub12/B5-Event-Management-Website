import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../../assets/B5_logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-gray-200 pt-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">

        {/* Brand & Socials */}
        <div className="lg:col-span-5">
          <Link to="/" className="flex items-center gap-4 mb-6 group">
            <img
              src={logo}
              alt="B5 Eventory Logo"
              className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-2xl shadow-2xl border-2 border-white bg-white p-1"
            />
            <div>
              <span className="block text-white font-bold text-2xl tracking-tighter font-serif group-hover:text-accent transition-colors">B5 EVENTORY</span>
              <p className="text-[0.6rem] tracking-[2px] text-accent uppercase m-0 mt-1 font-semibold">WHERE EVERY EVENT BECOMES A STORY</p>
            </div>
          </Link>
          <div className="flex gap-4">
            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300">
              <MessageCircle size={20} />
            </a>
            <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2">
          <h3 className="font-body text-sm font-semibold tracking-[1px] text-white mb-6 uppercase">QUICK LINKS</h3>
          <ul className="flex flex-col gap-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: 'Packages', path: '/packages' },
              { name: 'Custom Planner', path: '/planner' },
              { name: 'Portfolio', path: '/#portfolio' },
              { name: 'Hospitality', path: '/hospitality' },
              { name: 'Contact', path: '/#contact' }
            ].map((link, i) => (
              <li key={i}>
                <a href={link.path} className="text-sm text-white/70 hover:text-accent relative group inline-block">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="lg:col-span-2">
          <h3 className="font-body text-sm font-semibold tracking-[1px] text-white mb-6 uppercase">OUR SERVICES</h3>
          <ul className="flex flex-col gap-3">
            {['College Events', 'Corporate Events', 'Private Parties', 'Weddings', 'Product Launches', 'Exhibitions'].map((service, i) => (
              <li key={i}>
                <a href="/#services" className="text-sm text-white/70 hover:text-accent relative group inline-block">
                  {service}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="lg:col-span-3">
          <h3 className="font-body text-sm font-semibold tracking-[1px] text-white mb-6 uppercase">CONTACT US</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3 text-sm text-white/70">
              <Phone size={18} className="text-accent shrink-0 mt-0.5" />
              <span>+91 9414644988</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <Mail size={18} className="text-accent shrink-0 mt-0.5" />
              <span>hello@b5eventory.com</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
              <span>Jaipur, Rajasthan</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 py-6 px-4 text-center text-sm text-white/50">
        <p className="mb-3 md:mb-0 inline md:inline">&copy; {new Date().getFullYear()} B5 Eventory. All Rights Reserved.</p>
        <span className="hidden md:inline mx-4">|</span>
        <Link to="/admin/login" className="hover:text-accent transition-colors inline md:inline">Admin Login</Link>
      </div>
    </footer>
  );
};

export default Footer;
