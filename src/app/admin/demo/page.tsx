'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/design-system/Button';
import { fadeAnimation, slideUpAnimation } from '@/utils/animations';
import { FaImages, FaVideo, FaCar, FaHome, FaCheck } from 'react-icons/fa';
import WorkflowDemo from '@/components/admin/demo/WorkflowDemo';

export default function DemoPage() {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [completedWorkflows, setCompletedWorkflows] = useState<string[]>([]);

  const workflows = [
    {
      id: 'vehicle-media',
      title: 'Adding Media to Vehicle Listing',
      icon: <FaCar />,
      description: 'Learn how to select, edit, and organize media for a vehicle listing',
      steps: [
        'Select and upload media files',
        'Crop images and customize thumbnails',
        'Trim video content for perfect showcase',
        'Organize gallery order with drag-and-drop',
        'Add proper metadata for SEO',
        'Preview the vehicle showcase'
      ]
    },
    {
      id: 'homepage-story',
      title: 'Creating Homepage Story',
      icon: <FaHome />,
      description: 'Create compelling visual stories for the homepage carousel',
      steps: [
        'Select featured vehicles and highlights',
        'Customize story title and description',
        'Add call-to-action buttons',
        'Arrange stories in presentation order',
        'Preview the storytelling component',
        'Publish to the homepage'
      ]
    },
    {
      id: 'media-batch',
      title: 'Batch Media Management',
      icon: <FaImages />,
      description: 'Process multiple media files efficiently',
      steps: [
        'Bulk upload from local drive',
        'Apply batch tags and categories',
        'Auto-generate metadata for multiple files',
        'Bulk resize for optimization',
        'Organize into collections',
        'Review and publish'
      ]
    }
  ];

  const handleWorkflowComplete = (id: string) => {
    setCompletedWorkflows(prev => [...prev, id]);
    setActiveWorkflow(null);
  };

  return (
    <AdminLayout>
      <motion.div 
        className="container py-8"
        initial="hidden"
        animate="visible"
        variants={fadeAnimation}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">AutoAni Media System Demo</h1>
            <p className="text-text-secondary mt-2">
              Interactive walkthrough of the media management capabilities
            </p>
          </div>
          <div className="bg-bg-subtle px-4 py-2 rounded-lg">
            <span className="text-sm font-medium">
              {completedWorkflows.length} / {workflows.length} workflows completed
            </span>
          </div>
        </div>

        {activeWorkflow ? (
          <WorkflowDemo 
            workflow={workflows.find(w => w.id === activeWorkflow)!} 
            onComplete={() => handleWorkflowComplete(activeWorkflow)}
            onCancel={() => setActiveWorkflow(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <motion.div
                key={workflow.id}
                className={`
                  border rounded-lg p-6 hover:shadow-lg transition-all
                  ${completedWorkflows.includes(workflow.id) 
                    ? 'bg-success-50 border-success-200' 
                    : 'bg-white border-border-default hover:border-primary-300'}
                `}
                whileHover={{ y: -5 }}
                variants={slideUpAnimation}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`
                    p-3 rounded-full text-white text-xl
                    ${completedWorkflows.includes(workflow.id) ? 'bg-success-500' : 'bg-primary-500'}
                  `}>
                    {completedWorkflows.includes(workflow.id) ? <FaCheck /> : workflow.icon}
                  </div>
                  <span className="text-sm text-text-muted">
                    {completedWorkflows.includes(workflow.id) ? 'Completed' : 'Interactive'}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{workflow.title}</h3>
                <p className="text-text-secondary mb-6">{workflow.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Workflow Steps:</h4>
                  <ul className="space-y-1">
                    {workflow.steps.map((step, idx) => (
                      <li key={idx} className="text-sm flex items-center">
                        <span className="w-5 h-5 rounded-full bg-bg-subtle inline-flex items-center justify-center mr-2 text-xs">
                          {idx + 1}
                        </span>
                        <span className="text-text-secondary">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={completedWorkflows.includes(workflow.id) ? "secondary" : "primary"}
                  className="w-full"
                  onClick={() => setActiveWorkflow(workflow.id)}
                >
                  {completedWorkflows.includes(workflow.id) ? 'View Again' : 'Start Workflow'}
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {completedWorkflows.length === workflows.length && (
          <motion.div 
            className="mt-8 bg-success-50 border border-success-200 rounded-lg p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-success-700">
              🎉 All Workflows Completed!
            </h3>
            <p className="mt-2 mb-4">
              You've explored all the key media management capabilities of the AutoAni platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setCompletedWorkflows([])}>
                Start Over
              </Button>
              <Button variant="outline" as="a" href="/admin">
                Return to Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AdminLayout>
  );
}
