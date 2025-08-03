'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@/utils/animations';
import { FaInfoCircle, FaEdit, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Simplified demo stories
const demoStories = [
  {
    id: 'story-1',
    title: 'Luxury Redefined',
    subtitle: 'The New S-Class',
    description: 'Experience unparalleled luxury and cutting-edge technology.',
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-d3b16ee6a4ff?q=80&w=1080',
    ctaText: 'Discover Now',
    ctaUrl: '/vehicles/mercedes-s-class'
  },
  {
    id: 'story-2',
    title: 'Performance That Thrills',
    subtitle: 'BMW M Series',
    description: 'Feel the adrenaline with BMW M Series engineering.',
    imageUrl: 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?q=80&w=1080',
    ctaText: 'Explore M Series',
    ctaUrl: '/vehicles/bmw-m-series'
  },
  {
    id: 'story-3',
    title: 'Electric Future',
    subtitle: 'Tesla Model S',
    description: 'Zero emissions, instant torque, and groundbreaking technology.',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1080',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    ctaText: 'Go Electric',
    ctaUrl: '/vehicles/tesla-models'
  }
];

interface HomepageStoryWorkflowProps {
  currentStep: number;
  totalSteps: number;
}

export default function HomepageStoryWorkflow({ currentStep, totalSteps }: HomepageStoryWorkflowProps) {
  const [stories, setStories] = useState(demoStories);
  const [selectedStory, setSelectedStory] = useState(demoStories[0]);
  
  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Select featured vehicles
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Select Featured Vehicles</h3>
            <p className="mb-4 text-text-secondary">Choose vehicles to feature in the carousel.</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              {demoStories.map(story => (
                <div 
                  key={story.id}
                  className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary-300"
                >
                  <div className="aspect-[16/9] relative">
                    <img 
                      src={story.imageUrl} 
                      alt={story.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                      <h3 className="font-bold">{story.title}</h3>
                      <p className="text-sm opacity-90">{story.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Select vehicles that showcase your inventory highlights.</span>
            </div>
          </div>
        );
        
      case 1: // Customize story content
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Customize Story Content</h3>
            <p className="mb-4 text-text-secondary">Edit titles, descriptions and media.</p>
            
            <div className="border border-border-default rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={selectedStory.title}
                      readOnly
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Subtitle</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={selectedStory.subtitle}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={3}
                      value={selectedStory.description}
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="aspect-video relative">
                  <img
                    src={selectedStory.imageUrl}
                    alt={selectedStory.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button className="absolute bottom-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-md text-sm">
                    Change Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2: // Add call-to-action
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Configure Call-to-Action</h3>
            <p className="mb-4 text-text-secondary">Add clickable buttons to drive engagement.</p>
            
            <div className="border border-border-default rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value="Discover Now"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CTA URL</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value="/vehicles/mercedes-s-class"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Clear call-to-action buttons increase engagement and conversions.</span>
            </div>
          </div>
        );
        
      case 3: // Arrange stories
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Arrange Stories</h3>
            <p className="mb-4 text-text-secondary">Drag and drop to reorder your stories.</p>
            
            <div className="space-y-3 mb-4">
              {stories.map((story, index) => (
                <div 
                  key={story.id} 
                  className="flex items-center border border-border-default rounded-lg p-3 bg-white"
                >
                  <div className="w-20 h-12 bg-bg-subtle rounded overflow-hidden mr-4">
                    <img 
                      src={story.imageUrl} 
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{story.title}</h4>
                    <p className="text-sm text-text-secondary">{story.subtitle}</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      className="p-2 text-text-secondary hover:text-text-primary rounded"
                      disabled={index === 0}
                    >
                      <FaArrowUp />
                    </button>
                    <button 
                      className="p-2 text-text-secondary hover:text-text-primary rounded"
                      disabled={index === stories.length - 1}
                    >
                      <FaArrowDown />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 4: // Preview
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Preview Stories</h3>
            <p className="mb-4 text-text-secondary">See how your stories will appear on the homepage.</p>
            
            <div className="border border-border-default rounded-lg p-4">
              <div className="aspect-[21/9] bg-bg-subtle rounded-lg flex items-center justify-center">
                {/* This would be StorytellingShowcase in the real component */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold">StorytellingShowcase Preview</h3>
                  <p className="text-text-secondary mt-2">
                    The interactive showcase would appear here with all {stories.length} stories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 5: // Publish
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Publish to Homepage</h3>
            <p className="mb-4 text-text-secondary">Your stories are ready to go live.</p>
            
            <div className="p-6 border border-success-200 bg-success-50 rounded-lg text-center mb-4">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-success-700 mb-2">Ready to Publish!</h4>
              <p className="text-success-600 mb-4">
                Your stories look great and are ready to engage visitors on the homepage.
              </p>
            </div>
          </div>
        );
        
      default:
        return <div>Step content not found</div>;
    }
  };

  return (
    <motion.div 
      variants={fadeAnimation}
      initial="hidden"
      animate="visible"
      className="min-h-[500px] flex flex-col"
    >
      {renderStepContent()}
    </motion.div>
  );
}
