import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlannerState } from '@/types';

interface UIState {
  theme: 'light' | 'dark';
  mobileNavOpen: boolean;
  planner: PlannerState;
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('ls-tours-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
};

const initialState: UIState = {
  theme: getInitialTheme(),
  mobileNavOpen: false,
  planner: {
    dateFrom: '',
    dateTo: '',
    travelers: 2,
    interests: [],
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('ls-tours-theme', state.theme);
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ls-tours-theme', state.theme);
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
      }
    },
    toggleMobileNav: (state) => {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    closeMobileNav: (state) => {
      state.mobileNavOpen = false;
    },
    updatePlanner: (state, action: PayloadAction<Partial<PlannerState>>) => {
      state.planner = { ...state.planner, ...action.payload };
    },
    resetPlanner: (state) => {
      state.planner = initialState.planner;
    },
  },
});

export const { toggleTheme, setTheme, toggleMobileNav, closeMobileNav, updatePlanner, resetPlanner } = uiSlice.actions;
export default uiSlice.reducer;
