import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { DestinationDrawer } from '@/components/ui/DestinationDrawer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchDestinations } from '@/store/thunks/destinationsThunks';
import { Destination } from '@/types';

interface LocationState {
  openDestinationSlug?: string;
  preserveScroll?: boolean;
}

const Destinations = () => {
  usePageTitle('Destinations | LS Tours');
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { items, status } = useAppSelector((state) => state.destinations);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hasOpenedFromState = useRef(false);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchDestinations());
  }, [dispatch, status]);

  // Handle opening drawer from navigation state (footer links)
  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.openDestinationSlug && items.length > 0 && !hasOpenedFromState.current) {
      const destination = items.find(
        (dest) => dest.slug === state.openDestinationSlug
      );
      if (destination) {
        setSelectedDestination(destination);
        setIsDrawerOpen(true);
        hasOpenedFromState.current = true;
        // Clear the state to prevent re-opening on subsequent renders
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, items]);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="py-12">
      <div className="container">
        <SectionHeader
          title="Destinations"
          subtitle="Explore the diverse wonders of Sri Lanka"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((dest, i) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              index={i}
              onClick={() => handleDestinationClick(dest)}
            />
          ))}
        </div>
      </div>

      <DestinationDrawer
        destination={selectedDestination}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default Destinations;
