import { createAsyncThunk } from '@reduxjs/toolkit';
import { destinationsService } from '@/services/destinationsService';

export const fetchDestinations = createAsyncThunk(
  'destinations/fetchDestinations',
  async () => {
    const response = await destinationsService.getAll();
    return response;
  }
);
