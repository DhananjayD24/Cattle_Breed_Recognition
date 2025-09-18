import React from 'react';
import { CheckCircle } from 'lucide-react';

const BreedResultCard = ({ result, onNewUpload }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Classification Result</h3>
          <button
            onClick={onNewUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload New Image
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {/* <div>
            <img 
              src={result.image} 
              alt="Analyzed cattle"
              className="w-full rounded-lg shadow-md"
            />
          </div> */}
          
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{result.breed}</h4>
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-lg font-semibold text-green-600">
                  {result.confidence}% Confidence
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Key Characteristics:</h5>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{char}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-900 mb-2">Additional Information:</h5>
              <p className="text-blue-800">{result.additionalInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedResultCard;