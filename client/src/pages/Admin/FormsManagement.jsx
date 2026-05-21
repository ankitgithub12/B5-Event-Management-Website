import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Search, Filter, X, Loader, MessageSquare, Phone } from 'lucide-react';
import api from '../../utils/api';

const FormsManagement = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Detail Modal state
  const [selectedForm, setSelectedForm] = useState(null);

  const fetchForms = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/forms');
      setForms(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch lead inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/forms/${id}`, { status });
      // Update locally
      setForms(prev => prev.map(form => form._id === id ? { ...form, status } : form));
      if (selectedForm && selectedForm._id === id) {
        setSelectedForm(prev => ({ ...prev, status }));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this form entry permanently from database?')) return;
    try {
      await api.delete(`/forms/${id}`);
      setSelectedForm(null);
      fetchForms();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete form entry');
    }
  };

  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          form.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (form.message && form.message.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || form.status === statusFilter;
    const matchesType = typeFilter === 'all' || form.formType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusBadge = (status) => {
    const map = {
      'New': 'bg-red-50 text-red-600 border-red-200',
      'Read': 'bg-yellow-50 text-yellow-600 border-yellow-200',
      'Replied': 'bg-green-50 text-green-600 border-green-200',
    };
    return map[status] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <div className="space-y-6 md:space-y-8 font-body">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">Inquiries & Leads Inbox</h1>
        <p className="text-gray-500 text-sm md:text-base">Track and respond to website queries and custom planner requests.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3 md:p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3 md:space-y-0 md:flex md:gap-4 md:justify-between md:items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search leads name or message..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto items-center">
          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <Filter size={16} className="text-gray-400 hidden md:block" />
            <select 
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none w-full md:w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="New">New / Unread</option>
              <option value="Read">Read</option>
              <option value="Replied">Replied</option>
            </select>
          </div>

          <select 
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none flex-1 md:flex-none md:w-auto"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Contact">Contact</option>
            <option value="CustomPlanner">Custom Planner</option>
          </select>
        </div>
      </div>

      {/* Leads Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-accent" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : filteredForms.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-bold text-primary mb-1">Your inbox is clear!</h3>
          <p className="text-gray-500 text-sm">No new inquiries or lead planner submissions at this time.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table — hidden on mobile */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Form Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Snippet</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredForms.map((form) => (
                    <tr 
                      key={form._id} 
                      className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                        form.status === 'New' ? 'font-semibold bg-blue-50/10' : ''
                      }`}
                      onClick={() => setSelectedForm(form)}
                    >
                      <td className="px-6 py-4">
                        <p className="text-gray-900 text-sm">{form.name}</p>
                        <p className="text-gray-500 text-xs">{form.email}</p>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full ${
                          form.formType === 'CustomPlanner' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {form.formType === 'CustomPlanner' ? 'Custom Planner' : 'Contact Us'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                        {form.message}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {new Date(form.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select 
                          className={`text-xs font-medium rounded-full px-2.5 py-1 border focus:outline-none ${statusBadge(form.status)}`}
                          value={form.status}
                          onChange={(e) => handleUpdateStatus(form._id, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Read">Read</option>
                          <option value="Replied">Replied</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleDelete(form._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards — shown only on mobile */}
          <div className="md:hidden space-y-3">
            {filteredForms.map((form) => (
              <div
                key={form._id}
                className={`bg-white rounded-2xl p-4 border shadow-sm transition-all active:scale-[0.99] cursor-pointer ${
                  form.status === 'New' ? 'border-accent/30 bg-accent/[0.02]' : 'border-gray-100'
                }`}
                onClick={() => setSelectedForm(form)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{form.name}</p>
                    <p className="text-xs text-gray-500 truncate">{form.email}</p>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ml-2 ${
                    form.formType === 'CustomPlanner' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.formType === 'CustomPlanner' ? 'Planner' : 'Contact'}
                  </span>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 mb-3">{form.message}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{new Date(form.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <select 
                      className={`text-[11px] font-medium rounded-full px-2 py-0.5 border focus:outline-none ${statusBadge(form.status)}`}
                      value={form.status}
                      onChange={(e) => handleUpdateStatus(form._id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>
                    <button 
                      onClick={() => handleDelete(form._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Details Modal */}
      {selectedForm && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4 animate-fadeIn">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg p-5 md:p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                if (selectedForm.status === 'New') {
                  handleUpdateStatus(selectedForm._id, 'Read');
                }
                setSelectedForm(null);
              }}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Drag indicator for mobile */}
            <div className="md:hidden w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            <span className="text-[10px] uppercase font-bold text-accent tracking-wider bg-accent/5 px-2.5 py-0.5 rounded-full inline-block mb-3">
              {selectedForm.formType === 'CustomPlanner' ? 'Custom Planner Submission' : 'Contact Submission'}
            </span>

            <h3 className="text-xl font-heading font-bold text-primary mb-1">{selectedForm.name}</h3>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Mail size={12} />
                <a href={`mailto:${selectedForm.email}`} className="hover:underline text-accent">{selectedForm.email}</a>
              </span>
              {selectedForm.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} />
                  <span>{selectedForm.phone}</span>
                </span>
              )}
            </div>

            {selectedForm.subject && (
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</h5>
                <p className="text-sm font-bold text-gray-800">{selectedForm.subject}</p>
              </div>
            )}

            <div className="mb-6">
              <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Message Detail</h5>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm text-gray-700 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                {selectedForm.message}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Status:</span>
                <select 
                  className={`text-xs font-medium rounded-full px-2.5 py-1 border focus:outline-none ${statusBadge(selectedForm.status)}`}
                  value={selectedForm.status}
                  onChange={(e) => handleUpdateStatus(selectedForm._id, e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <a 
                  href={`mailto:${selectedForm.email}?subject=RE: B5 Inquiry`}
                  className="btn bg-primary hover:bg-primary-light text-white text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 flex-1 sm:flex-none justify-center"
                >
                  Reply Email
                </a>
                <button 
                  onClick={() => handleDelete(selectedForm._id)}
                  className="btn border border-red-200 text-red-600 hover:bg-red-50 text-xs px-4 py-2 rounded-xl flex-1 sm:flex-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsManagement;
