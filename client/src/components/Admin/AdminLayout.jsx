import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  Bell, 
  Menu, 
  X, 
  LogOut,
  Package,
  Sparkles,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { io } from 'socket.io-client';
import logo from '../../assets/B5_logo.jpeg';
import api from '../../utils/api';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: 'Admin User', role: 'Super Admin' });
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Read user from localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setAdminUser({ name: parsed.name, role: parsed.role === 'superadmin' ? 'Super Admin' : 'Admin' });
    } else {
      navigate('/admin/login');
    }

    // Fetch initial notifications/forms or load mock for notifications
    const fetchLeadNotifications = async () => {
      try {
        const response = await api.get('/forms');
        const unreadLeads = response.data
          .filter(form => form.status === 'New')
          .map(form => ({
            id: form._id,
            title: `New lead: ${form.name}`,
            message: form.message,
            isRead: false
          }));
        setNotifications(unreadLeads);
      } catch (err) {
        console.log('Failed to fetch lead alerts');
      }
    };
    
    fetchLeadNotifications();

    // Socket.io client setup
    const socket = io('http://localhost:5000');
    
    socket.on('notification', (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => socket.disconnect();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Bookings', path: '/admin/bookings', icon: Package },
    { name: 'Services', path: '/admin/services', icon: Sparkles },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Forms & Leads', path: '/admin/forms', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-primary text-white w-64 fixed h-full transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="BE5 Logo" className="w-8 h-8 rounded-lg border border-white/20 bg-white p-0.5 object-cover" />
            <span className="text-xl font-heading font-bold text-accent tracking-wider">BE5 ADMIN</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden cursor-pointer hover:text-accent">
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 mt-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/5 text-white/80 hover:text-white'}`}
              >
                <item.icon size={18} />
                <span className="font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl hover:bg-red-500/10 text-red-300 font-semibold text-sm transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
        {/* Navbar */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm shadow-black/[0.01]">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-primary cursor-pointer">
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-500 hover:text-primary relative p-2 cursor-pointer"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-sm text-primary">Inquiries Alert</span>
                    <button 
                      onClick={() => setNotifications([])}
                      className="text-xs text-accent font-semibold hover:underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-400">
                        <Bell size={28} className="mx-auto mb-2 opacity-20" />
                        <p className="text-xs">No unread notifications</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors">
                          <p className="text-xs font-bold text-gray-900">{notification.title}</p>
                          <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-l pl-4 border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{adminUser.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{adminUser.role}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold text-base shadow-sm">
                {adminUser.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
