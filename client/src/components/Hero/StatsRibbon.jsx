import React from 'react';

const StatsRibbon = () => {
  const stats = [
    { number: '500+', label: 'Events Delivered' },
    { number: '10+', label: 'Years of Excellence' },
    { number: '98%', label: 'Happy Couples' },
    { number: '15+', label: 'Venue Partners' }
  ];

  return (
    <div className="relative z-20 -mt-16 container mx-auto px-4 md:px-8 max-w-7xl">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(41,26,57,0.12)] p-8 md:p-12 border border-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
              {index !== stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gray-100"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsRibbon;
