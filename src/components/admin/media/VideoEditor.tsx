'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaCut, FaCamera } from 'react-icons/fa';
import { Button } from '@/components/ui/design-system/Button';
import { useTheme } from '@/providers/ThemeProvider';

interface VideoEditorProps {
  videoSrc: string;
  onSave: (blob: Blob, thumbnailBlob: Blob | null, start: number, end: number) => void;
  onCancel: () => void;
}

export default function VideoEditor({ videoSrc, onSave, onCancel }: VideoEditorProps) {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [thumbnailTime, setThumbnailTime] = useState(0);
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize video duration and end time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setEndTime(video.duration);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, []);

  // Update current time while playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // If we've reached the end time, pause and go back to start time
      if (video.currentTime >= endTime) {
        video.pause();
        video.currentTime = startTime;
        setIsPlaying(false);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [endTime, startTime]);

  // Play/pause handlers
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // If we're at the end, go back to start
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
      }
      video.play();
      setIsPlaying(true);
    }
  };

  // Capture thumbnail at current position
  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Set thumbnail time to current position
    setThumbnailTime(video.currentTime);

    // Draw video frame to canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setThumbnailDataUrl(dataUrl);
    }
  };

  // Format time (seconds) to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle trim save
  const handleSave = async () => {
    setIsLoading(true);
    
    // In a real implementation, we would use ffmpeg.wasm or send to a backend
    // For now, we'll simulate trimming by just returning the time ranges
    
    // Convert thumbnail to blob
    let thumbnailBlob: Blob | null = null;
    if (thumbnailDataUrl) {
      const response = await fetch(thumbnailDataUrl);
      thumbnailBlob = await response.blob();
    }
    
    // In a real app, this would be the trimmed video blob
    // Here we're just returning the original video
    const response = await fetch(videoSrc);
    const videoBlob = await response.blob();
    
    onSave(videoBlob, thumbnailBlob, startTime, endTime);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      {/* Video preview */}
      <div className="relative bg-bg-subtle rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full rounded-lg"
          onClick={togglePlay}
        />
        
        {/* Play/pause overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {!isPlaying && (
            <div className="bg-black/50 rounded-full p-3 text-white">
              <FaPlay className="ml-1" />
            </div>
          )}
        </div>
        
        {/* Hidden canvas for thumbnail generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Video controls */}
      <div className="mt-4 space-y-4">
        {/* Current time / duration */}
        <div className="flex justify-between text-sm text-text-secondary">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        {/* Timeline slider */}
        <div className="relative pt-1">
          <input
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={currentTime}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              setCurrentTime(newTime);
              if (videoRef.current) {
                videoRef.current.currentTime = newTime;
              }
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-bg-subtle"
          />
        </div>
        
        {/* Trim controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Start Time
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={endTime - 1}
                step={0.1}
                value={startTime}
                onChange={(e) => setStartTime(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-sm w-16">{formatTime(startTime)}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              End Time
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={startTime + 1}
                max={duration}
                step={0.1}
                value={endTime}
                onChange={(e) => setEndTime(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-sm w-16">{formatTime(endTime)}</span>
            </div>
          </div>
        </div>
        
        {/* Thumbnail */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-text-secondary">
              Thumbnail
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={captureThumbnail}
              className="flex items-center gap-1"
            >
              <FaCamera className="h-3 w-3" />
              Capture at Current Position
            </Button>
          </div>
          
          <div className="bg-bg-subtle p-2 rounded border border-border-default">
            {thumbnailDataUrl ? (
              <img 
                src={thumbnailDataUrl} 
                alt="Video Thumbnail"
                className="w-full h-32 object-contain"
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center text-text-muted">
                No thumbnail captured yet
              </div>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FaCut className="h-3 w-3" />
                Apply Edits
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
