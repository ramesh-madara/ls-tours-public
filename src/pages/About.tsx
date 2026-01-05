import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Languages, 
  Headphones,
  Heart,
  Shield,
  Compass,
  Leaf,
  BadgeCheck,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePageTitle } from '@/hooks/usePageTitle';
import { scrollToTopSmooth } from '@/lib/scrollUtils';

const HERO_VIDEO_URL = 'https://cdn.pixabay.com/video/2023/09/24/182082-867762198_large.mp4';

const quickFacts = [
  { icon: MapPin, label: 'Based in Colombo' },
  { icon: Calendar, label: 'Since 2015' },
  { icon: Users, label: 'Private & group tours' },
  { icon: Languages, label: 'English-speaking guides' },
  { icon: Headphones, label: '24/7 support' },
];

const features = [
  {
    icon: Compass,
    title: 'Local Expertise',
    description: "Born and raised in Sri Lanka, we know the hidden gems and best-kept secrets.",
  },
  {
    icon: Heart,
    title: 'Handpicked Stays',
    description: "Trusted boutique hotels and eco-lodges personally vetted by our team.",
  },
  {
    icon: Shield,
    title: 'Flexible Itineraries',
    description: "Your trip, your pace. We adapt plans to match your interests.",
  },
  {
    icon: Leaf,
    title: 'Responsible Travel',
    description: "Supporting local communities and preserving Sri Lanka's natural beauty.",
  },
  {
    icon: Wallet,
    title: 'Transparent Pricing',
    description: "No hidden fees. What you see is what you pay.",
  },
  {
    icon: BadgeCheck,
    title: '24/7 Support',
    description: "We're always a call away throughout your journey.",
  },
];

const About = () => {
  usePageTitle('About | LS Tours');
  const navigate = useNavigate();
  const [useImageFallback, setUseImageFallback] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for data saver mode
    const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = connection?.saveData || false;
    const slowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    
    if (prefersReducedMotion || saveData || slowConnection) {
      setUseImageFallback(true);
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setUseImageFallback(true);
      });
    }
  }, []);

  const handleGetQuote = () => {
    navigate('/contact');
    scrollToTopSmooth();
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          {/* Loading shimmer overlay */}
          {!isVideoLoaded && !useImageFallback && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-accent/20 animate-pulse" />
          )}

          {!useImageFallback && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23134e4a' width='100%25' height='100%25'/%3E%3C/svg%3E"
              onError={() => setUseImageFallback(true)}
              onCanPlay={() => setIsVideoLoaded(true)}
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src={HERO_VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Fallback gradient background */}
          {useImageFallback && (
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-900" />
          )}

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Badge 
                variant="secondary" 
                className="bg-emerald-500/90 text-white border border-emerald-400/50 shadow-md shadow-black/20 dark:shadow-black/40 hover:bg-emerald-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 px-4 py-1.5 text-sm font-medium"
              >
                Local Experts
              </Badge>
              <Badge 
                variant="secondary" 
                className="bg-teal-500/90 text-white border border-teal-400/50 shadow-md shadow-black/20 dark:shadow-black/40 hover:bg-teal-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 px-4 py-1.5 text-sm font-medium"
              >
                Custom Itineraries
              </Badge>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              About LS Tours
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Your trusted partner for Sri Lankan journeys since 2015
            </p>
            <p className="text-lg text-white/80 max-w-xl">
              From iconic heritage sites to beach sunsets and misty hill country, we craft journeys that feel personal, safe, and unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story + Quick Facts Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                LS Tours is a Sri Lanka–based travel company built by locals who love sharing our island with the world. Since 2015, we've designed trips for couples, families, groups, and solo travelers—balancing must-see highlights with authentic experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're climbing ancient rock fortresses, sipping freshly brewed Ceylon tea in misty plantations, or watching elephants roam free at dusk, we make sure every moment counts.
              </p>

              <div className="pt-4">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Our Promise
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We plan as if it's our own trip: honest guidance, reliable partners, comfortable transport, and itineraries tailored to your pace. No cookie-cutter packages—just journeys that feel right.
                </p>
              </div>
            </motion.div>

            {/* Quick Facts Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Quick Facts
                </h3>
                <ul className="space-y-4">
                  {quickFacts.map((fact, index) => (
                    <motion.li
                      key={fact.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <fact.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{fact.label}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We don't just plan trips—we create experiences that stay with you long after you've returned home.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Plan Your Trip?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create a journey that's uniquely yours. Tell us your dreams, and we'll handle the rest.
            </p>
            <Button 
              size="lg" 
              onClick={handleGetQuote}
              className="px-8"
            >
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
