// ============================================================
//  COMPONENT: PortfolioGrid.jsx
// ============================================================

import { Link } from 'react-router-dom'
import SectionHeader from '../common/SectionHeader'

const PORTFOLIO_ITEMS = [
  { emoji: '🎓', label: 'College Fest',   color: '#7C3AED' },
  { emoji: '🏢', label: 'Corporate Gala', color: '#06B6D4' },
  { emoji: '💒', label: 'Wedding Setup',  color: '#D4AF37' },
  { emoji: '🚀', label: 'Product Launch', color: '#9333EA' },
  { emoji: '🎂', label: 'Birthday Party', color: '#EC4899' },
  { emoji: '💍', label: 'Engagement',     color: '#F59E0B' },
]

export default function PortfolioGrid() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag="Our Work" title="Turning Ideas Into Reality" subtitle="A glimpse into the magical moments we've created for our clients." />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {PORTFOLIO_ITEMS.map(({ emoji, label, color }) => (
            <div
              key={label}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ background: `radial-gradient(circle at 30% 30%, ${color}44, ${color}11)`, border: `1px solid ${color}33` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">{emoji}</span>
                <p className="text-gray-900 text-xs font-medium text-center">{label}</p>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: `${color}22` }}>
                <span className="text-gray-900 text-xs font-semibold tracking-wider uppercase">View</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold glass-card border border-gray-200 hover:border-violet-500/40 text-gray-800 transition-all duration-300"
          >
            View All Work
          </Link>
        </div>
      </div>
    </section>
  )
}
