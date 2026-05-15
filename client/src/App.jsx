import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import CustomPlanner from './pages/CustomPlanner';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import HospitalityPage from './pages/HospitalityPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EventsManagement from './pages/Admin/EventsManagement';
import BookingsManagement from './pages/Admin/BookingsManagement';
import AdminLogin from './pages/Admin/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/planner" element={<CustomPlanner />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/hospitality" element={<HospitalityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/events" element={<AdminLayout><EventsManagement /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><BookingsManagement /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><div className="p-8"><h1 className="text-3xl font-heading font-bold text-primary">Users Management</h1><p className="mt-4 text-gray-500">Coming soon...</p></div></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><div className="p-8"><h1 className="text-3xl font-heading font-bold text-primary">Settings</h1><p className="mt-4 text-gray-500">Coming soon...</p></div></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
