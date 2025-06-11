import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../../contexts/Basket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Modern Animated Plus Button for Slider Card
const AnimatedPlusButton = ({ onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            className="relative overflow-hidden w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg group"
            whileHover={{ 
                scale: 1.15,
                rotate: 90,
                boxShadow: "0 8px 20px rgba(168,85,247,0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
                duration: 0.3, 
                type: "spring", 
                stiffness: 200,
                delay: 0.1
            }}
        >
            {/* Rotating gradient background */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    background: [
                        "conic-gradient(from 0deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)",
                        "conic-gradient(from 120deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)",
                        "conic-gradient(from 240deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)",
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            
            {/* Pulsing ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 0, 0.8]
                }}
                transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            />
            
            {/* Inner button */}
            <motion.div
                className="relative z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center"
                whileHover={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
            >
                <FontAwesomeIcon 
                    icon={faPlus} 
                    className="text-xs text-purple-600"
                />
            </motion.div>
        </motion.button>
    );
};

const SliderCard = ({ item }) => {
    const { addToBasket } = useBasket();
    const [isWishlisted, setIsWishlisted] = useState(false);
    
    // Mock rating
    const rating = 4.8;

    return (
        <motion.div 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
        >
            {/* Image Container - Compact */}
            <div className="relative">
                {/* Wishlist Button */}
                <motion.button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={`text-xs ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                    />
                </motion.button>

                <Link to={`/product/${item._id || item.id}`}>
                    <motion.img
                        src={item.photos?.[0] || item.image}
                        alt={item.title}
                        className="w-full h-32 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </Link>
            </div>

            {/* Content - Compact Layout */}
            <div className="p-3">
                {/* Category - Small */}
                <p className="text-xs text-blue-600 font-medium mb-1 truncate">
                    {item.category || 'Electronics'}
                </p>

                {/* Title - Single line with ellipsis */}
                <Link to={`/product/${item._id || item.id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 truncate leading-tight">
                        {item.title}
                    </h3>
                </Link>

                {/* Rating - Minimal */}
                <div className="flex items-center gap-1 mb-2">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                    <span className="text-xs font-medium text-gray-700">{rating}</span>
                    <span className="text-xs text-gray-400">(2k+)</span>
                </div>

                {/* Price and Add Button - Horizontal */}
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    
                    {/* Modern Animated Plus Button */}
                    <AnimatedPlusButton onClick={() => addToBasket(item)} />
                </div>
            </div>
        </motion.div>
    );
};

export default SliderCard; 