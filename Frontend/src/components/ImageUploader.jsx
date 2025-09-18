import React, { useState } from 'react';
import { FileImage, CheckCircle } from 'lucide-react';

const ImageUploader = ({ onUploadComplete, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
const [preview, setPreview] = useState(null);
  

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
  if (file.type.startsWith('image/')) {
    setSelectedImage(file);        // <-- store the real File
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result); // <-- separate preview
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image file.');
  }
};

  const handleUpload = () => {
  if (selectedImage) {
    onUploadComplete(selectedImage); // <-- send the File object
  }
};

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Image...</h3>
        <p className="text-gray-600">Our AI is processing your cattle image to determine the breed.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : selectedImage 
              ? 'border-green-300 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {preview ? (
          <div className="space-y-4">
            <img 
              src={preview} 
              alt="Selected cattle" 
              className="max-h-64 mx-auto rounded-lg shadow-md"
            />
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle size={20} />
              <span className="font-medium">Image selected successfully!</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FileImage className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">Drop your cattle image here</p>
              <p className="text-gray-600">or click to browse files</p>
            </div>
            <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP up to 10MB</p>
          </div>
        )}
      </div>
      
      {selectedImage && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Choose Different Image
          </button>
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Classify Breed
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;