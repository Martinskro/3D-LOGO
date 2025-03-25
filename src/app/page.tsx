'use client';

import { useState, useRef } from 'react';
import LogoSpinner from '@/components/LogoSpinner';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsSpinning(true);
    }
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-white text-xl font-bold">3D ANIMATOR</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Free online photo to 3D-Animation
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The free online photo to animation tool lets you upload your photo image and convert it to a spinning 3D-animation in seconds.
          </p>

          {/* Upload Section */}
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition-colors"
              >
                Upload your photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Preview Section */}
            {previewUrl && (
              <div className="mt-8">
                <LogoSpinner
                  imageUrl={previewUrl}
                  isSpinning={isSpinning}
                  onSpinComplete={handleSpinComplete}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 