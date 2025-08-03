'use client';

import React, { useState, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/design-system/Button';
import { useTheme } from '@/providers/ThemeProvider';
import { Select } from '@/components/ui/design-system/Select';
import { FaSave, FaTimes, FaCrop, FaUndo } from 'react-icons/fa';

interface ImageCropperProps {
  src: string;
  onSave: (croppedImageBlob: Blob, filename: string) => void;
  onCancel: () => void;
  fileName?: string;
}

// Common aspect ratios
const aspectRatios = [
  { value: undefined, label: 'Free form' },
  { value: 1 / 1, label: '1:1 (Square)' },
  { value: 16 / 9, label: '16:9 (Landscape)' },
  { value: 9 / 16, label: '9:16 (Portrait)' },
  { value: 4 / 3, label: '4:3 (Standard)' },
  { value: 3 / 2, label: '3:2 (Classic)' },
];

export default function ImageCropper({ src, onSave, onCancel, fileName = 'cropped-image.jpg' }: ImageCropperProps) {
  const { theme } = useTheme();
  const [imgSrc, setImgSrc] = useState(src);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const blobUrlRef = React.useRef('');

  // This creates a centered crop if the user hasn't made one yet
  const centerAspectCrop = useCallback(
    (mediaWidth: number, mediaHeight: number, aspectRatio: number | undefined) => {
      return centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          aspectRatio || 1,
          mediaWidth,
          mediaHeight
        ),
        mediaWidth,
        mediaHeight
      );
    },
    []
  );

  // When the image loads, set up an initial centered crop
  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      if (aspect) {
        setCrop(centerAspectCrop(width, height, aspect));
      }
    },
    [aspect, centerAspectCrop]
  );

  // Handle aspect ratio change
  const handleAspectChange = useCallback(
    (newAspect: number | undefined) => {
      setAspect(newAspect);
      if (newAspect && imgRef.current) {
        const { width, height } = imgRef.current;
        setCrop(centerAspectCrop(width, height, newAspect));
      }
    },
    [centerAspectCrop]
  );

  // Generate a cropped image and save
  const handleSaveCrop = useCallback(async () => {
    if (!imgRef.current || !completedCrop || !canvasRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    // Set proper canvas dimensions
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      completedCrop.x,
      completedCrop.y,
      completedCrop.width,
      completedCrop.height,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    // Convert the canvas to a Blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Clean up any previous blob URL
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
        }

        // Create a new blob URL and save it for later cleanup
        const newBlobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = newBlobUrl;

        // Pass the blob to the parent component
        onSave(blob, fileName);
      }
    }, 'image/jpeg');
  }, [completedCrop, fileName, onSave]);

  // Reset crop and adjustments
  const handleReset = useCallback(() => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setAspect(undefined);
    setScale(1);
    setRotate(0);
  }, []);

  // Clean up when component unmounts
  React.useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {/* Cropping options */}
      <div className="flex flex-wrap gap-3 bg-bg-subtle p-3 rounded-md">
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-text-secondary mb-1">Aspect Ratio</label>
          <Select
            value={aspect ? aspectRatios.findIndex(ar => ar.value === aspect).toString() : "0"}
            onChange={(e) => {
              const idx = parseInt(e.target.value);
              handleAspectChange(aspectRatios[idx].value);
            }}
            className="w-full sm:w-40"
          >
            {aspectRatios.map((ratio, idx) => (
              <option key={idx} value={idx}>
                {ratio.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-text-secondary mb-1">Zoom</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full sm:w-32"
            />
            <span className="text-sm text-text-secondary whitespace-nowrap">{scale.toFixed(1)}x</span>
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-text-secondary mb-1">Rotate</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="-180"
              max="180"
              value={rotate}
              onChange={(e) => setRotate(parseFloat(e.target.value))}
              className="w-full sm:w-32"
            />
            <span className="text-sm text-text-secondary whitespace-nowrap">{rotate}°</span>
          </div>
        </div>
      </div>

      {/* Image cropping area */}
      <div className="relative">
        <div className="bg-checkerboard rounded-md overflow-hidden">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="max-h-[60vh] mx-auto"
          >
            <img
              ref={imgRef}
              alt="Crop"
              src={imgSrc}
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                transformOrigin: 'center',
                maxHeight: '60vh',
              }}
              onLoad={onImageLoad}
              className="max-w-full"
            />
          </ReactCrop>
        </div>
      </div>

      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Action buttons */}
      <div className="flex justify-between pt-3">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5"
            onClick={handleReset}
          >
            <FaUndo className="h-3 w-3" />
            Reset
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
            onClick={onCancel}
          >
            <FaTimes className="h-3 w-3" />
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5"
            onClick={handleSaveCrop}
            disabled={!completedCrop?.width || !completedCrop?.height}
          >
            <FaSave className="h-3 w-3" />
            Save Crop
          </Button>
        </div>
      </div>
    </div>
  );
}
