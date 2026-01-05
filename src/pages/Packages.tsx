import { useEffect, useCallback } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchPackages } from '@/store/thunks/packagesThunks';
import { ArrowRight } from 'lucide-react';
import CustomizeTripSection from '@/components/packages/CustomizeTripSection';

const Packages = () => {
  usePageTitle('Packages | LS Tours');
  const dispatch = useAppDispatch();
  const { filteredItems, status } = useAppSelector((state) => state.packages);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPackages());
  }, [dispatch, status]);

  const scrollToCustomize = useCallback(() => {
    const section = document.getElementById('customize-trip');
    if (section) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }, []);

  return (
    <div className="py-12">
      <div className="container">
        {/* Header with CTA */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div className="max-w-2xl">
            <SectionHeader
              title="Tour Packages"
              subtitle="Explore our carefully curated Sri Lankan adventures"
              className="mb-0 text-left"
            />
          </div>
          <Button
            onClick={scrollToCustomize}
            className="group gap-2 w-full md:w-auto md:shrink-0"
            size="lg"
          >
            Customize Your Trip
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </Button>
        </div>
        
        {status === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((pkg, i) => (
              <PackageCard key={pkg.id} package={pkg} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Customize Trip Section */}
      <CustomizeTripSection />
    </div>
  );
};

export default Packages;
