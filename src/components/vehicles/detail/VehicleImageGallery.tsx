'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from 'react-icons/fa';
import Slider from 'react-slick';

// Import slick carousel CSS in the page or layout component
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

interface VehicleImageGalleryProps {
  images: {
    url: string;
    altText?: string;
  }[];
}

const VehicleImageGallery = ({ images }: VehicleImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Thumbnail slider settings
  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  // Fullscreen slider settings
  const fullscreenSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: activeIndex
  };

  const handlePrevImage = () => {
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // If no images available, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg overflow-hidden w-full aspect-[4/3] flex items-center justify-center">
        <p className="text-gray-500 text-lg">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden w-full aspect-[4/3]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            <Image 
              src={images[activeIndex].url} 
              alt={images[activeIndex].altText || 'Vehicle image'} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={handlePrevImage}
            className="bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-all"
            aria-label="Previous image"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>
          <button
            onClick={handleNextImage}
            className="bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-all"
            aria-label="Next image"
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        </div>
        
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullScreen}
          className="absolute bottom-4 right-4 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-all"
          aria-label="Fullscreen"
        >
          <FaExpand className="text-gray-700" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4">
        <Slider {...thumbnailSettings} className="thumbnail-slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`px-1 cursor-pointer ${index === activeIndex ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative aspect-[4/3] rounded-md overflow-hidden">
                <div className="absolute inset-0 bg-gray-100">
                  <Image
                    src={image.url}
                    alt={image.altText || `Vehicle image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 20vw, 10vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-7xl mx-auto">
              <button
                onClick={toggleFullScreen}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 rounded-full p-3 text-white transition-all"
                aria-label="Close fullscreen"
              >
                <FaTimes size={20} />
              </button>
              
              <Slider {...fullscreenSettings} className="h-full flex items-center">
                {images.map((image, index) => (
                  <div key={index} className="h-[80vh] flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={image.url}
                        alt={image.altText || `Vehicle image ${index + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VehicleImageGallery;
