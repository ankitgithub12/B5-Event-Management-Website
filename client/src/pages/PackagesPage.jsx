import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const PackagesPage = () => {
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  const packages = [
    {
      name: 'Basic Package',
      description: 'Perfect for intimate gatherings and simple, elegant setups.',
      price: '₹5-10 Lakhs',
      features: [
        { name: 'Basic Venue & Decoration', included: true },
        { name: 'Standard Photography', included: true },
        { name: 'Limited Hospitality Menu', included: true },
        { name: 'Videography', included: false },
        { name: 'Pre-Wedding Shoot', included: false },
        { name: 'DJ Services', included: false },
        { name: 'Cinematic Drone Shoot', included: false },
        { name: 'Luxury Hospitality', included: false },
      ],
      color: 'bg-white text-gray-800 border-gray-100',
      btn: 'border-2 border-gray-200 text-primary hover:bg-gray-50',
      popular: false
    },
    {
      name: 'Medium Package',
      description: 'A well-rounded experience with themed decor and full coverage.',
      price: '₹15-20 Lakhs',
      features: [
        { name: 'Themed Decoration', included: true },
        { name: 'Photography & Videography', included: true },
        { name: 'Standard Hospitality', included: true },
        { name: 'Pre-Wedding Shoot', included: true },
        { name: 'DJ Services', included: true },
        { name: 'Cinematic Drone Shoot', included: false },
        { name: 'Luxury Hospitality', included: false },
      ],
      color: 'bg-[#2D1B33] text-white border-transparent shadow-2xl scale-105 z-10',
      btn: 'bg-[#C5A06B] text-white hover:bg-[#B38F5A]',
      popular: true
    },
    {
      name: 'Premium Package',
      description: 'High-end luxury venues with cinematic documentation.',
      price: '₹25-30 Lakhs',
      features: [
        { name: 'Luxury Venue & Premium Decor', included: true },
        { name: 'Cinematic Video & Drone', included: true },
        { name: 'Premium Hospitality Spread', included: true },
        { name: 'Pre-Wedding (Outstation)', included: true },
        { name: 'Full Entertainment Setup', included: true },
        { name: 'Luxury Hospitality', included: false },
      ],
      color: 'bg-white text-gray-800 border-[#C5A06B]/30',
      btn: 'border-2 border-gray-200 text-primary hover:bg-gray-50',
      popular: false
    },
    {
      name: 'Luxury Package',
      description: 'The ultimate destination wedding experience with zero compromises.',
      price: '₹40L+',
      features: [
        { name: 'Destination Wedding Venue', included: true },
        { name: 'Top-tier Cinematic Production', included: true },
        { name: 'Exotic Hospitality & Mixology', included: true },
        { name: 'Pre-Wedding (International)', included: true },
        { name: 'Celebrity Entertainment Ops', included: true },
        { name: 'Complete Guest Hospitality', included: true },
      ],
      color: 'bg-white text-gray-800 border-gray-100',
      btn: 'border-2 border-gray-200 text-primary hover:bg-gray-50',
      popular: false
    }
  ];

  const comparisonData = [
    { service: 'Venue', basic: 'Standard hall', medium: 'Themed venue', premium: 'Luxury resort', luxury: '5-star / Destination' },
    { service: 'Decor', basic: 'Basic flowers', medium: 'Themed decor', premium: 'Floral + lighting', luxury: 'Imported + lighting' },
    { service: 'Hospitality', basic: '5 dishes', medium: '8 dishes + live counter', premium: '12 dishes + multiple counters', luxury: 'Unlimited + premium bar' },
    { service: 'Photography', basic: '4 hours', medium: '8 hours + album', premium: 'Full day + pre-wedding', luxury: 'Destination + cinematic film' },
    { service: 'DJ/Music', basic: 'No', medium: 'Yes (4 hours)', premium: 'Yes + sound', luxury: 'Live band + celebrity' },
    { service: 'Makeup', basic: 'No', medium: 'Basic', premium: 'Bridal premium', luxury: 'Celebrity MUA' },
    { service: 'Transport', basic: 'No', medium: 'Guest transport', premium: 'Family car', luxury: 'Luxury fleet' },
    { service: 'Accommodation', basic: 'No', medium: 'No', premium: '5 rooms', luxury: '20+ rooms' },
    { service: 'Invitations', basic: 'Digital', medium: 'Digital + print', premium: 'Premium print', luxury: 'Custom designed' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center mb-16">
             <div className="flex items-center justify-center gap-2 text-[#C5A06B] font-semibold text-sm tracking-[2px] uppercase mb-4">
              <span className="w-8 h-px bg-[#C5A06B]"></span>
              PRICING PLANS
              <span className="w-8 h-px bg-[#C5A06B]"></span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Curated Event Packages</h1>
            <p className="text-gray-600 max-w-2xl mx-auto italic text-lg">
              Transparent pricing with clearly defined inclusions. Select a package that fits your vision.
            </p>
          </div>

          {/* Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch py-10">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`rounded-[2rem] p-10 border-2 flex flex-col transition-all duration-500 hover:-translate-y-2 relative ${pkg.color}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C5A06B] text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-3xl font-serif mb-4">{pkg.name}</h3>
                <p className={`text-sm mb-8 leading-relaxed ${pkg.popular ? 'text-gray-300' : 'text-gray-400'}`}>
                  {pkg.description}
                </p>
                
                <div className="text-4xl font-bold mb-10 tracking-tight text-primary">
                  {pkg.popular ? <span className="text-[#C5A06B]">{pkg.price}</span> : pkg.price}
                </div>
                
                <ul className="space-y-5 mb-12 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm">
                      {feature.included ? (
                        <Check size={18} className="text-[#C5A06B] shrink-0 mt-0.5" />
                      ) : (
                        <X size={18} className="text-gray-400 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-400 line-through decoration-1'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/planner" 
                  className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-300 border-2 flex items-center justify-center cursor-pointer ${pkg.btn}`}
                >
                  Select Package
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison Table Section */}
          <div className="mt-32">
            <div 
              className="flex items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsTableExpanded(!isTableExpanded)}
            >
              <div>
                <h2 className="text-3xl font-serif text-primary">Compare All Packages</h2>
                <p className="text-gray-500">A detailed look at what each tier offers side-by-side.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                {isTableExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>

            {isTableExpanded && (
              <div className="mt-8 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-6 text-sm font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Service</th>
                        <th className="p-6 text-sm font-black uppercase tracking-widest text-primary border-b border-gray-100">Basic</th>
                        <th className="p-6 text-sm font-black uppercase tracking-widest text-primary border-b border-gray-100">Medium</th>
                        <th className="p-6 text-sm font-black uppercase tracking-widest text-primary border-b border-gray-100">Premium</th>
                        <th className="p-6 text-sm font-black uppercase tracking-widest text-primary border-b border-gray-100">Luxury</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="p-6 font-bold text-gray-700 border-b border-gray-50">{row.service}</td>
                          <td className="p-6 text-sm text-gray-600 border-b border-gray-50">{row.basic}</td>
                          <td className="p-6 text-sm text-gray-600 border-b border-gray-50">{row.medium}</td>
                          <td className="p-6 text-sm text-gray-600 border-b border-gray-50">{row.premium}</td>
                          <td className="p-6 text-sm text-gray-600 border-b border-gray-50">{row.luxury}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="mt-20 text-center bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A06B]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <h2 className="text-4xl font-serif text-white mb-6 relative z-10">Still Unsure?</h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg relative z-10">
              Our event experts are here to help you choose the perfect plan. Or try our custom planner to build a package from scratch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href="/contact" className="bg-[#C5A06B] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-colors shadow-lg">Talk to an Expert</a>
              <a href="/planner" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-colors">Use Custom Planner</a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;
