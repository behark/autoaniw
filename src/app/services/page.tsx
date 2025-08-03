'use client';

import React from 'react';
import Image from 'next/image';
import { FaCar, FaClipboardCheck, FaHandshake, FaTools, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import MainLayout from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/design-system/Button';

export default function ServicesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-description">
            Comprehensive solutions for luxury vehicle ownership
          </p>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="section container-fluid">
        <h2 className="section-title">Premium Automotive Services</h2>
        <p className="section-description">
          At AutoAni, we provide a comprehensive suite of services designed to make your luxury vehicle experience seamless and exceptional from start to finish.
        </p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {[
            {
              icon: <FaCar className="h-8 w-8" />,
              title: "Premium Vehicle Sales",
              description: "Curated selection of luxury and performance vehicles from the world's most prestigious manufacturers.",
              color: "text-primary-600"
            },
            {
              icon: <FaClipboardCheck className="h-8 w-8" />,
              title: "Vehicle Sourcing",
              description: "Can't find your dream car? Our team will source specific makes, models, and configurations globally.",
              color: "text-primary-600"
            },
            {
              icon: <HiCurrencyDollar className="h-8 w-8" />,
              title: "Financing Solutions",
              description: "Competitive financing options tailored to your needs with flexible terms and transparent conditions.",
              color: "text-primary-600"
            },
            {
              icon: <FaHandshake className="h-8 w-8" />,
              title: "Concierge Delivery",
              description: "White-glove delivery service to your location with complete vehicle orientation.",
              color: "text-primary-600"
            },
            {
              icon: <FaTools className="h-8 w-8" />,
              title: "Maintenance & Service",
              description: "Factory-certified maintenance and service to keep your vehicle in peak condition.",
              color: "text-primary-600"
            },
            {
              icon: <FaExchangeAlt className="h-8 w-8" />,
              title: "Trade-In Program",
              description: "Seamless trade-in process with fair market evaluations for your current vehicle.",
              color: "text-primary-600"
            },
          ].map((service, index) => (
            <div key={index} className="feature-card group hover:border-primary-400 transition-all">
              <div className={`${service.color} mb-5`}>{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Spotlight Service */}
      <section className="section bg-bg-subtle">
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">The AutoAni Advantage</h2>
              <p className="text-lg text-text-secondary mb-4">
                Our Premium Care Program goes beyond the typical dealership experience, offering continued support throughout your ownership journey.
              </p>
              
              <ul className="space-y-4 mt-8">
                {[
                  { icon: <FaShieldAlt />, text: "Extended warranty options beyond manufacturer coverage" },
                  { icon: <FaClipboardCheck />, text: "Regular maintenance reminders and scheduling assistance" },
                  { icon: <FaCar />, text: "Complimentary courtesy vehicles during service appointments" },
                  { icon: <FaTools />, text: "24/7 roadside assistance for the unexpected" },
                  { icon: <FaHandshake />, text: "Dedicated personal advisor for all your vehicle needs" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant="default" size="lg" className="mt-8">
                Learn More
              </Button>
            </div>
            <div className="order-1 md:order-2 relative rounded-lg overflow-hidden aspect-[4/3]">
              <Image 
                src="/images/services/premium-care.jpg" 
                alt="AutoAni Premium Care" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Process */}
      <section className="section container-fluid">
        <h2 className="section-title">Our Service Process</h2>
        <p className="section-description">
          A streamlined experience from inquiry to delivery
        </p>
        
        <div className="mt-16 relative">
          {/* Process timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2"></div>
          
          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin with understanding your preferences, requirements, and budget to identify the perfect vehicle match.",
                image: "/images/services/consultation.jpg"
              },
              {
                step: "02",
                title: "Selection & Customization",
                description: "Browse our premium inventory or let us source your dream vehicle, with options for custom features and specifications.",
                image: "/images/services/selection.jpg"
              },
              {
                step: "03",
                title: "Financing & Documentation",
                description: "Our finance team presents tailored options and handles all paperwork with efficiency and transparency.",
                image: "/images/services/financing.jpg"
              },
              {
                step: "04",
                title: "Delivery Experience",
                description: "Receive your vehicle with our signature white-glove service, including a comprehensive orientation session.",
                image: "/images/services/delivery.jpg"
              }
            ].map((process, idx) => (
              <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`${idx % 2 === 1 ? 'md:text-right' : ''} relative`}>
                  {/* Process step marker */}
                  <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 items-center justify-center bg-primary-600 text-white rounded-full w-12 h-12 text-lg font-bold z-10 shadow-md
                    ${idx % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}">
                    {process.step}
                  </div>
                  
                  <span className="inline-block text-sm font-bold text-primary-600 tracking-widest mb-2">STEP {process.step}</span>
                  <h3 className="text-2xl font-bold mb-4">{process.title}</h3>
                  <p className="text-text-secondary">{process.description}</p>
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-video md:aspect-[4/3]">
                  <Image 
                    src={process.image} 
                    alt={process.title} 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="container-fluid">
          <h2 className="text-center text-3xl font-bold mb-10">Client Experiences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "AutoAni transformed my car buying experience. Their attention to detail and personalized service made the process enjoyable and stress-free.",
                author: "David L.",
                position: "BMW M5 Owner"
              },
              {
                quote: "The team went above and beyond to source exactly what I wanted. Their passion for luxury vehicles is matched only by their commitment to client satisfaction.",
                author: "Jennifer K.",
                position: "Mercedes AMG Client"
              },
              {
                quote: "From financing to delivery, every step was handled with professionalism. Three years later, they still provide exceptional support for my vehicle.",
                author: "Robert T.",
                position: "Porsche 911 Owner"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg">
                <div className="text-2xl mb-2">"</div>
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="opacity-80 text-sm">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section container-fluid">
        <div className="bg-bg-subtle rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Services?</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Schedule a consultation with our team to discuss your automotive needs and discover how we can exceed your expectations.
          </p>
          <Button variant="default" size="lg">
            Book a Consultation
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
