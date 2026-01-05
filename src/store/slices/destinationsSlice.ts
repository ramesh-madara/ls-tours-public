import { createSlice } from '@reduxjs/toolkit';
import { Destination } from '@/types';
import { fetchDestinations } from '../thunks/destinationsThunks';

interface DestinationsState {
  items: Destination[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedDestination: Destination | null;
}

const initialState: DestinationsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedDestination: null,
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setSelectedDestination: (state, action) => {
      state.selectedDestination = action.payload;
    },
    clearSelectedDestination: (state) => {
      state.selectedDestination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch destinations';
      });
  },
});

export const { setSelectedDestination, clearSelectedDestination } = destinationsSlice.actions;
export default destinationsSlice.reducer;
