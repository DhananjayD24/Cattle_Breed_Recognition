import React from 'react';
import { Upload, CheckCircle, BarChart3, Camera } from 'lucide-react';

const Dashboard = ({setCurrentPage}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex flex-col items-center w-full space-y-12 px-4 py-8">
        {/* Header with enhanced styling */}
        <div className="text-center relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-2 -right-6 w-16 h-16 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 blur-lg"></div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent relative z-10">
            Dashboard
          </h2>
          <p className="mt-3 text-lg text-gray-600 relative z-10">Welcome to the Cattle Breed Classification System</p>
        </div>
        
        {/* Quick Stats Cards with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-auto max-w-[1000px]">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200 flex items-center hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Upload className="w-11 h-8 text-blue-600" />
            </div>
            <div onClick={() => setCurrentPage('upload')} className="ml-6">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Quick Upload</h3>
              <p className="text-gray-600 mt-1">Upload cattle images for classification</p>
            </div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-green-200 flex items-center hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <CheckCircle className="w-11 h-8 text-green-600" />
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">Accurate Results</h3>
              <p className="text-gray-600 mt-1">AI-powered breed detection</p>
            </div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-purple-200 flex items-center hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BarChart3 className="w-11 h-8 text-purple-600" />
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Analytics</h3>
              <p className="text-gray-600 mt-1">Track classification statistics</p>
            </div>
          </div>
        </div>

        {/* How it works section with enhanced styling */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-gray-100 w-auto max-w-[1000px] relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-full opacity-50"></div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center relative z-10">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative z-10">
            <div className="group flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative">
                <Upload className="w-10 h-10 text-blue-600" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">1. Upload Image</h4>
              <p className="text-gray-600 leading-relaxed">Upload a clear image of the cattle</p>
            </div>
            
            <div className="group flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative">
                <Camera className="w-10 h-10 text-green-600" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">2. AI Analysis</h4>
              <p className="text-gray-600 leading-relaxed">Our AI analyzes the cattle features</p>
            </div>
            
            <div className="group flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative">
                <CheckCircle className="w-10 h-10 text-purple-600" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">3. Get Results</h4>
              <p className="text-gray-600 leading-relaxed">Receive breed classification results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;