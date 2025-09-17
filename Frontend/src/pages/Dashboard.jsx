import React from 'react';
import { Upload, CheckCircle, BarChart3, Camera } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-8 px-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-2 text-gray-600">Welcome to the Cattle Breed Classification System</p>
      </div>
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-auto max-w-[900px]">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Upload</h3>
            <p className="text-gray-600">Upload cattle images for classification</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">Accurate Results</h3>
            <p className="text-gray-600">AI-powered breed detection</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
            <p className="text-gray-600">Track classification statistics</p>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 w-auto max-w-[900px]">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Upload Image</h4>
            <p className="text-gray-600">Upload a clear image of the cattle</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">2. AI Analysis</h4>
            <p className="text-gray-600">Our AI analyzes the cattle features</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Get Results</h4>
            <p className="text-gray-600">Receive breed classification results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
