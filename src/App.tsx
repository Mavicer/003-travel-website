import { useState, useCallback, useEffect } from 'react';
import Hero from './Hero';
import PopularDestinations from './components/PopularDestinations';
import DestinationPanel from './components/DestinationPanel/DestinationPanel';

function App() {
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    string | null
  >(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleCardClick = useCallback((id: string) => {
    setSelectedDestinationId(id);
    setIsPanelOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    document.body.style.overflow = '';
    // Delay clearing id until exit animation completes
    setTimeout(() => setSelectedDestinationId(null), 400);
  }, []);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <Hero />
      <PopularDestinations onCardClick={handleCardClick} />
      <DestinationPanel
        destinationId={selectedDestinationId}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
}

export default App;
