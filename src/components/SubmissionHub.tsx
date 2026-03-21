"use client";

import { useState } from 'react';

/**
 * SubmissionHub - Form component for submitting recovery resources
 * 
 * Features:
 * - Form validation
 * - Submit to Supabase via API
 * - Success/error feedback
 */
export function SubmissionHub() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    contact: '',
    area: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', type: '', contact: '', area: '', description: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200 max-w-2xl mx-auto text-left"
    >
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✅ Thank you! Your submission has been received and will be reviewed.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ❌ Something went wrong. Please try again.
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
            Resource Name / Business Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Desert Towing Co."
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-stone-700 mb-2">
            Resource Type
          </label>
          <select
            name="type"
            id="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select type...</option>
            <option value="tow">Tow Service</option>
            <option value="mechanic">Mobile Mechanic</option>
            <option value="volunteer">Volunteer Recovery</option>
            <option value="shop">Parts Shop</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-stone-700 mb-2">
            Contact Info
          </label>
          <input
            type="text"
            name="contact"
            id="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Phone, Instagram, etc."
          />
        </div>
        
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-stone-700 mb-2">
            Service Area
          </label>
          <input
            type="text"
            name="area"
            id="area"
            required
            value={formData.area}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Glamis, Big Bear, Johnson Valley"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-stone-700 mb-2">
            Additional Details
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Hours, specialties, rates, etc."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-4 rounded-lg transition duration-200"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Resource'}
        </button>
      </div>
    </form>
  );
}