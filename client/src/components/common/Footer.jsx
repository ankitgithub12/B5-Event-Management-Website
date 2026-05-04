// ============================================================
//  COMPONENT: Footer.jsx
// ============================================================

import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import logo from '../../assets/BE5 logo.jpeg'

const QUICK_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Planner',  to: '/planner' },
  { label: 'Contact',  to: '/contact' },
]

const SERVICES_LINKS = [
  'Wedding Planning',
  'Pre-Wedding Shoot',
  'Engagement Ceremony',
  'Corporate Events',
  'Birthday Parties',
  'Anniversary Events',
]

// Inline SVG social icons (brand icons removed from lucide-react)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)

const SOCIALS = [
  { Icon: InstagramIcon, href: '#', label: 'Instagram' },
  { Icon: FacebookIcon,  href: '#', label: 'Facebook' },
  { Icon: YoutubeIcon,   href: '#', label: 'YouTube' },
  { Icon: TwitterIcon,   href: '#', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#060610]">
      {/* Glow top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="BE5 Events" className="h-10 rounded-lg" />
              <span className="font-heading text-xl font-bold">
                <span className="text-gradient-primary">BE5</span>
                <span className="text-gradient-gold"> Events</span>
              </span>
            </Link>
            <p className="text-sm text-[#A89BC2] leading-relaxed mb-6">
              Where Every Event Becomes a Story. Premium wedding &amp; event management in Jaipur, Rajasthan.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full glass-card text-[#A89BC2] hover:text-white hover:border-violet-500/50 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-[#A89BC2] hover:text-[#D4AF37] transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wider uppercase">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm text-[#A89BC2] hover:text-[#D4AF37] transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37] inline-block" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wider uppercase">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-violet-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+919876543210" className="text-sm text-[#A89BC2] hover:text-white transition-colors block">+91 98765 43210</a>
                  <a href="tel:+919876543210" className="text-sm text-[#A89BC2] hover:text-white transition-colors block">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-violet-400 shrink-0" />
                <a href="mailto:hello@be5eventery.com" className="text-sm text-[#A89BC2] hover:text-white transition-colors">
                  hello@be5eventery.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-violet-400 mt-0.5 shrink-0" />
                <span className="text-sm text-[#A89BC2]">Jaipur, Rajasthan, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A89BC2]">
            © {new Date().getFullYear()} BE5 Events. All rights reserved.
          </p>
          <p className="text-xs text-[#A89BC2]">
            Crafted with ❤️ in Jaipur
          </p>
        </div>
      </div>
    </footer>
  )
}
