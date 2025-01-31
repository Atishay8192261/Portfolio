"use client";
import { useState, useEffect } from 'react';
import { EntranceAnimationComponent } from '@/components/entrance-animation';
import PortfolioPage from '@/components/portfolio-page';

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Prevent flashing animation

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');

    if (hasSeenAnimation) {
      setShowPortfolio(true);
    }
    
    setIsLoading(false); // Only render after checking sessionStorage
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem('hasSeenAnimation', 'true');
    setShowPortfolio(true);
  };

  // Prevent rendering until the session check is complete
  if (isLoading) return null; 

  return (
    <div className="min-h-screen">
      {!showPortfolio ? (
        <EntranceAnimationComponent onComplete={handleAnimationComplete} />
      ) : (
        <PortfolioPage />
      )}
    </div>
  );
}
