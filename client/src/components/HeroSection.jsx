import React, { useState } from 'react';
import './HeroSection.css';
import AnimatedBorderButton from './AnimatedBorderButton';
import { motion } from 'framer-motion';

// Yeni animasyonlu buton componenti
const AnimatedGradientButton = () => {
  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Dış gradient container - Kalın border */}
      <motion.div
        className="w-36 h-14 rounded-full flex items-center justify-center"
        animate={{
          background: [
            "conic-gradient(from 0deg, #ff0080, #00ff80, #8000ff, #ff8000, #0080ff, #ff0080)",
            "conic-gradient(from 60deg, #ff0080, #00ff80, #8000ff, #ff8000, #0080ff, #ff0080)",
            "conic-gradient(from 120deg, #ff0080, #00ff80, #8000ff, #ff8000, #0080ff, #ff0080)",
            "conic-gradient(from 180deg, #ff0080, #00ff80, #8000ff, #ff8000, #0080ff, #ff0080)",
            "conic-gradient(from 240deg, #ff0080, #00ff80, #8000ff, #ff8000, #0080ff, #ff0080)",
            "conic-gradient(from 300deg, #ff0080, #00ff80, #8000ff, #ff8000, #0080ff, #ff0080)",
            "conic-gradient(from 360deg, #ff0080, #00ff80, #8000ff, #ff8000, #0080ff, #ff0080)"
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* İç beyaz container - Border kalınlığını belirler */}
        <div className="w-[140px] h-[52px] rounded-full bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <button className="text-gray-800 font-semibold text-sm">
            Discover More
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Kategori için özel animasyonlu buton
const CategoryButton = ({ category }) => {
  return (
    <motion.button
      className="relative overflow-hidden rounded-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg group"
      whileHover={{ scale: 1.1, rotateY: 5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 150 }}
    >
      {/* Shimmering background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Hover background change */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Pulsing outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        whileHover={{
          boxShadow: [
            "0 0 20px rgba(255,255,255,0.5)",
            "0 0 30px rgba(147,51,234,0.7)",
            "0 0 20px rgba(255,255,255,0.5)"
          ]
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        <motion.span
          whileHover={{ x: -2 }}
          transition={{ duration: 0.2 }}
        >
          Shop {category.name}
        </motion.span>
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: 2 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
};

// Kategori Grid Bileşeni
const CategoryGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    {
      id: 1,
      name: 'Fashion',
      description: 'Trendy clothes & accessories',
      image: 'https://plus.unsplash.com/premium_photo-1683121263622-664434494177?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Electronics',
      description: 'Latest tech & gadgets',
      image: 'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'Home',
      description: 'Decor & furniture',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Sports',
      description: 'Athletic gear & equipment',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Beauty',
      description: 'Skincare & cosmetics',
      image: 'https://plus.unsplash.com/premium_photo-1679064287823-fbd549bf47dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGJlYXV0eXxlbnwwfHwwfHx8MA%3D%3D'
    }
  ];

  return (
    <div className="h-full flex flex-row gap-2 p-2">
      {categories.map((category, index) => {
        const isActive = activeIndex === index;
        
        return (
          <motion.div
            key={category.id}
            className={`relative rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-500 ease-out ${
              isActive ? 'flex-grow' : 'w-12'
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            whileHover={{ scale: 1.02 }}
            style={{
              minWidth: isActive ? '120px' : '48px'
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
              style={{
                backgroundImage: `url(${category.image})`,
                transform: isActive ? 'scale(1.1)' : 'scale(1)'
              }}
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Content - Sadece hover'da görünür */}
            {isActive && (
              <motion.div 
                className="relative z-10 h-full flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="text-center text-white space-y-3">
                  <motion.h3 
                    className="text-lg font-bold"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {category.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm opacity-90 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {category.description}
                  </motion.p>
                  
                  <CategoryButton category={category} />
                </div>
              </motion.div>
            )}
            
            {/* Active Indicator */}
            {isActive && (
              <motion.div
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ delay: 0.4 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="relative bg-gray-100 p-4 lg:p-8">
      <div className="flex gap-4 lg:gap-6 min-h-[400px] lg:min-h-[500px]">

        {/* Sol Taraf - %65 (Large+), %100 (Mobile) */}
        <div className="w-full lg:w-[65%] rounded-2xl overflow-hidden shadow-xl relative">

          {/* Mobile Layout - Vertical Stack (SM ve daha küçük) */}
          <div className="sm:hidden h-full flex flex-col">
            {/* Text Area - Top Half (Blue) */}
            <div className="h-1/2 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-6">
              <div className="max-w-lg text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                  It's not too late
                </h1>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  Special can be speedy with small shops
                </p>
                <AnimatedGradientButton />
              </div>
            </div>

            {/* Image Area - Bottom Half */}
            <div
              className="h-1/2 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1672883551967-ab11316526b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              }}
            >
            </div>
          </div>

          {/* Tablet+ Layout - Side by Side (SM ve daha büyük) */}
          <div className="hidden sm:block h-full bg-gradient-to-br from-blue-100 to-blue-200 relative">
            {/* Text Content - Sol tarafta */}
            <div className="absolute left-0 top-0 h-full w-1/2 sm:w-3/5 flex items-center justify-center p-8 sm:p-12 z-10">
              <div className="max-w-lg text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                  It's not too late
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  Special can be speedy with small shops
                </p>
                <AnimatedGradientButton />
              </div>
            </div>

            {/* Circular Image Area - Sağ tarafta daire parçası */}
            <div className="absolute right-0 top-0 h-full w-3/5 sm:w-2/5 hero-circular-clip">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1672883551967-ab11316526b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
              >
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - %35 (Sadece Large+) - Kategori Grid */}
        <div className="hidden lg:block w-[35%]">
          <CategoryGrid />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-12 right-12 w-3 h-3 bg-blue-400 rounded-full opacity-60 hidden lg:block animate-pulse"></div>
      <div className="absolute bottom-16 right-20 w-2 h-2 bg-purple-400 rounded-full opacity-70 hidden lg:block animate-bounce"></div>
    </div>
  );
};

export default HeroSection; 