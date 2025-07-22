import React from "react";
import Section1 from "../sections/Section1";
import Section2 from "../sections/Section2";
import Section3 from "../sections/Section3";
import Section5 from "../sections/Section5";
import Footer from "../sections/Footer";
import Section6 from "../sections/Section6";
import Section7 from "../sections/Section7";


const Home = () => {
  return (
    <div className="w-full min-h-screen">
     <Section1/>
     <Section2/>
     <Section3/>
     <Section5/>
     <Section6/>
     <Section7/>
     <Footer/>
    </div>
  );
};

export default Home;
