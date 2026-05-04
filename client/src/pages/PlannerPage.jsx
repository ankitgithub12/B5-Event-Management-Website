// ============================================================
//  PAGE: PlannerPage.jsx
//  Multi-step custom event cost estimator
// ============================================================

import { usePlanner } from '../hooks/usePlanner'
import PlannerForm   from '../components/planner/PlannerForm'
import QuoteSummary  from '../components/planner/QuoteSummary'

const STEPS = [
  { n: 1, label: 'Your Event' },
  { n: 2, label: 'Add Services' },
  { n: 3, label: 'Get Quote' },
]

export default function PlannerPage() {
  const { form, step, result, updateField, toggleAddon, estimate, reset, setStep } = usePlanner()

  return (
    <main className="pt-24 pb-20">
      {/* Header */}
      <section className="py-16 px-4 md:px-8 hero-bg text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">Plan Your Dream</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Custom <span className="text-gradient-gold italic">Event Planner</span>
          </h1>
          <p className="text-[#A89BC2] text-lg leading-relaxed">
            Tell us about your event and get an instant cost estimate — no commitment needed.
          </p>
        </div>
      </section>

      {/* Step indicator */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map(({ n, label }, i) => (
            <div key={n} className="flex items-center">
              <button
                onClick={() => n < step || result ? setStep(n) : undefined}
                className={`flex flex-col items-center gap-1.5 cursor-default ${n < step ? 'cursor-pointer' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === n
                    ? 'text-white scale-110'
                    : step > n
                    ? 'text-white'
                    : 'text-[#A89BC2]'
                }`}
                  style={{
                    background: step >= n
                      ? 'linear-gradient(135deg,#7C3AED,#9333EA)'
                      : 'rgba(255,255,255,0.07)',
                    border: step === n ? '2px solid rgba(212,175,55,0.5)' : 'none',
                  }}>
                  {n}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step === n ? 'text-white' : 'text-[#A89BC2]'}`}>{label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="w-16 sm:w-24 h-px mx-2" style={{ background: step > i + 1 ? 'linear-gradient(90deg,#7C3AED,#9333EA)' : 'rgba(255,255,255,0.1)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="glass-card p-8 rounded-2xl">
          {step < 3 ? (
            <PlannerForm
              form={form}
              updateField={updateField}
              toggleAddon={toggleAddon}
              onNext={estimate}
            />
          ) : (
            <QuoteSummary result={result} form={form} onReset={reset} />
          )}
        </div>

        {/* Info note */}
        {step < 3 && (
          <p className="text-center text-xs text-[#A89BC2] mt-6">
            * Estimates are approximate and subject to final quotation. Prices include 18% GST.
          </p>
        )}
      </div>
    </main>
  )
}
