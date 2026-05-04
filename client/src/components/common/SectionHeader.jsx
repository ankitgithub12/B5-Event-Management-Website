// ============================================================
//  COMPONENT: SectionHeader.jsx
//  Reusable section heading with subtitle tag and gold divider.
// ============================================================

export default function SectionHeader({ tag, title, subtitle, light = false, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {tag && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
          {tag}
        </p>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
        light ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      {center && <div className="section-divider mx-auto mb-4" />}
      {!center && <div className="section-divider mb-4" style={{ margin: '0 0 1rem 0' }} />}
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
