import React, { useState } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen font-['Helvatica_Now_Display']">
      <CustomCursor />

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
