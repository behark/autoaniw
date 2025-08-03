'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { fadeAnimation, slideInRightAnimation } from '@/utils/animations';
import { useTheme } from '@/providers/ThemeProvider';

interface StoryItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  ctaLabel?: string;
  ctaUrl?: string;
}

interface StorytellingShowcaseProps {
  stories: StoryItem[];
  autoplayInterval?: number; // in milliseconds
  className?: string;
}

export default function StorytellingShowcase({
  stories,
  autoplayInterval = 7000,
  className = '',
}: StorytellingShowcaseProps) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  // Handle autoplay
  useEffect(() => {
    if (stories.length <= 1 || isAutoplayPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % stories.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [stories.length, autoplayInterval, isAutoplayPaused]);

  // Navigation handlers
  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % stories.length);
    setIsAutoplayPaused(true);
    setTimeout(() => setIsAutoplayPaused(false), 5000); // Resume autoplay after user interaction
  };

  const goToPrev = () => {
    setActiveIndex((current) => (current - 1 + stories.length) % stories.length);
    setIsAutoplayPaused(true);
    setTimeout(() => setIsAutoplayPaused(false), 5000); // Resume autoplay after user interaction
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
    setIsAutoplayPaused(true);
    setTimeout(() => setIsAutoplayPaused(false), 5000); // Resume autoplay after user interaction
  };

  // Current story
  const currentStory = stories[activeIndex];

  if (!stories.length || !currentStory) return null;

  return (
    <div 
      className={`relative overflow-hidden bg-gradient-to-b from-bg-subtle to-bg-paper ${className}`}
      onMouseEnter={() => setIsAutoplayPaused(true)}
      onMouseLeave={() => setIsAutoplayPaused(false)}
    >
      {/* Background media */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            {currentStory.mediaType === 'video' ? (
              <video
                src={currentStory.mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div 
                className="w-full h-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${currentStory.mediaUrl})` }}
              />
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 min-h-[70vh] flex flex-col justify-end py-16">
        <div className="max-w-xl">
          {/* Story content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id + '-content'}
              variants={slideInRightAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8"
            >
              {currentStory.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-primary-400 font-medium mb-2"
                >
                  {currentStory.subtitle}
                </motion.p>
              )}
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                {currentStory.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg md:text-xl mb-6"
              >
                {currentStory.description}
              </motion.p>

              {currentStory.ctaLabel && currentStory.ctaUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <a 
                    href={currentStory.ctaUrl}
                    className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
                  >
                    {currentStory.ctaLabel}
                  </a>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          {stories.length > 1 && (
            <div className="flex items-center gap-3 mb-4">
              {stories.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary-500 scale-125' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      {stories.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center z-20 transition-all hover:scale-110"
            onClick={goToPrev}
            aria-label="Previous story"
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center z-20 transition-all hover:scale-110"
            onClick={goToNext}
            aria-label="Next story"
          >
            <FaArrowRight />
          </button>
        </>
      )}

      {/* Progress indicator */}
      {!isAutoplayPaused && stories.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-primary-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: autoplayInterval / 1000,
              ease: 'linear',
              repeat: 0
            }}
            key={activeIndex}
          />
        </div>
      )}
    </div>
  );
}
