'use client';

import React from 'react';
import Image from 'next/image';
import { FaCalculator, FaFileAlt, FaHandshake, FaKey, FaCheckCircle } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import MainLayout from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/design-system/Button';
import { Card } from '../../components/ui/design-system/Card';

export default function FinancingPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Financing & Leasing</h1>
          <p className="hero-description">
            Flexible solutions tailored to your luxury vehicle journey
          </p>
        </div>
      </section>
      
      {/* Financing Overview */}
      <section className="section container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Financing Options</h2>
            <p className="text-lg text-text-secondary mb-4">
              At AutoAni, we understand that acquiring a premium vehicle is a significant investment. Our financing solutions are designed to provide flexibility and transparency, making luxury more accessible.
            </p>
            <p className="text-text-secondary mb-6">
              We work with leading financial institutions to secure competitive rates and terms tailored to your specific needs and preferences. Our finance specialists will guide you through the entire process, ensuring a smooth and hassle-free experience.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <span className="text-primary-600 mr-3 mt-1"><FaCheckCircle /></span>
                <span>Competitive interest rates from premium lenders</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 mr-3 mt-1"><FaCheckCircle /></span>
                <span>Flexible term lengths from 24-72 months</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 mr-3 mt-1"><FaCheckCircle /></span>
                <span>Specialized luxury vehicle financing expertise</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 mr-3 mt-1"><FaCheckCircle /></span>
                <span>Quick approval process with minimal paperwork</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <Image 
              src="/images/financing/financing-overview.jpg" 
              alt="AutoAni Financing" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
      
      {/* Financing Options Cards */}
      <section className="section bg-bg-subtle">
        <div className="container-fluid">
          <h2 className="section-title">Explore Our Programs</h2>
          <p className="section-description">
            Tailored financial solutions for every client's needs
          </p>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-bg-paper">
              <Card.Header>
                <div className="text-primary-600 mb-4">
                  <HiCurrencyDollar size={32} />
                </div>
                <Card.Title>Traditional Financing</Card.Title>
                <Card.Description>
                  Own your dream vehicle with competitive rates and flexible terms
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Competitive interest rates</li>
                  <li>• Terms from 24-72 months</li>
                  <li>• Fixed monthly payments</li>
                  <li>• No mileage restrictions</li>
                  <li>• Build equity with each payment</li>
                </ul>
              </Card.Content>
              <Card.Footer className="flex justify-center">
                <Button variant="default">Apply Now</Button>
              </Card.Footer>
            </Card>
            
            <Card className="bg-bg-paper border-primary-400">
              <Card.Header>
                <div className="text-primary-600 mb-4">
                  <FaKey size={28} />
                </div>
                <Card.Title>Premium Leasing</Card.Title>
                <Card.Description>
                  Drive the latest models with lower monthly payments
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Lower monthly payments</li>
                  <li>• Drive a new vehicle every 2-3 years</li>
                  <li>• Comprehensive warranty coverage</li>
                  <li>• Flexible end-of-lease options</li>
                  <li>• Tax advantages for business use</li>
                </ul>
              </Card.Content>
              <Card.Footer className="flex justify-center">
                <Button variant="default">Explore Leasing</Button>
              </Card.Footer>
            </Card>
            
            <Card className="bg-bg-paper">
              <Card.Header>
                <div className="text-primary-600 mb-4">
                  <FaHandshake size={28} />
                </div>
                <Card.Title>Balloon Financing</Card.Title>
                <Card.Description>
                  Combine the benefits of leasing and traditional financing
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <ul className="space-y-2 text-text-secondary">
                  <li>• Lower monthly payments</li>
                  <li>• Option to purchase at end of term</li>
                  <li>• Flexible final payment options</li>
                  <li>• Higher mileage allowances than leasing</li>
                  <li>• Ideal for luxury and exotic vehicles</li>
                </ul>
              </Card.Content>
              <Card.Footer className="flex justify-center">
                <Button variant="default">Learn More</Button>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Leasing Benefits */}
      <section className="section container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6">Leasing Benefits</h2>
            <p className="text-lg text-text-secondary mb-4">
              Leasing offers a smart alternative for luxury vehicle enthusiasts who prefer driving the latest models with lower financial commitment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-bg-subtle rounded-lg">
                <div className="text-primary-600 mb-3">
                  <FaCalculator size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Lower Monthly Payments</h3>
                <p className="text-text-secondary text-sm">
                  Pay only for the vehicle's depreciation during your lease term, resulting in significantly lower monthly payments.
                </p>
              </div>
              
              <div className="p-6 bg-bg-subtle rounded-lg">
                <div className="text-primary-600 mb-3">
                  <FaFileAlt size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Warranty Coverage</h3>
                <p className="text-text-secondary text-sm">
                  Most leases align with manufacturer warranty periods, minimizing repair and maintenance costs.
                </p>
              </div>
              
              <div className="p-6 bg-bg-subtle rounded-lg">
                <div className="text-primary-600 mb-3">
                  <FaKey size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Latest Models</h3>
                <p className="text-text-secondary text-sm">
                  Drive a new vehicle every 2-3 years with the latest technology and safety features.
                </p>
              </div>
              
              <div className="p-6 bg-bg-subtle rounded-lg">
                <div className="text-primary-600 mb-3">
                  <FaHandshake size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Flexible End Options</h3>
                <p className="text-text-secondary text-sm">
                  Choose to purchase the vehicle, lease a new one, or simply return it at the end of your term.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative rounded-lg overflow-hidden aspect-[3/4]">
            <Image 
              src="/images/financing/leasing-benefits.jpg" 
              alt="AutoAni Leasing Benefits" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Financing Calculator */}
      <section className="section bg-bg-subtle">
        <div className="container-fluid">
          <h2 className="section-title">Financing Calculator</h2>
          <p className="section-description">
            Estimate your monthly payments based on your preferences
          </p>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <Card>
              <Card.Content className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Price</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-text-muted">$</span>
                      </div>
                      <input 
                        type="text"
                        className="form-input pl-8"
                        placeholder="100,000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Down Payment</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-text-muted">$</span>
                      </div>
                      <input 
                        type="text"
                        className="form-input pl-8"
                        placeholder="20,000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Term (months)</label>
                    <select className="form-select">
                      <option>24 months</option>
                      <option>36 months</option>
                      <option>48 months</option>
                      <option>60 months</option>
                      <option>72 months</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="3.99"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="default" size="lg" className="w-full md:w-auto">
                    Calculate Payment
                  </Button>
                </div>
                
                {/* Sample Result */}
                <div className="mt-6 p-4 bg-bg-subtle rounded-lg">
                  <div className="text-center">
                    <p className="text-text-secondary">Estimated Monthly Payment</p>
                    <p className="text-3xl font-bold text-primary-600 mt-2">$1,450</p>
                    <p className="text-sm text-text-muted mt-1">Based on the information provided</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
            
            <p className="text-sm text-text-muted mt-4 text-center">
              This calculator provides estimates only. Contact our finance team for personalized quotes and options.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section container-fluid">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="mt-12 max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "What credit score do I need to qualify for financing?",
              answer: "While we work with clients across the credit spectrum, a score of 680+ typically qualifies for our most competitive rates. However, we consider multiple factors beyond credit scores and have specialized programs for various financial situations."
            },
            {
              question: "Can I refinance my current auto loan with AutoAni?",
              answer: "Yes, we offer refinancing options that may help lower your monthly payment or reduce your interest rate. Our finance specialists can analyze your current loan and present options that may better suit your needs."
            },
            {
              question: "What happens at the end of my lease?",
              answer: "At lease-end, you can choose to purchase the vehicle at the predetermined residual value, lease a new vehicle, or simply return the vehicle (subject to any excess wear or mileage fees)."
            },
            {
              question: "Do you offer pre-approval for financing?",
              answer: "Yes, we offer quick pre-approval processes that allow you to shop with confidence knowing exactly what your budget and options are. Pre-approvals can typically be completed within 24 hours."
            },
            {
              question: "Are there any advantages to financing through AutoAni versus my bank?",
              answer: "AutoAni has established relationships with lenders specializing in luxury vehicles who understand their value retention and offer more favorable terms as a result. We also handle all paperwork and negotiations, saving you time and potentially securing better terms."
            }
          ].map((faq, idx) => (
            <Card key={idx}>
              <Card.Header>
                <Card.Title>{faq.question}</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-text-secondary">{faq.answer}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-700 to-primary-800 text-white">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
            <p className="text-lg mb-8">
              Speak with our finance specialists to explore options tailored to your specific needs and preferences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="default" size="lg" className="bg-white text-primary-800 hover:bg-gray-100">
                Apply for Financing
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
