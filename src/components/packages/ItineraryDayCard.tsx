import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sun, Sunset, Moon, Home, MapPin } from 'lucide-react';
import { ItineraryDay } from '@/types';
import { cn } from '@/lib/utils';

interface ItineraryDayCardProps {
  day: ItineraryDay;
  dayNumber: number;
  totalDays: number;
  packageImages?: string[];
  packageInterests?: string[];
}

interface ParsedItinerary {
  morning: string[];
  afternoon: string[];
  evening: string[];
  overnight: string;
}

// Parse and enhance itinerary content
function parseItinerary(day: ItineraryDay, interests: string[] = []): ParsedItinerary {
  const description = day.description || '';
  const activities = day.activities || [];
  const accommodation = day.accommodation;
  const title = day.title?.toLowerCase() || '';

  // Check if description has time markers
  const hasMorning = description.toLowerCase().includes('morning');
  const hasAfternoon = description.toLowerCase().includes('afternoon');
  const hasEvening = description.toLowerCase().includes('evening');

  let morning: string[] = [];
  let afternoon: string[] = [];
  let evening: string[] = [];

  if (hasMorning || hasAfternoon || hasEvening) {
    // Try to parse structured description
    const parts = description.split(/(?:morning|afternoon|evening):/i);
    if (parts.length > 1) {
      morning = parts[1]?.split('.').filter(s => s.trim()).slice(0, 2).map(s => s.trim()) || [];
    }
  }

  // Use activities to build sections
  if (activities.length > 0) {
    const third = Math.ceil(activities.length / 3);
    morning = activities.slice(0, third).map(a => formatActivity(a));
    afternoon = activities.slice(third, third * 2).map(a => formatActivity(a));
    evening = activities.slice(third * 2).map(a => formatActivity(a));
  }

  // Enhance with contextual content based on day title/theme
  morning = enhanceSection(morning, 'morning', title, description, interests);
  afternoon = enhanceSection(afternoon, 'afternoon', title, description, interests);
  evening = enhanceSection(evening, 'evening', title, description, interests);

  // Overnight
  let overnight = accommodation || '';
  if (!overnight) {
    if (title.includes('colombo')) overnight = 'Stay at your hotel in Colombo';
    else if (title.includes('kandy')) overnight = 'Stay at your hotel in Kandy';
    else if (title.includes('ella')) overnight = 'Stay at your resort in Ella';
    else if (title.includes('galle')) overnight = 'Stay at your hotel in Galle';
    else if (title.includes('dambulla') || title.includes('sigiriya')) overnight = 'Stay at your hotel in Dambulla';
    else if (title.includes('yala') || title.includes('safari')) overnight = 'Stay at safari lodge';
    else if (title.includes('nuwara')) overnight = 'Stay at your hotel in Nuwara Eliya';
    else if (title.includes('departure') || title.includes('airport')) overnight = '';
    else overnight = 'Overnight at your hotel';
  } else {
    overnight = `Stay at ${overnight}`;
  }

  return { morning, afternoon, evening, overnight };
}

function formatActivity(activity: string): string {
  // Capitalize first letter and ensure proper formatting
  return activity.charAt(0).toUpperCase() + activity.slice(1);
}

function enhanceSection(
  existing: string[],
  timeOfDay: 'morning' | 'afternoon' | 'evening',
  title: string,
  description: string,
  interests: string[]
): string[] {
  const enhanced = [...existing];
  
  // Add contextual items if section is too sparse
  if (enhanced.length < 2) {
    if (timeOfDay === 'morning') {
      if (title.includes('sigiriya') || title.includes('rock')) {
        if (!enhanced.some(e => e.toLowerCase().includes('sigiriya'))) {
          enhanced.push('Early start to beat the crowds at Sigiriya');
        }
      }
      if (title.includes('tea') || title.includes('nuwara') || interests.includes('tea')) {
        if (!enhanced.some(e => e.toLowerCase().includes('tea'))) {
          enhanced.push('Fresh morning mist over tea plantations');
        }
      }
      if (title.includes('safari') || title.includes('yala') || interests.includes('wildlife')) {
        enhanced.push('Early morning game drive for best wildlife sightings');
      }
      if (title.includes('train') || title.includes('ella')) {
        enhanced.push('Scenic views of misty mountains and valleys');
      }
      if (enhanced.length < 1 && description) {
        enhanced.push(description.split('.')[0]?.trim() || 'Begin your day with breakfast');
      }
    }
    
    if (timeOfDay === 'afternoon') {
      if (title.includes('temple') || title.includes('kandy') || interests.includes('culture')) {
        enhanced.push('Explore local temples and sacred sites');
      }
      if (title.includes('beach') || title.includes('coast') || interests.includes('beach')) {
        enhanced.push('Relax on pristine sandy beaches');
      }
      if (title.includes('polonnaruwa') || title.includes('anuradhapura')) {
        enhanced.push('Discover ancient ruins and royal palaces');
      }
      if (enhanced.length < 1) {
        enhanced.push('Continue exploring local attractions');
      }
    }
    
    if (timeOfDay === 'evening') {
      if (title.includes('kandy')) {
        if (!enhanced.some(e => e.toLowerCase().includes('tooth'))) {
          enhanced.push('Witness the Temple of the Tooth evening ceremony');
        }
      }
      if (title.includes('galle') || title.includes('coast')) {
        enhanced.push('Watch the sunset over the Indian Ocean');
      }
      if (enhanced.length < 1) {
        enhanced.push('Enjoy dinner at a local restaurant');
      }
    }
  }

  return enhanced.filter(Boolean).slice(0, 4);
}

// Get image for the day based on title/theme
function getDayImage(
  day: ItineraryDay,
  dayNumber: number,
  packageImages: string[] = [],
  interests: string[] = []
): string | null {
  const title = day.title?.toLowerCase() || '';
  
  // Map destinations to images
  const imageMap: Record<string, string> = {
    sigiriya: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=600',
    rock: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=600',
    kandy: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600',
    temple: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600',
    ella: 'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=600',
    train: 'https://images.unsplash.com/photo-1566766189268-73acf97f9de7?w=600',
    tea: 'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=600',
    nuwara: 'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=600',
    beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    coast: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600',
    galle: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600',
    safari: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600',
    yala: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600',
    wildlife: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600',
    polonnaruwa: 'https://images.unsplash.com/photo-1588598198516-5f89f0e300c6?w=600',
    dambulla: 'https://images.unsplash.com/photo-1586613835342-7d5e75e1d77b?w=600',
    colombo: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600',
  };

  // Find matching image
  for (const [key, url] of Object.entries(imageMap)) {
    if (title.includes(key)) {
      return url;
    }
  }

  // Use package images as fallback
  if (packageImages.length > 0) {
    return packageImages[dayNumber % packageImages.length];
  }

  return null;
}

const ItineraryDayCard = ({ 
  day, 
  dayNumber, 
  totalDays,
  packageImages = [],
  packageInterests = []
}: ItineraryDayCardProps) => {
  const [isOpen, setIsOpen] = useState(dayNumber === 1);
  const parsed = parseItinerary(day, packageInterests);
  const image = getDayImage(day, dayNumber, packageImages, packageInterests);
  
  const hasContent = parsed.morning.length > 0 || parsed.afternoon.length > 0 || parsed.evening.length > 0;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Day Number */}
          <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-primary font-medium">Day</span>
            <span className="text-2xl md:text-3xl font-bold text-primary">
              {String(dayNumber).padStart(2, '0')}
            </span>
          </div>
          
          {/* Title */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              {day.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{day.title.split('&')[0]?.trim() || 'Sri Lanka'}</span>
            </div>
          </div>
        </div>

        {/* Expand Icon */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-transform duration-300",
          isOpen && "rotate-180"
        )}>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-5 pt-2">
              <div className="grid md:grid-cols-[1fr,200px] lg:grid-cols-[1fr,240px] gap-5">
                {/* Left - Schedule */}
                <div className="space-y-4">
                  {/* Morning */}
                  {parsed.morning.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-500">
                        <Sun className="h-4 w-4" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Morning</span>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        {parsed.morning.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Afternoon */}
                  {parsed.afternoon.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-orange-500">
                        <Sunset className="h-4 w-4" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Afternoon</span>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        {parsed.afternoon.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Evening */}
                  {parsed.evening.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-indigo-500">
                        <Moon className="h-4 w-4" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Evening</span>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        {parsed.evening.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Overnight */}
                  {parsed.overnight && (
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-primary">
                        <Home className="h-4 w-4" />
                        <span className="text-sm font-medium">{parsed.overnight}</span>
                      </div>
                    </div>
                  )}

                  {/* Fallback if no structured content */}
                  {!hasContent && day.description && (
                    <p className="text-sm text-muted-foreground">{day.description}</p>
                  )}
                </div>

                {/* Right - Image */}
                {image && (
                  <div className="order-first md:order-last">
                    <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={day.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Fallback gradient if image fails */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-accent/20 -z-10" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItineraryDayCard;
