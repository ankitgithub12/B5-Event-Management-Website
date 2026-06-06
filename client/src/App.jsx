import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import CookieConsent from './components/CookieConsent/CookieConsent';

// Home page is kept static to prevent any layout shifts or initial load delays on landing page.
import Home from './pages/Home';

// Lazy load user pages
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const CustomPlanner = lazy(() => import('./pages/CustomPlanner'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const HospitalityPage = lazy(() => import('./pages/HospitalityPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));

// Lazy load admin pages
const AdminLayout = lazy(() => import('./components/Admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const EventsManagement = lazy(() => import('./pages/Admin/EventsManagement'));
const BookingsManagement = lazy(() => import('./pages/Admin/BookingsManagement'));
const UsersManagement = lazy(() => import('./pages/Admin/UsersManagement'));
const ServicesManagement = lazy(() => import('./pages/Admin/ServicesManagement'));
const GalleryManagement = lazy(() => import('./pages/Admin/GalleryManagement'));
const FormsManagement = lazy(() => import('./pages/Admin/FormsManagement'));
const TeamManagement = lazy(() => import('./pages/Admin/TeamManagement'));
const PackagesManagement = lazy(() => import('./pages/Admin/PackagesManagement'));
const PortfolioManagement = lazy(() => import('./pages/Admin/PortfolioManagement'));
const HeroManagement = lazy(() => import('./pages/Admin/HeroManagement'));
const SocialGridManagement = lazy(() => import('./pages/Admin/SocialGridManagement'));
const ProfileSettings = lazy(() => import('./pages/Admin/ProfileSettings'));
const HospitalityManagement = lazy(() => import('./pages/Admin/HospitalityManagement'));
const TestimonialsManagement = lazy(() => import('./pages/Admin/TestimonialsManagement'));

const LoadingFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#241235] text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[#C89E62] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#C89E62] font-body text-sm tracking-[2px] uppercase animate-pulse">Loading B5 Eventory...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
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
          <Route path="/admin/portfolio" element={
            <ProtectedRoute>
              <AdminLayout><PortfolioManagement /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/hero" element={
            <ProtectedRoute>
              <AdminLayout><HeroManagement /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/social" element={
            <ProtectedRoute>
              <AdminLayout><SocialGridManagement /></AdminLayout>
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
          <Route path="/admin/team" element={
            <ProtectedRoute>
              <AdminLayout><TeamManagement /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/packages" element={
            <ProtectedRoute>
              <AdminLayout><PackagesManagement /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/profile" element={
            <ProtectedRoute>
              <AdminLayout><ProfileSettings /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/hospitality" element={
            <ProtectedRoute>
              <AdminLayout><HospitalityManagement /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/testimonials" element={
            <ProtectedRoute>
              <AdminLayout><TestimonialsManagement /></AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
      <CookieConsent />
    </Router>
  );
}

export default App;
