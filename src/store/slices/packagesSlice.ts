import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TourPackage, FilterState } from '@/types';
import { fetchPackages } from '../thunks/packagesThunks';

interface PackagesState {
  items: TourPackage[];
  filteredItems: TourPackage[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: FilterState;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PackagesState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
  filters: {
    duration: [],
    regions: [],
    travelStyle: [],
    interests: [],
    priceRange: [0, 5000],
    sortBy: 'recommended',
  },
  currentPage: 1,
  itemsPerPage: 6,
};

const applyFilters = (items: TourPackage[], filters: FilterState): TourPackage[] => {
  let filtered = [...items];

  // Duration filter
  if (filters.duration.length > 0) {
    filtered = filtered.filter((pkg) => {
      return filters.duration.some((d) => {
        if (d === '1-3') return pkg.durationDays >= 1 && pkg.durationDays <= 3;
        if (d === '4-6') return pkg.durationDays >= 4 && pkg.durationDays <= 6;
        if (d === '7-10') return pkg.durationDays >= 7 && pkg.durationDays <= 10;
        if (d === '10+') return pkg.durationDays > 10;
        return false;
      });
    });
  }

  // Region filter
  if (filters.regions.length > 0) {
    filtered = filtered.filter((pkg) =>
      pkg.regions.some((r) => filters.regions.includes(r.toLowerCase().replace(' ', '-')))
    );
  }

  // Travel style filter
  if (filters.travelStyle.length > 0) {
    filtered = filtered.filter((pkg) => filters.travelStyle.includes(pkg.travelStyle));
  }

  // Interests filter
  if (filters.interests.length > 0) {
    filtered = filtered.filter((pkg) =>
      pkg.interests.some((i) => filters.interests.includes(i))
    );
  }

  // Price range filter
  filtered = filtered.filter(
    (pkg) => pkg.priceFromUSD >= filters.priceRange[0] && pkg.priceFromUSD <= filters.priceRange[1]
  );

  // Sorting
  switch (filters.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.priceFromUSD - b.priceFromUSD);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.priceFromUSD - a.priceFromUSD);
      break;
    case 'duration':
      filtered.sort((a, b) => a.durationDays - b.durationDays);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Recommended: featured first, then by rating
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }

  return filtered;
};

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters);
      state.currentPage = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = applyFilters(state.items, state.filters);
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = applyFilters(action.payload, state.filters);
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch packages';
      });
  },
});

export const { setFilters, resetFilters, setCurrentPage } = packagesSlice.actions;
export default packagesSlice.reducer;
