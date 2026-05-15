import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { 
  Users, Truck, Zap, Star, Utensils, Hotel, Bus, 
  Shield, Settings, Monitor, HeartHandshake, Sparkles, 
  Droplets, CheckCircle, Info 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HospitalityPage = () => {
  const coreServices = [
    {
      icon: <Users size={40} className="text-primary" />,
      title: 'Guest Hospitality & Reception',
      description: 'The front-facing guest management team. Includes welcoming, registration, and comprehensive guest assistance from arrival to departure.',
      responsibilities: ['Welcome desk / registration', 'Guest greeting', 'Check-in & badge distribution', 'VIP handling', 'Seating assistance', 'Help desk', 'Information counters'],
      staff: ['Hosts/Hostesses', 'Reception executives', 'Guest relation executives'],
      image: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Truck size={40} className="text-primary" />,
      title: 'Logistics Management',
      description: 'Handles movement and operational coordination, ensuring everything is exactly where it needs to be, right on time.',
      responsibilities: ['Transportation coordination', 'Material movement', 'Vendor coordination', 'Equipment delivery', 'Loading/unloading', 'Inventory management', 'Backstage movement'],
      staff: ['Moving sound systems', 'Coordinating artist pickups', 'Handling stage setup timing'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Zap size={40} className="text-primary" />,
      title: 'Runners / Event Runners',
      description: 'The "on-ground problem solvers". Fast, efficient, and always on the move to bridge the gap between different teams.',
      responsibilities: ['Carrying urgent items', 'Coordinating between departments', 'Delivering documents/equipment', 'Supporting artists/speakers', 'Managing last-minute requirements'],
      staff: ['Example: If a speaker needs a charger, runners arrange it immediately'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Star size={40} className="text-primary" />,
      title: 'VIP & Artist Management',
      description: 'Special hospitality for important guests, managing their itinerary and ensuring their absolute comfort.',
      responsibilities: ['Airport pickup/drop', 'Hotel coordination', 'Green room setup', 'Security coordination', 'Personal assistance', 'Food preferences management'],
      staff: ['Artist managers', 'VIP coordinators', 'Celebrity handlers'],
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Utensils size={40} className="text-primary" />,
      title: 'Catering & Food Services',
      description: 'Comprehensive food and beverage management for a perfect dining experience.',
      responsibilities: ['Buffet management', 'Live counters', 'Beverage service', 'Table service', 'Guest dining experience', 'Kitchen coordination'],
      staff: ['Catering staff', 'Stewards', 'Bartenders (for alcoholic events)', 'Service captains'],
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Hotel size={40} className="text-primary" />,
      title: 'Accommodation Management',
      description: 'Used in destination weddings, conferences, festivals, and large-scale events to ensure comfortable stays.',
      responsibilities: ['Hotel booking', 'Room allocation', 'Guest check-in', 'Welcome kits', 'Travel coordination'],
      staff: [],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Bus size={40} className="text-primary" />,
      title: 'Transportation Services',
      description: 'Movement of guests and teams with optimal routing, safety, and comfort.',
      responsibilities: ['Shuttle services', 'Airport transfers', 'Cab coordination', 'Parking management', 'Driver coordination'],
      staff: [],
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Shield size={40} className="text-primary" />,
      title: 'Security & Crowd Management',
      description: 'Safety and discipline handling for a secure and controlled event environment.',
      responsibilities: ['Entry management', 'Crowd control', 'Emergency response', 'VIP security', 'Bouncer services'],
      staff: [],
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Settings size={40} className="text-primary" />,
      title: 'Backstage Management',
      description: 'Controls backstage operations to keep the show running flawlessly on time.',
      responsibilities: ['Artist timing', 'Stage entry coordination', 'Costume/equipment handling', 'Crew communication', 'Technical coordination'],
      staff: [],
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Monitor size={40} className="text-primary" />,
      title: 'Technical Hospitality',
      description: 'Support for speakers, performers, and production teams to ensure smooth technical execution.',
      responsibilities: ['Wi-Fi support', 'Charging stations', 'AV support', 'Microphone coordination', 'Presentation setup'],
      staff: [],
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const additionalServices = [
    {
      title: 'Event Concierge',
      icon: <HeartHandshake className="w-12 h-12 text-accent mb-6" />,
      desc: 'Premium guest assistance service.',
      items: ['Personalized support', 'Travel help', 'Reservation assistance', 'VIP requests']
    },
    {
      title: 'Decor & Ambience Coordination',
      icon: <Sparkles className="w-12 h-12 text-accent mb-6" />,
      desc: 'Ensures guest experience through aesthetics.',
      items: ['Floral setup', 'Lounge setup', 'Lighting ambience', 'Scenting/music coordination']
    },
    {
      title: 'Housekeeping & Maintenance',
      icon: <Droplets className="w-12 h-12 text-accent mb-6" />,
      desc: 'Venue cleanliness and maintenance.',
      items: ['Washroom maintenance', 'Cleaning staff', 'Waste management', 'Sanitization']
    }
  ];

  const departments = [
    { dept: 'Hospitality', responsibility: 'Guest experience', tasks: 'Registration' },
    { dept: 'Logistics', responsibility: 'Movement & operations', tasks: 'Transport' },
    { dept: 'Production', responsibility: 'Sound, light, stage', tasks: '-' },
    { dept: 'F&B', responsibility: 'Food services', tasks: '-' },
    { dept: 'Security', responsibility: 'Safety', tasks: 'Entry/check-in' },
    { dept: 'Runner Team', responsibility: 'Quick support tasks', tasks: 'Vehicle coordination' },
    { dept: 'Artist Management', responsibility: 'VIP & celebrity care', tasks: '-' }
  ];

  const structureExample = [
    { count: '1', role: 'Hospitality Manager' },
    { count: '2', role: 'VIP Coordinators' },
    { count: '5', role: 'Registration Staff' },
    { count: '6', role: 'Runners' },
    { count: '4', role: 'Logistics Coordinators' },
    { count: '10', role: 'Catering Staff' },
    { count: '8', role: 'Security Guards' },
    { count: '2', role: 'Transport Managers' }
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
          <h1 className="text-5xl md:text-6xl font-heading text-primary mb-6">Core Hospitality Services</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Behind every extraordinary event is an army of dedicated professionals. Discover the specialized teams that work tirelessly to make your vision a reality.
          </p>
        </div>

        {/* 10 Core Services Grid */}
        <div className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="space-y-16">
            {coreServices.map((role, index) => (
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
                  <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">{index + 1}. {role.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {role.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-primary font-bold mb-3 flex items-center gap-2">
                        Includes
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

                    {role.staff && role.staff.length > 0 && (
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <h4 className="text-sm uppercase tracking-wider text-primary font-bold mb-3 flex items-center gap-2">
                          Teams & Roles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {role.staff.map((member, i) => (
                            <span key={i} className="bg-white px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 border border-gray-200 shadow-sm">
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-primary py-24 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">Additional Hospitality Services</h2>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Going above and beyond to provide exceptional experiences and flawless execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                  {service.icon}
                  <h3 className="text-2xl font-heading text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 mb-6">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/90">
                        <CheckCircle size={18} className="text-accent shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Departments & Structure Section */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Departments Table */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
              <h3 className="text-3xl font-heading text-primary mb-8">Departments Usually Found in Large Events</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="py-4 px-4 font-heading text-primary">Department</th>
                      <th className="py-4 px-4 font-heading text-primary">Main Responsibility</th>
                      <th className="py-4 px-4 font-heading text-primary">Key Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-bold text-gray-800">{dept.dept}</td>
                        <td className="py-4 px-4 text-gray-600">{dept.responsibility}</td>
                        <td className="py-4 px-4 text-gray-500">{dept.tasks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Structure Example */}
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-[3rem] p-8 md:p-12 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary">
                    <Info size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-heading text-white">Hospitality Structure</h3>
                    <p className="text-white/70">Example for a concert or corporate event</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {structureExample.map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                      <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center font-heading text-xl text-accent border border-accent/20">
                        {item.count}
                      </div>
                      <span className="font-medium text-lg">{item.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
