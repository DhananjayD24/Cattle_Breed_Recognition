import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/Upload';
import StatsPage from './pages/Stats';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard'); // default page

  let PageComponent;
  switch (currentPage) {
    case 'dashboard':
      PageComponent = <Dashboard />;
      break;
    case 'upload':
      PageComponent = <UploadPage />;
      break;
    case 'stats':
      PageComponent = <StatsPage />;
      break;
    default:
      PageComponent = <Dashboard />;
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {PageComponent}
    </Layout>
  );
};

export default App;
