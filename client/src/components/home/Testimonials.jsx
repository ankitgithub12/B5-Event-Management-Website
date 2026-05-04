// ============================================================
//  COMPONENT: Testimonials.jsx
// ============================================================

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../common/SectionHeader'

const TESTIMONIALS = [
  {
    name: 'Riya Sharma',
    role: 'Head, Cultural Committee',
    content: 'BE5 Events made our college fest a grand success! Everything was so well-organized and creative. Highly recommend!',
    rating: 5,
    avatar: '👩‍🎓',
  },
  {
    name: 'Amit Verma',
    role: 'HR Manager, TechCorp',
    content: 'Professional team, great ideas and flawless execution. Our corporate event was truly exceptional.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    name: 'Neha Tiwari',
    role: 'Private Client',
    content: 'They turned my dream birthday into a fairy tale. Highly recommended! Every detail was perfect.',
    rating: 5,
    avatar: '👰',
  },
  {
    name: 'Rahul & Priya',
    role: 'Wedding Couple',
    content: 'Our wedding was absolutely magical! BE5 Events understood our vision and delivered beyond our expectations.',
    rating: 5,
    avatar: '💑',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length)

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader tag="Clients Love" title={<>What Our Clients <span className="text-gradient-gold">Say</span></>} />

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {TESTIMONIALS.map(({ name, role, content, rating, avatar }, i) => (
            <div key={name} className="glass-card p-6 rounded-2xl flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl">{avatar}</div>
              <div className="flex">
                {[...Array(rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{content}"</p>
              <div>
                <p className="text-gray-900 font-semibold text-sm">{name}</p>
                <p className="text-gray-600 text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden mt-12">
          <div className="glass-card p-6 rounded-2xl">
            <div className="text-4xl mb-4">{TESTIMONIALS[active].avatar}</div>
            <div className="flex mb-3">
              {[...Array(TESTIMONIALS[active].rating)].map((_, j) => (
                <Star key={j} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">"{TESTIMONIALS[active].content}"</p>
            <p className="text-gray-900 font-semibold text-sm">{TESTIMONIALS[active].name}</p>
            <p className="text-gray-600 text-xs">{TESTIMONIALS[active].role}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${i === active ? 'bg-violet-500 w-6' : 'bg-gray-300'}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
