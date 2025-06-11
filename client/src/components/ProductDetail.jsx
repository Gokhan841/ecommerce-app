import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchProduct } from '../api';
import { useQuery } from '@tanstack/react-query';
import Slider from "react-slick";
import { useBasket } from '../contexts/Basket';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faShoppingCart, faArrowLeft, faShare, faTruck, faShield, faUndo } from '@fortawesome/free-solid-svg-icons';
import ProductSlider from './sliders/ProductSlider';
import useProductlist from '../hooks/useProductlist';

// Modern Add to Cart Button
const ModernAddToCartButton = ({ onClick, isLoading }) => {
    return (
        <motion.button
            onClick={onClick}
            disabled={isLoading}
            className="relative overflow-hidden w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg group disabled:opacity-50"
            whileHover={{ 
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
        >
            {/* Shimmering effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: 1
                }}
            />
            
            {/* Hover background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                {isLoading ? 'Adding...' : 'Add to Cart'}
                <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    →
                </motion.span>
            </span>
        </motion.button>
    );
};

const ProductDetail = () => {
    const { productId } = useParams();
    const { addToBasket } = useBasket();
    const navigate = useNavigate();
    const { products, loading: productsLoading } = useProductlist();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => FetchProduct(productId),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product details...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    className="text-center p-8 bg-white rounded-xl shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <p className="text-red-600 text-lg mb-4">Error: {error.response?.data?.message || error.message}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back
                    </button>
                </motion.div>
            </div>
        );
    }

    const product = data?.data;
    const photos = product?.photos && product.photos.length > 0 ? product.photos : [product?.image || 'https://via.placeholder.com/600'];
    
    // Mock data for enhanced product info
    const rating = 4.8;
    const reviewCount = 2847;
    const inStock = true;

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        
        // Add multiple quantities if selected
        for (let i = 0; i < quantity; i++) {
            addToBasket(product);
        }
        
        // Simulate loading for better UX
        setTimeout(() => {
            setIsAddingToCart(false);
        }, 800);
    };

    const sliderSettings = {
        dots: true,
        infinite: photos.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: photos.length > 1,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <motion.div 
                className="bg-white shadow-sm border-b border-gray-200 p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back
                    </button>
                    
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-gray-800 transition-colors">
                            <FontAwesomeIcon icon={faShare} />
                        </button>
                        <motion.button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`text-2xl transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Left Column - Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {photos.length > 1 ? (
                                <Slider {...sliderSettings} className="product-slider">
                                    {photos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={photo}
                                                alt={`${product?.title} - Image ${index + 1}`}
                                                className="w-full h-96 lg:h-[500px] object-cover"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={photos[0]}
                                        alt={product?.title}
                                        className="w-full h-96 lg:h-[500px] object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Thumbnail Gallery for Multiple Images */}
                        {photos.length > 1 && (
                            <motion.div 
                                className="flex space-x-3 mt-4 overflow-x-auto pb-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {photos.map((photo, index) => (
                                    <motion.img
                                        key={index}
                                        src={photo}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                                            selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedImageIndex(index)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Column - Product Info */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Product Title & Category */}
                        <div>
                            <motion.p 
                                className="text-blue-600 font-medium uppercase tracking-wide text-sm mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {product?.category || 'Electronics'}
                            </motion.p>
                            <motion.h1 
                                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {product?.title}
                            </motion.h1>
                        </div>

                        {/* Rating & Reviews */}
                        <motion.div 
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="text-sm font-medium text-gray-700 ml-2">{rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({reviewCount.toLocaleString()} reviews)</span>
                        </motion.div>

                        {/* Price */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-4xl font-bold text-green-600">${product?.price}</span>
                                <span className="text-lg text-gray-500 line-through">${(product?.price * 1.2).toFixed(2)}</span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                                    17% OFF
                                </span>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <p className="text-gray-700 leading-relaxed">
                                {product?.description || "Experience premium quality with this carefully crafted product. Designed with attention to detail and built to last, this item combines functionality with style to meet your everyday needs."}
                            </p>
                        </motion.div>

                        {/* Stock Status */}
                        <motion.div
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className={`font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                                {inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </motion.div>

                        {/* Quantity Selector */}
                        <motion.div
                            className="flex items-center space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            <span className="text-gray-700 font-medium">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 bg-white font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </motion.div>

                        {/* Add to Cart Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                        >
                            <ModernAddToCartButton 
                                onClick={handleAddToCart}
                                isLoading={isAddingToCart}
                            />
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faTruck} className="text-blue-500" />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faShield} className="text-green-500" />
                                <span>2 Year Warranty</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faUndo} className="text-purple-500" />
                                <span>30 Day Returns</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Related Products */}
            <motion.div
                className="mt-16 bg-white py-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
            >
                <ProductSlider 
                    products={products} 
                    title="You Might Also Like" 
                    loading={productsLoading}
                />
            </motion.div>
        </div>
    );
}

export default ProductDetail;
