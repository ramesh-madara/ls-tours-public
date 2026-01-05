import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Testimonial } from '@/types';
import { cn } from '@/lib/utils';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel = ({
  testimonials,
}: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden py-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-card"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-6 w-6',
                    i < testimonial.rating
                      ? 'fill-accent text-accent'
                      : 'text-muted'
                  )}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-center text-card-foreground mb-8 leading-relaxed">
              "{testimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
              />
              <div className="text-left">
                <p className="font-semibold text-card-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.country}
                </p>
                <p className="text-xs text-primary mt-1">
                  {testimonial.packageTitle}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card rounded-full p-3 shadow-card hover:shadow-card-hover transition-shadow"
        aria-label="Previous testimonial"
      >
        <svg
          className="w-5 h-5 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card rounded-full p-3 shadow-card hover:shadow-card-hover transition-shadow"
        aria-label="Next testimonial"
      >
        <svg
          className="w-5 h-5 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === current
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
