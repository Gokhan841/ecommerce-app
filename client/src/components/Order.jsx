import React, { useState } from 'react';
import { useBasket } from '../contexts/Basket';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faMapMarkerAlt, faUser, faCreditCard } from '@fortawesome/free-solid-svg-icons';
//import { FetchOrder } from '../api';

const Order = () => {
    const { items, totalPrice } = useBasket();

    const [address, setaddress] = useState("");
    const [name, setName] = useState("");
    const ItemIds = items.map(item => item._id || item.id) // backend bizden itemId ve adres istiyor. Name'e gerek yok.

    const handleSubmitForm = async () => {
        const input = {
            address,
            items: ItemIds  // JSON.stringify kullanma!
        };
       // const response = await FetchOrder(input);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Page Title */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Summary</h1>
                    <p className="text-gray-600">Review your order details before confirmation</p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column - Order Details & Form */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Order Info Card */}
                        <motion.div 
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faShoppingBag} className="text-blue-600 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-800">Order Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Order Number</p>
                                    <p className="font-semibold text-gray-800">#{Math.floor(100000 + Math.random() * 900000)}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Order Date</p>
                                    <p className="font-semibold text-gray-800">{new Date().toLocaleDateString()}</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Status</p>
                                    <p className="font-semibold text-yellow-700">Preparing...</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Information */}
                        <motion.div 
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-800">Delivery Information</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="flex items-center text-gray-700 mb-2">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />
                                        Delivery Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        rows={3}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Enter your complete delivery address"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Ordered Items */}
                        <motion.div 
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ordered Items</h3>
                            <div className="space-y-4">
                                {items.length > 0 ? (
                                    items.map((item, index) => (
                                        <motion.div 
                                            key={item._id || item.id}
                                            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            <img
                                                src={item.photos?.[0] || item.image || 'https://via.placeholder.com/80'}
                                                alt="Product"
                                                className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                                                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-xs text-gray-500">${item.price} each</p>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-center py-8">Your cart is empty.</p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div 
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-4"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center mb-4">
                                <FontAwesomeIcon icon={faCreditCard} className="text-purple-600 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                            </div>

                            {/* Order totals */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span className="font-medium">$5.00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Tax (8%):</span>
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

                            {/* Confirm Order Button */}
                            <motion.button
                                onClick={handleSubmitForm}
                                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg"
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!name || !address}
                            >
                                Confirm Order
                            </motion.button>
                            
                            {(!name || !address) && (
                                <p className="text-xs text-red-500 text-center mt-2">
                                    Please fill in all required fields
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
