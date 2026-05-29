import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Hero from '../components/Hero/Hero';
import StatsRibbon from '../components/Hero/StatsRibbon';
import Services from '../components/Services/Services';
import OurProcess from '../components/OurProcess/OurProcess';
import PackagesPreview from '../components/Packages/PackagesPreview';
import AwardsSection from '../components/AwardsSection/AwardsSection';
import Portfolio from '../components/Portfolio/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import TeamSection from '../components/TeamSection/TeamSection';
import Testimonials from '../components/Testimonials/Testimonials';
import FaqSection from '../components/FaqSection/FaqSection';
import SocialGrid from '../components/SocialGrid/SocialGrid';
import ContactForm from '../components/ContactForm/ContactForm';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EventPlanning",
    "name": "B5 EVENTORY",
    "url": "https://b5eventory.com",
    "description": "Premier event management company for weddings, corporate events, and parties.",
    "telephone": "+1234567890", // Placeholder, user will update later
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "City",
      "addressRegion": "State",
      "addressCountry": "Country"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Home"
        description="B5 EVENTORY is a premium event management company offering wedding planning, corporate event organization, and party services."
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
        <AwardsSection />
        <Portfolio />
        <WhyChooseUs />
        <TeamSection />
        <Testimonials />
        <FaqSection />
        <SocialGrid />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

