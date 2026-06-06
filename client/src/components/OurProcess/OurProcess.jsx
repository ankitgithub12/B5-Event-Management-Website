import { motion } from 'framer-motion';
import { MessageCircle, Palette, Sparkles, PartyPopper } from 'lucide-react';

const OurProcess = () => {
  const steps = [
    {
      number: '01',
      icon: <MessageCircle size={32} className="text-accent" />,
      title: 'Consult',
      subtitle: 'Free Discovery Call',
      description:
        'We begin with a relaxed conversation — understanding your vision, preferences, guest count, and budget to map out the perfect event.',
    },
    {
      number: '02',
      icon: <Palette size={32} className="text-accent" />,
      title: 'Curate',
      subtitle: 'Personalised Plan',
      description:
        'Our planners craft a bespoke proposal — handpicking venues, themes, vendors, and timelines tailored just for you.',
    },
    {
      number: '03',
      icon: <Sparkles size={32} className="text-accent" />,
      title: 'Create',
      subtitle: 'Execution & Setup',
      description:
        'We coordinate every vendor, manage every detail, and transform the space so you never have to worry about a thing.',
    },
    {
      number: '04',
      icon: <PartyPopper size={32} className="text-accent" />,
      title: 'Celebrate',
      subtitle: 'Your Perfect Day',
      description:
        'All you have to do is show up, soak in every moment, and let us handle the rest. You deserve to celebrate.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Animated background gradient blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-accent/8 to-accent/3 rounded-full blur-3xl pointer-events-none animate-gradient-shift" 
        style={{ backgroundSize: '200% 200%', background: 'linear-gradient(135deg, rgba(200,158,98,0.08) 0%, rgba(200,158,98,0.03) 50%, rgba(59,30,84,0.05) 100%)' }} />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tl from-primary/8 to-primary/3 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating sparkles */}
      <div className="absolute top-16 right-[15%] text-accent/10 text-3xl select-none sparkle-float">✦</div>
      <div className="absolute bottom-16 left-[10%] text-accent/10 text-4xl select-none sparkle-float-delayed">✦</div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            <span className="section-label-line" />
            HOW IT WORKS
            <span className="section-label-line" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl text-primary mb-4"
          >
            From dream to reality — <span className="text-accent italic">4 simple steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed"
          >
            Our seamless process is designed so you can enjoy every moment of your journey — without the stress.
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Animated gradient connector line — desktop only */}
          <div className="hidden lg:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-[2px] z-0 overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Number badge */}
              <div className="relative mb-6">
                <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-white border-2 border-accent/20 shadow-[0_8px_30px_rgba(200,158,98,0.12)] flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_8px_35px_rgba(200,158,98,0.35)] transition-all duration-500 group-hover:scale-105">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-accent to-[#d4ad6e] text-white text-[10px] font-black flex items-center justify-center shadow-[0_4px_12px_rgba(200,158,98,0.4)]">
                  {index + 1}
                </span>
                {/* Glow ring on hover */}
                <div className="absolute -inset-2 rounded-full bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 blur-md"></div>
              </div>

              {/* Card */}
              <div className="glass-card-light rounded-[1.5rem] p-6 shadow-[0_10px_40px_rgba(41,26,57,0.06)] group-hover:shadow-[0_20px_50px_rgba(200,158,98,0.15)] transition-all duration-500 group-hover:-translate-y-2 w-full relative overflow-hidden">
                {/* Top accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/50 transition-all duration-500" />
                
                <p className="text-[10px] font-bold tracking-[2px] text-accent uppercase mb-2">
                  STEP {step.number}
                </p>
                <h3 className="text-xl font-heading text-primary mb-1">{step.title}</h3>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {step.subtitle}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default OurProcess;
