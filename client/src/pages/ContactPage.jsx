import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { MapPin, Phone, Mail, MessageCircle, CalendarDays, CheckCircle2, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    eventType: '',
    budget: '',
    guests: '',
    vision: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ fullName: '', phone: '', eventType: '', budget: '', guests: '', vision: '' });
  };

  const today = new Date();
  const calendarDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d.getDate(),
      month: d.toLocaleString('en', { month: 'short' }).toUpperCase(),
      status: i === 0 ? 'today' : [1, 4].includes(i) ? 'booked' : 'available',
    };
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F8F6F2' }}>
      <Navbar />

      <main className="flex-grow pt-32 pb-20">

        {/* Hero */}
        <div className="text-center px-4 mb-16">
          <p className="text-accent font-semibold text-sm tracking-[3px] uppercase mb-4">GET IN TOUCH</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Full Name</label>
                    <input
                      type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                      placeholder="e.g. Elena Richards" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Phone Number</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765-43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Event Type</label>
                    <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-700">
                      <option value="">Wedding Celebration</option>
                      <option value="wedding">Wedding</option>
                      <option value="engagement">Engagement</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday / Anniversary</option>
                      <option value="prewedding">Pre-Wedding Shoot</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Estimated Budget</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-700">
                      <option value="">Select Range</option>
                      <option value="4-6L">₹4–6 Lakhs (Basic)</option>
                      <option value="10-15L">₹10–15 Lakhs (Medium)</option>
                      <option value="25-30L">₹25–30 Lakhs (Premium)</option>
                      <option value="40L+">₹40L+ (Luxury)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Number of Guests</label>
                  <input
                    type="number" name="guests" value={formData.guests} onChange={handleChange}
                    placeholder="Estimated Count" min="1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[1.5px] text-gray-500 uppercase mb-2">Your Vision</label>
                  <textarea
                    name="vision" value={formData.vision} onChange={handleChange}
                    placeholder="Tell us about your dream event..." rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm text-gray-800 placeholder:text-gray-400 resize-none"
                  />
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-white font-semibold text-base tracking-wide hover:bg-accent-hover transition-all duration-300 hover:-translate-y-0.5 shadow-gold">
                  Submit Inquiry
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
                    <span>125, Heritage Manor, Palace Road<br/>Udaipur, Rajasthan – 313001</span>
                  </li>
                  <li className="flex items-center gap-4 text-sm text-gray-700">
                    <Phone size={18} className="text-accent shrink-0" />
                    <span>+91 294 242 8800</span>
                  </li>
                  <li className="flex items-center gap-4 text-sm text-gray-700">
                    <Mail size={18} className="text-accent shrink-0" />
                    <span>concierge@b5eventory.com</span>
                  </li>
                </ul>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-700 transition-all duration-300"
                >
                  <FaWhatsapp size={20} className="text-green-500" /> Message on WhatsApp
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-3xl overflow-hidden h-52 bg-gray-900 relative flex items-center justify-center">
                <iframe
                  title="BE5 Eventory Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.1!2d73.7125!3d24.5854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM1JzA3LjQiTiA3M8KwNDInNDUuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
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
              <p className="text-accent font-semibold text-xs tracking-[3px] uppercase mb-2">PLANNER AVAILABILITY</p>
              <h2 className="text-3xl md:text-4xl font-heading text-primary">Season Calendar {today.getFullYear()}</h2>
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
            {calendarDays.map((day, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 text-center border-2 transition-all duration-300 ${
                  day.status === 'today'
                    ? 'border-accent bg-white shadow-gold shadow-md'
                    : day.status === 'booked'
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-accent hover:shadow-sm'
                }`}
              >
                <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-1">{day.month}</p>
                <p className={`text-2xl font-heading font-bold ${day.status === 'today' ? 'text-accent' : 'text-primary'}`}>
                  {day.date}
                </p>
                {day.status === 'today' && (
                  <p className="text-[9px] tracking-widest text-accent uppercase font-bold mt-1">TODAY</p>
                )}
                <div className="mt-3 flex justify-center">
                  {day.status === 'booked' ? (
                    <X size={18} className="text-red-400" />
                  ) : (
                    <CalendarDays size={18} className={day.status === 'today' ? 'text-accent' : 'text-gray-300'} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
