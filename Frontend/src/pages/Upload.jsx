import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import BreedResultCard from '../components/BreedResultCard';

const Upload = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadComplete = (uploadedImage) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        breed: 'Holstein',
        confidence: 92.5,
        image: uploadedImage,
        characteristics: [
          'Black and white spotted pattern',
          'Large frame size',
          'High milk production capability',
          'Originated from Netherlands'
        ],
        additionalInfo: 'Holstein cattle are known for their high milk production and distinctive black and white markings.'
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleNewUpload = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Upload Image</h2>
        <p className="mt-2 text-gray-600">Upload a cattle image to get breed classification results</p>
      </div>
      
      {!result ? (
        <ImageUploader onUploadComplete={handleUploadComplete} isLoading={isLoading} />
      ) : (
        <BreedResultCard result={result} onNewUpload={handleNewUpload} />
      )}
    </div>
  );
};

export default Upload;