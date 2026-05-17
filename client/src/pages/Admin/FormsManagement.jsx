import React, { useState, useEffect } from 'react';
import { Mail, MailRead, Trash2, Search, Filter, X, Loader, MessageSquare, Phone } from 'lucide-react';
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
    if (!window.confirm('Delete this form entry permanent from database?')) return;
    try {
      await api.delete(`/forms/${id}`);
      setSelectedForm(null);
      fetchForms();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete form entry');
    }
  };

  const filteredForms = forms.filter((form) => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          form.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (form.message && form.message.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || form.status === statusFilter;
    const matchesType = typeFilter === 'all' || form.formType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-8 font-body">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Inquiries & Leads Inbox</h1>
        <p className="text-gray-500">Track and respond to website queries and custom planner requests.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
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

        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto items-center">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select 
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
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
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Form Types</option>
            <option value="Contact">Contact Inquiry</option>
            <option value="CustomPlanner">Custom Planner Form</option>
          </select>
        </div>
      </div>

      {/* Leads Table or Cards */}
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border focus:outline-none ${
                          form.status === 'New' ? 'bg-red-50 text-red-600 border-red-200' :
                          form.status === 'Read' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                          'bg-green-50 text-green-600 border-green-200'
                        }`}
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
      )}

      {/* Details Modal */}
      {selectedForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative shadow-2xl border border-gray-100">
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
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm text-gray-700 max-h-48 overflow-y-auto leading-relaxed">
                {selectedForm.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Status:</span>
                <select 
                  className={`text-xs font-medium rounded-full px-2.5 py-1 border focus:outline-none ${
                    selectedForm.status === 'New' ? 'bg-red-50 text-red-600 border-red-200' :
                    selectedForm.status === 'Read' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                    'bg-green-50 text-green-600 border-green-200'
                  }`}
                  value={selectedForm.status}
                  onChange={(e) => handleUpdateStatus(selectedForm._id, e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
              </div>

              <div className="flex gap-2">
                <a 
                  href={`mailto:${selectedForm.email}?subject=RE: BE5 Inquiry`}
                  className="btn bg-primary hover:bg-primary-light text-white text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
                >
                  Reply Email
                </a>
                <button 
                  onClick={() => handleDelete(selectedForm._id)}
                  className="btn border border-red-200 text-red-600 hover:bg-red-50 text-xs px-4 py-2 rounded-xl"
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
