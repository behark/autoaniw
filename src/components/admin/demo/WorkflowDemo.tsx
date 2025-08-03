'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/design-system/Button';
import { fadeAnimation, slideUpAnimation } from '@/utils/animations';
import { FaArrowLeft, FaArrowRight, FaTimes, FaCheck } from 'react-icons/fa';
import VehicleMediaWorkflow from './workflows/VehicleMediaWorkflow';
import HomepageStoryWorkflow from './workflows/HomepageStoryWorkflow';
import MediaBatchWorkflow from './workflows/MediaBatchWorkflow';

interface WorkflowStep {
  text: string;
}

interface Workflow {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  steps: string[];
}

interface WorkflowDemoProps {
  workflow: Workflow;
  onComplete: () => void;
  onCancel: () => void;
}

export default function WorkflowDemo({ workflow, onComplete, onCancel }: WorkflowDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = workflow.steps.length;
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderWorkflowContent = () => {
    switch(workflow.id) {
      case 'vehicle-media':
        return <VehicleMediaWorkflow currentStep={currentStep} totalSteps={totalSteps} />;
      case 'homepage-story':
        return <HomepageStoryWorkflow currentStep={currentStep} totalSteps={totalSteps} />;
      case 'media-batch':
        return <MediaBatchWorkflow currentStep={currentStep} totalSteps={totalSteps} />;
      default:
        return <div>Workflow not found</div>;
    }
  };
  
  return (
    <motion.div 
      className="bg-white border border-border-default rounded-lg overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeAnimation}
    >
      {/* Header */}
      <div className="bg-bg-subtle border-b border-border-default p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            className="p-2 rounded-full hover:bg-bg-muted transition-colors"
            onClick={onCancel}
            aria-label="Close workflow"
          >
            <FaTimes />
          </button>
          <h2 className="text-xl font-semibold">{workflow.title}</h2>
        </div>
        <div className="text-sm text-text-secondary">
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex gap-4">
          {/* Steps sidebar */}
          <div className="w-1/4 border-r border-border-default pr-4">
            <ul className="space-y-4">
              {workflow.steps.map((step, idx) => (
                <li 
                  key={idx}
                  className={`
                    relative pl-8 py-2 border-l-2 cursor-pointer transition-colors
                    ${idx === currentStep 
                      ? 'border-primary-500 text-primary-600 font-medium' 
                      : idx < currentStep
                        ? 'border-success-500 text-success-600'
                        : 'border-border-default text-text-secondary'}
                  `}
                  onClick={() => setCurrentStep(idx)}
                >
                  <div className={`
                    absolute left-[-9px] w-4 h-4 rounded-full
                    ${idx === currentStep 
                      ? 'bg-primary-500' 
                      : idx < currentStep
                        ? 'bg-success-500'
                        : 'bg-bg-subtle border border-border-default'}
                  `}>
                    {idx < currentStep && (
                      <FaCheck className="text-white text-[8px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Main content */}
          <div className="w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                {renderWorkflowContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-bg-subtle border-t border-border-default p-4 flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <FaArrowLeft className="h-3 w-3" />
          Previous
        </Button>
        
        <Button
          variant="primary"
          onClick={nextStep}
          className="flex items-center gap-2"
        >
          {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          {currentStep === totalSteps - 1 ? (
            <FaCheck className="h-3 w-3" />
          ) : (
            <FaArrowRight className="h-3 w-3" />
          )}
        </Button>
      </div>
    </motion.div>
  );
}
