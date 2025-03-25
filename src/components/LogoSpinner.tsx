import Image from 'next/image';
import { useState, useEffect } from 'react';

interface LogoSpinnerProps {
  imageUrl: string;
  isSpinning: boolean;
  onSpinComplete?: () => void;
}

export default function LogoSpinner({ imageUrl, isSpinning, onSpinComplete }: LogoSpinnerProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;

      if (isSpinning) {
        setRotation((elapsed / 20) % 360); // Adjust speed by changing divisor
        animationFrameId = requestAnimationFrame(animate);
      } else if (onSpinComplete) {
        onSpinComplete();
      }
    };

    if (isSpinning) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isSpinning, onSpinComplete]);

  return (
    <div className="relative w-64 h-64 mx-auto perspective-1000">
      <div
        className="relative w-full h-full transform-style-3d transition-transform duration-100"
        style={{
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        <div className="absolute inset-0 backface-hidden">
          <Image
            src={imageUrl}
            alt="Spinning Logo"
            fill
            className="object-contain rounded-lg"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
} 