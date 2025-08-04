import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faHeart, faChevronDown, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { useBasket } from '../contexts/Basket';
import { SignInModal } from './SignIn';
import { SignUpModal } from './SignUp';

const Navbar = () => {
    const { loggedIn, user } = useAuth();
    const { items } = useBasket();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const categories = [
        'Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoors',
        'Books & Media', 'Health & Beauty', 'Toys & Games', 'Automotive',
        'Arts & Crafts', 'Jewelry', 'Pet Supplies', 'Office Supplies'
    ];

    const quickLinks = ['Gifts', "Father's Day Gifts", 'Home Favorites', 'Fashion Finds', 'Registry'];

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };

    return (
        <div className="w-full bg-gray-50 shadow-md text-gray-700">
            {/* Desktop/Tablet Navbar (768px and above) */}
            <div className="hidden md:block">
                {/* Main Navigation */}
                <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
                    {/* Left Side - Logo and Categories */}
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link to="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
                            palmirolab
                        </Link>
                        
                        {/* Categories Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {/* 900px+ shows "Categories" text, 768-899px shows hamburger icon */}
                                <span className="custom-900:inline hidden">Categories</span>
                                <FontAwesomeIcon icon={faBars} className="custom-900:hidden inline text-lg" />
                                <FontAwesomeIcon icon={faChevronDown} className={`custom-900:inline hidden transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                                    <div className="max-h-48 overflow-y-auto">
                                        {categories.map((category, index) => (
                                            <button
                                                key={index}
                                                className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-blue-600 border-b border-gray-200 last:border-b-0 transition-colors"
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    // Handle category selection
                                                    console.log('Selected category:', category);
                                                }}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Center - Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full px-4 py-2.5 pl-11 pr-16 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-700"
                            />
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-xs"
                            >
                                Go
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex items-center gap-3">
                        {!loggedIn ? (
                            <button
                                onClick={() => setIsSignInModalOpen(true)}
                                className="text-white hover:text-blue-100 transition-colors font-medium hover:bg-blue-600 px-3 py-2 rounded-md"
                            >
                                Sign In
                            </button>
                        ) : (
                            user?.role === "admin" && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
                                >
                                    Admin
                                </button>
                            )
                        )}
                        
                        {/* Heart Icon */}
                        <button className="relative group p-2.5 bg-blue-600 hover:bg-red-500 rounded-full transition-colors text-white">
                            <FontAwesomeIcon icon={faHeart} className="text-lg" />
                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Favorites
                            </span>
                        </button>

                        {/* Cart Icon */}
                        <button 
                            onClick={() => navigate('/basket')}
                            className="relative group p-2.5 bg-blue-600 hover:bg-green-500 rounded-full transition-colors text-white"
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
                            {items?.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {items.reduce((total, item) => total + (item.quantity || 0), 0)}
                                </span>
                            )}
                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Cart
                            </span>
                        </button>

                        {/* Profile Button */}
                        {loggedIn && (
                            <button
                                onClick={() => navigate('/profile')}
                                className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors text-white"
                            >
                                <FontAwesomeIcon icon={faUser} className="text-lg" />
                            </button>
                        )}
                    </div>
                </nav>

                {/* Quick Links (Desktop Only - 900px+) */}
                <div className="custom-900:block hidden bg-gray-100 border-t border-gray-300 px-6 py-3">
                    <div className="flex items-center justify-center gap-8">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                to="/"
                                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium hover:underline"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Navbar (below 768px) */}
            <div className="md:hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
                {/* Top Row - Logo and Icons */}
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <Link to="/" className="text-lg font-bold text-white hover:text-blue-100 transition-colors">
                        palmirolab
                    </Link>
                    
                    {/* Right Icons */}
                    <div className="flex items-center gap-2">
                        {!loggedIn ? (
                            <button
                                onClick={() => setIsSignInModalOpen(true)}
                                className="text-white hover:text-blue-100 transition-colors font-medium hover:bg-blue-600 px-2 py-1 rounded text-sm"
                            >
                                Sign In
                            </button>
                        ) : (
                            user?.role === "admin" && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
                                >
                                    Admin
                                </button>
                            )
                        )}
                        
                        <button className="relative group p-2 bg-blue-600 hover:bg-red-500 rounded-full transition-colors text-white">
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Favorites
                            </span>
                        </button>
                        
                        <button 
                            onClick={() => navigate('/basket')}
                            className="relative group p-2 bg-blue-600 hover:bg-green-500 rounded-full transition-colors text-white"
                        >
                            <FontAwesomeIcon icon={faCartShopping} />
                            {items?.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                                    {items.reduce((total, item) => total + (item.quantity || 0), 0)}
                                </span>
                            )}
                            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Cart
                            </span>
                        </button>

                        {loggedIn && (
                            <button
                                onClick={() => navigate('/profile')}
                                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors text-white"
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Second Row - Hamburger Menu and Search Side by Side */}
                <div className="px-4 pb-3">
                    <div className="flex gap-3">
                        {/* Hamburger Menu - Takes fixed space */}
                        <div className="relative flex-shrink-0">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faBars} className="text-lg" />
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                                    <div className="max-h-48 overflow-y-auto">
                                        {categories.map((category, index) => (
                                            <button
                                                key={index}
                                                className="w-full text-left px-3 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-blue-600 border-b border-gray-200 last:border-b-0 transition-colors text-sm"
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    console.log('Selected category:', category);
                                                }}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Search Bar - Takes remaining space */}
                        <div className="flex-1">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full px-3 py-2 pl-9 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-700 text-sm"
                                />
                                <FontAwesomeIcon 
                                    icon={faSearch} 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-xs"
                                >
                                    Go
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sign In Modal */}
            <SignInModal 
                isOpen={isSignInModalOpen}
                onClose={() => setIsSignInModalOpen(false)}
                onSwitchToSignUp={() => {
                    setIsSignInModalOpen(false);
                    setIsSignUpModalOpen(true);
                }}
            />

            {/* Sign Up Modal */}
            <SignUpModal 
                isOpen={isSignUpModalOpen}
                onClose={() => setIsSignUpModalOpen(false)}
                onSwitchToSignIn={() => {
                    setIsSignUpModalOpen(false);
                    setIsSignInModalOpen(true);
                }}
            />
        </div>
    )
}

export default Navbar;
