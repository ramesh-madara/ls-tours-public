import { createAsyncThunk } from '@reduxjs/toolkit';
import { packagesService } from '@/services/packagesService';

export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => {
    const response = await packagesService.getAll();
    return response;
  }
);

export const fetchPackageBySlug = createAsyncThunk(
  'packages/fetchPackageBySlug',
  async (slug: string) => {
    const response = await packagesService.getBySlug(slug);
    return response;
  }
);
