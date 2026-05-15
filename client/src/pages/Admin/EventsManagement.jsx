import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Eye } from 'lucide-react';

const EventsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    { id: 1, name: 'Royal Wedding - The Palace', category: 'Wedding', date: '2026-10-24', location: 'Grand Ballroom', status: 'Upcoming' },
    { id: 2, name: 'Tech Innovations Summit', category: 'Corporate', date: '2026-11-12', location: 'Convention Center', status: 'Planning' },
    { id: 3, name: 'Elite Charity Gala', category: 'Social', date: '2026-12-05', location: 'Hilton Garden', status: 'Confirmed' },
    { id: 4, name: 'Summer Music Festival', category: 'Public', date: '2026-08-15', location: 'City Park', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Events Management</h1>
          <p className="text-gray-500">View and manage all your organized events.</p>
        </div>
        <button className="btn bg-primary text-white hover:bg-primary-dark inline-flex items-center gap-2">
          <Plus size={20} />
          Create New Event
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none">
            <option>All Categories</option>
            <option>Wedding</option>
            <option>Corporate</option>
            <option>Social</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{event.name}</div>
                    <div className="text-xs text-gray-500">ID: EVT-{event.id}0023</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary-light/10 text-primary rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{event.date}</div>
                    <div className="text-xs text-gray-500">{event.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      event.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-accent transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 4 of 24 events</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsManagement;
