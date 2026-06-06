import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How far in advance should I book B5 Eventory for my event?',
      answer:
        'For weddings and large events, we recommend booking at least 6–12 months in advance to secure your preferred venues and vendors. For smaller functions like birthdays or anniversaries, 4–8 weeks is usually sufficient. However, we do accommodate last-minute bookings based on availability — just give us a call!',
    },
    {
      question: 'Do you offer customised packages or only fixed packages?',
      answer:
        'Absolutely! While we offer structured packages for popular event types, every event we plan is fully customisable. Our Custom Planner tool lets you mix and match services, and our planners will build a bespoke proposal around your vision, guest count, and budget.',
    },
    {
      question: 'What destinations do you cover for destination weddings?',
      answer:
        'We specialise in destination weddings across Rajasthan (Udaipur, Jaipur, Jodhpur, Jaisalmer) and also manage events in Goa, Himachal, Kerala, and select international destinations. Our vendor network spans 15+ cities.',
    },
    {
      question: 'Is there a minimum budget to work with B5 Eventory?',
      answer:
        'We work with events starting from ₹1 Lakh (small functions) up to ₹50 Lakh+ (grand weddings). Our goal is to deliver maximum value at every budget tier — we never compromise on creativity or quality regardless of budget size.',
    },
    {
      question: 'Do you handle catering, or do we need to arrange that separately?',
      answer:
        'We handle everything. B5 Eventory has exclusive tie-ups with premium caterers across Rajasthan. Whether you want traditional Rajasthani thali, continental buffet, live counters, or custom menus — we curate the best catering experience as part of your package.',
    },
    {
      question: 'Can I see previous event photos and videos before deciding?',
      answer:
        "Yes! Visit our Portfolio page to explore real events we've planned — from intimate engagements to 800-guest corporate galas. You can also follow us on Instagram for the latest behind-the-scenes content and event highlights.",
    },
    {
      question: 'What is your cancellation and refund policy?',
      answer:
        'We understand that plans can change. We require a 30% booking advance to secure your date. Cancellations made more than 60 days before the event receive a 70% refund. For cancellations within 30 days, 50% is retained as operational costs. We always work with you to reschedule when possible.',
    },
    {
      question: 'Do you assign a dedicated planner to my event?',
      answer:
        'Yes — every client gets a dedicated event manager who is your single point of contact from consultation to the final farewell. They are available via phone, WhatsApp, and email throughout the planning journey and on-site on the event day.',
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(160deg, #241235 0%, #2d1645 30%, #3B1E54 60%, #241235 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 15s ease-in-out infinite'
    }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      
      {/* Floating sparkles */}
      <div className="absolute top-10 left-[10%] text-accent/12 text-4xl select-none sparkle-float">✦</div>
      <div className="absolute bottom-10 right-[10%] text-accent/12 text-4xl select-none sparkle-float-delayed">✦</div>
      <div className="absolute top-1/3 right-[5%] text-accent/6 text-3xl select-none animate-twinkle">✦</div>
      <div className="absolute bottom-1/3 left-[5%] text-accent/6 text-2xl select-none animate-twinkle-slow">✦</div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            <span className="section-label-line" />
            GOT QUESTIONS?
            <span className="section-label-line" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl text-white mb-4"
          >
            Frequently Asked <span className="text-accent">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-xl mx-auto text-base leading-relaxed"
          >
            Everything you need to know before we start planning your perfect event.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={`rounded-2xl border transition-all duration-500 overflow-hidden relative ${
                openIndex === index
                  ? 'border-accent/40 bg-white/10 shadow-[0_0_40px_rgba(200,158,98,0.1)]'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              {/* Gold glow line on left for open items */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent/80 via-accent to-accent/80 transition-opacity duration-500 ${
                openIndex === index ? 'opacity-100' : 'opacity-0'
              }`} />

              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
                aria-expanded={openIndex === index}
                id={`faq-btn-${index}`}
              >
                <div className="flex items-center gap-4">
                  {/* Number badge */}
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-500 ${
                    openIndex === index 
                      ? 'bg-accent text-white shadow-[0_0_15px_rgba(200,158,98,0.3)]' 
                      : 'bg-white/8 text-white/50 group-hover:bg-white/12'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`font-semibold text-base leading-snug transition-colors duration-300 ${openIndex === index ? 'text-accent' : 'text-white group-hover:text-accent'}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-accent border-accent rotate-180 shadow-[0_0_12px_rgba(200,158,98,0.3)]' : 'border-white/20 text-white/60 group-hover:border-accent/40'}`}>
                  <ChevronDown size={16} className={openIndex === index ? 'text-white' : ''} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 pl-[4.5rem] text-white/65 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
