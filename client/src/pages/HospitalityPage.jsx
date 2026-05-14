import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { HeadphonesIcon, Truck, Activity, Shield, Video, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HospitalityPage = () => {
  const teamRoles = [
    {
      icon: <HeadphonesIcon size={40} className="text-primary" />,
      title: 'Help Desk Team',
      description: 'The first point of contact for all guests, providing seamless check-ins, answering queries, and ensuring a warm welcome from arrival to departure.',
      responsibilities: ['Guest Check-in & Registration', '24/7 Support Desk', 'Information & Query Handling', 'Welcome Kits Distribution'],
      image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Truck size={40} className="text-primary" />,
      title: 'Logistic Team',
      description: 'The backbone of any event, handling transportation, material movement, and ensuring everything is exactly where it needs to be, right on time.',
      responsibilities: ['Transport Coordination', 'Inventory Management', 'Vendor Coordination', 'Material Loading/Unloading'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Activity size={40} className="text-primary" />,
      title: 'Runners',
      description: 'Fast, efficient, and always on the move. Runners bridge the gap between different teams, handling urgent requirements and last-minute tasks.',
      responsibilities: ['Urgent Errands', 'Inter-department Communication', 'On-the-fly Problem Solving', 'Stage & Backstage Support'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Shield size={40} className="text-primary" />,
      title: 'Shadow',
      description: 'Dedicated personal assistants assigned to VIPs, celebrities, or key stakeholders to manage their itinerary and ensure their absolute comfort.',
      responsibilities: ['VIP Management', 'Personal Itinerary Tracking', 'Security Coordination', 'F&B Preferences Management'],
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Video size={40} className="text-primary" />,
      title: 'Production Team',
      description: 'The creative and technical force behind the scenes, managing lights, sound, stage setup, and all AV requirements for a flawless show.',
      responsibilities: ['Stage & Set Construction', 'Audio-Visual Management', 'Lighting Control', 'Technical Rehearsals'],
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        {/* Page Header */}
        <div className="container mx-auto px-4 max-w-7xl mb-20 text-center">
          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4">
            <span className="w-8 h-px bg-accent"></span>
            HOSPITALITY & CREW
            <span className="w-8 h-px bg-accent"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading text-primary mb-6">Our Event Teams</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Behind every extraordinary event is an army of dedicated professionals. Discover the specialized teams that work tirelessly to make your vision a reality.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="space-y-16">
            {teamRoles.map((role, index) => (
              <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-center bg-white rounded-[3rem] p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500`}>
                
                {/* Image */}
                <div className="w-full lg:w-1/2 h-80 lg:h-[400px] rounded-[2rem] overflow-hidden relative group">
                  <img 
                    src={role.image} 
                    alt={role.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 p-4 lg:p-10">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                    {role.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">{role.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {role.description}
                  </p>

                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-primary font-bold mb-4 flex items-center gap-2">
                      Key Responsibilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {role.responsibilities.map((task, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle size={18} className="text-accent mt-0.5 shrink-0" />
                          <span className="text-gray-700 text-sm font-medium">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 max-w-7xl mt-24">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-6 relative z-10">Want Our Team for Your Next Event?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg relative z-10">
              Our professional crews are ready to handle every detail of your event flawlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to="/contact" className="bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors inline-block">Hire Our Team</Link>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
};

export default HospitalityPage;
