import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import api from '../../utils/api';

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Forms state
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceRange: '',
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: '', description: '', priceRange: '', isActive: true });
    setImageFile(null);
    setFormError('');
    setShowFormModal(true);
  };

  const openEditModal = (service) => {
    setIsEditing(true);
    setEditingId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      priceRange: service.priceRange || '',
      isActive: service.isActive,
    });
    setImageFile(null);
    setFormError('');
    setShowFormModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    // Prepare multipart form data for image upload
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('priceRange', formData.priceRange);
    uploadData.append('isActive', formData.isActive);
    if (imageFile) {
      uploadData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await api.put(`/services/${editingId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/services', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setShowFormModal(false);
      fetchServices();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save service');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete service');
    }
  };

  const toggleServiceStatus = async (service) => {
    try {
      await api.put(`/services/${service._id}`, {
        isActive: !service.isActive,
      });
      fetchServices();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Services Catalog</h1>
          <p className="text-gray-500">Configure corporate hospitality packages and custom booking offerings.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
        >
          <Plus size={18} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search and stats */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="text-sm font-semibold text-gray-500 flex items-center gap-3">
          <span>Active Services: {services.filter(s => s.isActive).length}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span>Draft / Inactive: {services.filter(s => !s.isActive).length}</span>
        </div>
      </div>

      {/* Main Catalog Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-accent" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <Sparkles className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-bold text-primary mb-1">No services found</h3>
          <p className="text-gray-500 text-sm">Try modifying your query or create a new event service.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service._id} 
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between transition-all hover:shadow-md ${
                !service.isActive ? 'opacity-70 bg-gray-50/50' : ''
              }`}
            >
              <div>
                <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  {service.imageUrl ? (
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Sparkles className="text-accent/30" size={48} />
                  )}
                  
                  <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-primary line-clamp-1">{service.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 min-h-[60px]">{service.description}</p>
                  {service.priceRange && (
                    <div className="text-sm font-semibold text-accent">
                      Est. Price: {service.priceRange}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <button 
                  onClick={() => toggleServiceStatus(service)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                >
                  {service.isActive ? (
                    <>
                      <ToggleRight size={20} className="text-accent" />
                      <span>Deactivate</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={20} className="text-gray-400" />
                      <span>Activate</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(service)}
                    className="p-1.5 text-gray-500 hover:text-accent transition-colors border border-gray-200 rounded-lg hover:border-accent cursor-pointer bg-white"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button 
                    onClick={() => handleDelete(service._id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors border border-gray-200 rounded-lg hover:border-red-600 cursor-pointer bg-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowFormModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">
              {isEditing ? 'Modify Event Service' : 'Add New Event Service'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Service Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Luxury Catering & Dining"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe what services and equipment are included in this package..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Estimated Pricing Range</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $5,000 - $12,000"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Status</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})}
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Inactive (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Cover Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Upload JPEG, WebP, or PNG. Direct upload integration with Cloudinary.</p>
              </div>

              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {formLoading ? <Loader className="animate-spin" size={20} /> : isEditing ? 'Save Changes' : 'Publish Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;
