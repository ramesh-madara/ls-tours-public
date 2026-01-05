import { useEffect } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Car, User, Building, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PackageCard } from '@/components/ui/PackageCard';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchPackages } from '@/store/thunks/packagesThunks';
import { fetchDestinations } from '@/store/thunks/destinationsThunks';
import { services, testimonials } from '@/lib/mockData';
import { heroVideo } from '@/lib/assets';

const Index = () => {
  usePageTitle('LS Tours | Sri Lanka Tours');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items: packages, status: packagesStatus } = useAppSelector((state) => state.packages);
  const { items: destinations, status: destinationsStatus } = useAppSelector((state) => state.destinations);

  useEffect(() => {
    if (packagesStatus === 'idle') dispatch(fetchPackages());
    if (destinationsStatus === 'idle') dispatch(fetchDestinations());
  }, [dispatch, packagesStatus, destinationsStatus]);

  const featuredPackages = packages.filter((p) => p.featured).slice(0, 6);
  const featuredDestinations = destinations.slice(0, 8);

  const handlePlanMyTrip = () => {
    navigate('/packages');
    // Scroll to top after navigation
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const iconMap: Record<string, React.ReactNode> = {
    car: <Car className="h-8 w-8" />,
    user: <User className="h-8 w-8" />,
    building: <Building className="h-8 w-8" />,
    plane: <Plane className="h-8 w-8" />,
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Video/Image Background with overlays */}
        <HeroBackground
          videoSrc={heroVideo.url}
          fallbackImageSrc={heroVideo.fallback}
          posterSrc={heroVideo.poster}
        />

        {/* Animated ambient blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

        <div className="container relative z-10 text-center px-4 pt-16 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-primary font-semibold mb-4 text-lg tracking-wide uppercase"
            >
              Welcome to LS Tours
            </motion.p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Your Gateway to<br />
              <span className="text-gradient-premium">Sri Lanka's Beauty</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md">
              Discover ancient temples, pristine beaches, misty mountains, and exotic wildlife. 
              Let us craft your perfect Sri Lankan adventure.
            </p>
            <div className="flex justify-center">
              <Button 
                size="xl" 
                variant="hero" 
                className="shadow-glow group"
                onClick={handlePlanMyTrip}
              >
                Plan My Trip 
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '500+', label: 'Happy Travelers' },
              { value: '50+', label: 'Tour Packages' },
              { value: '8+', label: 'Destinations' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="bg-card/70 backdrop-blur-md rounded-xl p-4 shadow-card border border-border/50"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Wave divider at bottom */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-background">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,214.86,134.75,290.15,129.08,339.79,67.82,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-background">
        <div className="container">
          <SectionHeader
            title="Popular Tour Packages"
            subtitle="Handcrafted itineraries designed to showcase the best of Sri Lanka"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, i) => (
              <PackageCard key={pkg.id} package={pkg} index={i} showPrice={false} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/packages">View All Packages <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <SectionHeader
            title="Our Services"
            subtitle="Everything you need for a seamless Sri Lankan journey"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.slice(0, 4).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {iconMap[service.icon] || <Star className="h-8 w-8" />}
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/services">
                View More Services
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-background">
        <div className="container">
          <SectionHeader
            title="Explore Destinations"
            subtitle="From ancient cities to tropical beaches, discover Sri Lanka's diverse wonders"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/destinations">Explore All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <SectionHeader
            title="What Travelers Say"
            subtitle="Real experiences from real adventurers"
          />
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready for Your Sri Lankan Adventure?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
              Let's design your perfect itinerary. Get in touch with our travel experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="heroOutline">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button asChild size="xl" variant="heroOutline">
                <a href="https://wa.me/94781229308" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
