// ============================================================
//  PAGE: ContactPage.jsx
// ============================================================

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

const EVENT_TYPES = ['Wedding', 'Engagement', 'Pre-Wedding Shoot', 'Corporate Event', 'Birthday Party', 'Anniversary', 'Other']
const BUDGET_RANGES = ['Under ₹5 Lakhs', '₹5-10 Lakhs', '₹10-20 Lakhs', '₹20-40 Lakhs', '₹40 Lakhs+']

const CONTACT_DETAILS = [
  { icon: Phone,  label: 'Phone',    value: '+91 98765 43210',       href: 'tel:+919876543210' },
  { icon: Mail,   label: 'Email',    value: 'hello@be5eventery.com',  href: 'mailto:hello@be5eventery.com' },
  { icon: MapPin, label: 'Address',  value: 'Jaipur, Rajasthan, India', href: '#' },
  { icon: Clock,  label: 'Hours',    value: 'Mon–Sat, 9am – 8pm',   href: null },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventType: '', budget: '', date: '', message: '',
  })

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Future: POST to /api/enquiries
    setSubmitted(true)
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 hero-bg text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">Let's Talk</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Get In <span className="text-gradient-gold italic">Touch</span>
          </h1>
          <p className="text-[#A89BC2] text-lg leading-relaxed">
            Ready to plan your perfect event? Drop us a message and we'll get back within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">

          {/* Left — Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-[#A89BC2] text-sm">We're here to help you plan the event of your dreams.</p>
            </div>

            <div className="space-y-5">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[#A89BC2] uppercase tracking-widest font-semibold mb-0.5">{label}</p>
                    {href && href !== '#' ? (
                      <a href={href} className="text-white text-sm hover:text-[#D4AF37] transition-colors font-medium">{value}</a>
                    ) : (
                      <p className="text-white text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="glass-card rounded-2xl overflow-hidden h-48 flex items-center justify-center"
              style={{ border: '1px solid rgba(124,58,237,0.2)' }}>
              <div className="text-center">
                <MapPin size={32} className="text-violet-400 mx-auto mb-2" />
                <p className="text-white font-medium text-sm">Jaipur, Rajasthan</p>
                <p className="text-[#A89BC2] text-xs mt-1">Pink City, India</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
            >
              <span className="text-xl">💬</span>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center"
                style={{ border: '1px solid rgba(212,175,55,0.3)' }}>
                <CheckCircle size={64} className="text-emerald-400 mb-6" />
                <h2 className="font-heading text-3xl font-bold text-white mb-3">Enquiry Received!</h2>
                <p className="text-[#A89BC2] text-base leading-relaxed max-w-md">
                  Thank you for reaching out! Our team will contact you within 24 hours to discuss your event details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-8 py-3 rounded-full font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)' }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <div className="glass-card p-8 rounded-2xl" style={{ border: '1px solid rgba(124,58,237,0.2)' }}>
                <h2 className="font-heading text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#A89BC2] mb-2 uppercase tracking-widest font-semibold">Full Name *</label>
                      <input required className="input-field" placeholder="Your name" value={form.name} onChange={(e) => update('name', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A89BC2] mb-2 uppercase tracking-widest font-semibold">Phone *</label>
                      <input required type="tel" className="input-field" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#A89BC2] mb-2 uppercase tracking-widest font-semibold">Email Address *</label>
                    <input required type="email" className="input-field" placeholder="your@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#A89BC2] mb-2 uppercase tracking-widest font-semibold">Event Type</label>
                      <select className="input-field appearance-none" value={form.eventType} onChange={(e) => update('eventType', e.target.value)}>
                        <option value="">Select event</option>
                        {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#A89BC2] mb-2 uppercase tracking-widest font-semibold">Budget Range</label>
                      <select className="input-field appearance-none" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                        <option value="">Select budget</option>
                        {BUDGET_RANGES.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#A89BC2] mb-2 uppercase tracking-widest font-semibold">Event Date (Approx.)</label>
                    <input type="date" className="input-field" value={form.date} onChange={(e) => update('date', e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-xs text-[#A89BC2] mb-2 uppercase tracking-widest font-semibold">Message / Requirements</label>
                    <textarea
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Tell us about your event requirements..."
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
                  >
                    <Send size={18} />
                    Send My Enquiry
                  </button>
                  <p className="text-center text-xs text-[#A89BC2]">We'll respond within 24 hours. No spam, ever.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
