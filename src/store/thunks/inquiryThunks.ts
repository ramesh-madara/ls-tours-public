import { createAsyncThunk } from '@reduxjs/toolkit';
import { inquiryService } from '@/services/inquiryService';
import { InquiryForm } from '@/types';

export const submitInquiry = createAsyncThunk(
  'inquiry/submitInquiry',
  async (form: InquiryForm) => {
    const response = await inquiryService.submit(form);
    return response;
  }
);
