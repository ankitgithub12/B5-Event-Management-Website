import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, X, Loader, Image as ImageIcon, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { io } from 'socket.io-client';
import api from '../../utils/api';

const GalleryManagement = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Wedding', span: 'col-span-1 row-span-1' });
  const [imageFile, setImageFile] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  // Edit state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', category: 'Wedding', span: 'col-span-1 row-span-1' });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 5000);
  };

  const fetchGallery = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/gallery');
      setGallery(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('gallery_update', () => {
      fetchGallery();
      showToast('✨ Media gallery updated in real-time!');
    });

    return () => socket.disconnect();
  }, []);

  // Shared file validator (returns error string if invalid, or empty string if valid)
  const validateFile = (file) => {
    if (!file) return 'Please select an image file.';
    
    // Check type
    if (!file.type.startsWith('image/')) {
      return 'Only image files (JPEG, JPG, PNG, WEBP) are supported.';
    }
    
    // Check size: 5MB limit
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return 'File size exceeds the 5MB limit. Please upload a smaller image.';
    }
    
    return '';
  };

  const handleAddFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setAddError(fileError);
        setImageFile(null);
        e.target.value = ''; // Reset input
      } else {
        setAddError('');
        setImageFile(file);
      }
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setEditError(fileError);
        setEditImageFile(null);
        e.target.value = ''; // Reset input
      } else {
        setEditError('');
        setEditImageFile(file);
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setAddError('Please select an image file to upload.');
      return;
    }

    setAddLoading(true);
    setAddError('');

    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('category', formData.category);
    uploadData.append('span', formData.span);
    uploadData.append('image', imageFile);

    try {
      await api.post('/gallery', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShowAddModal(false);
      setFormData({ title: '', category: 'Wedding', span: 'col-span-1 row-span-1' });
      setImageFile(null);
      fetchGallery();
      showToast('🎉 Image uploaded successfully!');
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to upload gallery image');
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditFormData({ 
      title: item.title, 
      category: item.category, 
      span: item.span || 'col-span-1 row-span-1' 
    });
    setEditImageFile(null);
    setEditError('');
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');

    const uploadData = new FormData();
    uploadData.append('title', editFormData.title);
    uploadData.append('category', editFormData.category);
    uploadData.append('span', editFormData.span);
    if (editImageFile) {
      uploadData.append('image', editImageFile);
    }

    try {
      await api.put(`/gallery/${editItem._id}`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShowEditModal(false);
      setEditItem(null);
      setEditImageFile(null);
      fetchGallery();
      showToast('🎉 Gallery item updated successfully!');
    } catch (err) {
      setEditError(err.response?.data?.message || 'Failed to update gallery item');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this photo from the website gallery?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete gallery image');
    }
  };

  const handleMove = async (index, direction) => {
    const newItems = [...gallery];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    // Swap items
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Update order values sequentially
    const updatedOrders = newItems.map((item, idx) => ({
      id: item._id,
      order: idx
    }));

    // Optimistic UI updates
    setGallery(newItems);

    try {
      await api.put('/gallery/reorder', { orders: updatedOrders });
    } catch (err) {
      console.error('Failed to save gallery order:', err);
      alert('Failed to save ordering changes. Reverting.');
      fetchGallery();
    }
  };

  const categories = ['Wedding', 'Corporate', 'Private Party', 'Exhibition', 'Other'];

  const filteredItems = gallery.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Media Gallery</h1>
          <p className="text-gray-500">Curate and manage portfolios & visual assets showcased to customers.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
        >
          <Plus size={18} />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search gallery..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {categoryFilter === 'all' && !searchQuery ? (
            <span className="text-xs text-accent font-semibold bg-accent/5 px-3 py-1.5 rounded-full select-none">
              ℹ️ Hover cards to reorder
            </span>
          ) : (
            <span className="text-xs text-gray-400 font-semibold bg-gray-100 px-3 py-1.5 rounded-full select-none">
              ℹ️ Filter active (reordering disabled)
            </span>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase">Category:</span>
            <select 
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
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
          <h3 className="text-lg font-bold text-primary mb-1">No media found</h3>
          <p className="text-gray-500 text-sm">Upload a new event memory to start curating the gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group relative flex flex-col justify-between hover:shadow-md transition-all">
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Edit overlay (top-left) */}
                <button 
                  onClick={() => handleEditClick(item)}
                  className="absolute top-2 left-2 bg-primary text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-accent"
                  title="Edit details"
                >
                  <Edit2 size={14} />
                </button>

                {/* Delete overlay (top-right) */}
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700"
                  title="Delete image"
                >
                  <Trash2 size={14} />
                </button>

                {/* Reorder capsule overlay (bottom center) */}
                {categoryFilter === 'all' && !searchQuery && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg border border-white/10">
                    <button
                      onClick={() => handleMove(gallery.findIndex(x => x._id === item._id), 'left')}
                      disabled={gallery.findIndex(x => x._id === item._id) === 0}
                      className="text-white hover:text-accent disabled:opacity-30 disabled:hover:text-white p-0.5 transition-colors cursor-pointer"
                      title="Move Left"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider px-1.5 select-none">
                      Order
                    </span>
                    <button
                      onClick={() => handleMove(gallery.findIndex(x => x._id === item._id), 'right')}
                      disabled={gallery.findIndex(x => x._id === item._id) === gallery.length - 1}
                      className="text-white hover:text-accent disabled:opacity-30 disabled:hover:text-white p-0.5 transition-colors cursor-pointer"
                      title="Move Right"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider bg-accent/5 px-2 py-0.5 rounded-full inline-block">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-primary line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl border border-gray-100">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">Upload Showcase Photo</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {addError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {addError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Photo Description Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Wedding Hall Flower Setup"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Portfolio Category</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Grid Layout Style</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.span}
                  onChange={(e) => setFormData({...formData, span: e.target.value})}
                >
                  <option value="col-span-1 row-span-1">Standard (Square 1x1)</option>
                  <option value="col-span-1 md:col-span-2 row-span-2">Featured Left (Large 2x2)</option>
                  <option value="col-span-1 md:col-span-2 row-span-1">Wide Landscape (2x1)</option>
                  <option value="col-span-1 row-span-2">Tall Portrait (1x2)</option>
                  <option value="col-span-1 md:col-span-3 row-span-2">Full Width (3x2)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Select Image File</label>
                <input 
                  type="file" 
                  required
                  accept="image/*"
                  onChange={handleAddFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Max file size: 5MB. Recommended JPG, PNG, or WEBP.</p>
              </div>

              <button 
                type="submit" 
                disabled={addLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {addLoading ? <Loader className="animate-spin" size={20} /> : 'Upload To Gallery'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl border border-gray-100">
            <button 
              onClick={() => {
                setShowEditModal(false);
                setEditItem(null);
              }}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">Edit Gallery Photo</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {editError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {editError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Photo Description Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Wedding Hall Flower Setup"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Portfolio Category</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Grid Layout Style</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={editFormData.span}
                  onChange={(e) => setEditFormData({...editFormData, span: e.target.value})}
                >
                  <option value="col-span-1 row-span-1">Standard (Square 1x1)</option>
                  <option value="col-span-1 md:col-span-2 row-span-2">Featured Left (Large 2x2)</option>
                  <option value="col-span-1 md:col-span-2 row-span-1">Wide Landscape (2x1)</option>
                  <option value="col-span-1 row-span-2">Tall Portrait (1x2)</option>
                  <option value="col-span-1 md:col-span-3 row-span-2">Full Width (3x2)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Change Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleEditFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Leave blank to keep the current photo. Max size: 5MB.</p>
              </div>

              <button 
                type="submit" 
                disabled={editLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {editLoading ? <Loader className="animate-spin" size={20} /> : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[110] bg-primary text-white border border-[#C5A06B]/20 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm text-left">
          <span className="text-sm font-semibold">{toast}</span>
          <button onClick={() => setToast('')} className="text-white/50 hover:text-white ml-auto shrink-0 cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
