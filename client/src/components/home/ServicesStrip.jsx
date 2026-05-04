// ============================================================
//  COMPONENT: ServicesStrip.jsx
//  Home page — "What We Do" 3-card strip
// ============================================================

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../common/SectionHeader'

const CARDS = [
  {
    icon: '🎓',
    title: 'College Events',
    desc: 'From freshers nights to college fests, we create high-energy experiences that students will never forget.',
  },
  {
    icon: '🏢',
    title: 'Corporate Events',
    desc: 'Professional, impactful and flawless events that represent your brand the right way.',
  },
  {
    icon: '🎉',
    title: 'Private Parties',
    desc: 'Birthdays, anniversaries or special celebrations — we make your moments magical.',
  },
]

export default function ServicesStrip() {
  return (
    <section className="py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="What We Do"
          title="Events Crafted to Perfection"
          subtitle="We bring creativity, precision, and passion to every event we manage."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {CARDS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="glass-card p-8 rounded-2xl group hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{icon}</div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{desc}</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-[#D4AF37] transition-colors duration-200"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
