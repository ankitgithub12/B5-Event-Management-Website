import React, { useState, useEffect, useRef } from 'react';
import {
  Loader, Save, Sparkles, Image as ImageIcon,
  Trash2, Plus, MoveUp, MoveDown, AlertCircle,
} from 'lucide-react';
import api from '../../utils/api';

const MAX_SLIDES = 10;

const HeroManagement = () => {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
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

  const [slides, setSlides] = useState([]); // existing slides from DB
  const [newImageFiles, setNewImageFiles] = useState([]); // new files to upload
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  // ── Fetch current hero data ──────────────────────────────────────────────────
  const fetchHero = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/hero');
      setFormData({
        badgeText: data.badgeText || '',
        title: data.title || '',
        subtitle: data.subtitle || '',
        ctaPrimaryText: data.ctaPrimaryText || '',
        ctaPrimaryLink: data.ctaPrimaryLink || '',
        ctaSecondaryText: data.ctaSecondaryText || '',
        ctaSecondaryLink: data.ctaSecondaryLink || '',
      });
      const sorted = [...(data.slideshowImages || [])].sort((a, b) => a.order - b.order);
      setSlides(sorted);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hero section details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHero(); }, []);

  // ── Handle new images selected ───────────────────────────────────────────────
  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_SLIDES - slides.length - newImageFiles.length;
    const allowed = files.slice(0, remaining);

    setNewImageFiles((prev) => [...prev, ...allowed]);
    const previews = allowed.map((f) => URL.createObjectURL(f));
    setNewImagePreviews((prev) => [...prev, ...previews]);

    // Reset input so same file can be re-selected if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeNewPreview = (idx) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // ── Delete existing slide ────────────────────────────────────────────────────
  const handleDeleteSlide = async (slideId) => {
    if (!window.confirm('Remove this slide image?')) return;
    setDeletingId(slideId);
    setError('');
    try {
      const { data } = await api.delete(`/hero/slide/${slideId}`);
      const sorted = [...(data.slideshowImages || [])].sort((a, b) => a.order - b.order);
      setSlides(sorted);
      setSuccess('Slide removed successfully.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete slide.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Save all text + new images ───────────────────────────────────────────────
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError('');
    setSuccess('');

    const uploadData = new FormData();
    Object.entries(formData).forEach(([k, v]) => uploadData.append(k, v));
    newImageFiles.forEach((f) => uploadData.append('slideshowImages', f));

    try {
      const { data } = await api.put('/hero', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const sorted = [...(data.slideshowImages || [])].sort((a, b) => a.order - b.order);
      setSlides(sorted);
      setNewImageFiles([]);
      setNewImagePreviews([]);
      setSuccess('Hero section updated! Changes are live instantly for all visitors.');
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

  const totalImages = slides.length + newImageFiles.length;

  return (
    <div className="space-y-8 font-body">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Hero Section Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage the homepage hero slideshow images and overlay text content.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ─── Left: Text Fields ─── */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-primary border-b pb-3 flex items-center gap-2">
            <Sparkles className="text-accent" size={20} />
            <span>Content Fields</span>
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-semibold">
              {success}
            </div>
          )}

          <div className="space-y-4">
            {/* Badge Text */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Badge Text</label>
              <input
                type="text" required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">e.g. ✨ WE DESIGN. YOU CELEBRATE.</p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Main Heading Title</label>
              <textarea
                required rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent font-serif"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">
                HTML supported — use &lt;br /&gt; for line break, &lt;span class="text-accent italic font-serif"&gt;Word&lt;/span&gt; for highlight.
              </p>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Subtitle / Tagline</label>
              <input
                type="text" required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1">e.g. Weddings • Engagements • Birthdays</p>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Primary CTA Text</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaPrimaryText} onChange={(e) => setFormData({ ...formData, ctaPrimaryText: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Primary CTA Link</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaPrimaryLink} onChange={(e) => setFormData({ ...formData, ctaPrimaryLink: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Secondary CTA Text</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaSecondaryText} onChange={(e) => setFormData({ ...formData, ctaSecondaryText: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Secondary CTA Link</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.ctaSecondaryLink} onChange={(e) => setFormData({ ...formData, ctaSecondaryLink: e.target.value })} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saveLoading}
            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {saveLoading ? <Loader className="animate-spin" size={20} /> : <Save size={18} />}
            <span>{saveLoading ? 'Saving…' : 'Save Settings'}</span>
          </button>
        </div>

        {/* ─── Right: Slideshow Images ─── */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            {/* Header row */}
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-md font-bold text-primary flex items-center gap-2">
                <ImageIcon className="text-accent" size={18} />
                <span>Slideshow Images</span>
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                totalImages >= MAX_SLIDES
                  ? 'bg-red-50 text-red-500'
                  : 'bg-accent/10 text-accent'
              }`}>
                {totalImages} / {MAX_SLIDES}
              </span>
            </div>

            {/* ── Existing slides grid ── */}
            {slides.length === 0 && newImageFiles.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon size={36} strokeWidth={1} />
                <p className="text-sm">No images yet. Add your first slide below.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {/* Existing saved slides */}
                {slides.map((slide, idx) => (
                  <div key={slide._id} className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-video bg-gray-50">
                    <img
                      src={slide.url}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Order badge */}
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      #{idx + 1}
                    </div>
                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(slide._id)}
                      disabled={deletingId === slide._id}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 active:scale-95 disabled:opacity-60"
                      title="Remove slide"
                    >
                      {deletingId === slide._id
                        ? <Loader size={12} className="animate-spin" />
                        : <Trash2 size={12} />}
                    </button>
                  </div>
                ))}

                {/* New image previews (not yet uploaded) */}
                {newImagePreviews.map((src, idx) => (
                  <div key={`new-${idx}`} className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-accent/50 aspect-video bg-gray-50">
                    <img src={src} alt={`New ${idx + 1}`} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      NEW
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNewPreview(idx)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ── Add Images button ── */}
            {totalImages < MAX_SLIDES && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  id="slideshow-upload"
                  className="hidden"
                  onChange={handleNewImages}
                />
                <label
                  htmlFor="slideshow-upload"
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-accent rounded-2xl py-4 cursor-pointer text-sm text-gray-500 hover:text-accent transition-all duration-200 hover:bg-accent/5 font-semibold"
                >
                  <Plus size={18} />
                  Add Images ({MAX_SLIDES - totalImages} slot{MAX_SLIDES - totalImages !== 1 ? 's' : ''} remaining)
                </label>
              </div>
            )}

            {totalImages >= MAX_SLIDES && (
              <p className="text-xs text-center text-red-400 font-medium">
                Maximum {MAX_SLIDES} slides reached. Delete a slide to add more.
              </p>
            )}

            <p className="text-[10px] text-gray-400 text-center">
              💡 New images are uploaded when you click <strong>Save Settings</strong>. Deleted images are removed instantly.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};

export default HeroManagement;
