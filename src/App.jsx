import React, { useState } from 'react';
import Nav from './components/Nav';
import Mainroutes from './routes/Mainroutes';
import Loader from './components/Loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className='w-full min-h-screen'>
      {isLoading ? (
        <Loader onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <Nav />
          <Mainroutes />
        </>
      )}
    </div>
  );
};

export default App;
