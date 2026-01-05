import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users } from 'lucide-react';
import { Destination } from '@/types';
import { Badge } from './badge';
import { Button } from './button';
import { defaultFallbackImage } from '@/lib/assets';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DestinationDrawerProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DestinationDrawer = ({
  destination,
  isOpen,
  onClose,
}: DestinationDrawerProps) => {
  const [imgError, setImgError] = useState(false);
  const isMobile = useIsMobile();

  // Reset image error when destination changes
  useEffect(() => {
    setImgError(false);
  }, [destination?.id]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!destination) return null;

  const drawerVariants = isMobile
    ? {
        hidden: { y: '100%' },
        visible: { y: 0 },
        exit: { y: '100%' },
      }
    : {
        hidden: { x: '100%' },
        visible: { x: 0 },
        exit: { x: '100%' },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed z-50 bg-background shadow-2xl overflow-hidden ${
              isMobile
                ? 'inset-x-0 bottom-0 rounded-t-3xl max-h-[90vh]'
                : 'right-0 top-0 h-full w-full max-w-[480px] border-l border-border'
            }`}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
              </div>
            )}

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Scrollable content */}
            <div className={`overflow-y-auto ${isMobile ? 'max-h-[calc(90vh-24px)]' : 'h-full'}`}>
              {/* Hero image */}
              <div className="relative h-64 sm:h-72 lg:h-80">
                <img
                  src={imgError ? defaultFallbackImage : destination.heroImage}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 -mt-16 relative">
                {/* Title & tags */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">
                    {destination.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                {/* Quick info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Best Time to Visit</p>
                      <p className="text-sm font-medium">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Recommended Stay</p>
                      <p className="text-sm font-medium">2-3 days</p>
                    </div>
                  </div>
                </div>

                {/* Ideal for */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Great For</p>
                    <p className="text-sm font-medium">
                      {destination.tags.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Experiences */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Top Experiences
                  </h3>
                  <ul className="space-y-3">
                    {destination.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                          {i + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Region badge */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Region</p>
                  <Badge variant="outline" className="text-sm">
                    {destination.region}
                  </Badge>
                </div>

                {/* Bottom padding for mobile */}
                {isMobile && <div className="h-6" />}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
