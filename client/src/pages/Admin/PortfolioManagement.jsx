import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader, Image as ImageIcon } from 'lucide-react';
import api from '../../utils/api';

const PortfolioManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals state
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', category: 'wedding' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchPortfolio = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/portfolio');
      setProjects(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch portfolio items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: '', category: 'wedding' });
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setShowModal(true);
  };

  const handleOpenEdit = (project) => {
    setIsEditing(true);
    setEditingId(project._id);
    setFormData({ title: project.title, category: project.category });
    setImageFile(null);
    setImagePreview(project.imageUrl);
    setFormError('');
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing && !imageFile) {
      setFormError('Please select an image file to upload.');
      return;
    }

    setFormLoading(true);
    setFormError('');

    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('category', formData.category);
    if (imageFile) {
      uploadData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await api.put(`/portfolio/${editingId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/portfolio', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setShowModal(false);
      setFormData({ title: '', category: 'wedding' });
      setImageFile(null);
      setImagePreview('');
      fetchPortfolio();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save portfolio item');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;
    try {
      await api.delete(`/portfolio/${id}`);
      fetchPortfolio();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete portfolio item');
    }
  };

  const categories = [
    { value: 'wedding', label: 'Weddings' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'college', label: 'College' },
    { value: 'party', label: 'Parties' },
    { value: 'product', label: 'Product Launches' }
  ];

  const filteredItems = projects.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Portfolio Showcase</h1>
          <p className="text-gray-500">Manage real moments and memories from past events shown on the frontend.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
        >
          <Plus size={18} />
          <span>Add Portfolio Item</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search portfolio..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase">Category:</span>
          <select 
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Display Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-accent" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <ImageIcon className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-bold text-primary mb-1">No items found</h3>
          <p className="text-gray-500 text-sm">Add a new portfolio entry to display on the website.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group relative flex flex-col justify-between hover:shadow-md transition-all">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Actions overlay */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenEdit(item)}
                    className="bg-primary text-white p-2 rounded-xl shadow-lg cursor-pointer hover:bg-accent transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white p-2 rounded-xl shadow-lg cursor-pointer hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider bg-accent/5 px-2.5 py-0.5 rounded-full inline-block">
                  {categories.find(c => c.value === item.category)?.label || item.category}
                </span>
                <h4 className="text-sm font-bold text-primary line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl border border-gray-100">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">
              {isEditing ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Project Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Grand Udaipur Palace Wedding"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Category</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Image File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">
                  {isEditing ? 'Leave empty to keep existing image.' : 'Required. Image will be uploaded to Cloudinary.'}
                </p>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <span className="block text-xs font-semibold text-gray-400 uppercase mb-1 ml-1">Image Preview:</span>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border bg-gray-50">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {formLoading ? <Loader className="animate-spin" size={20} /> : isEditing ? 'Save Changes' : 'Upload Showcase'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
