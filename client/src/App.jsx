import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import CustomPlanner from './pages/CustomPlanner';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import HospitalityPage from './pages/HospitalityPage';

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
      </Routes>
    </Router>
  );
}

export default App;
