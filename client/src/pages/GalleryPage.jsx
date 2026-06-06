import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
import SocialGrid from '../components/SocialGrid/SocialGrid';
import { X, ZoomIn, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';

const spanClasses = [
  'col-span-1 md:col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 md:col-span-2 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 md:col-span-3 row-span-2',
];

const GalleryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  const setFilter = (newFilter) => {
    if (newFilter === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', newFilter);
    }
    setSearchParams(searchParams);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 5000);
  };

  const fetchGallery = async () => {
    try {
      const { data } = await api.get('/gallery');
      if (data && data.length > 0) {
        const formatted = data.map((item) => ({
          id: item._id,
          src: item.imageUrl,
          alt: item.title,
          category: item.category,
          span: item.span,
        }));
        setImages(formatted);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGallery();
    
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('gallery_update', () => {
      fetchGallery();
      showToast('✨ The media gallery was updated in real-time!');
    });

    return () => socket.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'All Media' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'private party', name: 'Private Parties' },
    { id: 'exhibition', name: 'Exhibitions' },
    { id: 'other', name: 'Others' },
  ];

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SEO 
        title="Event Gallery - B5 EVENTORY"
        description="Browse our event gallery and see the stunning weddings, corporate events, and parties we have managed."
        canonicalUrl="/gallery"
      />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-bold text-xs tracking-[3px] uppercase mb-4 block">Event Memories</span>
              <h1 className="text-5xl md:text-7xl font-heading text-primary mb-6">Our Media Gallery</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A visual journey through the breathtaking experiences we've crafted.
                Witness the details, atmosphere, and joy captured in real time.
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer ${
                  filter === cat.id 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={40} className="text-accent animate-spin" />
              <p className="text-gray-500 font-medium">Loading our dynamic event gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-12 max-w-lg mx-auto">
              <ImageIcon className="mx-auto mb-4 text-gray-300" size={48} />
              <h3 className="text-lg font-bold text-primary mb-2">No showcase items</h3>
              <p className="text-gray-500 text-sm mb-6">We are currently curating and uploading event captures. Please check back soon!</p>
              <a href="/portfolio" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-accent transition-colors">
                View Portfolios
              </a>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {filteredImages.map((img, index) => {
                // Dynamically select span classes if item doesn't have a specific span class
                const span = img.span || spanClasses[index % spanClasses.length];
                return (
                  <motion.div
                    key={img.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 0.98 }}
                    className={`relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg ${span}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <div className="relative w-full h-full overflow-hidden bg-gray-900 flex items-center justify-center">
                      {/* Blurred ambient background to fill empty space without cropping */}
                      <img 
                        src={img.src} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110 opacity-30 select-none pointer-events-none"
                      />
                      {/* Foreground full-visibility image */}
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="relative z-10 max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-20">
                      <span className="self-start text-[10px] uppercase font-bold text-accent tracking-widest bg-white/95 px-2.5 py-1 rounded-full shadow-sm">
                        {img.category}
                      </span>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-white text-sm font-bold truncate max-w-[80%] drop-shadow">
                          {img.alt}
                        </span>
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ZoomIn className="text-white w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          
          {/* Back to Portfolio CTA */}
          <div className="mt-20 text-center">
             <a href="/portfolio" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold transition-all">
                Back to Portfolio
             </a>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SocialGrid />
      <Footer />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[110] bg-primary text-white border border-[#C5A06B]/20 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm text-left">
          <span className="text-sm font-semibold">{toast}</span>
          <button onClick={() => setToast('')} className="text-white/50 hover:text-white ml-auto shrink-0 cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
