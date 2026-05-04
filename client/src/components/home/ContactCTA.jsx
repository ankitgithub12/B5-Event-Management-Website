// ============================================================
//  COMPONENT: ContactCTA.jsx  (Home page bottom CTA)
// ============================================================

import { Link } from 'react-router-dom'
import { Phone, Mail, Calendar } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F3E8FF 0%, #FDFBF7 50%, #FAF5FF 100%)' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">Get In Touch</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Let's Plan Your<br />
            <span className="text-gradient-gold italic">Next Event</span>
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Your dream event is just a message away. Get a free consultation today!
          </p>
          <div className="space-y-4">
            <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
              <Phone size={18} className="text-violet-400" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:hello@be5eventery.com" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
              <Mail size={18} className="text-violet-400" />
              <span>hello@be5eventery.com</span>
            </a>
          </div>
        </div>

        {/* Right — Quick form */}
        <div className="glass-card p-8 rounded-2xl" style={{ border: '1px solid rgba(212,175,55,0.2)' }}>
          <h3 className="font-heading text-xl text-gray-900 font-bold mb-6">Get Free Consultation</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input className="input-field" placeholder="Your Name" type="text" />
              <input className="input-field" placeholder="Phone Number" type="tel" />
            </div>
            <input className="input-field" placeholder="Email Address" type="email" />
            <select className="input-field appearance-none">
              <option value="" disabled selected>Event Type</option>
              <option>Wedding</option>
              <option>Engagement</option>
              <option>Corporate Event</option>
              <option>Birthday Party</option>
              <option>Anniversary</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input className="input-field" placeholder="Your Budget (Optional)" type="text" />
              <input className="input-field" type="date" />
            </div>
            <Link
              to="/contact"
              className="block w-full text-center py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0D060)', color: '#0A0A18' }}
            >
              Get Free Consultation
            </Link>
          </form>
        </div>
      </div>
    </section>
  )
}
