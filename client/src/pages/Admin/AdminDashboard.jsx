import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Loader,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/dashboard/stats');
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center font-semibold">
        {error}
      </div>
    );
  }

  const {
    totalRevenue,
    revenueGrowth,
    totalBookings,
    bookingsGrowth,
    activeUsers,
    usersGrowth,
    completedEvents,
    eventsGrowth,
    recentBookings,
    monthlyStats
  } = data;

  const statCards = [
    { 
      name: 'Total Revenue', 
      value: `$${totalRevenue.toLocaleString()}`, 
      change: `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}%`, 
      icon: DollarSign, 
      isUp: revenueGrowth >= 0 
    },
    { 
      name: 'Total Bookings', 
      value: totalBookings.toString(), 
      change: `${bookingsGrowth >= 0 ? '+' : ''}${bookingsGrowth.toFixed(1)}%`, 
      icon: Calendar, 
      isUp: bookingsGrowth >= 0 
    },
    { 
      name: 'Active Staff/Users', 
      value: activeUsers.toString(), 
      change: `${usersGrowth >= 0 ? '+' : ''}${usersGrowth.toFixed(1)}%`, 
      icon: Users, 
      isUp: usersGrowth >= 0 
    },
    { 
      name: 'Completed Events', 
      value: completedEvents.toString(), 
      change: `${eventsGrowth >= 0 ? '+' : ''}${eventsGrowth.toFixed(1)}%`, 
      icon: TrendingUp, 
      isUp: eventsGrowth >= 0 
    },
  ];

  return (
    <div className="space-y-8 font-body">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's a live summary of your BE5 event operations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                stat.isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                <span>{stat.change}</span>
                {stat.isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              </div>
            </div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{stat.name}</p>
            <h3 className="text-2xl font-bold text-primary mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-primary mb-6">Revenue Performance Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyStats}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C89E62" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#C89E62" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.05)'}}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C89E62" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-primary mb-6">Bookings Distribution By Month</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.05)'}}
                />
                <Bar dataKey="bookings" fill="#3B1E54" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary">Recent Client Bookings</h3>
          <Link to="/admin/bookings" className="text-sm font-semibold text-accent hover:underline">
            View All Bookings
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentBookings.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Sparkles size={36} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">No bookings recorded yet.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Invoice Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">{booking.clientName}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{booking.eventType}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(booking.eventDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-primary font-bold text-sm text-right">
                      {booking.amount ? `$${booking.amount.toLocaleString()}` : <span className="text-gray-400 italic text-xs">Quote pending</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
