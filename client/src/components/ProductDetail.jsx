import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchProduct } from '../api';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
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
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
                                <>
                                    <Swiper
                                        modules={[Navigation, Pagination, EffectFade, Autoplay, Thumbs]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        effect="fade"
                                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                                        className="w-full h-[350px] md:h-[450px]"
                                        style={{ '--swiper-navigation-color': '#6366f1', '--swiper-pagination-color': '#6366f1' }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                    >
                                        {photos.map((photo, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={photo}
                                                    alt={`Product ${index + 1}`}
                                                    className="object-contain w-full h-[350px] md:h-[450px] bg-gray-50"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {/* Thumbnails */}
                                    <Swiper
                                        modules={[Thumbs]}
                                        onSwiper={setThumbsSwiper}
                                        slidesPerView={Math.min(photos.length, 5)}
                                        spaceBetween={12}
                                        watchSlidesProgress
                                        className="mt-4 w-full h-20"
                                    >
                                        {photos.map((photo, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={photo}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="object-cover w-full h-16 rounded-lg border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </>
                            ) : (
                                <img
                                    src={photos[0]}
                                    alt="Product"
                                    className="object-contain w-full h-[350px] md:h-[450px] bg-gray-50"
                                />
                            )}
                        </div>
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

                        {/* Product Details Section */}
                        <div className="mt-10">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Product Details</h2>
                            <p className="text-gray-600 mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.
                            </p>
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Return & Cancellation Policy</h2>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula. Vestibulum sit amet urna turpis. Mauris euismod elit et nisi ultrices, ut faucibus orci tincidunt.
                            </p>
                        </div>
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
