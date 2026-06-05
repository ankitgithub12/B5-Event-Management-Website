import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader, MessageSquare, ChevronUp, ChevronDown, Star, Save } from 'lucide-react';
import api from '../../utils/api';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  // Form states
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/testimonials');
      setTestimonials(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      text: '',
      rating: 5,
      order: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.order || 0)) + 1 : 0
    });
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
      name: item.name,
      role: item.role,
      text: item.text,
      rating: item.rating || 5,
      order: item.order || 0
    });
    setImageFile(null);
    setImagePreview(item.image);
    setFormError('');
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Only image files are supported.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormError('File size exceeds the 5MB limit.');
        return;
      }
      setFormError('');
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    const uploadData = new FormData();
    uploadData.append('name', formData.name);
    uploadData.append('role', formData.role);
    uploadData.append('text', formData.text);
    uploadData.append('rating', formData.rating);
    uploadData.append('order', formData.order);

    if (imageFile) {
      uploadData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await api.put(`/testimonials/${editingId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('🎉 Testimonial updated successfully!');
      } else {
        await api.post('/testimonials', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showToast('✨ New testimonial added successfully!');
      }
      setShowModal(false);
      fetchTestimonials();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save testimonial.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this love note/testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
      showToast('🗑️ Testimonial deleted successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete testimonial.');
    }
  };

  const handleMove = async (index, direction) => {
    const newItems = [...testimonials];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    // Swap items in local array
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Map order values sequentially based on new position
    const updatedOrders = newItems.map((item, idx) => ({
      id: item._id,
      order: idx
    }));

    // Optimistically update UI
    setTestimonials(newItems);

    try {
      await api.put('/testimonials/reorder', { orders: updatedOrders });
    } catch (err) {
      console.error('Failed to save order change', err);
      showToast('❌ Failed to update reorder sequence');
      fetchTestimonials();
    }
  };

  return (
    <div className="space-y-8 font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Love Notes Settings</h1>
          <p className="text-gray-500">Add, edit, delete, or rearrange testimonials showing on the homepage.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
        >
          <Plus size={18} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-accent" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-bold text-primary mb-1">No testimonials found</h3>
          <p className="text-gray-500 text-sm">Create your first client testimonial to display on the site.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              {/* Profile Image & Metadata */}
              <div className="flex items-center gap-4 min-w-[250px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border border-accent/25"
                />
                <div>
                  <h3 className="text-base font-bold text-primary">{item.name}</h3>
                  <p className="text-xs text-accent font-semibold">{item.role}</p>
                  
                  {/* Stars */}
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < (item.rating || 5) ? 'fill-accent text-accent' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-sm text-gray-600 italic border-l pl-4 border-gray-100">
                "{item.text}"
              </div>

              {/* Order and Action Buttons */}
              <div className="flex items-center gap-4 self-end md:self-center">
                {/* Reordering Controls */}
                <div className="flex flex-col gap-1 border border-gray-100 bg-gray-50/50 p-1.5 rounded-xl">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 text-gray-400 hover:text-accent disabled:opacity-20 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    disabled={index === testimonials.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 text-gray-400 hover:text-accent disabled:opacity-20 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                {/* Edit and Delete Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-gray-500 hover:text-accent border border-gray-100 rounded-xl hover:border-accent cursor-pointer bg-white transition-all shadow-sm"
                    title="Edit Testimonial"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-gray-400 hover:text-red-600 border border-gray-100 rounded-xl hover:border-red-600 cursor-pointer bg-white transition-all shadow-sm"
                    title="Delete Testimonial"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">
              {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanya Kapoor"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Role / Occasion</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mother of Bride / Corporate Gala"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Rating</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Testimonial Text</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Paste what the family / client said about your work..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Profile Picture (Optional)</label>
                <div className="flex items-center gap-4 mt-1">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover border border-accent/25"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1 ml-1">
                  Leave empty to automatically generate a custom avatar based on their name. Supports JPG, PNG, WEBP.
                </p>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 cursor-pointer"
              >
                {formLoading ? <Loader className="animate-spin" size={20} /> : <Save size={18} />}
                <span>{isEditing ? 'Save Changes' : 'Publish Testimonial'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[110] bg-primary text-white border border-[#C5A06B]/20 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm text-left">
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;
