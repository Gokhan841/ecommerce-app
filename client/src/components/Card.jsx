import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../contexts/Basket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Modern Animated Add to Cart Button
const AnimatedAddToCartButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative overflow-hidden w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-lg shadow-lg group"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
    >
      {/* Shimmering background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 1
        }}
      />
      
      {/* Hover background change */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Pulsing effect */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-white/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        <motion.span
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="text-sm" />
          Add to Cart
        </motion.span>
        
        {/* Animated arrow that appears on hover */}
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm"
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
};

const Card = ({ item }) => {
    const { addToBasket } = useBasket();
    const [isWishlisted, setIsWishlisted] = useState(false);
    
    // Mock data
    const originalPrice = item.price * 1.2;
    const discount = Math.round(((originalPrice - item.price) / originalPrice) * 100);
    
    // Mock rating data
    const rating = 4.8;
    const reviewCount = 8732;

    // Generate stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                );
            } else if (i === fullStars + 1 && rating % 1 !== 0) {
                stars.push(
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 opacity-50" />
                );
            } else {
                stars.push(
                    <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />
                );
            }
        }
        return stars;
    };

    return (
        <motion.div 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 flex flex-col h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -5 }}
        >
            {/* Image Container */}
            <div className="relative group">
                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        -{discount}%
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                >
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={`text-sm ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                    />
                </button>

                <Link to={`/product/${item._id || item.id}`}>
                    <img
                        src={item.photos?.[0] || item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            {/* Content - Flex grow to push button to bottom */}
            <div className="p-3 flex flex-col flex-grow">
                {/* Category */}
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
                    {item.category || 'Electronics'}
                </p>

                {/* Title - Fixed height for 2 lines */}
                <Link to={`/product/${item._id || item.id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2 leading-tight h-10 overflow-hidden">
                        {item.title}
                    </h3>
                </Link>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-1 text-xs">
                        {renderStars(rating)}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{rating}</span>
                    <span className="text-xs text-gray-500">({reviewCount.toLocaleString()})</span>
                </div>

                {/* Description - Max 2 lines */}
                <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {item.description || "High quality product with excellent features and modern design. Perfect for everyday use with great durability and style."}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    {discount > 0 && (
                        <span className="text-xs text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                    )}
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-grow"></div>

                {/* Modern Animated Add to Cart Button */}
                <AnimatedAddToCartButton onClick={() => addToBasket(item)} />
            </div>
        </motion.div>
    );
};

export default Card;
