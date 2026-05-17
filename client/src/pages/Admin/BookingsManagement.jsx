import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, Trash2, X, Loader, Calendar, Users, DollarSign, Sparkles } from 'lucide-react';
import api from '../../utils/api';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [tempAmount, setTempAmount] = useState('');
  const [tempStatus, setTempStatus] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleOpenDetail = (booking) => {
    setSelectedBooking(booking);
    setTempAmount(booking.amount || '');
    setTempStatus(booking.status);
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const response = await api.put(`/bookings/${selectedBooking._id}`, {
        status: tempStatus,
        amount: tempAmount ? parseFloat(tempAmount) : undefined
      });
      
      // Update local state
      setBookings(prev => prev.map(bk => bk._id === selectedBooking._id ? response.data : bk));
      setSelectedBooking(response.data);
      alert('Booking preserved successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update booking');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete booking');
    }
  };

  const filteredBookings = bookings.filter((bk) => {
    const matchesSearch = bk.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bk.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bk.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bk._id.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || bk.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 font-body">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Bookings Inbox</h1>
        <p className="text-gray-500">Track client event requests, establish pricing, and update planning status.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search bookings by name or event type..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase">Status:</span>
          <select 
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Bookings</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Display Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="animate-spin text-accent" size={40} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <Sparkles className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-bold text-primary mb-1">No bookings found</h3>
          <p className="text-gray-500 text-sm">When clients request booking planner forms, they will show up here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Info</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Charge / Est.</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((bk) => (
                  <tr 
                    key={bk._id} 
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => handleOpenDetail(bk)}
                  >
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-primary">
                      #{bk._id.substring(bk._id.length - 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 text-sm">{bk.clientName}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{bk.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 text-sm font-semibold">{bk.eventType}</p>
                      <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                        <Calendar size={11} className="text-accent" />
                        {new Date(bk.eventDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                      {bk.amount ? `$${bk.amount.toLocaleString()}` : <span className="text-gray-400 italic text-xs">Unassigned</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        bk.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        bk.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        bk.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bk.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleDelete(bk._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer border border-transparent rounded-lg hover:border-gray-200"
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

      {/* Lead Detail / Update Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBooking(null)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase font-bold text-accent tracking-wider bg-accent/5 px-2.5 py-0.5 rounded-full inline-block mb-3">
              Booking Invoice Request
            </span>

            <h3 className="text-xl font-heading font-bold text-primary mb-1">
              {selectedBooking.clientName}
            </h3>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Mail size={12} />
                <a href={`mailto:${selectedBooking.email}`} className="hover:underline text-accent">{selectedBooking.email}</a>
              </span>
              <span className="flex items-center gap-1">
                <Phone size={12} />
                <span>{selectedBooking.phone}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Event Type</span>
                <span className="text-sm font-bold text-gray-800">{selectedBooking.eventType}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Event Date</span>
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
                  <Calendar size={13} className="text-accent" />
                  {new Date(selectedBooking.eventDate).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Guest Size</span>
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
                  <Users size={13} className="text-accent" />
                  {selectedBooking.guestCount || 'Not specified'}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Estimated Invoice</span>
                <span className="text-sm font-bold text-primary">
                  {selectedBooking.amount ? `$${selectedBooking.amount.toLocaleString()}` : 'Not Quote Assigned'}
                </span>
              </div>
            </div>

            {selectedBooking.notes && (
              <div className="mb-6">
                <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Client Special Planner Notes</h5>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm text-gray-700 max-h-32 overflow-y-auto leading-relaxed">
                  {selectedBooking.notes}
                </div>
              </div>
            )}

            {/* Action Form */}
            <form onSubmit={handleUpdateBooking} className="border-t border-gray-100 pt-6 space-y-4">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Update Booking Invoice & Status</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Assign Invoice Amount ($)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="number"
                      placeholder="e.g. 5400"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-8 pr-4 text-sm focus:outline-none"
                      value={tempAmount}
                      onChange={(e) => setTempAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Status Action</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none"
                    value={tempStatus}
                    onChange={(e) => setTempStatus(e.target.value)}
                  >
                    <option value="Pending">Pending Approval</option>
                    <option value="Confirmed">Confirm Booking</option>
                    <option value="Completed">Mark Event Completed</option>
                    <option value="Cancelled">Cancel Booking</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button 
                  type="submit"
                  disabled={updateLoading}
                  className="btn bg-accent text-white hover:bg-accent-hover text-xs font-bold py-3 px-5 rounded-xl flex items-center justify-center"
                >
                  {updateLoading ? <Loader className="animate-spin" size={15} /> : 'Save Invoice Configuration'}
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDelete(selectedBooking._id)}
                  className="btn border border-red-200 text-red-600 hover:bg-red-50 text-xs px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
