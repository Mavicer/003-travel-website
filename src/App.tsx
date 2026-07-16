import { useState, useCallback, useEffect } from 'react';
import Hero from './Hero';
import PopularDestinations from './components/PopularDestinations';
import DestinationPanel from './components/DestinationPanel/DestinationPanel';
import JourneysSection from './components/JourneysSection';
import SmartPicksSection from './components/SmartPicksSection';
import GallerySection from './components/GallerySection';
import GuideSection from './components/GuideSection';

type Page = 'home' | 'journeys' | 'smart-picks' | 'gallery' | 'guide';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
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
    setTimeout(() => setSelectedDestinationId(null), 400);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentPage('home');
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // ── Home Page ──
  if (currentPage === 'home') {
    return (
      <>
        <Hero
          onNavigate={handleNavigate}
          onQuickStart={() => {
            const el = document.getElementById('destinations');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onPlanMyTrip={() => {
            const el = document.getElementById('destinations');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <PopularDestinations onCardClick={handleCardClick} />
        <DestinationPanel
          destinationId={selectedDestinationId}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
        />
      </>
    );
  }

  // ── Sub Pages ──
  return (
    <>
      {currentPage === 'journeys' && (
        <JourneysSection onCardClick={handleCardClick} onBack={handleBack} />
      )}
      {currentPage === 'smart-picks' && (
        <SmartPicksSection onCardClick={handleCardClick} onBack={handleBack} />
      )}
      {currentPage === 'gallery' && (
        <GallerySection onBack={handleBack} />
      )}
      {currentPage === 'guide' && (
        <GuideSection onBack={handleBack} />
      )}
      <DestinationPanel
        destinationId={selectedDestinationId}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </>
  );
}

export default App;
