import React from 'react';
import { motion } from 'framer-motion';

// Sosyal medya ikonları için animasyonlu component
const SocialIcon = ({ href, icon, label, color }) => {
  return (
    <motion.a
      href={href}
      className="relative group"
      whileHover={{ scale: 1.2, rotateY: 15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
    >
      {/* Outer glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${color} opacity-0 blur-md`}
        whileHover={{ opacity: 0.6, scale: 1.5 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main icon container */}
      <motion.div
        className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
        whileHover={{
          background: [
            "linear-gradient(45deg, #ffffff, #f8fafc)",
            "linear-gradient(45deg, #f8fafc, #ffffff)",
            "linear-gradient(45deg, #ffffff, #f8fafc)"
          ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {/* Rotating border */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ padding: '2px' }}
        >
          <div className="w-full h-full bg-white rounded-full" />
        </motion.div>
        
        {/* Icon */}
        <motion.div
          className="relative z-10 text-gray-700 group-hover:text-gray-900"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.div>
    </motion.a>
  );
};

// Animasyonlu link component
const FooterLink = ({ href, children, delay = 0 }) => {
  return (
    <motion.a
      href={href}
      className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        animate={{ width: 0 }}
      />
    </motion.a>
  );
};

// Animasyonlu başlık component
const FooterTitle = ({ children, delay = 0 }) => {
  return (
    <motion.h3
      className="text-white font-bold text-lg mb-4 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {children}
      <motion.div
        className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 32 }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
      />
    </motion.h3>
  );
};

const Footer = () => {
  const socialLinks = [
    {
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
      label: "Facebook",
      color: "from-blue-500 to-blue-600"
    },
    {
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      label: "Instagram", 
      color: "from-pink-500 to-purple-600"
    },
    {
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
        </svg>
      ),
      label: "Twitter",
      color: "from-sky-400 to-blue-500"
    },
    {
      href: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"/>
        </svg>
      ),
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Shop Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FooterTitle delay={0.1}>Palmirolab</FooterTitle>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#" delay={0.2}>About Us</FooterLink>
              <FooterLink href="#" delay={0.25}>Our Story</FooterLink>
              <FooterLink href="#" delay={0.3}>Blog</FooterLink>
              <FooterLink href="#" delay={0.35}>Careers</FooterLink>
            </div>
          </motion.div>

          {/* Sell Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FooterTitle delay={0.2}>Support</FooterTitle>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#" delay={0.3}>Help Center</FooterLink>
              <FooterLink href="#" delay={0.35}>Contact</FooterLink>
              <FooterLink href="#" delay={0.4}>Shipping & Returns</FooterLink>
              <FooterLink href="#" delay={0.45}>Order Tracking</FooterLink>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FooterTitle delay={0.3}>Community</FooterTitle>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#" delay={0.4}>For Creators</FooterLink>
              <FooterLink href="#" delay={0.45}>Affiliate Program</FooterLink>
              <FooterLink href="#" delay={0.5}>Events</FooterLink>
              <FooterLink href="#" delay={0.55}>Sustainability</FooterLink>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FooterTitle delay={0.4}>Legal</FooterTitle>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#" delay={0.5}>Terms of Service</FooterLink>
              <FooterLink href="#" delay={0.55}>Privacy Policy</FooterLink>
              <FooterLink href="#" delay={0.6}>Cookie Policy</FooterLink>
            </div>

            {/* Social Media Icons */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.9 + (index * 0.1), 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <SocialIcon {...social} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <motion.div
              className="text-gray-400 text-sm mb-4 md:mb-0 w-full md:w-auto"
              whileHover={{ color: "#ffffff" }}
              transition={{ duration: 0.3 }}
            >
              © 2024 Palmirolab. All rights reserved. Palmirolab is your trusted destination for unique products and creative finds.
            </motion.div>
            
            <motion.div
              className="flex space-x-6 text-sm justify-center w-full md:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <FooterLink href="#" delay={1.5}>Terms of Service</FooterLink>
              <FooterLink href="#" delay={1.6}>Privacy Policy</FooterLink>
              <FooterLink href="#" delay={1.7}>Cookie Policy</FooterLink>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 1.5, ease: "easeInOut" }}
      />
    </footer>
  );
};

export default Footer; 