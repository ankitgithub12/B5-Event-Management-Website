import { Camera, Sparkle, Building2, Cake, Heart, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Heart size={40} className="text-primary" />,
      title: 'Wedding Planning',
      description: 'From roka to vidaai – we handle it all',
    },
    {
      icon: <Camera size={40} className="text-primary" />,
      title: 'Pre-Wedding Shoot',
      description: 'Capture love before the big day',
    },
    {
      icon: <Sparkle size={40} className="text-primary" />,
      title: 'Engagement Ceremony',
      description: 'Surprise proposals & intimate celebrations',
    },
    {
      icon: <Building2 size={40} className="text-primary" />,
      title: 'Corporate Events',
      description: 'Launches, galas, and team offsites',
    },
    {
      icon: <Cake size={40} className="text-primary" />,
      title: 'Small Functions',
      description: 'Birthdays, anniversaries, and baby showers',
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4">
            <span className="w-8 h-px bg-accent"></span>
            WHAT WE DO
            <span className="w-8 h-px bg-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl text-primary mb-4">End-to-end event solutions under one roof</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 text-center shadow-[0_10px_40px_rgba(41,26,57,0.06)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(200,158,98,0.15)] transition-all duration-300 group flex flex-col items-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl text-primary mb-3 font-heading font-semibold">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {service.description}
              </p>
              <div className="mt-auto">
                <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-accent tracking-widest uppercase group-hover:text-primary transition-colors duration-300">
                  Enquire Now <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Services;

