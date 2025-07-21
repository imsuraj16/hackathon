import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ProductCard = ({ image, title, description, price, tags, buttonText }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex items-center justify-between gap-8 flex-wrap mb-12 p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #ffffff 0%, #f8f7f6 50%, #f0ebe6 100%)`
      }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-200/30 to-transparent rounded-full blur-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />

      {/* Image Container */}
      <motion.div 
        className="relative w-[35rem] h-[35rem] overflow-hidden rounded-2xl shadow-lg"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
        <motion.img 
          ref={imageRef}
          className="w-full h-full object-cover" 
          src={image} 
          alt={title}
          variants={imageVariants}
          whileHover="hover"
        />
        
        {/* Floating price badge */}
        <motion.div
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <span className="text-orange-600 font-bold text-lg">${price}</span>
        </motion.div>
      </motion.div>

      {/* Content Container */}
      <motion.div 
        className="max-w-[30rem] space-y-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 leading-relaxed text-lg"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* Animated Button */}
        <motion.button
          className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg overflow-hidden group/btn"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(234, 88, 12, 0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {buttonText}
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>

        {/* Tags with staggered animation */}
        <motion.div 
          className="space-y-2"
          variants={containerVariants}
        >
          {tags.map((tag, idx) => (
            <motion.div
              key={idx}
              className="flex items-center text-gray-700"
              variants={itemVariants}
              whileHover={{ 
                x: 10, 
                color: "#ea580c",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className="w-2 h-2 bg-orange-400 rounded-full mr-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.8 + idx * 0.1, 
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }}
                whileHover={{ scale: 1.5 }}
              />
              <span className="text-sm font-medium">{tag}</span>
            </motion.div>
          ))}
          
          <motion.div 
            className="font-bold text-xl mt-4 text-gray-900 flex items-center"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <span className="text-orange-600 mr-2">Starting at</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 1.2, 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
            >
              ${price}
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle animated border */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(189, 178, 167, 0.3) 50%, transparent 70%)`,
          backgroundSize: '200% 200%'
        }}
        whileHover={{ opacity: 1 }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          backgroundPosition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          },
          opacity: {
            duration: 0.3
          }
        }}
      />
    </motion.div>
  );
};

export default ProductCard;