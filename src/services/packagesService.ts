import { TourPackage } from '@/types';
import { packages } from '@/lib/mockData';
import { simulateLatency } from './apiClient';

export const packagesService = {
  async getAll(): Promise<TourPackage[]> {
    await simulateLatency(300);
    return packages;
  },

  async getBySlug(slug: string): Promise<TourPackage | null> {
    await simulateLatency(200);
    return packages.find((pkg) => pkg.slug === slug) || null;
  },

  async getFeatured(): Promise<TourPackage[]> {
    await simulateLatency(200);
    return packages.filter((pkg) => pkg.featured);
  },

  async getByRegion(region: string): Promise<TourPackage[]> {
    await simulateLatency(200);
    return packages.filter((pkg) =>
      pkg.regions.some((r) => r.toLowerCase().includes(region.toLowerCase()))
    );
  },
};
