import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
import SocialGrid from '../components/SocialGrid/SocialGrid';
import { MapPin, Phone, Mail, MessageCircle, CalendarDays, CheckCircle2, X, Loader2, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import api from '../utils/api';

const ContactPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    budget: '',
    guests: '',
    message: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventType = params.get('eventType') || '';
    const message = params.get('message') || '';
    const budget = params.get('budget') || '';
    const guests = params.get('guests') || '';
    
    if (eventType || message || budget || guests) {
      setFormData(prev => ({
        ...prev,
        eventType: eventType || prev.eventType,
        message: message || prev.message,
        budget: budget || prev.budget,
        guests: guests || prev.guests,
      }));
    }
  }, [location.search]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [leadPlanners, setLeadPlanners] = useState([]);
  const [loadingPlanners, setLoadingPlanners] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoadingEvents(false);
      }
    };
    const fetchLeadPlanners = async () => {
      try {
        const { data } = await api.get('/team');
        const activeLeads = data
          .filter((member) => member.type === 'lead' && member.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setLeadPlanners(activeLeads);
      } catch (err) {
        console.error('Error fetching lead planners:', err);
      } finally {
        setLoadingPlanners(false);
      }
    };
    fetchEvents();
    fetchLeadPlanners();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Build the message combining event details
    const combinedMessage = [
      formData.message,
      formData.eventType ? `Event Type: ${formData.eventType}` : '',
      formData.budget ? `Budget: ${formData.budget}` : '',
      formData.guests ? `Guests: ${formData.guests}` : '',
    ].filter(Boolean).join('\n');

    try {
      await api.post('/forms', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.eventType ? `Inquiry: ${formData.eventType}` : 'General Inquiry',
        message: combinedMessage || 'No message provided.',
        formType: 'Contact',
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', eventType: '', budget: '', guests: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
    const eventOnDay = events.find(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === d.getDate() &&
             eventDate.getMonth() === d.getMonth() &&
             eventDate.getFullYear() === d.getFullYear();
    });

    const isToday = i === 0;

    return {
      dateObj: d,
      date: d.getDate(),
      month: d.toLocaleString('en', { month: 'short' }).toUpperCase(),
      year: d.getFullYear(),
      status: eventOnDay ? 'booked' : isToday ? 'today' : 'available',
      event: eventOnDay || null,
    };
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F8F6F2' }}>
      <SEO 
        title="Contact Us - Let's Plan Your Event"
        description="Get in touch with B5 EVENTORY for your next event. Fill out our inquiry form or reach out directly to our team in Udaipur."
        canonicalUrl="/contact"
      />
      <Navbar />

      <main className="flex-grow pt-32 pb-20">

        {/* Hero */}
        <div className="text-center px-4 mb-16">
          <p className="text-accent font-semibold text-sm tracking-[3px] uppercase mb-4">GET IN TOUCH</p>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary mb-6">
            Let's Plan Something Beautiful
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            From intimate gatherings to grand celebrations, our dedicated team is here to bring your vision to life with editorial precision.
          </p>
        </div>

        {/* Form + Studio Card */}
        <div className="container mx-auto px-4 max-w-6xl mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* Inquiry Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-heading text-primary mb-8">Inquiry Form</h2>

              {submitted && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">Thank you! We'll contact you within 24 hours.</span>
                </div>
              )}

              {error && (
                <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
                  <AlertCircle size={20} />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Full Name *</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="e.g. Elena Richards" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Email Address *</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="you@example.com" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Phone Number</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765-43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Event Type</label>
                    <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-700">
                      <option value="">Select Event Type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                      <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Estimated Budget</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-700">
                      <option value="">Select Range</option>
                      <option value="₹4–6 Lakhs (Basic)">₹4–6 Lakhs (Basic)</option>
                      <option value="₹10–15 Lakhs (Medium)">₹10–15 Lakhs (Medium)</option>
                      <option value="₹25–30 Lakhs (Premium)">₹25–30 Lakhs (Premium)</option>
                      <option value="₹40L+ (Luxury)">₹40L+ (Luxury)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Number of Guests</label>
                    <input
                      type="number" name="guests" value={formData.guests} onChange={handleChange}
                      placeholder="Estimated Count" min="1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Your Vision / Message *</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your dream event..." rows="4" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-accent text-white font-semibold text-base tracking-wide hover:bg-accent-hover transition-all duration-300 hover:-translate-y-0.5 shadow-gold disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : 'Submit Inquiry'}
                </button>
              </form>
            </div>

            {/* Studio Info + Map */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Our Studio Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-heading text-primary mb-6">Our Studio</h3>
                <ul className="space-y-5 mb-8">
                  <li className="flex items-start gap-4 text-sm text-gray-700">
                    <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                    <span>Ac-209, Gyan Vihar Marg, Central Spine, Jagatpura, Jaipur, Rajasthan 302017</span>
                  </li>
                  <li className="flex items-center gap-4 text-sm text-gray-700">
                    <Phone size={18} className="text-accent shrink-0" />
                    <span>+91 9414644988</span>
                  </li>
                  <li className="flex items-center gap-4 text-sm text-gray-700">
                    <Mail size={18} className="text-accent shrink-0" />
                    <span>B5eventory@gmail.com</span>
                  </li>
                </ul>
                <a
                  href="https://wa.me/919414644988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-700 transition-all duration-300"
                >
                  <FaWhatsapp size={20} className="text-green-500" /> Message on WhatsApp
                </a>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden h-52 bg-gray-900 relative flex items-center justify-center">
                <iframe
                  title="B5 Eventory Location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3561.033642988921!2d75.85572607543581!3d26.80705737671034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ4JzI1LjQiTiA3NcKwNTEnMjkuOSJF!5e0!3m2!1sen!2sin!4v1780057625888!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  className="opacity-70"
                ></iframe>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-xs font-bold tracking-[3px] text-white uppercase bg-black/50 px-3 py-1 rounded-full">
                    STUDIO LOCATION
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Season Calendar */}
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between mb-8">
            <div>
              <p className="text-accent font-semibold text-[10px] md:text-xs tracking-[3px] uppercase mb-2">PLANNER AVAILABILITY</p>
              <h2 className="text-2xl md:text-4xl font-heading text-primary">Season Calendar {today.getFullYear()}</h2>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Available
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span> Booked
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {loadingEvents ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 size={32} className="text-accent animate-spin" />
                <p className="text-gray-500 font-medium text-sm">Loading calendar availability...</p>
              </div>
            ) : (
              calendarDays.map((day, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (day.status === 'booked' && day.event) {
                      setSelectedCalendarEvent(day.event);
                    }
                  }}
                  className={`rounded-2xl p-4 text-center border-2 transition-all duration-300 relative group ${day.status === 'today'
                      ? 'border-accent bg-white shadow-gold shadow-md'
                      : day.status === 'booked'
                        ? 'border-red-200 bg-red-50 hover:bg-red-100/50 cursor-pointer shadow-sm'
                        : 'border-green-200 bg-green-50/30 hover:border-green-400 hover:bg-green-50/50 hover:shadow-sm'
                    }`}
                >
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1">{day.month}</p>
                  <p className={`text-2xl font-heading font-bold ${day.status === 'today' ? 'text-accent' : 'text-primary'}`}>
                    {day.date}
                  </p>
                  {day.status === 'today' && (
                    <p className="text-[9px] tracking-widest text-accent uppercase font-bold mt-1">TODAY</p>
                  )}
                  {day.status === 'booked' && day.event && (
                    <div className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </div>
                  )}
                  <div className="mt-3 flex flex-col items-center gap-1 justify-center">
                    {day.status === 'booked' ? (
                      <>
                        <X size={18} className="text-red-400" />
                        <span className="text-[9px] font-semibold text-red-500 truncate max-w-[80px] block mt-0.5">
                          {day.event.title}
                        </span>
                      </>
                    ) : (
                      <>
                        <CalendarDays size={18} className={day.status === 'today' ? 'text-accent' : 'text-green-500'} />
                        {day.status === 'available' && (
                          <span className="text-[9px] font-semibold text-green-600 block mt-0.5">
                            Available
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Meet the Leads */}
        <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-32">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-accent font-bold text-xs tracking-[3px] uppercase mb-4 block">THE PEOPLE BEHIND THE MAGIC</span>
            <h2 className="text-3xl md:text-4xl font-heading text-primary">Meet Our Lead Planners</h2>
          </div>

          {loadingPlanners ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 size={32} className="text-accent animate-spin" />
              <p className="text-gray-500 font-medium text-sm">Loading lead planners...</p>
            </div>
          ) : leadPlanners.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No lead planners registered yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {leadPlanners.map((lead) => (
                <div key={lead._id} className="group">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative">
                    <img
                      src={lead.imageUrl || lead.image}
                      alt={lead.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-1">{lead.name}</h4>
                  <p className="text-accent font-semibold text-xs tracking-wider uppercase mb-3">{lead.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{lead.bio || lead.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Banner */}
        <div className="container mx-auto px-4 max-w-6xl mt-16 md:mt-32">
          <div className="bg-primary p-6 md:p-20 rounded-2xl md:rounded-[4rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-6 relative z-10">Prefer a Direct Call?</h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto text-lg relative z-10">Skip the form and talk directly to our concierge team for immediate assistance.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <a href="tel:+919414644988" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-accent hover:text-white transition-all shadow-xl">
                Call +91 9414644988
              </a>
            </div>
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedCalendarEvent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedCalendarEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 text-accent font-semibold text-xs tracking-wider uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                Booked Event
              </div>
              <h3 className="text-2xl font-heading text-primary mb-4">{selectedCalendarEvent.title}</h3>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6 text-left">
                <div className="flex items-start gap-2.5">
                  <CalendarDays size={16} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-gray-800">Date</span>
                    {new Date(selectedCalendarEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-gray-800">Venue</span>
                    {selectedCalendarEvent.location}
                  </div>
                </div>

                {selectedCalendarEvent.description && (
                  <div className="pt-2 border-t border-gray-100">
                    <span className="font-semibold block text-gray-800 mb-1">Details</span>
                    <p className="leading-relaxed text-xs">{selectedCalendarEvent.description}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedCalendarEvent(null)}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      <SocialGrid />
      <Footer />
    </div>
  );
};

export default ContactPage;
