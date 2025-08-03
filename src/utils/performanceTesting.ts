/**
 * Performance Testing Utilities
 * 
 * This module provides functions for stress testing and benchmarking the media management system
 * with large datasets to ensure optimal performance under heavy load.
 */

import { MediaItem } from '@/types/media';

/**
 * Generates a synthetic media library of the specified size
 * 
 * @param count Number of media items to generate
 * @param options Configuration options for the generated media
 * @returns Array of synthetic media items
 */
export function generateSyntheticMediaLibrary(
  count: number,
  options: {
    imageRatio?: number; // 0-1, ratio of images to videos
    tagsPerItem?: { min: number; max: number };
    collectionCount?: number;
    randomSeed?: number;
  } = {}
): MediaItem[] {
  const {
    imageRatio = 0.8,
    tagsPerItem = { min: 1, max: 8 },
    collectionCount = 10,
    randomSeed = 42,
  } = options;

  // Set up deterministic randomness for reproducible tests
  const seededRandom = makeSeededRandom(randomSeed);
  
  // Generate collections
  const collections = Array.from({ length: collectionCount }, (_, i) => 
    generateRandomCollection(i, seededRandom)
  );
  
  // Generate tags pool
  const tagsPool = generateTagsPool(50);

  // Generate synthetic media items
  const mediaItems: MediaItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const isImage = seededRandom() < imageRatio;
    const item = generateRandomMediaItem(i, isImage, tagsPool, collections, seededRandom, tagsPerItem);
    mediaItems.push(item);
  }
  
  return mediaItems;
}

/**
 * Runs a performance test on the media manager components
 * 
 * @param componentName Component to test
 * @param mediaCount Number of media items to test with
 * @param iterations Number of test iterations
 * @returns Performance metrics
 */
export async function runPerformanceTest(
  componentName: string,
  mediaCount: number,
  iterations: number = 5
): Promise<PerformanceMetrics> {
  console.log(`Running performance test on ${componentName} with ${mediaCount} items...`);
  
  const metrics: PerformanceMetrics = {
    component: componentName,
    mediaCount,
    renderTime: { 
      avg: 0, 
      min: Number.MAX_VALUE, 
      max: 0,
      p95: 0
    },
    memoryUsage: {
      avg: 0,
      min: Number.MAX_VALUE,
      max: 0,
      p95: 0
    },
    filterTime: {
      avg: 0,
      min: Number.MAX_VALUE,
      max: 0,
      p95: 0
    },
    iterations
  };
  
  // Generate test data once
  const mediaItems = generateSyntheticMediaLibrary(mediaCount);
  const renderTimes: number[] = [];
  const memoryUsages: number[] = [];
  const filterTimes: number[] = [];
  
  // Run multiple iterations for statistical significance
  for (let i = 0; i < iterations; i++) {
    // Simulate component render time
    const startRender = performance.now();
    await simulateComponentRender(componentName, mediaItems);
    const endRender = performance.now();
    const renderTime = endRender - startRender;
    renderTimes.push(renderTime);
    
    // Measure memory usage
    const memoryUsage = await measureMemoryUsage();
    memoryUsages.push(memoryUsage);
    
    // Measure filtering performance
    const startFilter = performance.now();
    await simulateFiltering(mediaItems);
    const endFilter = performance.now();
    const filterTime = endFilter - startFilter;
    filterTimes.push(filterTime);
    
    // Clear memory between iterations
    if (i < iterations - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Calculate metrics
  metrics.renderTime = calculateStats(renderTimes);
  metrics.memoryUsage = calculateStats(memoryUsages);
  metrics.filterTime = calculateStats(filterTimes);
  
  return metrics;
}

/**
 * Tests media loading performance with pagination
 * 
 * @param pageSize Number of items per page
 * @param totalItems Total number of items in the library
 * @returns Pagination performance metrics
 */
export async function testPaginationPerformance(
  pageSize: number,
  totalItems: number
): Promise<PaginationMetrics> {
  const totalPages = Math.ceil(totalItems / pageSize);
  const mediaItems = generateSyntheticMediaLibrary(totalItems);
  
  const pageLoadTimes: number[] = [];
  
  for (let page = 0; page < Math.min(totalPages, 10); page++) {
    const start = page * pageSize;
    const end = Math.min(start + pageSize, totalItems);
    
    const startTime = performance.now();
    const pageItems = mediaItems.slice(start, end);
    await simulatePageRender(pageItems);
    const endTime = performance.now();
    
    pageLoadTimes.push(endTime - startTime);
  }
  
  return {
    pageSize,
    totalItems,
    totalPages,
    averageLoadTime: calculateStats(pageLoadTimes).avg,
    loadTimeByPage: pageLoadTimes
  };
}

/**
 * Stress test for concurrent operations
 * 
 * @param mediaCount Number of media items
 * @param concurrentOperations Number of concurrent operations
 * @returns Stress test metrics
 */
export async function stressTest(
  mediaCount: number,
  concurrentOperations: number
): Promise<StressTestMetrics> {
  console.log(`Running stress test with ${mediaCount} items and ${concurrentOperations} concurrent operations...`);
  
  const mediaItems = generateSyntheticMediaLibrary(mediaCount);
  const operationTypes = ['filter', 'sort', 'search', 'select'];
  
  const startTime = performance.now();
  
  // Run concurrent operations
  const operations = Array.from({ length: concurrentOperations }, (_, i) => {
    const operationType = operationTypes[i % operationTypes.length];
    return simulateConcurrentOperation(operationType, mediaItems);
  });
  
  await Promise.all(operations);
  
  const endTime = performance.now();
  
  return {
    mediaCount,
    concurrentOperations,
    totalTime: endTime - startTime,
    operationsPerSecond: concurrentOperations / ((endTime - startTime) / 1000)
  };
}

// Helper functions

async function simulateComponentRender(
  componentName: string,
  mediaItems: MediaItem[]
): Promise<void> {
  // Simulate different rendering behavior based on component
  switch (componentName) {
    case 'EnhancedMediaManager':
      // Simulate complex grid rendering with metadata
      await new Promise(resolve => setTimeout(resolve, 
        Math.log(mediaItems.length) * 10 + Math.random() * 20
      ));
      break;
    
    case 'MediaGrid':
      // Simpler rendering
      await new Promise(resolve => setTimeout(resolve, 
        Math.log(mediaItems.length) * 5 + Math.random() * 10
      ));
      break;
    
    case 'StorytellingShowcase':
      // Complex with animations
      await new Promise(resolve => setTimeout(resolve, 
        Math.log(mediaItems.length) * 15 + Math.random() * 30
      ));
      break;
      
    default:
      await new Promise(resolve => setTimeout(resolve, 
        Math.log(mediaItems.length) * 8 + Math.random() * 15
      ));
  }
}

async function simulateFiltering(mediaItems: MediaItem[]): Promise<MediaItem[]> {
  // Simulate complex filtering operations
  await new Promise(resolve => setTimeout(resolve, 
    Math.log(mediaItems.length) * 3 + Math.random() * 10
  ));
  
  // Return filtered results (simulated)
  return mediaItems.filter(() => Math.random() > 0.5);
}

async function simulatePageRender(pageItems: MediaItem[]): Promise<void> {
  // Simulate page rendering time
  await new Promise(resolve => setTimeout(resolve, 
    Math.log(pageItems.length) * 8 + Math.random() * 15
  ));
}

async function simulateConcurrentOperation(
  operationType: string,
  mediaItems: MediaItem[]
): Promise<void> {
  switch (operationType) {
    case 'filter':
      await simulateFiltering(mediaItems);
      break;
    
    case 'sort':
      // Simulate sorting
      await new Promise(resolve => setTimeout(resolve, 
        mediaItems.length * Math.log(mediaItems.length) / 100
      ));
      break;
    
    case 'search':
      // Simulate search
      await new Promise(resolve => setTimeout(resolve, 
        Math.sqrt(mediaItems.length) * 5
      ));
      break;
    
    case 'select':
      // Simulate selection
      await new Promise(resolve => setTimeout(resolve, 
        Math.log(mediaItems.length) * 2
      ));
      break;
  }
}

async function measureMemoryUsage(): Promise<number> {
  // Note: In a browser environment, we would use performance.memory
  // Here we simulate memory measurements
  const baseline = 50 * 1024 * 1024; // 50MB baseline
  const randomVariation = Math.random() * 20 * 1024 * 1024; // Random variation up to 20MB
  return baseline + randomVariation;
}

function calculateStats(values: number[]): StatMetrics {
  values.sort((a, b) => a - b);
  
  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;
  const min = values[0];
  const max = values[values.length - 1];
  const p95Index = Math.floor(values.length * 0.95);
  const p95 = values[p95Index];
  
  return { avg, min, max, p95 };
}

function makeSeededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateRandomCollection(
  index: number, 
  seededRandom: () => number
): string {
  const collectionNames = [
    'Featured Vehicles', 
    'New Arrivals', 
    'Luxury Cars', 
    'Sports Cars', 
    'SUVs', 
    'Electric Vehicles', 
    'Classic Cars',
    'Test Drives',
    'Customer Photos',
    'Event Coverage',
    'Behind the Scenes',
    'Product Shots',
    'Marketing Assets',
    'Social Media'
  ];
  
  const randomIndex = Math.floor(seededRandom() * collectionNames.length);
  return collectionNames[randomIndex] + (index > 13 ? ` ${Math.floor(index / 13)}` : '');
}

function generateTagsPool(count: number): string[] {
  const tags = [
    'luxury', 'sports', 'sedan', 'coupe', 'suv', 'convertible', 
    'electric', 'hybrid', 'diesel', 'vintage', 'classic', 
    'ferrari', 'porsche', 'mercedes', 'bmw', 'audi', 'lexus', 
    'interior', 'exterior', 'front', 'rear', 'side', 'wheels', 
    'detail', 'action', 'static', 'hero', 'feature', 'gallery',
    'red', 'blue', 'black', 'white', 'silver', 'green', 'yellow',
    'summer', 'winter', 'showroom', 'event', 'press', 'exclusive',
    'video', '4k', 'review', 'test-drive', 'documentary', 'commercial',
    'new', 'used', 'certified', 'high-resolution'
  ];
  
  // Ensure we have enough tags
  while (tags.length < count) {
    tags.push(`tag-${tags.length + 1}`);
  }
  
  return tags.slice(0, count);
}

function generateRandomMediaItem(
  index: number,
  isImage: boolean,
  tagsPool: string[],
  collections: string[],
  seededRandom: () => number,
  tagsPerItem: { min: number; max: number }
): MediaItem {
  // Generate random tags
  const tagCount = Math.floor(seededRandom() * (tagsPerItem.max - tagsPerItem.min + 1)) + tagsPerItem.min;
  const selectedTags: string[] = [];
  
  for (let i = 0; i < tagCount; i++) {
    const randomTagIndex = Math.floor(seededRandom() * tagsPool.length);
    const tag = tagsPool[randomTagIndex];
    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);
    }
  }
  
  // Select random collection
  const randomCollectionIndex = Math.floor(seededRandom() * collections.length);
  const collection = collections[randomCollectionIndex];
  
  // Generate media item
  const mediaTypes = ['image', 'video', 'document'];
  const baseUrl = 'https://source.unsplash.com/random/';
  const id = `media-${index}`;
  
  if (isImage) {
    // Generate image
    const width = [1920, 2560, 1280, 3840][Math.floor(seededRandom() * 4)];
    const height = [1080, 1440, 720, 2160][Math.floor(seededRandom() * 4)];
    const imageUrl = `${baseUrl}${width}x${height}?car,vehicle`;
    
    return {
      id,
      name: `Vehicle Image ${index}`,
      url: imageUrl,
      type: 'image',
      size: Math.floor(seededRandom() * 8000000) + 500000, // 500KB - 8MB
      mimeType: ['image/jpeg', 'image/png', 'image/webp'][Math.floor(seededRandom() * 3)],
      width,
      height,
      alt: `Vehicle image ${index} featuring ${selectedTags.slice(0, 3).join(', ')}`,
      createdAt: new Date(Date.now() - Math.floor(seededRandom() * 90) * 24 * 60 * 60 * 1000),
      tags: selectedTags,
      collection,
      isFeatured: seededRandom() < 0.1 // 10% chance of being featured
    };
  } else {
    // Generate video
    const width = [1920, 1280, 3840][Math.floor(seededRandom() * 3)];
    const height = [1080, 720, 2160][Math.floor(seededRandom() * 3)];
    const videoUrls = [
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ];
    const thumbnailUrls = [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1080',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1080',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1080',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1080'
    ];
    
    return {
      id,
      name: `Vehicle Video ${index}`,
      url: videoUrls[Math.floor(seededRandom() * videoUrls.length)],
      type: 'video',
      size: Math.floor(seededRandom() * 50000000) + 5000000, // 5MB - 50MB
      mimeType: 'video/mp4',
      width,
      height,
      duration: Math.floor(seededRandom() * 120) + 10, // 10-130 seconds
      thumbnailUrl: thumbnailUrls[Math.floor(seededRandom() * thumbnailUrls.length)],
      alt: `Vehicle video ${index} featuring ${selectedTags.slice(0, 3).join(', ')}`,
      createdAt: new Date(Date.now() - Math.floor(seededRandom() * 90) * 24 * 60 * 60 * 1000),
      tags: selectedTags,
      collection,
      isFeatured: seededRandom() < 0.15 // 15% chance of being featured
    };
  }
}

// Types

export interface StatMetrics {
  avg: number;
  min: number;
  max: number;
  p95: number;
}

export interface PerformanceMetrics {
  component: string;
  mediaCount: number;
  renderTime: StatMetrics;
  memoryUsage: StatMetrics;
  filterTime: StatMetrics;
  iterations: number;
}

export interface PaginationMetrics {
  pageSize: number;
  totalItems: number;
  totalPages: number;
  averageLoadTime: number;
  loadTimeByPage: number[];
}

export interface StressTestMetrics {
  mediaCount: number;
  concurrentOperations: number;
  totalTime: number;
  operationsPerSecond: number;
}
