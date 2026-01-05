import { useState } from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TourPackage } from '@/types';
import { Button } from './button';
import { Badge } from './badge';
import { cn } from '@/lib/utils';
import { defaultFallbackImage } from '@/lib/assets';

interface PackageCardProps {
  package: TourPackage;
  index?: number;
  showPrice?: boolean;
}

export const PackageCard = ({ package: pkg, index = 0, showPrice = true }: PackageCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/packages/${pkg.slug}`}>
        <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={imgError ? defaultFallbackImage : pkg.heroImage}
              alt={pkg.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            
            {/* Travel Style Badge */}
            <Badge
              className={cn(
                'absolute top-4 left-4 capitalize',
                pkg.travelStyle === 'luxury' && 'bg-accent text-accent-foreground',
                pkg.travelStyle === 'mid' && 'bg-primary text-primary-foreground',
                pkg.travelStyle === 'budget' && 'bg-muted text-muted-foreground'
              )}
            >
              {pkg.travelStyle === 'mid' ? 'Mid-Range' : pkg.travelStyle}
            </Badge>

            {/* Price Tag */}
            {showPrice && (
              <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-1">
                <p className="text-sm text-muted-foreground">From</p>
                <p className="text-xl font-bold text-primary">${pkg.priceFromUSD}</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
              {pkg.title}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{pkg.durationDays}D/{pkg.durationNights}N</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{pkg.regions[0]}</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
              {pkg.shortDescription}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {pkg.highlights.slice(0, 2).map((highlight, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>

            {/* Rating & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{pkg.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({pkg.reviewCount} reviews)
                </span>
              </div>
              <Button size="sm" variant="ghost" className="group-hover:text-primary">
                View Details →
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
