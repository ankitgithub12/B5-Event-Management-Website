import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader, ToggleLeft, ToggleRight, Users, Award, ShieldAlert, Globe, GripVertical } from 'lucide-react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import api from '../../utils/api';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'mastermind', 'lead', 'inactive'

  // Modals / Forms state
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    type: 'mastermind', // 'mastermind' or 'lead'
    specialty: '',
    events: '',
    instagramUrl: '',
    linkedinUrl: '',
    isActive: true,
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/team');
      const sorted = response.data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setTeamMembers(sorted);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      type: 'mastermind',
      specialty: '',
      events: '',
      instagramUrl: '',
      linkedinUrl: '',
      isActive: true,
      order: 0,
    });
    setImageFile(null);
    setFormError('');
    setShowFormModal(true);
  };

  const openEditModal = (member) => {
    setIsEditing(true);
    setEditingId(member._id);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      type: member.type || 'mastermind',
      specialty: member.specialty || '',
      events: member.events || '',
      instagramUrl: member.instagramUrl || '',
      linkedinUrl: member.linkedinUrl || '',
      isActive: member.isActive,
      order: member.order !== undefined ? member.order : 0,
    });
    setImageFile(null);
    setFormError('');
    setShowFormModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Only image files (JPEG, JPG, PNG, WEBP) are supported.');
        setImageFile(null);
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormError('File size exceeds the 5MB limit. Please upload a smaller image.');
        setImageFile(null);
        e.target.value = '';
        return;
      }
      setFormError('');
      setImageFile(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    // Form data preparation
    const uploadData = new FormData();
    uploadData.append('name', formData.name);
    uploadData.append('role', formData.role);
    uploadData.append('bio', formData.bio);
    uploadData.append('type', formData.type);
    uploadData.append('isActive', formData.isActive);
    uploadData.append('instagramUrl', formData.instagramUrl);
    uploadData.append('linkedinUrl', formData.linkedinUrl);
    uploadData.append('order', formData.order !== undefined ? formData.order : 0);

    if (formData.type === 'mastermind') {
      uploadData.append('specialty', formData.specialty);
      uploadData.append('events', formData.events);
    } else {
      uploadData.append('specialty', '');
      uploadData.append('events', '');
    }

    if (imageFile) {
      uploadData.append('image', imageFile);
    } else if (!isEditing) {
      setFormError('Please select a profile picture.');
      setFormLoading(false);
      return;
    }

    try {
      if (isEditing) {
        await api.put(`/team/${editingId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/team', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setShowFormModal(false);
      fetchTeamMembers();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save team member');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      await api.delete(`/team/${id}`);
      fetchTeamMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete team member');
    }
  };

  const toggleMemberStatus = async (member) => {
    try {
      await api.put(`/team/${member._id}`, {
        isActive: !member.isActive,
      });
      fetchTeamMembers();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Drag and Drop States and Handlers
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    if (!e.target.closest('.drag-handle')) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reorderedList = [...filteredMembers];
    const [draggedItem] = reorderedList.splice(draggedIndex, 1);
    reorderedList.splice(targetIndex, 0, draggedItem);

    const orderedIds = reorderedList.map(m => m._id);

    // Optimistically update local UI state
    const updatedTeamMembers = teamMembers.map(member => {
      const idxInReordered = orderedIds.indexOf(member._id);
      if (idxInReordered !== -1) {
        return { ...member, order: idxInReordered };
      }
      return member;
    }).sort((a, b) => (a.order || 0) - (b.order || 0));

    setTeamMembers(updatedTeamMembers);

    try {
      await api.put('/team/reorder', { orderedIds });
    } catch (err) {
      alert('Failed to save the new order.');
      fetchTeamMembers();
    }
  };

  // Filter & Search Logic
  const filteredMembers = teamMembers.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bio.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'mastermind') return matchesSearch && m.type === 'mastermind' && m.isActive;
    if (activeTab === 'lead') return matchesSearch && m.type === 'lead' && m.isActive;
    if (activeTab === 'inactive') return matchesSearch && !m.isActive;
    return matchesSearch;
  });

  return (
    <div className="space-y-8 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Team & Planners</h1>
          <p className="text-gray-500">Manage homepage masterminds and contact page lead planners.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
        >
          <Plus size={18} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Filter Tabs and Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Members' },
            { id: 'mastermind', label: 'Masterminds (Home)' },
            { id: 'lead', label: 'Lead Planners (Contact)' },
            { id: 'inactive', label: 'Inactive / Drafts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, role..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Reordering helper instruction */}
      <div className="text-xs text-gray-500 bg-amber-50/50 border border-amber-100/50 rounded-xl px-4 py-2.5 flex items-center gap-2 max-w-fit shadow-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <span className="text-gray-600 font-medium">Tip: You can drag and drop team profiles by their <strong># Order</strong> handle to customize their display sequence.</span>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-accent" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <Users className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-bold text-primary mb-1">No team members found</h3>
          <p className="text-gray-500 text-sm">Add a new team member to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => {
            const isDragged = draggedIndex === index;
            const isOver = dragOverIndex === index;
            return (
              <div 
                key={member._id} 
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, index)}
                className={`bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                  isDragged ? 'opacity-30 border-dashed border-accent border-2 scale-95' : isOver ? 'border-accent bg-accent/5 scale-[1.01]' : 'border-gray-100'
                } ${
                  !member.isActive ? 'opacity-70 bg-gray-50/50' : ''
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="h-56 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <Users className="text-accent/30" size={48} />
                    )}

                    {/* Drag Handle & Order Badge */}
                    <div className="drag-handle absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 text-gray-700 px-2.5 py-1.5 rounded-xl shadow-sm text-[11px] font-bold select-none cursor-grab active:cursor-grabbing hover:bg-white transition-all hover:scale-105 z-10">
                      <GripVertical size={13} className="text-gray-400" />
                      <span>#{member.order || 0}</span>
                    </div>
                    
                    {/* Category Badge */}
                    <span className={`absolute bottom-4 left-4 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full z-10 ${
                      member.type === 'mastermind' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {member.type === 'mastermind' ? 'Mastermind (Home)' : 'Lead Planner (Contact)'}
                    </span>

                    {/* Active Status Badge */}
                    <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                {/* Card Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                    <p className="text-xs font-bold text-accent tracking-wider uppercase mt-0.5">{member.role}</p>
                  </div>
                  
                  <p className="text-gray-500 text-sm line-clamp-3 min-h-[60px]">{member.bio}</p>
                  
                  {member.type === 'mastermind' && (
                    <div className="pt-2 flex flex-col gap-1 border-t border-gray-50">
                      {member.specialty && (
                        <div className="text-xs text-gray-600 flex items-center gap-1.5">
                          <Award size={13} className="text-accent" />
                          <span><strong>Specialty:</strong> {member.specialty}</span>
                        </div>
                      )}
                      {member.events && (
                        <div className="text-xs text-gray-600 flex items-center gap-1.5">
                          <Globe size={13} className="text-accent" />
                          <span><strong>Track Record:</strong> {member.events}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Social links indicators */}
                  {(member.instagramUrl || member.linkedinUrl) && (
                    <div className="flex gap-2.5 pt-1.5 text-gray-400">
                      {member.instagramUrl && (
                        <a href={member.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                          <FaInstagram size={16} />
                        </a>
                      )}
                      {member.linkedinUrl && (
                        <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                          <FaLinkedin size={16} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <button 
                  onClick={() => toggleMemberStatus(member)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                >
                  {member.isActive ? (
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
                    onClick={() => openEditModal(member)}
                    className="p-1.5 text-gray-500 hover:text-accent transition-colors border border-gray-200 rounded-lg hover:border-accent cursor-pointer bg-white"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button 
                    onClick={() => handleDelete(member._id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors border border-gray-200 rounded-lg hover:border-red-600 cursor-pointer bg-white"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
              );
            })}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowFormModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">
              {isEditing ? 'Modify Team Profile' : 'Register Team Member'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Role / Job Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Lead Decor Designer"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Category / Section</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="mastermind">Mastermind (Home Page)</option>
                    <option value="lead">Lead Planner (Contact Page)</option>
                  </select>
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

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Display Order</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Biography</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Tell clients about their expertise, experience, and style..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>

              {formData.type === 'mastermind' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="sm:col-span-2">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-2">Mastermind Profile Info</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Specialty</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Weddings & Theming"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                      value={formData.specialty}
                      onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Events count / Record</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 200+ events"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                      value={formData.events}
                      onChange={(e) => setFormData({...formData, events: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Instagram URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://instagram.com/username"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">LinkedIn URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://linkedin.com/in/username"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Profile Picture</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light cursor-pointer"
                />
                {imageFile && (
                  <p className="text-xs text-green-600 font-semibold mt-1.5 ml-1">
                    ✓ Selected: {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)} MB / 5.00 MB used)
                  </p>
                )}
                <p className="text-[10px] text-gray-400 mt-1 ml-1">
                  {isEditing 
                    ? 'Upload a new picture only if you want to replace the current one. Direct Cloudinary integration. Max size: 5MB.' 
                    : 'Upload a picture (JPEG, PNG, WebP) to complete the profile. Direct Cloudinary integration. Max size: 5MB.'}
                </p>
              </div>

              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {formLoading ? <Loader className="animate-spin" size={20} /> : isEditing ? 'Save Changes' : 'Publish Profile'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
