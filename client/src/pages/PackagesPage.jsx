import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Check, X, ChevronDown, ChevronUp, ArrowRight, Loader2, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);
  const [toast, setToast] = useState('');
  
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    notes: '',
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    const fetchPackagesAndAddons = async () => {
      try {
        const [packagesRes, addonsRes] = await Promise.all([
          api.get('/packages'),
          api.get('/packages/addons')
        ]);
        
        // Filter only active records
        setPackages(packagesRes.data.filter(pkg => pkg.isActive));
        setAddons(addonsRes.data.filter(addon => addon.isActive));
      } catch (err) {
        console.error('Failed to fetch packages and addons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackagesAndAddons();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 5000);
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackageForBooking(pkg);
    setBookingForm(prev => ({
      ...prev,
      eventType: pkg.name,
    }));
    setIsBookingModalOpen(true);
  };

  const handleAddAddon = (addon) => {
    setBookingForm(prev => ({
      ...prev,
      notes: prev.notes 
        ? `${prev.notes}\n- Add-on requested: ${addon.name} (${addon.price})`
        : `- Add-on requested: ${addon.name} (${addon.price})`
    }));
    showToast(`✨ Added "${addon.name}" to package notes. Complete your booking below!`);
    setIsBookingModalOpen(true);
    if (!bookingForm.eventType) {
      setBookingForm(prev => ({ ...prev, eventType: 'Medium Package' }));
    }
  };

  const handleDownloadBrochure = () => {
    showToast("✨ Preparing your B5 Eventory brochure... Download started!");
  };

  const handleBookingChange = (e) => {
    setBookingForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError('');
    setBookingSuccess(false);

    try {
      await api.post('/bookings', {
        clientName: bookingForm.clientName,
        email: bookingForm.email,
        phone: bookingForm.phone,
        eventType: bookingForm.eventType,
        eventDate: bookingForm.eventDate,
        guestCount: Number(bookingForm.guestCount),
        notes: bookingForm.notes,
      });

      setBookingSuccess(true);
      setBookingForm({
        clientName: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        notes: '',
      });
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingSuccess(false);
      }, 3000);
      showToast("✨ Booking submitted successfully!");
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Helper to dynamically get color classes for package cards
  const getPackageStyles = (popular) => {
    if (popular) {
      return {
        color: 'bg-[#2D1B33] text-white border-transparent shadow-2xl scale-105 z-10',
        btn: 'bg-[#C5A06B] text-white hover:bg-[#B38F5A]',
      };
    }
    return {
      color: 'bg-white text-gray-800 border-gray-100',
      btn: 'border-2 border-gray-200 text-primary hover:bg-gray-50',
    };
  };

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
      <SEO 
        title="Event Packages & Pricing"
        description="Explore our curated event packages and pricing plans. From basic to luxury, find the perfect package for your wedding or corporate event."
        canonicalUrl="/packages"
      />
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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={40} className="text-[#C5A06B] animate-spin" />
              <p className="text-gray-400 font-medium text-sm">Curating package designs...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No event packages available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch py-10">
              {packages.map((pkg) => {
                const styles = getPackageStyles(pkg.popular);
                return (
                  <div 
                    key={pkg._id} 
                    className={`rounded-[2rem] p-10 border-2 flex flex-col transition-all duration-500 hover:-translate-y-2 relative ${styles.color}`}
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
                    
                    <button 
                      onClick={() => handleSelectPackage(pkg)}
                      className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-300 border-2 flex items-center justify-center cursor-pointer ${styles.btn}`}
                    >
                      Select Package
                    </button>
                  </div>
                );
              })}
            </div>
          )}

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

          {/* Ala-Carte Add-ons - UNIQUE SECTION */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-primary mb-4">Elevate Your Event</h2>
              <p className="text-gray-500 italic">Personalize your package with these signature add-on services.</p>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 size={32} className="text-[#C5A06B] animate-spin" />
                <p className="text-gray-400 font-medium text-sm">Preparing signature add-ons...</p>
              </div>
            ) : addons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No add-on services registered yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {addons.map((addon) => (
                  <div key={addon._id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                    <h4 className="text-lg font-bold text-primary mb-1 group-hover:text-[#C5A06B] transition-colors">{addon.name}</h4>
                    <div className="text-[#C5A06B] font-bold text-sm mb-4">{addon.price}</div>
                    <p className="text-gray-500 text-xs leading-relaxed flex-grow">{addon.description}</p>
                    <button 
                      onClick={() => handleAddAddon(addon)}
                      className="mt-6 text-[10px] font-black tracking-widest uppercase text-primary/40 group-hover:text-[#C5A06B] hover:text-[#C5A06B] transition-colors flex items-center gap-2 cursor-pointer border-0 bg-transparent text-left"
                    >
                      ADD TO PACKAGE <ArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-primary mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500 italic">Common queries about our booking process and services.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                { 
                  q: "How early should we book our event?", 
                  a: "We recommend booking at least 6-8 months in advance for weddings and 2-3 months for corporate events to ensure availability of your preferred date and venue." 
                },
                { 
                  q: "Can we customize the existing packages?", 
                  a: "Absolutely! Our packages serve as a starting point. We can tailor every aspect to match your specific requirements and vision." 
                },
                { 
                  q: "Do you handle outstation or destination weddings?", 
                  a: "Yes, we specialize in destination weddings across India and international locations. Our team handles all travel and logistics for the crew and vendors." 
                },
                { 
                  q: "What is your payment and cancellation policy?", 
                  a: "We require a 25% booking amount to secure the date. The remaining payments are structured in milestones. Cancellation policies vary based on the proximity to the event date." 
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-primary mb-3 flex items-start gap-3">
                    <span className="text-[#C5A06B]">Q.</span>
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A06B]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <h2 className="text-4xl font-serif text-white mb-6 relative z-10">Still Unsure?</h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg relative z-10">
              Our event experts are here to help you choose the perfect plan. Or try our custom planner to build a package from scratch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href="/contact" className="bg-[#C5A06B] text-white px-10 py-4 rounded-full font-bold text-base hover:bg-white hover:text-primary transition-colors shadow-lg flex items-center justify-center">Talk to an Expert</a>
              <button 
                onClick={handleDownloadBrochure}
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer bg-transparent"
              >
                <FileText size={18} /> Download Pricing Brochure
              </button>
              <a href="/planner" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-base transition-colors flex items-center justify-center">Use Custom Planner</a>
            </div>
          </div>

        </div>

        {/* Booking Modal */}
        {isBookingModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] transition-all duration-300">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 text-[#C5A06B] font-semibold text-xs tracking-wider uppercase mb-3">
                <Calendar size={14} />
                Book Your Event Package
              </div>
              <h3 className="text-2xl font-serif text-primary mb-6">
                {bookingForm.eventType || 'Custom Event Package'}
              </h3>

              {bookingSuccess && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
                  <CheckCircle2 size={20} className="shrink-0 text-green-600" />
                  <span className="font-medium">Booking requested successfully! We will contact you soon.</span>
                </div>
              )}

              {bookingError && (
                <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
                  <AlertCircle size={20} className="shrink-0 text-red-600" />
                  <span className="font-medium">{bookingError}</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="clientName"
                    required
                    value={bookingForm.clientName}
                    onChange={handleBookingChange}
                    placeholder="e.g. Elena Richards"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#C5A06B] focus:ring-1 focus:ring-[#C5A06B] text-sm text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={bookingForm.email}
                      onChange={handleBookingChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#C5A06B] focus:ring-1 focus:ring-[#C5A06B] text-sm text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={bookingForm.phone}
                      onChange={handleBookingChange}
                      placeholder="+91 98765-43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#C5A06B] focus:ring-1 focus:ring-[#C5A06B] text-sm text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingForm.eventDate}
                      onChange={handleBookingChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#C5A06B] focus:ring-1 focus:ring-[#C5A06B] text-sm text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Guest Count</label>
                    <input
                      type="number"
                      name="guestCount"
                      min="1"
                      value={bookingForm.guestCount}
                      onChange={handleBookingChange}
                      placeholder="Estimated Guests"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#C5A06B] focus:ring-1 focus:ring-[#C5A06B] text-sm text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Special Requests / Notes</label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={bookingForm.notes}
                    onChange={handleBookingChange}
                    placeholder="Any customizations or requested add-ons..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#C5A06B] focus:ring-1 focus:ring-[#C5A06B] text-sm text-gray-800 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-4 rounded-xl bg-[#C5A06B] text-white font-semibold text-base hover:bg-[#B38F5A] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting Booking...
                    </>
                  ) : 'Submit Booking Request'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-8 right-8 z-[110] bg-primary text-white border border-[#C5A06B]/20 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm text-left">
            <CheckCircle2 className="text-[#C5A06B] shrink-0" size={20} />
            <span className="text-sm font-semibold">{toast}</span>
            <button onClick={() => setToast('')} className="text-white/50 hover:text-white ml-auto shrink-0 cursor-pointer">
              <X size={16} />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;
