'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay, FaExpand } from 'react-icons/fa';
import { fadeAnimation, scaleAnimation } from '@/utils/animations';
import { useTheme } from '@/providers/ThemeProvider';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

interface VehicleShowcaseProps {
  vehicleName: string;
  media: MediaItem[];
  className?: string;
}

export default function VehicleShowcase({
  vehicleName,
  media,
  className = '',
}: VehicleShowcaseProps) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Get current media
  const currentMedia = media[activeIndex];

  // Navigation handlers
  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % media.length);
    setIsVideoPlaying(false);
  };

  const goToPrev = () => {
    setActiveIndex((current) => (current - 1 + media.length) % media.length);
    setIsVideoPlaying(false);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
    setIsVideoPlaying(false);
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = 'auto';
  };

  // Video handlers
  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  if (!media.length) return null;

  return (
    <>
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        {/* Main showcase area */}
        <div className="relative aspect-[16/9] md:aspect-[16/10] lg:aspect-auto lg:h-[500px] bg-bg-subtle overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMedia.id}
              variants={fadeAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full"
            >
              {currentMedia.type === 'image' ? (
                <div 
                  className="w-full h-full bg-center bg-cover cursor-pointer"
                  style={{ backgroundImage: `url(${currentMedia.url})` }}
                  onClick={() => openLightbox(activeIndex)}
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={currentMedia.url}
                    poster={currentMedia.thumbnailUrl}
                    controls={isVideoPlaying}
                    autoPlay={isVideoPlaying}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {!isVideoPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={toggleVideo}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPlay className="text-primary-600 text-2xl ml-1" />
                      </motion.div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {media.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-20 transition-all hover:scale-110"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-20 transition-all hover:scale-110"
                onClick={goToNext}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Fullscreen button */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all hover:scale-110"
            onClick={() => openLightbox(activeIndex)}
            aria-label="View fullscreen"
          >
            <FaExpand />
          </button>

          {/* Caption if available */}
          {currentMedia.title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white"
            >
              <h3 className="text-lg font-medium">{currentMedia.title}</h3>
              {currentMedia.description && (
                <p className="text-sm text-white/80">{currentMedia.description}</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Thumbnails */}
        {media.length > 1 && (
          <div className="mt-4 grid grid-cols-6 gap-2">
            {media.map((item, index) => (
              <motion.div
                key={item.id}
                className={`
                  aspect-square rounded-md overflow-hidden cursor-pointer border-2
                  ${index === activeIndex ? 'border-primary-500' : 'border-transparent'}
                `}
                onClick={() => goToIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.thumbnailUrl || item.url}
                    alt={item.title || `${vehicleName} image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title || `${vehicleName} video ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <FaPlay className="text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={closeLightbox}
              aria-label="Close fullscreen"
            >
              ✕
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={media[lightboxIndex].id}
                  variants={scaleAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="max-w-full max-h-full"
                >
                  {media[lightboxIndex].type === 'image' ? (
                    <img
                      src={media[lightboxIndex].url}
                      alt={media[lightboxIndex].title || `${vehicleName} image`}
                      className="max-w-full max-h-[85vh] object-contain"
                    />
                  ) : (
                    <video
                      src={media[lightboxIndex].url}
                      poster={media[lightboxIndex].thumbnailUrl}
                      controls
                      autoPlay
                      className="max-w-full max-h-[85vh] object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Lightbox navigation */}
              {media.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-20"
                    onClick={() => setLightboxIndex((current) => (current - 1 + media.length) % media.length)}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft className="text-xl" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center z-20"
                    onClick={() => setLightboxIndex((current) => (current + 1) % media.length)}
                    aria-label="Next image"
                  >
                    <FaChevronRight className="text-xl" />
                  </button>
                </>
              )}

              {/* Caption in fullscreen */}
              {media[lightboxIndex].title && (
                <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                  <h3 className="text-xl font-medium">{media[lightboxIndex].title}</h3>
                  {media[lightboxIndex].description && (
                    <p className="text-white/80">{media[lightboxIndex].description}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
