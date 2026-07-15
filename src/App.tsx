import { useState, useCallback } from 'react';
import Hero from './Hero';
import PopularDestinations from './components/PopularDestinations';
import DestinationModal from './components/DestinationModal';
import type { Destination } from './data/destinations';

function App() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const handleCardClick = useCallback((destination: Destination) => {
    setSelectedDestination(destination);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedDestination(null);
  }, []);

  return (
    <>
      <Hero />
      <PopularDestinations onCardClick={handleCardClick} />
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default App;
