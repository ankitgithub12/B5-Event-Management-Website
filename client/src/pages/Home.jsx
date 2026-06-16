import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Hero from '../components/Hero/Hero';
import StatsRibbon from '../components/Hero/StatsRibbon';
import Services from '../components/Services/Services';
import OurProcess from '../components/OurProcess/OurProcess';
import PackagesPreview from '../components/Packages/PackagesPreview';
import Portfolio from '../components/Portfolio/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import TeamSection from '../components/TeamSection/TeamSection';
import Testimonials from '../components/Testimonials/Testimonials';
import FaqSection from '../components/FaqSection/FaqSection';

import EventCTA from '../components/EventCTA/EventCTA';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EventPlanning",
    "name": "B5 Eventory",
    "url": "https://b5eventory.com",
    "description": "B5 Eventory is a Jaipur-based professional event management and wedding planning company specializing in weddings, corporate events, birthday parties, destination weddings, and luxury celebrations across Jaipur and Rajasthan. We provide complete event planning, decoration, coordination, and management services to make every event unforgettable.",
    "telephone": "+1234567890", // Placeholder, user will update later
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ac-209, Gyan Vihar Marg, Central Spine, Jagatpura",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302017",
      "addressCountry": "IN"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="B5 Eventory | Best Event Management Company in Jaipur | Corporate & Social Events"
        description="B5 Eventory is a leading event management company in Jaipur offering corporate events, exhibitions, conferences, brand activations, weddings, and complete event planning solutions."
        keywords="Event organizer in Jaipur Rajasthan, Destination wedding planner Jaipur, Affordable event planner Jaipur, Premium event planning services Jaipur, Event decoration and management Jaipur, Jaipur party planner services, Event Planner, Event Management Company, Corporate Event Planner, Exhibition Organizer, Conference Organizer, Wedding Planner, Brand Activation Agency, Event Services Jaipur"
        canonicalUrl="/"
        schema={localBusinessSchema}
      />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatsRibbon />
        <Services />
        <OurProcess />
        <PackagesPreview />
        <Portfolio />
        <WhyChooseUs />
        <TeamSection />
        <Testimonials />
        <FaqSection />

        <EventCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

