import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
import ProtectedRoute from './components/Admin/ProtectedRoute';
import UsersManagement from './pages/Admin/UsersManagement';
import ServicesManagement from './pages/Admin/ServicesManagement';
import GalleryManagement from './pages/Admin/GalleryManagement';
import FormsManagement from './pages/Admin/FormsManagement';

function App() {
  return (
    <Router>
      <ScrollToTop />
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

        {/* Admin Routes wrapped in ProtectedRoute */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute>
            <AdminLayout><EventsManagement /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/bookings" element={
          <ProtectedRoute>
            <AdminLayout><BookingsManagement /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <AdminLayout><UsersManagement /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute>
            <AdminLayout><ServicesManagement /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/gallery" element={
          <ProtectedRoute>
            <AdminLayout><GalleryManagement /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/forms" element={
          <ProtectedRoute>
            <AdminLayout><FormsManagement /></AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
