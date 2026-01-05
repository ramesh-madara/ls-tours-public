export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  durationDays: number;
  durationNights: number;
  priceFromUSD: number;
  regions: string[];
  interests: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  heroImage: string;
  itineraryDays: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  travelStyle: 'budget' | 'mid' | 'luxury';
  featured: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  images: string[];
  bestTimeToVisit: string;
  tags: string[];
  highlights: string[];
  region: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
  packageTitle: string;
  date: string;
}

export interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  country: string;
  travelDates: {
    from: string;
    to: string;
  };
  travelers: number;
  interests: string[];
  budget: string;
  message: string;
  packageSlug?: string;
}

export interface PlannerState {
  dateFrom: string;
  dateTo: string;
  travelers: number;
  interests: string[];
}

export interface FilterState {
  duration: string[];
  regions: string[];
  travelStyle: string[];
  interests: string[];
  priceRange: [number, number];
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'duration' | 'rating';
}
