import React, { useState, useEffect } from 'react';
import { Loader, Save, Sparkles, Image as ImageIcon } from 'lucide-react';
import api from '../../utils/api';

const HeroManagement = () => {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    badgeText: '',
    title: '',
    subtitle: '',
    ctaPrimaryText: '',
    ctaPrimaryLink: '',
    ctaSecondaryText: '',
    ctaSecondaryLink: '',
  });

  const [leftImageFile, setLeftImageFile] = useState(null);
  const [leftImagePreview, setLeftImagePreview] = useState('');
  const [rightImageFile, setRightImageFile] = useState(null);
  const [rightImagePreview, setRightImagePreview] = useState('');

  const fetchHero = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/hero');
      const data = response.data;
      setFormData({
        badgeText: data.badgeText || '',
        title: data.title || '',
        subtitle: data.subtitle || '',
        ctaPrimaryText: data.ctaPrimaryText || '',
        ctaPrimaryLink: data.ctaPrimaryLink || '',
        ctaSecondaryText: data.ctaSecondaryText || '',
        ctaSecondaryLink: data.ctaSecondaryLink || '',
      });
      setLeftImagePreview(data.leftImageUrl || '');
      setRightImagePreview(data.rightImageUrl || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hero section details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleLeftImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLeftImageFile(file);
      setLeftImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRightImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRightImageFile(file);
      setRightImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError('');
    setSuccess('');

    const uploadData = new FormData();
    uploadData.append('badgeText', formData.badgeText);
    uploadData.append('title', formData.title);
    uploadData.append('subtitle', formData.subtitle);
    uploadData.append('ctaPrimaryText', formData.ctaPrimaryText);
    uploadData.append('ctaPrimaryLink', formData.ctaPrimaryLink);
    uploadData.append('ctaSecondaryText', formData.ctaSecondaryText);
    uploadData.append('ctaSecondaryLink', formData.ctaSecondaryLink);

    if (leftImageFile) {
      uploadData.append('leftImage', leftImageFile);
    }
    if (rightImageFile) {
      uploadData.append('rightImage', rightImageFile);
    }

    try {
      const response = await api.put('/hero', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Hero Section updated successfully! Realtime users will see updates instantly.');
      
      // Update states from updated response
      const data = response.data;
      setLeftImagePreview(data.leftImageUrl);
      setRightImagePreview(data.rightImageUrl);
      setLeftImageFile(null);
      setRightImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update hero details.');
    } finally {
      setSaveLoading(false);
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
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Hero Section Settings</h1>
        <p className="text-gray-500">Configure visual branding, titles, headings, and main CTA links at the very top of the homepage.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Form Details */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-primary border-b pb-3 flex items-center gap-2">
            <Sparkles className="text-accent" size={20} />
            <span>Content Fields</span>
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

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Badge Text</label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                value={formData.badgeText}
                onChange={(e) => setFormData({...formData, badgeText: e.target.value})}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">Floating badge text (e.g. ✨ WE DESIGN. YOU CELEBRATE.)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Main Heading Title</label>
              <textarea 
                required
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent font-serif"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">HTML is supported (e.g. use &lt;br /&gt; for new line, &lt;span className="text-accent italic font-serif"&gt;Word&lt;/span&gt; for highlighted text)</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Subtitle / Tagline</label>
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">Bulleted features separated by dots (e.g. Weddings • Engagements • Birthdays)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Primary CTA Button Text</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaPrimaryText}
                  onChange={(e) => setFormData({...formData, ctaPrimaryText: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Primary CTA Link</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaPrimaryLink}
                  onChange={(e) => setFormData({...formData, ctaPrimaryLink: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Secondary CTA Button Text</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaSecondaryText}
                  onChange={(e) => setFormData({...formData, ctaSecondaryText: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Secondary CTA Link</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaSecondaryLink}
                  onChange={(e) => setFormData({...formData, ctaSecondaryLink: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={saveLoading}
            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-2 cursor-pointer"
          >
            {saveLoading ? <Loader className="animate-spin" size={20} /> : <Save size={18} />}
            <span>Save Settings</span>
          </button>
        </div>

        {/* Right Side: Split Images Previews */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Left Split Image Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-primary flex items-center gap-2 border-b pb-2">
              <ImageIcon className="text-accent" size={18} />
              <span>Left Background Image (e.g. Wedding)</span>
            </h3>
            
            {leftImagePreview && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border bg-gray-50">
                <img src={leftImagePreview} alt="Left Preview" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Upload New Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleLeftImageChange}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
              />
            </div>
          </div>

          {/* Right Split Image Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-primary flex items-center gap-2 border-b pb-2">
              <ImageIcon className="text-accent" size={18} />
              <span>Right Background Image (e.g. Birthday)</span>
            </h3>
            
            {rightImagePreview && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border bg-gray-50">
                <img src={rightImagePreview} alt="Right Preview" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Upload New Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleRightImageChange}
                className="w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default HeroManagement;
