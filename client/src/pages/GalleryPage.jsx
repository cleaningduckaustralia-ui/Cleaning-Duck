import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import { generateBreadcrumbSchema } from '../utils/seoData';
import galleryImagesLocal from '../data/galleryImages.json';
import CTABanner from '../components/home/CTABanner';
import api from '../services/api';

const isVideo = (src) => {
  if (!src) return false;
  const lower = src.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.webm');
};

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [dbImages, setDbImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
  ]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await api.get('/media?folder=cleaning-duck/gallery');
        // Map DB images to match the UI format
        const formatted = data.data.map(img => ({
          src: img.url,
          category: img.tags?.[0] || 'Gallery', // If we use tags for category
          id: img._id
        }));
        setDbImages(formatted);
      } catch (err) {
        console.error('Failed to fetch gallery images', err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const activeImages = dbImages.length > 0 ? dbImages : galleryImagesLocal;
  const filteredImages = activeImages;

  return (
    <>
      <SEOHead
        title="Our Work Gallery - Cleaning Duck Australia"
        description="View our extensive gallery of before and after cleaning jobs in Brisbane, including bond cleaning, carpet cleaning, roof washing, and pressure cleaning."
        canonical="/gallery"
        structuredData={[breadcrumb]}
      />

      {/* Hero Section */}
      <section className="bg-primary pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our Work Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto text-lg"
          >
            Browse through our extensive portfolio of cleaning projects. Seeing is believing.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section bg-neutral-50 min-h-screen">
        <div className="container-custom">

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Image Grid */}
              <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                <AnimatePresence>
                  {filteredImages.map((image, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      key={image.id || image.src + index}
                      className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-sm cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      {isVideo(image.src) ? (
                        <video
                          src={image.src}
                          className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={image.src}
                          alt={`${image.category} cleaning example`}
                          className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                          View
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredImages.length === 0 && (
                <div className="text-center py-20 text-neutral-500">
                  <p>No images found for this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTABanner />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {isVideo(selectedImage.src) ? (
              <motion.video
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                src={selectedImage.src}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                src={selectedImage.src}
                alt={selectedImage.category}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-6 py-2 rounded-full backdrop-blur-md">
              {selectedImage.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
