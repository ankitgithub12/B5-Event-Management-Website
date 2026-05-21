import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    event: '',
    budget: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Prepare combined message or structured fields
    const combinedMessage = `Event Date: ${formData.date}\nEvent Type: ${formData.event}\nBudget: ${formData.budget || 'Not specified'}`;
    
    try {
      await api.post('/forms', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.event ? `Consultation Inquiry: ${formData.event}` : 'Free Consultation Inquiry',
        message: combinedMessage,
        formType: 'Contact',
      });

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        event: '',
        budget: '',
        date: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary-dark relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between">
          
          {/* Left Content */}
          <div className="lg:w-5/12 text-center lg:text-left text-white">
            <div className="inline-block relative mb-6">
              <span className="absolute -left-8 -top-8 text-4xl text-accent/30">✦</span>
              <h2 className="text-4xl md:text-5xl font-heading mb-4">Let's Plan Your<br/>Next Event</h2>
              <span className="absolute -right-12 top-4 text-3xl text-accent/30">✦</span>
            </div>
            
            <p className="text-gray-300 mb-10 text-lg">
              Your dream event is just a message away.<br/>Get a free consultation today!
            </p>

            <div className="flex flex-col gap-6 items-center lg:items-start">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-accent">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400 mb-0.5">Call Us</p>
                  <p className="font-semibold">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-accent">
                  <Mail size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400 mb-0.5">Email Us</p>
                  <p className="font-semibold">hello@b5eventory.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-accent">
                  <MapPin size={18} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400 mb-0.5">Visit Us</p>
                  <p className="font-semibold">Jaipur, Rajasthan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:w-6/12 w-full">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
              <span className="absolute -right-6 top-1/2 text-4xl text-accent/20 hidden lg:block">✦</span>
              
              {submitted && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl text-left">
                  <CheckCircle2 size={20} className="shrink-0 text-green-600" />
                  <span className="font-medium">Thank you! Your consultation request has been sent.</span>
                </div>
              )}

              {error && (
                <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-left">
                  <AlertCircle size={20} className="shrink-0 text-red-600" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="sr-only" htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="sr-only" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Phone Number" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="sr-only" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Email Address" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="sr-only" htmlFor="event">Event Type</label>
                  <select 
                    id="event" 
                    required
                    value={formData.event}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-gray-700 bg-white"
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="party">Private Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-1">
                  <label className="sr-only" htmlFor="budget">Your Budget</label>
                  <select 
                    id="budget" 
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-gray-700 bg-white"
                  >
                    <option value="">Your Budget (Optional)</option>
                    <option value="₹1L - ₹5L">₹1L - ₹5L</option>
                    <option value="₹5L - ₹15L">₹5L - ₹15L</option>
                    <option value="₹15L+">₹15L+</option>
                  </select>
                </div>
                
                <div className="md:col-span-1">
                  <label className="sr-only" htmlFor="date">Event Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-gray-700"
                  />
                </div>

                <div className="md:col-span-2 mt-4">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="btn btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : 'GET FREE CONSULTATION'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
