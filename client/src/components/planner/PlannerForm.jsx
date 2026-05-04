// ============================================================
//  COMPONENT: PlannerForm.jsx
//  Multi-step form for the Custom Planner page.
// ============================================================



const EVENT_TYPES = [
  { value: 'wedding',     label: 'Wedding',        icon: '💍' },
  { value: 'engagement',  label: 'Engagement',     icon: '💑' },
  { value: 'corporate',   label: 'Corporate',      icon: '🏢' },
  { value: 'birthday',    label: 'Birthday',       icon: '🎂' },
  { value: 'anniversary', label: 'Anniversary',    icon: '🥂' },
]

const LOCATION_TIERS = [
  { value: 'tier1',       label: 'Metro City',     desc: 'Mumbai, Delhi, Bengaluru' },
  { value: 'tier2',       label: 'Tier-2 City',    desc: 'Jaipur, Pune, Lucknow' },
  { value: 'tier3',       label: 'Small Town',     desc: 'Local / nearby' },
  { value: 'destination', label: 'Destination',    desc: 'Resort / Abroad' },
]

const ADDON_GROUPS = [
  {
    label: 'Venue & Décor',
    addons: [
      { key: 'decor_basic',    label: 'Basic Décor',        price: 80000 },
      { key: 'decor_themed',   label: 'Themed Décor',       price: 200000 },
      { key: 'decor_luxury',   label: 'Luxury Décor',       price: 500000 },
    ],
  },
  {
    label: 'Photography',
    addons: [
      { key: 'photography_basic', label: 'Basic Photography',  price: 50000 },
      { key: 'photography_pro',   label: 'Pro Photography',    price: 120000 },
      { key: 'photography_full',  label: 'Full Team',          price: 200000 },
      { key: 'drone',             label: 'Drone Footage',      price: 30000 },
    ],
  },
  {
    label: 'Entertainment',
    addons: [
      { key: 'dj',         label: 'DJ',           price: 40000 },
      { key: 'live_band',  label: 'Live Band',    price: 120000 },
      { key: 'fireworks',  label: 'Fireworks',    price: 80000 },
    ],
  },
  {
    label: 'Other Services',
    addons: [
      { key: 'makeup_basic',    label: 'Basic Makeup',      price: 20000 },
      { key: 'makeup_pro',      label: 'Pro Makeup',        price: 50000 },
      { key: 'transport_basic', label: 'Basic Transport',   price: 50000 },
      { key: 'transport_full',  label: 'Full Transport',    price: 150000 },
    ],
  },
]

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

export default function PlannerForm({ form, updateField, toggleAddon, onNext }) {
  return (
    <div className="space-y-10">
      {/* Event Type */}
      <div>
        <p className="text-sm font-semibold text-white mb-4">Select Event Type</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {EVENT_TYPES.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => updateField('eventType', value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                form.eventType === value
                  ? 'border-violet-500 bg-violet-600/20 text-white'
                  : 'glass-card border-white/10 text-[#A89BC2] hover:border-violet-500/40 hover:text-white'
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Guest Count */}
      <div>
        <p className="text-sm font-semibold text-white mb-2">
          Number of Guests: <span className="text-violet-400">{form.guestCount}</span>
        </p>
        <input
          type="range" min={10} max={1000} step={10}
          value={form.guestCount}
          onChange={(e) => updateField('guestCount', Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-[#A89BC2] mt-1">
          <span>10 guests</span>
          <span>1000 guests</span>
        </div>
      </div>

      {/* Location */}
      <div>
        <p className="text-sm font-semibold text-white mb-4">Location Type</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {LOCATION_TIERS.map(({ value, label, desc }) => (
            <button
              key={value}
              onClick={() => updateField('locationTier', value)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                form.locationTier === value
                  ? 'border-violet-500 bg-violet-600/20'
                  : 'glass-card border-white/10 hover:border-violet-500/40'
              }`}
            >
              <p className={`text-sm font-medium ${form.locationTier === value ? 'text-violet-300' : 'text-white'}`}>{label}</p>
              <p className="text-xs text-[#A89BC2] mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <p className="text-sm font-semibold text-white mb-4">Select Required Services</p>
        <div className="space-y-5">
          {ADDON_GROUPS.map(({ label, addons }) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-3">{label}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {addons.map(({ key, label: aLabel, price }) => (
                  <button
                    key={key}
                    onClick={() => toggleAddon(key)}
                    className={`px-3 py-3 rounded-xl border text-left transition-all duration-200 ${
                      form.addons.includes(key)
                        ? 'border-violet-500 bg-violet-600/20'
                        : 'glass-card border-white/10 hover:border-violet-500/40'
                    }`}
                  >
                    <p className={`text-xs font-medium ${form.addons.includes(key) ? 'text-violet-300' : 'text-[#A89BC2]'}`}>{aLabel}</p>
                    <p className="text-xs text-[#D4AF37] mt-1">{formatINR(price)}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 hover:scale-[1.02]"
        style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
      >
        Calculate My Estimate →
      </button>
    </div>
  )
}
