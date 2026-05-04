// ============================================================
//  COMPONENT: HeroSection.jsx
// ============================================================

import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Award } from 'lucide-react'

const STATS = [
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Award, value: '8+',   label: 'Years Experience' },
  { icon: Star,  value: '4.9',  label: 'Average Rating' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)' }} />
        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              top: `${15 + i * 14}%`,
              left: `${5 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              width: i % 2 === 0 ? '5px' : '8px',
              height: i % 2 === 0 ? '5px' : '8px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left — Copy */}
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            <span className="w-8 h-px bg-[#D4AF37]" />
            We Design, You Celebrate
          </p>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-gray-900">
            Where Every Event{' '}
            <span className="font-heading italic text-gradient-gold">Becomes a Story</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
            BE5 Events turns your ideas into unforgettable experiences. From college fests to corporate galas and private parties — we handle it all with creativity and perfection.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
            >
              Plan Your Event
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-gray-800 glass-card border border-gray-200 hover:border-violet-500/50 transition-all duration-300"
            >
              View Packages
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
                  <Icon size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg leading-none">{value}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual card stack */}
        <div className="hidden lg:block relative">
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            {/* Main event image placeholder */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden glow-primary"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(147,51,234,0.1))',
                border: '1px solid rgba(124,58,237,0.3)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">💍</div>
                  <p className="font-heading text-2xl text-gray-900 font-bold">Your Dream Event</p>
                  <p className="text-gray-600 text-sm mt-2">Awaits You</p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl border border-[#D4AF37]/30"
              style={{ boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
              </div>
              <p className="text-gray-900 font-bold text-xl mt-1">4.9 / 5.0</p>
              <p className="text-gray-600 text-xs">Based on 100+ reviews</p>
            </div>
            {/* Floating tag */}
            <div className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-full border border-violet-500/30">
              <p className="text-violet-300 text-sm font-medium">✨ Premium Events</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FDFBF7, transparent)' }} />
    </section>
  )
}
