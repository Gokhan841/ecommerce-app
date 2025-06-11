import React, { useState } from 'react'
import { useBasket } from '../contexts/Basket'
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import ProductSlider from './sliders/ProductSlider'
import useProductlist from '../hooks/useProductlist'

// Top Right Cart Notification
const CartNotification = ({ firstItem, itemCount, onClose, onCheckout }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 400, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: -20 }}
            className="fixed top-20 right-6 max-w-sm z-50"
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 text-left">Your Cart</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-sm" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            src={firstItem.photos?.[0] || firstItem.image || 'https://via.placeholder.com/60'}
                            alt={firstItem.title}
                            className="w-12 h-12 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">
                                {firstItem.title}
                            </p>
                            <p className="text-xs text-gray-500">
                                {itemCount > 1 ? `+${itemCount - 1} more items` : '1 item'}
                            </p>
                        </div>
                    </div>
                    
                    <p className="text-xs text-red-600 mb-3 text-left">
                        <span className="font-medium">{Math.floor(Math.random() * 30) + 10}+ views</span> in the last 24 hours
                    </p>
                    
                    <button
                        onClick={onCheckout}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                        <span>Proceed to checkout</span>
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Basket = () => {
    const { items, removeFromBasket, increaseQuantity, decreaseQuantity, totalPrice } = useBasket();
    const navigate = useNavigate();
    const { products, loading } = useProductlist();
    const [showNotification, setShowNotification] = useState(true);

    const handleCheckout = () => {
        navigate("/order");
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-8 flex flex-col items-center">
                {/* Page Title */}
                <motion.h1 
                    className="text-3xl font-bold text-gray-800 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Shopping Cart
                </motion.h1>

                {/* Sepet Boşsa */}
                {items.length < 1 && (
                    <motion.div 
                        className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-lg border border-gray-300 max-w-lg mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty Cart"
                            className="w-36 h-36 mb-5 opacity-90"
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Discover amazing products and add them to your cart!
                        </p>
                        <motion.button
                            onClick={() => navigate("/")}
                            className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-3 rounded-lg shadow-md font-semibold"
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Shopping
                        </motion.button>
                    </motion.div>
                )}

                {/* Sepet Doluysa */}
                {items.length > 0 && (
                    <motion.div 
                        className="w-full max-w-7xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* 2 Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Left Column - Cart Items */}
                            <div className="lg:col-span-2">
                                <AnimatePresence mode="popLayout">
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item._id || item.id}
                                                layout
                                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ 
                                                    opacity: 0, 
                                                    x: -500, 
                                                    scale: 0.7,
                                                    transition: { duration: 0.4, ease: "easeInOut" }
                                                }}
                                                whileHover={{ 
                                                    y: -5,
                                                    boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
                                                }}
                                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                                                transition={{ 
                                                    layout: { duration: 0.4 },
                                                    opacity: { duration: 0.3 }
                                                }}
                                            >
                                                <div className="p-6 flex items-center justify-between">
                                                    {/* Sol Taraf - Ürün Fotoğrafı ve Bilgileri */}
                                                    <div className="flex items-center space-x-5 flex-1">
                                                        <motion.img
                                                            src={item.photos?.[0] || item.image || 'https://via.placeholder.com/150'}
                                                            alt="Product"
                                                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                                                            whileHover={{ scale: 1.05 }}
                                                            transition={{ duration: 0.2 }}
                                                        />
                                                        <div className="flex flex-col">
                                                            <motion.h3 
                                                                className="text-base font-semibold text-gray-800 mb-1"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.1 }}
                                                            >
                                                                {item.title}
                                                            </motion.h3>
                                                            <motion.p 
                                                                className="text-sm text-gray-500 capitalize"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: 0.2 }}
                                                            >
                                                                {item.category}
                                                            </motion.p>
                                                        </div>
                                                    </div>

                                                    {/* Adet Sayacı ve Fiyat */}
                                                    <div className="flex items-center space-x-4">

                                                        {/* Adet Sayacı */}
                                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                                            <button
                                                                onClick={() => { decreaseQuantity(item._id || item.id) }}
                                                                className="px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300 transition text-sm">-</button>
                                                            <motion.div
                                                                className="w-10 text-center border-none outline-none bg-gray-100 text-gray-700 font-semibold flex items-center justify-center py-1"
                                                                key={item.quantity}
                                                                initial={{ scale: 1.3 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                {item.quantity}
                                                            </motion.div>
                                                            <button
                                                                onClick={() => { increaseQuantity(item._id || item.id) }}
                                                                className="px-3 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300 transition text-sm">+</button>
                                                        </div>

                                                        {/* Fiyat */}
                                                        <p className="text-lg font-bold text-teal-600 min-w-[4rem]">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>

                                                    {/* Sepetten Çıkarma Butonu */}
                                                    <button
                                                        onClick={() => removeFromBasket(item._id || item.id)}
                                                        className="text-gray-500 hover:text-red-600 text-xl ml-4"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatePresence>
                            </div>

                            {/* Right Column - Payment Summary */}
                            <div className="lg:col-span-1">
                                <motion.div 
                                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-4"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">How will you pay?</h3>
                                    
                                    {/* Payment Methods */}
                                    <div className="space-y-3 mb-6">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="radio" name="payment" value="credit" className="text-blue-600" defaultChecked />
                                            <span className="text-gray-700">Credit Card</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="radio" name="payment" value="paypal" className="text-blue-600" />
                                            <span className="text-gray-700">PayPal</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="radio" name="payment" value="cash" className="text-blue-600" />
                                            <span className="text-gray-700">Cash on Delivery</span>
                                        </label>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="border-t border-gray-200 pt-4 mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span className="font-medium">$5.00</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Tax:</span>
                                            <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                                        </div>
                                        <hr className="my-3" />
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span className="text-gray-800">Total:</span>
                                            <motion.span 
                                                className="text-green-600"
                                                key={totalPrice}
                                                initial={{ scale: 1.1 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                ${(totalPrice + 5 + (totalPrice * 0.08)).toFixed(2)}
                                            </motion.span>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <button
                                        onClick={() => navigate("/order")}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Sticky Cart Notification - Only show when cart has items */}
            <AnimatePresence>
                {items.length > 0 && showNotification && (
                    <CartNotification
                        firstItem={items[0]}
                        itemCount={items.length}
                        onClose={() => setShowNotification(false)}
                        onCheckout={handleCheckout}
                    />
                )}
            </AnimatePresence>

            {/* You Might Also Like Slider */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-16 bg-gradient-to-b from-gray-50 to-blue-50 py-12"
                style={{
                    backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f1f5f9 100%)'
                }}
            >
                <ProductSlider 
                    products={products} 
                    title="You Might Also Like" 
                    loading={loading}
                />
            </motion.div>
        </div>
    );
}

export default Basket;
