import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
import { Calculator } from 'lucide-react';

const CustomPlanner = () => {
  const [formData, setFormData] = useState({
    eventType: 'wedding',
    guests: 200,
    budget: '1000000',
    location: 'local',
    services: {
      venue: true,
      catering: true,
      photography: true,
      preWedding: false,
      makeup: false,
      entertainment: false
    }
  });

  const [estimate, setEstimate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, [name]: checked }
    }));
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    // Mock Calculation Logic
    let baseCost = parseInt(formData.guests) * 1500; // Base per guest

    if (formData.location === 'outstation') baseCost *= 1.5;
    if (formData.location === 'destination') baseCost *= 2.5;

    let serviceCost = 0;
    if (formData.services.venue) serviceCost += 200000;
    if (formData.services.catering) serviceCost += (parseInt(formData.guests) * 1000);
    if (formData.services.photography) serviceCost += 100000;
    if (formData.services.preWedding) serviceCost += 50000;
    if (formData.services.makeup) serviceCost += 30000;
    if (formData.services.entertainment) serviceCost += 80000;

    const total = baseCost + serviceCost;

    // Determine Suggested Package
    let suggested = "Basic Package";
    if (total > 600000 && total <= 1500000) suggested = "Medium Package";
    else if (total > 1500000 && total <= 3000000) suggested = "Premium Package";
    else if (total > 3000000) suggested = "Luxury Package";

    setEstimate({
      min: Math.floor(total * 0.9),
      max: Math.ceil(total * 1.1),
      suggested
    });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SEO 
        title="Custom Event Planner"
        description="Calculate an estimate for your custom event. Select your requirements to get an instant cost estimation from B5 EVENTORY."
        canonicalUrl="/planner"
      />
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-7xl">

          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-heading text-primary mb-4">Custom Event Planner</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your requirements below to get an instant cost estimation and package suggestion for your event.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Form Section */}
            <div className="lg:col-span-8 bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(41,26,57,0.05)] border border-gray-100">
              <form onSubmit={calculateEstimate}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type</label>
                    <select name="eventType" value={formData.eventType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-gray-50">
                      <option value="wedding">Wedding</option>
                      <option value="engagement">Engagement</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="party">Private Party</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location Type</label>
                    <select name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-gray-50">
                      <option value="local">Local City</option>
                      <option value="outstation">Outstation</option>
                      <option value="destination">International/Destination</option>
                    </select>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Guests: {formData.guests}</label>
                    <input type="range" name="guests" min="50" max="1000" step="50" value={formData.guests} onChange={handleInputChange} className="w-full accent-accent" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>50</span>
                      <span>1000+</span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Budget (₹)</label>
                    <select name="budget" value={formData.budget} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-gray-50">
                      <option value="500000">Under ₹5 Lakhs</option>
                      <option value="1000000">₹5 - ₹10 Lakhs</option>
                      <option value="2000000">₹10 - ₹20 Lakhs</option>
                      <option value="3000000">₹20 - ₹40 Lakhs</option>
                      <option value="5000000">₹40 Lakhs+</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Required Services</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries({
                      venue: 'Venue & Decor',
                      catering: 'Catering',
                      photography: 'Photography/Video',
                      preWedding: 'Pre-Wedding Shoot',
                      makeup: 'Makeup & Styling',
                      entertainment: 'Entertainment/DJ'
                    }).map(([key, label]) => (
                      <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.services[key] ? 'border-accent bg-accent/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                        <input type="checkbox" name={key} checked={formData.services[key]} onChange={handleCheckboxChange} className="w-4 h-4 text-accent accent-accent rounded" />
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full py-4 text-lg">
                  <Calculator size={20} /> Calculate Estimate
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-4">
              <div className="bg-primary-dark text-white rounded-2xl md:rounded-3xl p-6 md:p-8 sticky top-32 shadow-2xl">
                <h3 className="text-xl font-heading mb-6 border-b border-white/10 pb-4">Estimation Dashboard</h3>

                {estimate ? (
                  <div className="animate-fade-in">
                    <div className="mb-6">
                      <p className="text-sm text-gray-400 mb-1">Estimated Range</p>
                      <p className="text-3xl font-bold text-accent">
                        {formatCurrency(estimate.min)} <br /><span className="text-lg text-white font-normal">to</span> {formatCurrency(estimate.max)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">*This is a rough estimate. Actual costs may vary based on exact selections.</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 mb-8">
                      <p className="text-sm text-gray-300 mb-1">Suggested Package</p>
                      <p className="text-xl font-semibold text-white">{estimate.suggested}</p>
                    </div>

                    <Link 
                      to={`/contact?eventType=${formData.eventType}&guests=${formData.guests}&budget=${formData.budget}&message=I calculated an estimate using the Custom Planner. Suggested Package: ${estimate.suggested}`} 
                      className="btn bg-white text-primary w-full hover:bg-gray-100 text-center"
                    >
                      Request Official Quote
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-12 opacity-50">
                    <Calculator size={48} className="mx-auto mb-4" />
                    <p>Fill out the form and click calculate to see your estimate.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomPlanner;
