/**
 * Centralized asset URLs for LS Tours
 * Using CloudFront CDN for reliable, fast delivery
 */

// CloudFront base URL
const CLOUDFRONT_BASE = 'https://do6raq9h04ex.cloudfront.net';

// ============= HERO VIDEO =============
export const heroVideo = {
  url: `${CLOUDFRONT_BASE}/2024/12/araliya-final-v1-compressed.mp4`,
  // Fallback image for when video can't play (reduced motion, save data, autoplay blocked)
  fallback: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=1920&q=80',
  // Poster shown while video loads
  poster: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=1920&q=80',
};

// ============= DEFAULT FALLBACK =============
export const defaultFallbackImage = 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=800';

// ============= DESTINATION IMAGES =============
export const destinationImages: Record<string, { hero: string; gallery: string[] }> = {
  sigiriya: {
    hero: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=800',
      'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=800',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
    ],
  },
  ella: {
    hero: 'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=800',
      'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=800',
      'https://images.unsplash.com/photo-1546708770-599a1b9e1d02?w=800',
    ],
  },
  kandy: {
    hero: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
      'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=800',
    ],
  },
  galle: {
    hero: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    ],
  },
  mirissa: {
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
  },
  yala: {
    hero: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    ],
  },
  'nuwara-eliya': {
    hero: 'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=800',
      'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=800',
    ],
  },
  colombo: {
    hero: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
    ],
  },
};

// ============= PACKAGE IMAGES =============
export const packageImages: Record<string, { hero: string; gallery: string[] }> = {
  'cultural-triangle-explorer': {
    hero: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=800',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
      'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=800',
    ],
  },
  'hill-country-scenic-ride': {
    hero: 'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=800',
      'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=800',
      'https://images.unsplash.com/photo-1546708770-599a1b9e1d02?w=800',
    ],
  },
  'southern-coast-relaxation': {
    hero: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
  },
  'wildlife-safari-adventure': {
    hero: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    ],
  },
  'luxury-honeymoon-escape': {
    hero: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    ],
  },
  'complete-sri-lanka-discovery': {
    hero: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=800',
      'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=800',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
    ],
  },
};

// ============= GALLERY IMAGES =============
export const galleryImages: string[] = [
  // Sigiriya & Cultural Triangle
  'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=800',
  'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
  // Hill Country & Ella
  'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=800',
  'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=800',
  'https://images.unsplash.com/photo-1546708770-599a1b9e1d02?w=800',
  // Beaches & Coast
  'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  // Wildlife
  'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
  'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
  // Luxury & Romance
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
  // Nature & Scenery
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
];
