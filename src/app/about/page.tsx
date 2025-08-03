'use client';

import React from 'react';
import Image from 'next/image';
import MainLayout from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/design-system/Button';

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">About AutoAni</h1>
          <p className="hero-description">
            Delivering exceptional luxury vehicles with unmatched service since 2015
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="section container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-text-primary">Our Story</h2>
            <p className="text-lg text-text-secondary">
              AutoAni began with a simple vision: to transform the luxury vehicle market by combining premium automobiles with exceptional customer service.
            </p>
            <p className="text-text-secondary">
              Founded in 2015 by automotive enthusiasts with decades of industry experience, we've grown from a small showroom to becoming one of the region's most trusted luxury vehicle providers.
            </p>
            <p className="text-text-secondary">
              Our philosophy centers on transparency, integrity, and building lasting relationships with our clients. We don't just sell cars—we deliver dreams and create experiences.
            </p>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
            <Image 
              src="/images/about/showroom.jpg" 
              alt="AutoAni Showroom" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="section bg-bg-subtle">
        <div className="container-fluid">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-description">The principles that guide everything we do</p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We curate only the finest vehicles that meet our rigorous standards for quality, performance, and luxury.",
                icon: "🏆"
              },
              {
                title: "Integrity",
                description: "Transparency in every transaction, honest communication, and fair pricing are non-negotiable principles.",
                icon: "⚖️"
              },
              {
                title: "Client Focus",
                description: "We build lasting relationships by understanding our clients' unique preferences and exceeding expectations.",
                icon: "🤝"
              }
            ].map((value, idx) => (
              <div key={idx} className="feature-card text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="section container-fluid">
        <h2 className="section-title">Meet Our Team</h2>
        <p className="section-description">Passionate experts committed to your satisfaction</p>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Alex Morgan",
              position: "Founder & CEO",
              bio: "Automotive industry veteran with 20+ years of experience",
              image: "/images/team/alex.jpg"
            },
            {
              name: "Sarah Chen",
              position: "Head of Sales",
              bio: "Luxury vehicle specialist with an eye for matching clients with their perfect car",
              image: "/images/team/sarah.jpg"
            },
            {
              name: "Michael Okonjo",
              position: "Technical Director",
              bio: "Former race engineer with deep knowledge of performance vehicles",
              image: "/images/team/michael.jpg"
            },
            {
              name: "Leila Patel",
              position: "Client Relations",
              bio: "Dedicated to creating exceptional experiences for every AutoAni client",
              image: "/images/team/leila.jpg"
            }
          ].map((member, idx) => (
            <div key={idx} className="text-center">
              <div className="relative mx-auto rounded-full overflow-hidden w-48 h-48 mb-6">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-text-primary">{member.name}</h3>
              <p className="text-primary-600 font-medium">{member.position}</p>
              <p className="mt-2 text-text-secondary">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Achievements */}
      <section className="section bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="container-fluid">
          <h2 className="text-center text-3xl font-bold mb-16">Our Achievements</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1,200+", label: "Satisfied Clients" },
              { number: "150+", label: "Premium Vehicles Sold" },
              { number: "15+", label: "Luxury Brands" },
              { number: "8", label: "Years of Excellence" }
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl md:text-5xl font-bold">{stat.number}</p>
                <p className="text-lg mt-2 opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section container-fluid text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience AutoAni?</h2>
          <p className="text-lg text-text-secondary mb-8">
            Visit our showroom or browse our current inventory to find your next luxury vehicle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default" size="lg">
              View Inventory
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
