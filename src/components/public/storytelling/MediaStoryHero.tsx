'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { Button } from '@/components/ui/design-system/Button';

// Animation variants
const fadeAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const slideUpAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

export interface StoryMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string; // For videos
  videoOptions?: {
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controlsDelay?: number;
  };
  cta?: {
    text: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
}

interface LocalizedContent {
  [locale: string]: {
    title?: string;
    description?: string;
    alt?: string;
    ctaText?: string;
  };
}

export interface MediaStoryHeroProps {
  storyTitle?: string;
  storyDescription?: string;
  mediaItems: StoryMedia[];
  autoAdvance?: boolean;
  interval?: number; // in milliseconds
  height?: string;
  overlayStyle?: 'dark' | 'light' | 'gradient' | 'none';
  textPosition?: 'left' | 'center' | 'right';
  showControls?: boolean;
  className?: string;
  localizedContent?: LocalizedContent;
}

export default function MediaStoryHero({
  storyTitle,
  storyDescription,
  mediaItems,
  autoAdvance = true,
  interval = 6000,
  height = '80vh',
  overlayStyle = 'gradient',
  textPosition = 'left',
  showControls = true,
  className = '',
  localizedContent
}: MediaStoryHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoAdvance);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const { t, i18n } = useTranslation();
  
  const currentLocale = i18n.language || 'en';
  const currentMedia = mediaItems[currentIndex];
  
  // Handle auto-advance timing
  useEffect(() => {
    if (!isPlaying || mediaItems.length <= 1) return;
    
    const timer = setTimeout(() => {
      advanceMedia(1);
    }, interval);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, interval, mediaItems.length]);
  
  // Handle mouse hover for controls visibility
  const showControlsTemporarily = () => {
    setControlsVisible(true);
    const timer = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };
  
  // Advance to next/previous media item
  const advanceMedia = (direction: number) => {
    const newIndex = (currentIndex + direction + mediaItems.length) % mediaItems.length;
    setCurrentIndex(newIndex);
  };
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    const element = document.documentElement;
    
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe left - next
        advanceMedia(1);
      } else {
        // Swipe right - previous
        advanceMedia(-1);
      }
    }
    
    setTouchStart(null);
  };
  
  // Get localized content if available
  const getLocalizedContent = (field: 'title' | 'description' | 'alt' | 'ctaText'): string => {
    if (localizedContent && localizedContent[currentLocale]?.[field]) {
      return localizedContent[currentLocale][field]!;
    }
    
    // Fallback to media item's content
    if (field === 'title') return currentMedia.title || '';
    if (field === 'description') return currentMedia.description || '';
    if (field === 'alt') return currentMedia.alt || '';
    if (field === 'ctaText') return currentMedia.cta?.text || '';
    
    return '';
  };
  
  // Generate overlay className based on style prop
  const getOverlayClass = () => {
    switch (overlayStyle) {
      case 'dark':
        return 'bg-black/50';
      case 'light':
        return 'bg-white/30';
      case 'gradient':
        return 'bg-gradient-to-t from-black/70 to-black/10';
      case 'none':
        return '';
      default:
        return 'bg-gradient-to-t from-black/70 to-black/10';
    }
  };
  
  // Generate text position className
  const getTextPositionClass = () => {
    switch (textPosition) {
      case 'left':
        return 'items-start text-left';
      case 'center':
        return 'items-center text-center';
      case 'right':
        return 'items-end text-right';
      default:
        return 'items-start text-left';
    }
  };
  
  // Generate video element with appropriate options
  const renderVideoContent = () => {
    const videoOptions = currentMedia.videoOptions || {
      autoplay: true,
      loop: true,
      muted: isMuted,
      controlsDelay: 2000
    };
    
    return (
      <video
        src={currentMedia.url}
        poster={currentMedia.thumbnailUrl}
        autoPlay={videoOptions.autoplay}
        loop={videoOptions.loop}
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  };
  
  // Generate image element
  const renderImageContent = () => {
    return (
      <div className="absolute inset-0">
        <Image
          src={currentMedia.url}
          alt={getLocalizedContent('alt') || `Story image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority={currentIndex === 0}
        />
      </div>
    );
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
      onMouseEnter={showControls ? () => setControlsVisible(true) : undefined}
      onMouseLeave={showControls ? () => setControlsVisible(false) : undefined}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Media Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeAnimation}
          className="absolute inset-0"
        >
          {currentMedia.type === 'video' ? renderVideoContent() : renderImageContent()}
          
          {/* Overlay */}
          {overlayStyle !== 'none' && (
            <div className={`absolute inset-0 ${getOverlayClass()}`} />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideUpAnimation}
            className={`max-w-3xl mb-8 ${getTextPositionClass()}`}
          >
            {getLocalizedContent('title') && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {getLocalizedContent('title')}
              </h2>
            )}
            
            {getLocalizedContent('description') && (
              <p className="text-lg md:text-xl text-white/90 mb-6">
                {getLocalizedContent('description')}
              </p>
            )}
            
            {currentMedia.cta && (
              <Button 
                variant={currentMedia.cta.variant || 'primary'}
                href={currentMedia.cta.url}
                className="mt-2"
              >
                {getLocalizedContent('ctaText') || currentMedia.cta.text}
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Controls */}
      {showControls && mediaItems.length > 1 && (
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between transition-opacity duration-300 ${
            controlsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
            </button>
            
            {currentMedia.type === 'video' && (
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {mediaItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <FaCompress size={14} /> : <FaExpand size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
