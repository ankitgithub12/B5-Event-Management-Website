import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Loader, Image as ImageIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { io } from 'socket.io-client';
import api from '../../utils/api';

const SocialGridManagement = () => {
  const [settings, setSettings] = useState({
    sectionTitle: '',
    instagramHandle: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [addError, setAddError] = useState('');
  const [toast, setToast] = useState('');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 5000);
  };

  const fetchSocialGrid = async () => {
    setError('');
    try {
      const response = await api.get('/social-grid');
      if (response.data) {
        if (response.data.settings) {
          setSettings({
            sectionTitle: response.data.settings.sectionTitle || '',
            instagramHandle: response.data.settings.instagramHandle || '',
          });
        }
        if (response.data.images) {
          setImages(response.data.images);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch social grid details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialGrid();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('social_grid_update', () => {
      fetchSocialGrid();
      showToast('✨ Social grid updated in real-time!');
    });

    return () => socket.disconnect();
  }, []);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.put('/social-grid/settings', settings);
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaveLoading(false);
    }
  };

  const validateFile = (file) => {
    if (!file) return 'Please select an image file.';
    if (!file.type.startsWith('image/')) {
      return 'Only image files (JPEG, JPG, PNG, WEBP) are supported.';
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return 'File size exceeds the 5MB limit. Please upload a smaller image.';
    }
    return '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setAddError(fileError);
        setImageFile(null);
        setImagePreview('');
        e.target.value = '';
      } else {
        setAddError('');
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
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
    uploadData.append('image', imageFile);

    try {
      await api.post('/social-grid/images', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShowAddModal(false);
      setImageFile(null);
      setImagePreview('');
      fetchSocialGrid();
      showToast('🎉 Image uploaded successfully!');
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Remove this photo from the social grid?')) return;
    try {
      await api.delete(`/social-grid/images/${id}`);
      fetchSocialGrid();
      showToast('🗑️ Image removed successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete image');
    }
  };

  const handleMoveImage = async (index, direction) => {
    const newItems = [...images];
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

    // Optimistic UI update
    setImages(newItems);

    try {
      await api.put('/social-grid/images/reorder', { orders: updatedOrders });
    } catch (err) {
      console.error('Failed to save image order:', err);
      alert('Failed to save ordering changes. Reverting.');
      fetchSocialGrid();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Social Grid Settings</h1>
          <p className="text-gray-500">Configure titles, Instagram handle, and manage the images displayed in your social feed.</p>
        </div>
        <button
          onClick={() => {
            setShowAddModal(true);
            setAddError('');
          }}
          className="bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
        >
          <Plus size={18} />
          <span>Add Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Settings fields */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 self-start">
          <h3 className="text-lg font-bold text-primary border-b pb-3 flex items-center gap-2">
            <Sparkles className="text-accent" size={20} />
            <span>Feed Configuration</span>
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-semibold">
              {success}
            </div>
          )}

          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Section Title</label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                value={settings.sectionTitle}
                onChange={(e) => setSettings({ ...settings, sectionTitle: e.target.value })}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">Title displayed above the Instagram handle (e.g. FOLLOW OUR JOURNEY)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Instagram Handle / Username</label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent font-semibold"
                value={settings.instagramHandle}
                onChange={(e) => setSettings({ ...settings, instagramHandle: e.target.value })}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">Your Instagram username starting with @ (e.g. @b5eventory)</p>
            </div>

            <button
              type="submit"
              disabled={saveLoading}
              className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-2 cursor-pointer"
            >
              {saveLoading ? <Loader className="animate-spin" size={20} /> : <Save size={18} />}
              <span>Save Settings</span>
            </button>
          </form>
        </div>

        {/* Right Side: Grid of images */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-primary border-b pb-3 flex items-center gap-2">
            <ImageIcon className="text-accent" size={20} />
            <span>Feed Gallery ({images.length} images)</span>
          </h3>

          {images.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <ImageIcon className="mx-auto mb-3 opacity-20" size={48} />
              <p className="text-sm">No images in your social grid.</p>
              <p className="text-xs text-gray-400 mt-1">Upload images to display them in the homepage journey section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((item, index) => (
                <div key={item._id} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group relative flex flex-col justify-between hover:shadow-md transition-all">
                  <img
                    src={item.imageUrl}
                    alt={`Social Feed Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Delete overlay */}
                  <button
                    onClick={() => handleDeleteImage(item._id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700 z-10"
                    title="Delete image"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* Reorder capsule overlay */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg border border-white/10">
                    <button
                      onClick={() => handleMoveImage(index, 'left')}
                      disabled={index === 0}
                      className="text-white hover:text-accent disabled:opacity-30 disabled:hover:text-white p-0.5 transition-colors cursor-pointer"
                      title="Move Left"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-[10px] text-white/95 font-bold uppercase tracking-wider px-1 select-none">
                      Order
                    </span>
                    <button
                      onClick={() => handleMoveImage(index, 'right')}
                      disabled={index === images.length - 1}
                      className="text-white hover:text-accent disabled:opacity-30 disabled:hover:text-white p-0.5 transition-colors cursor-pointer"
                      title="Move Right"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl border border-gray-100">
            <button
              onClick={() => {
                setShowAddModal(false);
                setImageFile(null);
                setImagePreview('');
              }}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">Upload Social Post Image</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {addError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {addError}
                </div>
              )}

              {imagePreview && (
                <div className="aspect-square w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden border bg-gray-50">
                  <img src={imagePreview} alt="Upload Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Select Image File</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                />
                {imageFile && (
                  <p className="text-xs text-green-600 font-semibold mt-1.5 ml-1">
                    ✓ Selected: {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)} MB / 5.00 MB used)
                  </p>
                )}
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Max file size: 5MB. Supported types: JPG, PNG, WEBP.</p>
              </div>

              <button
                type="submit"
                disabled={addLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {addLoading ? <Loader className="animate-spin" size={20} /> : 'Upload Image'}
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

export default SocialGridManagement;
