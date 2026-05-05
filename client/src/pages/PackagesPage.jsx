import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Check, X } from 'lucide-react';

const PackagesPage = () => {
  const packages = [
    {
      name: 'Basic Package',
      price: '₹4–6 Lakhs',
      description: 'Perfect for intimate gatherings and simple, elegant setups.',
      features: [
        { name: 'Basic Venue & Decoration', included: true },
        { name: 'Standard Photography', included: true },
        { name: 'Limited Catering Menu', included: true },
        { name: 'Videography', included: false },
        { name: 'Pre-Wedding Shoot', included: false },
        { name: 'DJ Services', included: false },
        { name: 'Cinematic Drone Shoot', included: false },
        { name: 'Luxury Hospitality', included: false },
      ],
      color: 'border-gray-200 bg-white text-gray-800',
      btn: 'btn-outline'
    },
    {
      name: 'Medium Package',
      price: '₹10–15 Lakhs',
      description: 'A well-rounded experience with themed decor and full coverage.',
      features: [
        { name: 'Themed Decoration', included: true },
        { name: 'Photography & Videography', included: true },
        { name: 'Standard Catering', included: true },
        { name: 'Pre-Wedding Shoot', included: true },
        { name: 'DJ Services', included: true },
        { name: 'Cinematic Drone Shoot', included: false },
        { name: 'Luxury Hospitality', included: false },
      ],
      color: 'border-primary bg-primary-dark text-white shadow-2xl scale-105 z-10 relative',
      btn: 'btn-primary',
      popular: true
    },
    {
      name: 'Premium Package',
      price: '₹25–30 Lakhs',
      description: 'High-end luxury venues with cinematic documentation.',
      features: [
        { name: 'Luxury Venue & Premium Decor', included: true },
        { name: 'Cinematic Video & Drone', included: true },
        { name: 'Premium Catering Spread', included: true },
        { name: 'Pre-Wedding (Outstation)', included: true },
        { name: 'Full Entertainment Setup', included: true },
        { name: 'Luxury Hospitality', included: false },
      ],
      color: 'border-accent bg-white text-gray-800',
      btn: 'btn-outline'
    },
    {
      name: 'Luxury Package',
      price: '₹40L+',
      description: 'The ultimate destination wedding experience with zero compromises.',
      features: [
        { name: 'Destination Wedding Venue', included: true },
        { name: 'Top-tier Cinematic Production', included: true },
        { name: 'Exotic Catering & Mixology', included: true },
        { name: 'Pre-Wedding (International)', included: true },
        { name: 'Celebrity Entertainment Ops', included: true },
        { name: 'Complete Guest Hospitality', included: true },
      ],
      color: 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800',
      btn: 'btn-outline'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center mb-16">
             <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4">
              <span className="w-8 h-px bg-accent"></span>
              PRICING PLANS
              <span className="w-8 h-px bg-accent"></span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading text-primary mb-6">Curated Event Packages</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with clearly defined inclusions. Select a package that fits your vision, or use our custom planner for a tailored experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center py-10">
            {packages.map((pkg, index) => (
              <div key={index} className={`rounded-3xl p-8 border ${pkg.color} transition-transform duration-300 hover:-translate-y-2`}>
                
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-heading mb-2">{pkg.name}</h3>
                <p className={`text-sm mb-6 ${pkg.popular ? 'text-gray-300' : 'text-gray-500'} h-10`}>{pkg.description}</p>
                <div className={`text-3xl font-bold mb-8 ${pkg.popular ? 'text-accent' : 'text-primary'}`}>
                  {pkg.price}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      {feature.included ? (
                        <Check size={18} className="text-accent shrink-0" />
                      ) : (
                        <X size={18} className="text-gray-400 shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-400 line-through'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a href="/planner" className={`btn w-full ${pkg.btn}`}>
                  Select Package
                </a>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-heading text-primary mb-4">Need Something Specific?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Every event is unique. If our standard packages don't quite fit your needs, build your own custom event plan and get an instant estimate.
            </p>
            <a href="/planner" className="btn btn-primary">
              Build Custom Plan
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;
