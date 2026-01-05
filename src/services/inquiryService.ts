import { InquiryForm } from '@/types';
import { simulateLatency } from './apiClient';

export const inquiryService = {
  async submit(form: InquiryForm): Promise<{ success: boolean; message: string }> {
    await simulateLatency(1000);
    
    // Mock validation
    if (!form.name || !form.email) {
      throw new Error('Name and email are required');
    }

    // In production, this would send to a real API
    console.log('Inquiry submitted:', form);
    
    return {
      success: true,
      message: 'Thank you for your inquiry! Our team will contact you within 24 hours.',
    };
  },
};
