import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Destination } from '@/types';
import { Badge } from './badge';
import { defaultFallbackImage } from '@/lib/assets';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  onClick?: () => void;
}

export const DestinationCard = ({
  destination,
  index = 0,
  onClick,
}: DestinationCardProps) => {
  const [imgError, setImgError] = useState(false);

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative h-80 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500">
        <img
          src={imgError ? defaultFallbackImage : destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">
            {destination.name}
          </h3>
          <p className="text-primary-foreground/80 text-sm mb-3 line-clamp-2">
            {destination.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {destination.tags.slice(0, 3).map((tag, i) => (
              <Badge
                key={i}
                className="bg-primary-foreground/20 text-primary-foreground border-none backdrop-blur-sm text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Arrow Button - Always visible */}
        <button
          onClick={handleArrowClick}
          aria-label="View details"
          className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2.5 shadow-lg transition-all duration-300 hover:scale-110 group/arrow"
        >
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/arrow:translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
};
