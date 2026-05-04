// ============================================================
//  PAGE: HomePage.jsx
// ============================================================

import HeroSection   from '../components/home/HeroSection'
import ServicesStrip from '../components/home/ServicesStrip'
import PortfolioGrid from '../components/home/PortfolioGrid'
import WhyChooseUs   from '../components/home/WhyChooseUs'
import Testimonials  from '../components/home/Testimonials'
import ContactCTA    from '../components/home/ContactCTA'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesStrip />
      <PortfolioGrid />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
    </main>
  )
}
