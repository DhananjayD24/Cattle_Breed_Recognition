import React from 'react';

const Stats = () => {
  const stats = [
    { label: 'Total Classifications', value: '1,247', change: '+12%' },
    { label: 'Accuracy Rate', value: '94.2%', change: '+2.1%' },
    { label: 'Most Common Breed', value: 'Holstein', change: '35%' },
    { label: 'Images Processed Today', value: '23', change: '+15%' },
  ];

  const breedData = [
    { breed: 'Holstein', count: 435, percentage: 35 },
    { breed: 'Angus', count: 312, percentage: 25 },
    { breed: 'Hereford', count: 187, percentage: 15 },
    { breed: 'Brahman', count: 124, percentage: 10 },
    { breed: 'Others', count: 189, percentage: 15 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Statistics</h2>
        <p className="mt-2 text-gray-600">Overview of cattle breed classification analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-green-600 text-sm font-medium">
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Breed Distribution</h3>
        <div className="space-y-4">
          {breedData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded" style={{ 
                  backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                }}></div>
                <span className="font-medium text-gray-900">{item.breed}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;