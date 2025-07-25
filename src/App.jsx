import React, { useState } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen font-['Helvatica_Now_Display'] bg-[#BDB2A7]">
      <CustomCursor />
      <ScrollToTop /> 
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
