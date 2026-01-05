import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import packagesReducer from './slices/packagesSlice';
import destinationsReducer from './slices/destinationsSlice';
import inquiryReducer from './slices/inquirySlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    packages: packagesReducer,
    destinations: destinationsReducer,
    inquiry: inquiryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
