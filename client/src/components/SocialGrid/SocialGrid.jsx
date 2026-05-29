import React, { useState, useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { io } from 'socket.io-client';
import api from '../../utils/api';

const SocialGrid = () => {
  const [settings, setSettings] = useState({
    sectionTitle: 'FOLLOW OUR JOURNEY',
    instagramHandle: '@b5eventory',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSocialGrid = async () => {
    try {
      const response = await api.get('/social-grid');
      if (response.data) {
        if (response.data.settings) {
          setSettings(response.data.settings);
        }
        if (response.data.images) {
          setImages(response.data.images);
        }
      }
    } catch (err) {
      console.error('Failed to fetch social grid details:', err);
      // Fallback default demo images if DB call fails
      setImages([
        { imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80' },
        { imageUrl: 'https://i.pinimg.com/736x/d3/fc/61/d3fc6177dfe52706a3f6826c3948f4ae.jpg' },
        { imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80' },
        { imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80' },
        { imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=400&q=80' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialGrid();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('social_grid_update', () => {
      fetchSocialGrid();
    });

    return () => socket.disconnect();
  }, []);

  const handleClean = settings.instagramHandle.startsWith('@')
    ? settings.instagramHandle.slice(1)
    : settings.instagramHandle;
  const instagramUrl = `https://instagram.com/${handleClean}`;

  return (
    <section className="py-16 bg-white font-body">
      <div className="container mx-auto px-4 max-w-full">
        
        {/* Section Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-2">
            {settings.sectionTitle}
          </div>
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-3xl font-heading italic text-primary hover:text-accent transition-colors duration-300 inline-block"
          >
            {settings.instagramHandle}
          </a>
        </div>

        {/* Instagram Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {images.map((img, index) => (
              <a 
                key={img._id || index} 
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-2xl overflow-hidden group relative cursor-pointer block"
              >
                <img 
                  src={img.imageUrl} 
                  alt={`Instagram post ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaInstagram size={32} className="text-white" />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Follow Button */}
        <div className="text-center">
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-full text-gray-700 font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-300 active:scale-[0.98]"
          >
            <FaInstagram size={18} /> FOLLOW US ON INSTAGRAM
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default SocialGrid;
