// ============================================================
//  PAGE: ServicesPage.jsx
// ============================================================

import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeader from '../components/common/SectionHeader'
import { SERVICES, PRE_WEDDING_LEVELS } from '../data/constants'

export default function ServicesPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 hero-bg text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">What We Offer</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Our <span className="text-gradient-gold italic">Services</span>
          </h1>
          <p className="text-[#A89BC2] text-lg leading-relaxed">
            From intimate gatherings to grand celebrations — we craft every moment with passion and precision.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ id, title, description, icon, color, features, startingFrom }) => (
              <div
                key={id}
                className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              >
                {/* Color bar */}
                <div className="h-1" style={{ background: color }} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${color}22`, color }}>
                      From {startingFrom}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl font-bold text-white mb-3">{title}</h2>
                  <p className="text-[#A89BC2] text-sm leading-relaxed mb-5">{description}</p>

                  <ul className="space-y-2 mb-6">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#A89BC2]">
                        <Check size={14} style={{ color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/planner"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color }}
                  >
                    Plan This Event <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Wedding Shoot Spotlight */}
      <section className="py-20 px-4 md:px-8"
        style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #12082A 50%, #0A0A18 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Spotlight"
            title={<>Pre-Wedding <span className="text-gradient-gold italic">Shoot Levels</span></>}
            subtitle="Choose the shoot experience that matches your story."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PRE_WEDDING_LEVELS.map(({ id, name, price, features: feats }) => (
              <div key={id} className="glass-card p-7 rounded-2xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2">
                  {id === 'basic' ? 'Essential' : id === 'medium' ? 'Premium' : 'Destination'}
                </p>
                <h3 className="font-heading text-xl font-bold text-white mb-2">{name}</h3>
                <p className="font-heading text-2xl text-violet-400 font-bold mb-5">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}
                </p>
                <ul className="space-y-2.5">
                  {feats.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#A89BC2]">
                      <Check size={14} className="text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/planner"
                  className="mt-6 block text-center py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)' }}
                >
                  Book This Shoot
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Don't See What You Need?
          </h2>
          <p className="text-[#A89BC2] mb-8">Use our Custom Planner to build your own package from scratch.</p>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
          >
            Open Custom Planner <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
