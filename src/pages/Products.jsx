import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../components/ProductCard";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/instant_jars_image_1_1_-min.png?v=1746614741",
      title: "100% Arabica Instant Coffee",
      description: "Rich flavour and genuine aroma, brews within seconds.",
      price: "729",
      tags: ["Real good coffee", "Ready in seconds"],
      buttonText: "Shop Now",
    },
    {
      id: 2,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/Frame_3-min.png?v=1746617371",
      title: "Cold Brew Bottle (Classic)",
      description: "Signature Cold Brew with milk & a little sugar — strong, refreshing and preservative‑free.",
      price: "1059",
      tags: ["Chilled & ready", "Strong coffee flavor"],
      buttonText: "Buy Bottle",
    },
    {
      id: 3,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/Hot_Brew_img.png?v=1641798896",
      title: "Hot Brew Coffee Bags",
      description: "5‑minute brew-ready bags made from 100% Arabica—same flavour as ground coffee.",
      price: "475",
      tags: ["Dip & sip", "Grade‑A Arabica"],
      buttonText: "Buy Hot Brew",
    },
    {
      id: 4,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/Bottles_img.png?v=1641799163",
      title: "Cold Brew Bottle (Hazelnut/Salted Caramel/Vanilla/Mocha)",
      description: "Iced coffee bottle with OG Cold Brew, milk & sugar, available in flavored variants.",
      price: "1059",
      tags: ["Flavoured", "Under 100 calories"],
      buttonText: "Grab Flavour",
    },
    {
      id: 5,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/Frame_3_1_-min.png?v=1746618105",
      title: "Cold Brew Bottle (Assorted Flavours)",
      description: "Packaged bottle set with a variety of ready-to-drink Cold Brew flavours.",
      price: "2999",
      tags: ["Assorted pack", "Break‑proof shipping"],
      buttonText: "Shop Assorted",
    },
    {
      id: 6,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/Frame_4-min.png?v=1746618490",
      title: "Coffee Beans / Ground Coffee",
      description: "Grade‑A Arabica beans—Dark Roast, French Vanilla, Hazelnut, Original.",
      price: "499",
      tags: ["Whole beans", "Freshly sealed"],
      buttonText: "Buy Beans",
    },
    {
      id: 7,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/Coffee_Beans_img.png?v=1641799641",
      title: "Hot Brew Bags (Dark Roast)",
      description: "Chocolatey & toasty dark roast in convenient brew bags.",
      price: "350",
      tags: ["Bold flavour", "High caffeine"],
      buttonText: "Buy Dark Brew",
    },
    {
      id: 8,
      image: "https://cdn.shopify.com/s/files/1/1308/0907/files/Group_3346_2_-min.png?v=1746619578",
      title: "Hot Brew Bags (Pumpkin Spice)",
      description: "Seasonal blend of clove, nutmeg, cinnamon—limited edition.",
      price: "300",
      tags: ["Spiced", "Limited edition"],
      buttonText: "Buy Pumpkin",
    },
  ]);

  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;

    // Animate title on load
    gsap.fromTo(title,
      { 
        opacity: 0, 
        y: -50,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }
    );

    // Parallax effect for background elements
    gsap.to(".bg-orb-1", {
      y: "-30%",
      x: "20%",
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".bg-orb-2", {
      y: "40%",
      x: "-30%",
      rotation: -360,
      duration: 25,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".bg-orb-3", {
      y: "-20%",
      x: "-10%",
      rotation: 180,
      duration: 30,
      repeat: -1,
      ease: "none"
    });

    // Scroll-triggered animations for background gradient
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const hue = 25 + (progress * 20); // Shift from warm to cooler tones
        document.documentElement.style.setProperty('--scroll-hue', hue);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const productVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(189, 178, 167, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(234, 179, 8, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(251, 146, 60, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #ffffff 0%, #fefcfb 25%, #fdf8f3 50%, #fcf4ed 75%, #f9f1ea 100%)
        `
      }}
    >
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="bg-orb-1 absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-amber-300/20 rounded-full blur-3xl"></div>
        <div className="bg-orb-2 absolute top-1/2 right-10 w-80 h-80 bg-gradient-to-bl from-yellow-200/15 to-orange-200/15 rounded-full blur-2xl"></div>
        <div className="bg-orb-3 absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-tr from-amber-200/20 to-orange-100/20 rounded-full blur-xl"></div>
        
        {/* Coffee beans floating animation */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-amber-800 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-3/4 left-1/6 w-3 h-3 bg-orange-700 rounded-full opacity-15 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-amber-700 rounded-full opacity-25 animate-bounce" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-[4rem] py-[3rem]">
        {/* Enhanced Header Section */}
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Decorative elements around title */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
          
          <motion.h1 
            ref={titleRef}
            className="relative text-[3rem] font-bold mb-4 bg-gradient-to-r from-gray-800 via-amber-700 to-orange-600 bg-clip-text text-transparent"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 30px rgba(234, 179, 8, 0.3)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get to know our products
            
            {/* Floating coffee steam effect */}
            <div className="absolute -top-4 -right-8 flex space-x-1">
              <motion.div
                className="w-1 h-8 bg-gradient-to-t from-gray-400 to-transparent rounded-full opacity-60"
                animate={{ 
                  scaleY: [1, 1.5, 1],
                  opacity: [0.6, 0.3, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0
                }}
              />
              <motion.div
                className="w-1 h-8 bg-gradient-to-t from-gray-400 to-transparent rounded-full opacity-40"
                animate={{ 
                  scaleY: [1, 1.8, 1],
                  opacity: [0.4, 0.2, 0.4]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3
                }}
              />
              <motion.div
                className="w-1 h-8 bg-gradient-to-t from-gray-400 to-transparent rounded-full opacity-50"
                animate={{ 
                  scaleY: [1, 1.3, 1],
                  opacity: [0.5, 0.25, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.6
                }}
              />
            </div>
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover our premium collection of carefully crafted coffee experiences, 
            from instant classics to artisanal cold brews
          </motion.p>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={productVariants}
              viewport={{ once: true, margin: "-50px" }}
              whileInView="visible"
              className="relative"
            >
              {/* Floating number indicator */}
              <motion.div
                className="absolute -left-8 top-8 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-20"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 8px 25px rgba(234, 179, 8, 0.3)"
                }}
              >
                {index + 1}
              </motion.div>

              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-20 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-12 rounded-3xl shadow-2xl border border-orange-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-transparent to-amber-100/20"></div>
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-4 relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              Ready to brew your perfect cup?
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-8 text-lg relative z-10"
              whileHover={{ color: "#ea580c" }}
            >
              Join thousands of coffee lovers who trust our premium blends
            </motion.p>
            <motion.button
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg relative z-10"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(234, 88, 12, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Shop All Products
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="w-6 h-10 border-2 border-orange-400 rounded-full mb-2 flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-orange-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <span className="text-orange-600 text-sm font-medium">Scroll</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Products;