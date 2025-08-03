'use client';

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/design-system/Button';
import { Input } from '../../components/ui/design-system/Input';
import { FormField } from '../../components/ui/design-system/FormField';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    error: boolean;
    message: string;
  }>({
    submitted: false,
    error: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to your backend
    console.log('Form submitted:', formData);
    
    // Simulate success (would be replaced with actual API call)
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! Our team will contact you soon.',
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-description">
            Let's start a conversation about your luxury vehicle needs
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="section container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaMapMarkerAlt size={24} />,
              title: "Visit Our Showroom",
              details: [
                "123 Luxury Avenue",
                "Beverly Hills, CA 90210",
                "United States"
              ]
            },
            {
              icon: <FaPhone size={24} />,
              title: "Call Us",
              details: [
                "+1 (310) 555-7890",
                "+1 (800) AUTO-ANI"
              ]
            },
            {
              icon: <FaEnvelope size={24} />,
              title: "Email Us",
              details: [
                "info@autoani.com",
                "sales@autoani.com"
              ]
            },
            {
              icon: <FaClock size={24} />,
              title: "Business Hours",
              details: [
                "Monday - Friday: 9AM - 7PM",
                "Saturday: 10AM - 6PM",
                "Sunday: By Appointment"
              ]
            }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6 bg-bg-paper rounded-lg shadow-sm border border-border-default hover:border-primary-300 transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <div className="space-y-1">
                {item.details.map((detail, i) => (
                  <p key={i} className="text-text-secondary">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Map and Contact Form */}
      <section className="section container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="h-[400px] lg:h-auto rounded-lg overflow-hidden bg-bg-subtle border border-border-default">
            {/* Replace with actual map component in production */}
            <div className="w-full h-full flex items-center justify-center bg-bg-subtle">
              <div className="text-center">
                <p className="text-text-muted mb-2">Interactive Map</p>
                <p className="text-sm">Google Maps or similar would be integrated here</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {formStatus.submitted ? (
              <div className={`p-4 rounded-md ${formStatus.error ? 'bg-error/10 text-error' : 'bg-success/10 text-success'}`}>
                {formStatus.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Your Name"
                    htmlFor="name"
                    required
                  >
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </FormField>
                  
                  <FormField
                    label="Email Address"
                    htmlFor="email"
                    required
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </FormField>
                  
                  <FormField
                    label="Phone Number"
                    htmlFor="phone"
                  >
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (123) 456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormField>
                  
                  <FormField
                    label="Subject"
                    htmlFor="subject"
                  >
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="Sales Inquiry">Sales Inquiry</option>
                      <option value="Vehicle Sourcing">Vehicle Sourcing</option>
                      <option value="Financing Options">Financing Options</option>
                      <option value="Service Appointment">Service Appointment</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormField>
                </div>
                
                <div className="mt-6">
                  <FormField
                    label="Your Message"
                    htmlFor="message"
                    required
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="form-input"
                      placeholder="How can we help you today?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </FormField>
                </div>
                
                <div className="mt-6">
                  <Button type="submit" variant="default" size="lg">
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* Social Media */}
      <section className="section bg-bg-subtle">
        <div className="container-fluid text-center">
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Follow AutoAni on social media for the latest arrivals, events, and automotive insights
          </p>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: <FaInstagram size={24} />, name: "Instagram", link: "https://instagram.com/autoani" },
              { icon: <FaFacebook size={24} />, name: "Facebook", link: "https://facebook.com/autoani" },
              { icon: <FaTwitter size={24} />, name: "Twitter", link: "https://twitter.com/autoani" },
              { icon: <FaYoutube size={24} />, name: "YouTube", link: "https://youtube.com/autoani" }
            ].map((platform, idx) => (
              <a 
                key={idx}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-paper border border-border-default text-text-primary hover:text-primary-600 hover:border-primary-300 transition-all"
                aria-label={`Follow on ${platform.name}`}
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="section container-fluid">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="mt-12 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              question: "Do I need an appointment to visit your showroom?",
              answer: "While walk-ins are welcome during regular business hours, we recommend scheduling an appointment to ensure personalized service and vehicle availability."
            },
            {
              question: "How quickly can I expect a response to my inquiry?",
              answer: "We typically respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our showroom directly."
            },
            {
              question: "Can I request a virtual tour of a specific vehicle?",
              answer: "Absolutely! We offer personalized virtual tours via video call. Just mention your preference in the message field when submitting your contact form."
            },
            {
              question: "Do you offer home delivery for purchased vehicles?",
              answer: "Yes, we provide white-glove delivery service throughout the continental United States. Delivery options and fees vary by location."
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-bg-paper border border-border-default rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
              <p className="text-text-secondary">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="section bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter to receive updates on new arrivals, exclusive events, and special offers
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="Your email address"
                className="sm:w-72 bg-white"
              />
              <Button type="submit" variant="default" size="lg" className="bg-white text-primary-800 hover:bg-gray-100">
                Subscribe
              </Button>
            </form>
            
            <p className="text-sm mt-4 opacity-80">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
