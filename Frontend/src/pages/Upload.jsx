import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import BreedResultCard from "../components/BreedResultCard";
import SaveAnimalForm from "../pages/SaveAnimalForm";

const Upload = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleUploadComplete = async (uploadedImage) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", uploadedImage);

      const response = await fetch(
        `https://cattle-breed-recognition.onrender.com/api/breed/recognize`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Breed recognition failed");

      // Backend already returns JSON exactly as in your prompt
      const data = await response.json();
      // data.predictions is an array; use the first prediction
      const prediction = data?.predictions?.[0];

      if (!prediction) throw new Error("No prediction received");

      setResult({
        breed: prediction.class || "Unknown",
        confidence: prediction.confidence
          ? Number((prediction.confidence * 100).toFixed(1))
          : null,
        image: uploadedImage,
        characteristics: [], // Add later if your backend provides details
        additionalInfo: `Breed ID: ${prediction.class_id}`,
      });
    } catch (err) {
      console.error(err);
      alert("Error recognizing breed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadRobo = async (uploadedImage) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", uploadedImage);

      const response = await fetch(
        `https://cattle-breed-recognition.onrender.com/api/breed/roboflow`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Breed recognition failed");

      const data = await response.json();
      console.log(data);

      const prediction = data?.predictions?.[0];

      if (!prediction) throw new Error("No prediction received");

      setResult({
        breed: prediction.class || "Unknown",
        confidence: prediction.confidence
          ? Number((prediction.confidence * 100).toFixed(1)) 
          : null,
        image: uploadedImage, 
        characteristics: [], 
        additionalInfo: `Breed ID: ${prediction.class_id}`,
      });
    } catch (err) {
      console.error(err);
      alert("Error recognizing breed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewUpload = () => setResult(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Upload Image</h2>
        <p className="mt-2 text-gray-600">
          Upload a cattle image to get breed classification results
        </p>
      </div>
      {/* for gemini use "handleUploadComplete" */}
      {/* for roboflow use "handleUploadRobo" */}
      {!result ? (
        <ImageUploader
          onUploadComplete={handleUploadRobo}
          isLoading={isLoading}
        />
      ) : (
        <>
        <BreedResultCard result={result} onNewUpload={handleNewUpload} />
        <div className="mt-4">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save to Database
            </button>
          </div>
        </>
        
        
      )}

      {showForm && (
        <SaveAnimalForm
          prediction={result}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Upload;
