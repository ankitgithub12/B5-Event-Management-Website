import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SocialGrid from '../components/SocialGrid/SocialGrid';
import { X, ZoomIn, Loader2 } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', alt: 'Udaipur Gala 1', span: 'col-span-1 md:col-span-2 row-span-2' },
    { id: 2, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', alt: 'Udaipur Gala 2', span: 'col-span-1 row-span-1' },
    { id: 3, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', alt: 'Udaipur Gala 3', span: 'col-span-1 row-span-1' },
    { id: 4, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', alt: 'Udaipur Gala 4', span: 'col-span-1 md:col-span-2 row-span-1' },
    { id: 5, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', alt: 'Udaipur Gala 5', span: 'col-span-1 row-span-2' },
    { id: 6, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80', alt: 'Udaipur Gala 6', span: 'col-span-1 row-span-1' },
    { id: 7, src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', alt: 'Udaipur Gala 7', span: 'col-span-1 row-span-1' },
    { id: 8, src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80', alt: 'Udaipur Gala 8', span: 'col-span-1 md:col-span-3 row-span-2' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        if (data && data.length > 0) {
          const formatted = data.map((item, i) => ({
            id: item._id,
            src: item.imageUrl,
            alt: item.title,
            span: spanClasses[i % spanClasses.length],
          }));
          setImages(formatted);
        } else {
          setImages(fallbackImages);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
              <span className="text-accent font-bold text-xs tracking-[3px] uppercase mb-4 block">Event Spotlight</span>
              <h1 className="text-5xl md:text-7xl font-heading text-primary mb-6">The Udaipur Heritage Gala</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A visual journey through our breathtaking transformation of a 400-year-old palace.
                Witness the seamless blend of heritage and modern design.
              </p>
            </motion.div>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={40} className="text-accent animate-spin" />
              <p className="text-gray-500 font-medium">Loading our dynamic event gallery...</p>
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
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ scale: 0.98 }}
                  className={`relative group overflow-hidden rounded-2xl cursor-pointer shadow-lg ${img.span}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="text-white w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              ))}
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
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
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
    </div>
  );
};

export default GalleryPage;
