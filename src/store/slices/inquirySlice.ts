import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InquiryForm } from '@/types';
import { submitInquiry } from '../thunks/inquiryThunks';

interface InquiryState {
  form: InquiryForm;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InquiryState = {
  form: {
    name: '',
    email: '',
    phone: '',
    country: '',
    travelDates: { from: '', to: '' },
    travelers: 2,
    interests: [],
    budget: '',
    message: '',
    packageSlug: undefined,
  },
  status: 'idle',
  error: null,
};

const inquirySlice = createSlice({
  name: 'inquiry',
  initialState,
  reducers: {
    updateInquiryForm: (state, action: PayloadAction<Partial<InquiryForm>>) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetInquiryForm: (state) => {
      state.form = initialState.form;
      state.status = 'idle';
      state.error = null;
    },
    setPackageSlug: (state, action: PayloadAction<string>) => {
      state.form.packageSlug = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInquiry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitInquiry.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitInquiry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to submit inquiry';
      });
  },
});

export const { updateInquiryForm, resetInquiryForm, setPackageSlug } = inquirySlice.actions;
export default inquirySlice.reducer;
