import React, { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, X, Loader, ChevronUp, ChevronDown,
  HeartHandshake, ToggleLeft, ToggleRight, AlertCircle
} from 'lucide-react';
import api from '../../utils/api';

const ICON_OPTIONS = [
  'Users', 'Truck', 'Zap', 'Star', 'Utensils', 'Hotel',
  'Bus', 'Shield', 'Settings', 'Monitor', 'HeartHandshake',
  'Sparkles', 'Droplets', 'Megaphone', 'Camera', 'Music',
];

const HospitalityManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const emptyForm = {
    title: '',
    description: '',
    responsibilities: '',
    staff: '',
    icon: 'Users',
    order: 0,
    isActive: true,
  };
  const [formData, setFormData] = useState(emptyForm);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/hospitality');
      setServices(data.sort((a, b) => a.order - b.order));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load hospitality services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  // ── Open modals ────────────────────────────────────────────────────────────
  const openAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ ...emptyForm, order: services.length });
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setShowModal(true);
  };

  const openEdit = (svc) => {
    setIsEditing(true);
    setEditingId(svc._id);
    setFormData({
      title: svc.title,
      description: svc.description,
      responsibilities: (svc.responsibilities || []).join('\n'),
      staff: (svc.staff || []).join('\n'),
      icon: svc.icon || 'Users',
      order: svc.order ?? 0,
      isActive: svc.isActive,
    });
    setImageFile(null);
    setImagePreview(svc.image || '');
    setFormError('');
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Only image files are supported.');
        setImageFile(null);
        setImagePreview('');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormError('File size exceeds the 5MB limit. Please upload a smaller image.');
        setImageFile(null);
        setImagePreview('');
        e.target.value = '';
        return;
      }
      setFormError('');
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('responsibilities', formData.responsibilities);
      uploadData.append('staff', formData.staff);
      uploadData.append('icon', formData.icon);
      uploadData.append('order', formData.order);
      uploadData.append('isActive', formData.isActive);

      if (imageFile) {
        uploadData.append('image', imageFile);
      }

      if (isEditing) {
        await api.put(`/hospitality/${editingId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/hospitality', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setShowModal(false);
      setSuccessMsg(isEditing ? 'Service updated successfully!' : 'Service added successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchServices();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save service');
    } finally {
      setFormLoading(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this hospitality service?')) return;
    try {
      await api.delete(`/hospitality/${id}`);
      setSuccessMsg('Service deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete service');
    }
  };

  // ── Toggle Active ──────────────────────────────────────────────────────────
  const toggleActive = async (svc) => {
    try {
      await api.put(`/hospitality/${svc._id}`, { isActive: !svc.isActive });
      fetchServices();
    } catch {
      alert('Failed to update status');
    }
  };

  // ── Reorder (move up/down) ─────────────────────────────────────────────────
  const moveOrder = async (svc, direction) => {
    const sorted = [...services].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex(s => s._id === svc._id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const swapTarget = sorted[swapIdx];
    try {
      await Promise.all([
        api.put(`/hospitality/${svc._id}`, { order: swapTarget.order }),
        api.put(`/hospitality/${swapTarget._id}`, { order: svc.order }),
      ]);
      fetchServices();
    } catch {
      alert('Failed to reorder');
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
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Hospitality Services</h1>
          <p className="text-gray-500 mt-1">Manage the core crew & hospitality services displayed on the Hospitality page.</p>
        </div>
        <button
          onClick={openAdd}
          className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 shadow-md rounded-full px-5 py-2.5 transition-all cursor-pointer"
        >
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-semibold">
          {successMsg}
        </div>
      )}

      {/* Stats bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-6 items-center text-sm font-semibold text-gray-500">
        <span>Total: <span className="text-primary">{services.length}</span></span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>Active: <span className="text-green-600">{services.filter(s => s.isActive).length}</span></span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>Hidden: <span className="text-gray-400">{services.filter(s => !s.isActive).length}</span></span>
      </div>

      {/* ── Table ── */}
      {services.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <HeartHandshake className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-bold text-primary mb-1">No services yet</h3>
          <p className="text-gray-500 text-sm">Add your first hospitality service using the button above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">Order</th>
                <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Icon</th>
                <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Responsibilities</th>
                <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((svc, idx) => (
                <tr key={svc._id} className={`hover:bg-gray-50 transition-colors ${!svc.isActive ? 'opacity-60' : ''}`}>
                  {/* Order controls */}
                  <td className="py-3 px-5">
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveOrder(svc, 'up')}
                        disabled={idx === 0}
                        className="text-gray-400 hover:text-accent disabled:opacity-30 cursor-pointer disabled:cursor-default"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <span className="text-xs text-center text-gray-500 font-bold">{idx + 1}</span>
                      <button
                        onClick={() => moveOrder(svc, 'down')}
                        disabled={idx === services.length - 1}
                        className="text-gray-400 hover:text-accent disabled:opacity-30 cursor-pointer disabled:cursor-default"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </td>

                  {/* Icon */}
                  <td className="py-3 px-5">
                    <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-lg">
                      {svc.icon || 'Users'}
                    </span>
                  </td>

                  {/* Image */}
                  <td className="py-3 px-5">
                    {svc.image ? (
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-12 h-8 rounded object-cover border border-gray-100"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 italic">No image</span>
                    )}
                  </td>

                  {/* Title */}
                  <td className="py-3 px-5">
                    <p className="font-bold text-sm text-gray-900 line-clamp-1">{svc.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{svc.description}</p>
                  </td>

                  {/* Responsibilities */}
                  <td className="py-3 px-5 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(svc.responsibilities || []).slice(0, 3).map((r, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">{r}</span>
                      ))}
                      {(svc.responsibilities || []).length > 3 && (
                        <span className="bg-gray-100 text-gray-400 text-[10px] px-2 py-0.5 rounded-full">
                          +{svc.responsibilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status toggle */}
                  <td className="py-3 px-5">
                    <button
                      onClick={() => toggleActive(svc)}
                      className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    >
                      {svc.isActive ? (
                        <>
                          <ToggleRight size={20} className="text-accent" />
                          <span className="text-green-600">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={20} className="text-gray-400" />
                          <span className="text-gray-400">Hidden</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(svc)}
                        className="p-1.5 text-gray-500 hover:text-accent border border-gray-200 rounded-lg hover:border-accent transition-colors bg-white cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(svc._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 border border-gray-200 rounded-lg hover:border-red-600 transition-colors bg-white cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">
              {isEditing ? 'Edit Hospitality Service' : 'Add New Hospitality Service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
                  {formError}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Service Title *</label>
                <input
                  type="text" required
                  placeholder="e.g. Guest Hospitality & Reception"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Description *</label>
                <textarea
                  required rows={3}
                  placeholder="Brief description of this hospitality service..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">
                  Responsibilities <span className="text-gray-400 normal-case font-normal">(one per line)</span>
                </label>
                <textarea
                  rows={5}
                  placeholder={"Welcome desk / registration\nGuest greeting\nCheck-in & badge distribution"}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none font-mono"
                  value={formData.responsibilities}
                  onChange={e => setFormData({ ...formData, responsibilities: e.target.value })}
                />
              </div>

              {/* Staff */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">
                  Staff / Team Roles <span className="text-gray-400 normal-case font-normal">(one per line, optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder={"Hosts/Hostesses\nReception executives"}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none font-mono"
                  value={formData.staff}
                  onChange={e => setFormData({ ...formData, staff: e.target.value })}
                />
              </div>

              {/* Icon + Order + Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Icon</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.icon}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                  >
                    {ICON_OPTIONS.map(ico => (
                      <option key={ico} value={ico}>{ico}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Display Order</label>
                  <input
                    type="number" min={0}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Status</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={e => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Hospitality Image (Optional)</label>
                <div className="flex items-center gap-4 mt-1">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-10 rounded object-cover border border-accent/25"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                  />
                </div>
                {imageFile && (
                  <p className="text-xs text-green-600 font-semibold mt-1.5 ml-1">
                    ✓ Selected: {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)} MB / 5.00 MB used)
                  </p>
                )}
                <p className="text-[10px] text-gray-400 mt-1 ml-1">
                  Supports JPG, PNG, WEBP. If not uploaded, the card will display a solid gradient.
                </p>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {formLoading ? <Loader className="animate-spin" size={20} /> : isEditing ? 'Save Changes' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalityManagement;
