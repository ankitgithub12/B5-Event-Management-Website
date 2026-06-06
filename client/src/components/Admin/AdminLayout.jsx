import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Bell, 
  Menu, 
  X, 
  LogOut,
  Package,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Shield,
  Gift,
  Sliders,
  LayoutGrid,
  User,
  Heart
} from 'lucide-react';

import { FaInstagram } from 'react-icons/fa';
import { io } from 'socket.io-client';
import logo from '../../assets/B5_logo.png';
import api from '../../utils/api';

const AdminLayout = ({ children }) => {
  // Sidebar is open by default on desktop, closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: 'Admin User', role: 'Super Admin', profilePhotoUrl: '' });

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize to auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      if (parsed.name === 'BE5 Admin') {
        parsed.name = 'B5 Admin';
        localStorage.setItem('userInfo', JSON.stringify(parsed));
      }
      setAdminUser({
        name: parsed.name,
        role: parsed.role === 'superadmin' ? 'Super Admin' : 'Admin',
        profilePhotoUrl: parsed.profilePhotoUrl || '',
      });
    } else {
      navigate('/admin/login');
    }

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

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
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
    { name: 'Hero Settings', path: '/admin/hero', icon: Sliders },
    { name: 'Social Grid', path: '/admin/social', icon: FaInstagram },
    { name: 'Love Notes', path: '/admin/testimonials', icon: Heart },

    { name: 'Services', path: '/admin/services', icon: Sparkles },
    { name: 'Hospitality', path: '/admin/hospitality', icon: LayoutGrid },
    { name: 'Portfolio', path: '/admin/portfolio', icon: LayoutGrid },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Bookings', path: '/admin/bookings', icon: Package },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Forms & Leads', path: '/admin/forms', icon: MessageSquare },
    { name: 'Packages', path: '/admin/packages', icon: Gift },
    { name: 'Team / Planners', path: '/admin/team', icon: Users },
    { name: 'Users', path: '/admin/users', icon: Shield },
  ];

  const isMobile = () => window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gray-50 flex relative">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-primary text-white fixed h-full z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          w-64
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="B5 Logo" className="w-8 h-8 rounded-lg border border-white/20 bg-white p-0.5 object-cover" />
            <span className="text-xl font-body font-bold text-accent tracking-wider">B5 ADMIN</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden cursor-pointer hover:text-accent p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 mt-2 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                <span className="font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl hover:bg-red-500/10 text-red-300 font-semibold text-sm transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content — shifts right on md+ when sidebar is open */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>

        {/* Top Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shadow-sm shadow-black/[0.01] shrink-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-primary cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-500 hover:text-primary relative p-2 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-sm text-primary">Inquiries Alert</span>
                    <button
                      onClick={() => setNotifications([])}
                      className="text-xs text-accent font-semibold hover:underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
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

            {/* Admin Info Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 md:gap-3 border-l pl-3 md:pl-4 border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 truncate max-w-[120px]">{adminUser.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{adminUser.role}</p>
                </div>
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-accent/15 text-accent flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                  {adminUser.profilePhotoUrl ? (
                    <img src={adminUser.profilePhotoUrl} alt={adminUser.name} className="w-full h-full object-cover" />
                  ) : (
                    adminUser.name.charAt(0).toUpperCase()
                  )}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-3 border-b bg-gray-50/50">
                    <p className="text-xs font-semibold text-gray-400">Signed in as</p>
                    <p className="text-sm font-bold text-primary truncate">{adminUser.name}</p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <Link
                      to="/admin/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors cursor-pointer"
                    >
                      <User size={16} className="text-gray-400" />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} className="text-red-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
