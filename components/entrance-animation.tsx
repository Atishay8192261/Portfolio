'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, useAnimation } from 'framer-motion';

export function EntranceAnimationComponent({ onComplete }: { onComplete: () => void }) {
  const [showContent, setShowContent] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (showContent) {
      controls
        .start({ opacity: 0, y: '-100vh', transition: { duration: 1.5, ease: 'easeInOut' } })
        .then(() => onComplete());
    }
  }, [showContent, controls, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center"
      animate={controls}
      initial={{ opacity: 1, y: 0 }}
    >
      <div className="w-[1440px] h-[900px] bg-black rounded-lg p-8 relative overflow-hidden font-mono flex flex-col items-center justify-center">
        {/* First heading */}
        <TypeAnimation
          sequence={[
            'Hi My Name is Atishay Jian', // Intentional typo
            2000, // Reduced pause duration
            'Hi My Name is Atishay Jain', // Correction
            2000,
            () => setShowContent(true),
          ]}
          wrapper="h1"
          cursor={true}
          repeat={0}
          speed={50} // Faster typing speed
          style={{
            fontSize: '3em',
            display: 'inline-block',
            textAlign: 'center',
            width: '100%',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
        {/* Second heading */}
        <TypeAnimation
          sequence={[
            'I Breathe!',
            2000, // Reduced pause duration
            'I Code;',
            2000,
            'I Chug Coffee...',
            2000,
          ]}
          wrapper="h2"
          cursor={true}
          repeat={Infinity}
          speed={50} // Faster typing speed
          style={{
            fontSize: '2em',
            display: 'inline-block',
            textAlign: 'center',
            width: '100%',
            marginTop: '1em',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
      </div>
    </motion.div>
  );
}
