import { Destination } from '@/types';
import { destinations } from '@/lib/mockData';
import { simulateLatency } from './apiClient';

export const destinationsService = {
  async getAll(): Promise<Destination[]> {
    await simulateLatency(300);
    return destinations;
  },

  async getBySlug(slug: string): Promise<Destination | null> {
    await simulateLatency(200);
    return destinations.find((dest) => dest.slug === slug) || null;
  },

  async getByRegion(region: string): Promise<Destination[]> {
    await simulateLatency(200);
    return destinations.filter((dest) =>
      dest.region.toLowerCase().includes(region.toLowerCase())
    );
  },
};
