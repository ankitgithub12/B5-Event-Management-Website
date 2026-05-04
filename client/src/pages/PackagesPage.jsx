// ============================================================
//  PAGE: PackagesPage.jsx
// ============================================================

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PackageCard from '../components/packages/PackageCard'
import SectionHeader from '../components/common/SectionHeader'
import { PACKAGES, PACKAGE_COMPARISON_FEATURES, PACKAGE_FEATURE_MATRIX } from '../models/packages.model'

export default function PackagesPage() {
  const [showComparison, setShowComparison] = useState(false)

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 hero-bg text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">Transparent Pricing</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Our <span className="text-gradient-gold italic">Packages</span>
          </h1>
          <p className="text-[#A89BC2] text-lg leading-relaxed">
            Clear, honest pricing with no hidden costs. Choose the package that fits your dream and budget.
          </p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Compare toggle */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold glass-card border border-white/10 hover:border-violet-500/40 text-[#A89BC2] hover:text-white transition-all duration-300"
            >
              {showComparison ? 'Hide Comparison' : 'Compare All Packages'}
              <ArrowRight size={14} className={showComparison ? 'rotate-90' : ''} />
            </button>
          </div>

          {/* Comparison table */}
          {showComparison && (
            <div className="mt-10 overflow-x-auto rounded-2xl glass-card">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <th className="py-4 px-6 text-left text-[#A89BC2] font-medium">Feature</th>
                    {PACKAGES.map((p) => (
                      <th key={p.id} className="py-4 px-4 text-center font-semibold" style={{ color: p.color }}>
                        {p.icon} {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PACKAGE_COMPARISON_FEATURES.map((feat, i) => (
                    <tr key={feat} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                      <td className="py-3 px-6 text-[#A89BC2]">{feat}</td>
                      {PACKAGES.map((p) => (
                        <td key={p.id} className="py-3 px-4 text-center text-white text-xs">
                          {PACKAGE_FEATURE_MATRIX[p.id][i]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <td className="py-4 px-6 font-semibold text-white">Starting Price</td>
                    {PACKAGES.map((p) => (
                      <td key={p.id} className="py-4 px-4 text-center font-bold text-sm" style={{ color: p.color }}>
                        {p.displayPrice}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Custom CTA */}
      <section className="py-16 px-4 md:px-8 text-center"
        style={{ background: 'linear-gradient(135deg,#12082A,#0A0A18)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-[#A89BC2] mb-8">
            Use our intelligent planner to mix and match services and get a personalised quote instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)' }}
            >
              Build My Package <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold glass-card border border-white/10 text-white hover:border-violet-500/40 transition-all duration-300"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
