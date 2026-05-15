import React from 'react';
import { Search, Filter, Mail, Phone, MoreVertical } from 'lucide-react';

const BookingsManagement = () => {
  const bookings = [
    { id: 'BK-1024', client: 'Sarah Johnson', email: 'sarah.j@example.com', package: 'Luxury Wedding', date: '2026-10-24', total: '$4,500', status: 'Confirmed' },
    { id: 'BK-1025', client: 'Michael Chen', email: 'm.chen@example.com', package: 'Corporate Basic', date: '2026-11-12', total: '$7,200', status: 'Pending' },
    { id: 'BK-1026', client: 'Emma Wilson', email: 'emma.w@example.com', package: 'Party Plus', date: '2026-10-30', total: '$1,800', status: 'Completed' },
    { id: 'BK-1027', client: 'David Smith', email: 'd.smith@example.com', package: 'Conference Pro', date: '2026-12-05', total: '$12,400', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Bookings Management</h1>
        <p className="text-gray-500">Track and manage all customer bookings and payments.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, client or package..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Package & Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Total Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-primary">{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{booking.client}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <button className="text-gray-400 hover:text-accent"><Mail size={14} /></button>
                      <button className="text-gray-400 hover:text-accent"><Phone size={14} /></button>
                      <span className="text-xs text-gray-500">{booking.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.package}</div>
                    <div className="text-xs text-gray-500">{booking.date}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">{booking.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical size={20} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsManagement;
