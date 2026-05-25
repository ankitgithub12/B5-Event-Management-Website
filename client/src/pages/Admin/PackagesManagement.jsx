import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader, ToggleLeft, ToggleRight, Gift, Tag, Check, Sparkles } from 'lucide-react';
import api from '../../utils/api';

const PackagesManagement = () => {
  const [packages, setPackages] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Navigation & Search State
  const [activeSubTab, setActiveSubTab] = useState('packages'); // 'packages' or 'addons'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showAddonModal, setShowAddonModal] = useState(false);
  
  // Package Form state
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [packageFormData, setPackageFormData] = useState({
    name: '',
    description: '',
    price: '',
    popular: false,
    isActive: true,
  });
  const [packageFeatures, setPackageFeatures] = useState([]); // Array of { name, included }
  const [newFeatureText, setNewFeatureText] = useState('');

  // Addon Form state
  const [isEditingAddon, setIsEditingAddon] = useState(false);
  const [editingAddonId, setEditingAddonId] = useState(null);
  const [addonFormData, setAddonFormData] = useState({
    name: '',
    price: '',
    description: '',
    isActive: true,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [packagesRes, addonsRes] = await Promise.all([
        api.get('/packages'),
        api.get('/packages/addons')
      ]);
      setPackages(packagesRes.data);
      setAddons(addonsRes.data);
    } catch (err) {
      setError('Failed to fetch packages or addons.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Package Form Actions
  const openAddPackageModal = () => {
    setIsEditingPackage(false);
    setEditingPackageId(null);
    setPackageFormData({
      name: '',
      description: '',
      price: '',
      popular: false,
      isActive: true,
    });
    setPackageFeatures([
      { name: 'Venue & Decoration', included: true },
      { name: 'Standard Photography', included: true },
      { name: 'Catering Services', included: true },
      { name: 'Entertainment & DJ', included: false },
    ]);
    setNewFeatureText('');
    setFormError('');
    setShowPackageModal(true);
  };

  const openEditPackageModal = (pkg) => {
    setIsEditingPackage(true);
    setEditingPackageId(pkg._id);
    setPackageFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      popular: pkg.popular || false,
      isActive: pkg.isActive,
    });
    setPackageFeatures(pkg.features || []);
    setNewFeatureText('');
    setFormError('');
    setShowPackageModal(true);
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!newFeatureText.trim()) return;
    setPackageFeatures([...packageFeatures, { name: newFeatureText.trim(), included: true }]);
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index) => {
    setPackageFeatures(packageFeatures.filter((_, i) => i !== index));
  };

  const handleToggleFeatureIncluded = (index) => {
    setPackageFeatures(
      packageFeatures.map((feat, i) => 
        i === index ? { ...feat, included: !feat.included } : feat
      )
    );
  };

  const handlePackageFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    const payload = {
      ...packageFormData,
      features: packageFeatures,
    };

    try {
      if (isEditingPackage) {
        await api.put(`/packages/${editingPackageId}`, payload);
      } else {
        await api.post('/packages', payload);
      }
      setShowPackageModal(false);
      fetchData();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save package');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event package?')) return;
    try {
      await api.delete(`/packages/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete package');
    }
  };

  const togglePackageStatus = async (pkg) => {
    try {
      await api.put(`/packages/${pkg._id}`, {
        isActive: !pkg.isActive,
      });
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Addon Form Actions
  const openAddAddonModal = () => {
    setIsEditingAddon(false);
    setEditingAddonId(null);
    setAddonFormData({
      name: '',
      price: '',
      description: '',
      isActive: true,
    });
    setFormError('');
    setShowAddonModal(true);
  };

  const openEditAddonModal = (addon) => {
    setIsEditingAddon(true);
    setEditingAddonId(addon._id);
    setAddonFormData({
      name: addon.name,
      price: addon.price,
      description: addon.description,
      isActive: addon.isActive,
    });
    setFormError('');
    setShowAddonModal(true);
  };

  const handleAddonFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      if (isEditingAddon) {
        await api.put(`/packages/addons/${editingAddonId}`, addonFormData);
      } else {
        await api.post('/packages/addons', addonFormData);
      }
      setShowAddonModal(false);
      fetchData();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save addon');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAddon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this addon service?')) return;
    try {
      await api.delete(`/packages/addons/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete addon');
    }
  };

  const toggleAddonStatus = async (addon) => {
    try {
      await api.put(`/packages/addons/${addon._id}`, {
        isActive: !addon.isActive,
      });
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Filtering
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAddons = addons.filter((addon) =>
    addon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    addon.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Packages & Add-ons</h1>
          <p className="text-gray-500">Configure curated pricing packages and customer-selectable service add-ons.</p>
        </div>
        
        {activeSubTab === 'packages' ? (
          <button 
            onClick={openAddPackageModal}
            className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
          >
            <Plus size={18} />
            <span>Add Event Package</span>
          </button>
        ) : (
          <button 
            onClick={openAddAddonModal}
            className="btn bg-accent text-white hover:bg-accent-hover flex items-center gap-2 cursor-pointer shadow-md rounded-full px-5 py-2.5 transition-all"
          >
            <Plus size={18} />
            <span>Add Add-on Service</span>
          </button>
        )}
      </div>

      {/* Tab Switcher & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => { setActiveSubTab('packages'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeSubTab === 'packages'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Gift size={14} />
            <span>Curated Packages ({packages.length})</span>
          </button>
          <button
            onClick={() => { setActiveSubTab('addons'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeSubTab === 'addons'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Tag size={14} />
            <span>Signature Add-ons ({addons.length})</span>
          </button>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder={activeSubTab === 'packages' ? "Search packages..." : "Search add-ons..."}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-accent" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : activeSubTab === 'packages' ? (
        /* Curated Packages Render */
        filteredPackages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <Gift className="mx-auto mb-4 text-gray-300" size={48} />
            <h3 className="text-lg font-bold text-primary mb-1">No packages found</h3>
            <p className="text-gray-500 text-sm">Create a curated packages plan to display on the pricing page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPackages.map((pkg) => (
              <div 
                key={pkg._id} 
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between transition-all hover:shadow-md ${
                  !pkg.isActive ? 'opacity-70 bg-gray-50/50' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        {pkg.name}
                        {pkg.popular && (
                          <span className="bg-amber-100 text-amber-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-200">
                            Popular
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-accent font-bold mt-1">Pricing: {pkg.price}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {pkg.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{pkg.description}</p>

                  <div className="border-t border-gray-50 pt-4 mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Package Features Checklist ({pkg.features?.length || 0})</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {pkg.features?.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          {feat.included ? (
                            <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0">✓</span>
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold shrink-0">✗</span>
                          )}
                          <span className={feat.included ? 'font-medium' : 'text-gray-400 line-through'}>{feat.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                  <button 
                    onClick={() => togglePackageStatus(pkg)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                  >
                    {pkg.isActive ? (
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
                      onClick={() => openEditPackageModal(pkg)}
                      className="p-1.5 text-gray-500 hover:text-accent transition-colors border border-gray-200 rounded-lg hover:border-accent cursor-pointer bg-white"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button 
                      onClick={() => handleDeletePackage(pkg._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors border border-gray-200 rounded-lg hover:border-red-600 cursor-pointer bg-white"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Ala-Carte Add-ons Render */
        filteredAddons.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <Tag className="mx-auto mb-4 text-gray-300" size={48} />
            <h3 className="text-lg font-bold text-primary mb-1">No add-ons found</h3>
            <p className="text-gray-500 text-sm">Create a signature add-on to display on the pricing page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAddons.map((addon) => (
              <div 
                key={addon._id} 
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between transition-all hover:shadow-md ${
                  !addon.isActive ? 'opacity-70 bg-gray-50/50' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-primary flex items-center gap-1.5">
                        <Sparkles size={16} className="text-accent" />
                        {addon.name}
                      </h3>
                      <p className="text-xs font-bold text-accent tracking-wide uppercase mt-0.5">{addon.price}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      addon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {addon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{addon.description}</p>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                  <button 
                    onClick={() => toggleAddonStatus(addon)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                  >
                    {addon.isActive ? (
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
                      onClick={() => openEditAddonModal(addon)}
                      className="p-1.5 text-gray-500 hover:text-accent transition-colors border border-gray-200 rounded-lg hover:border-accent cursor-pointer bg-white"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button 
                      onClick={() => handleDeleteAddon(addon._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors border border-gray-200 rounded-lg hover:border-red-600 cursor-pointer bg-white"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Package Form Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowPackageModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">
              {isEditingPackage ? 'Modify Event Package' : 'Create Event Package'}
            </h3>

            <form onSubmit={handlePackageFormSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Package Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Dream Destination Wedding"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={packageFormData.name}
                  onChange={(e) => setPackageFormData({...packageFormData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Pricing Display</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. ₹20-25 Lakhs or Custom"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={packageFormData.price}
                    onChange={(e) => setPackageFormData({...packageFormData, price: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Status</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={packageFormData.isActive ? 'true' : 'false'}
                    onChange={(e) => setPackageFormData({...packageFormData, isActive: e.target.value === 'true'})}
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Inactive (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Description</label>
                <textarea 
                  required
                  rows={2}
                  placeholder="Summarize the core target audience and tier scope..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  value={packageFormData.description}
                  onChange={(e) => setPackageFormData({...packageFormData, description: e.target.value})}
                />
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-2.5 px-1 py-1">
                <input 
                  type="checkbox"
                  id="popularCheck"
                  className="w-4.5 h-4.5 accent-accent cursor-pointer"
                  checked={packageFormData.popular}
                  onChange={(e) => setPackageFormData({...packageFormData, popular: e.target.checked})}
                />
                <label htmlFor="popularCheck" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Mark as **Most Popular** package (highlights with themed background)
                </label>
              </div>

              {/* Features List Editor */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Inclusions Checklist Builder</p>
                
                {/* Checklist Add */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter feature (e.g. Drone Cinematography)"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-accent"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddFeature(e); }}
                  />
                  <button 
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 bg-primary text-white text-xs font-bold rounded-xl hover:bg-[#3d2745] transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Checklist Render */}
                <div className="max-h-44 overflow-y-auto space-y-1.5 mt-2 pr-1">
                  {packageFeatures.length === 0 ? (
                    <p className="text-[11px] text-gray-400 italic text-center py-2">No features added yet. Add some items above.</p>
                  ) : (
                    packageFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-gray-100 text-xs">
                        <div className="flex items-center gap-2 flex-1">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatureIncluded(idx)}
                            className={`w-5 h-5 rounded flex items-center justify-center font-bold border transition-all cursor-pointer ${
                              feat.included 
                                ? 'bg-green-500 border-green-600 text-white' 
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                          >
                            {feat.included ? '✓' : '✗'}
                          </button>
                          <input 
                            type="text"
                            required
                            className="bg-transparent border-0 p-0 text-xs font-medium text-gray-700 focus:outline-none flex-1"
                            value={feat.name}
                            onChange={(e) => {
                              const updated = [...packageFeatures];
                              updated[idx].name = e.target.value;
                              setPackageFeatures(updated);
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-red-400 hover:text-red-600 font-bold px-1.5 cursor-pointer text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {formLoading ? <Loader className="animate-spin" size={20} /> : isEditingPackage ? 'Save Changes' : 'Publish Package'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Addon Form Modal */}
      {showAddonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddonModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-heading font-bold text-primary mb-6">
              {isEditingAddon ? 'Modify Add-on Service' : 'Create Add-on Service'}
            </h3>

            <form onSubmit={handleAddonFormSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Service Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Drone Cinematography"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  value={addonFormData.name}
                  onChange={(e) => setAddonFormData({...addonFormData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Est. Price</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. ₹25,000"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={addonFormData.price}
                    onChange={(e) => setAddonFormData({...addonFormData, price: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Status</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    value={addonFormData.isActive ? 'true' : 'false'}
                    onChange={(e) => setAddonFormData({...addonFormData, isActive: e.target.value === 'true'})}
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Inactive (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 ml-1">Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="e.g. 4K aerial shots of your venue and ceremony."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                  value={addonFormData.description}
                  onChange={(e) => setAddonFormData({...addonFormData, description: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={formLoading}
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-6 flex items-center justify-center"
              >
                {formLoading ? <Loader className="animate-spin" size={20} /> : isEditingAddon ? 'Save Changes' : 'Publish Add-on'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesManagement;
