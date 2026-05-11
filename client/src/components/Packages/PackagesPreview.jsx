import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PackagesPreview = () => {
  const packages = [
    {
      name: 'Basic',
      price: '₹5–10 Lakhs',
      bestFor: 'Intimate weddings & birthdays',
      features: ['Basic Decor', 'Photography', 'Standard Sound System', 'Event Coordination'],
      color: 'border-gray-200'
    },
    {
      name: 'Medium',
      price: '₹15–20 Lakhs',
      bestFor: 'Engagement & family events',
      features: ['Premium Decor', 'Candid Photography', 'Professional Lighting', 'Hospitality Management', 'Catering Assistance'],
      color: 'border-accent shadow-gold scale-105 z-10'
    },
    {
      name: 'Premium',
      price: '₹25–30 Lakhs',
      bestFor: 'Grand weddings',
      features: ['Luxury Decor', 'Cinematic Videography', 'LED Stage Setup', 'Artist Management', 'Complete End-to-End Execution'],
      color: 'border-gray-200'
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4">
            <span className="w-8 h-px bg-accent"></span>
            MOST LOVED PACKAGES
            <span className="w-8 h-px bg-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl text-primary mb-4">Trusted by 500+ families</h2>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-3xl p-10 border-2 transition-all duration-500 hover:-translate-y-2 ${pkg.color}`}
            >
              <div className="mb-8">
                <h3 className="text-2xl text-primary font-heading font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl text-accent font-bold mb-4">{pkg.price}</div>
                <p className="text-sm text-gray-500 font-medium italic">Best for: {pkg.bestFor}</p>
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/packages" 
                className={`btn w-full ${index === 1 ? 'btn-primary' : 'btn-outline'}`}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm italic">
            *Prices are indicative and may vary based on customization and guest count.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
