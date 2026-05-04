// ============================================================
//  COMPONENT: WhyChooseUs.jsx
// ============================================================

import SectionHeader from '../common/SectionHeader'

const REASONS = [
  {
    icon: '💎',
    title: 'Budget Friendly',
    desc: 'Premium experiences that fit your budget, from intimate gatherings to grand celebrations.',
  },
  {
    icon: '🎨',
    title: 'Creative Designs',
    desc: 'Unique ideas tailored to your vision — no two events are ever the same.',
  },
  {
    icon: '⏰',
    title: 'On-Time Execution',
    desc: 'We value your time as much as you do — every detail delivered on schedule.',
  },
  {
    icon: '🤝',
    title: 'End-to-End Management',
    desc: 'From the first call to the final farewell — we take care of every little detail.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F3FF 50%, #FDFBF7 100%)' }}
    >
      {/* bg glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader tag="Why Choose Us?" title="The BE5 Difference" subtitle="We don't just manage events — we craft experiences that last a lifetime." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {REASONS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="glass-card p-7 rounded-2xl text-center group hover:-translate-y-2 hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                {icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
