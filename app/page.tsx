"use client";
import { useState } from 'react';
import { EntranceAnimationComponent } from '@/components/entrance-animation';
import Portfolio from '@/components/portfolio-page';

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  return (
    <div className="min-h-screen">
      {!showPortfolio ? (
        <EntranceAnimationComponent onComplete={() => setShowPortfolio(true)} />
      ) : (
        <Portfolio />
      )}
    </div>
  );
}
