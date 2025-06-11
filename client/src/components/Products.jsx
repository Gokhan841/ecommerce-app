import React from 'react';
import Card from './Card';
import { FetchProductList } from '../api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

// Modern Animated Show More Button with bouncing dots
const AnimatedShowMoreButton = ({ onClick, disabled, isLoading, hasNextPage }) => {
  const buttonText = isLoading ? 'Loading more...' : hasNextPage ? 'Show More' : 'Nothing more to load';
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="relative overflow-hidden px-10 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl shadow-lg group disabled:cursor-not-allowed"
      whileHover={!disabled ? { 
        scale: 1.05,
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        y: -2
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0"
        whileHover={!disabled ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      />
      
      {/* Shimmering effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 2
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        <motion.span
          whileHover={!disabled ? { x: -2 } : {}}
          transition={{ duration: 0.2 }}
        >
          {buttonText}
        </motion.span>
        
        {/* Bouncing dots - only show when hasNextPage */}
        {hasNextPage && !isLoading && (
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
        
        {/* Loading spinner */}
        {isLoading && (
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Arrow for completed state */}
        {!hasNextPage && !isLoading && (
          <motion.span
            className="text-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            ✓
          </motion.span>
        )}
      </span>
      
      {/* Pulsing ring effect */}
      {hasNextPage && !isLoading && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-white/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      )}
    </motion.button>
  );
};

const Products = () => {
  const { 
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: FetchProductList,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === 12 ? allPages.length + 1 : undefined;
    },
  });

  // Loading ve Error durumları
  if (status === "loading") return (
    <div className="flex justify-center items-center min-h-64">
      <motion.div
        className="text-lg text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading...
      </motion.div>
    </div>
  );
  if (status === "error") return (
    <div className="flex justify-center items-center min-h-64">
      <motion.div
        className="text-lg text-red-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Error: {error.message}
      </motion.div>
    </div>
  );

  return (
    <div className="w-full px-4 py-8">
      {/* Ürünler listesi - Responsive Grid: 6-4-2-1 columns */}
      <div className='grid grid-cols-1 md:grid-cols-2 custom-900:grid-cols-4 xl:grid-cols-6 gap-4'>
        {data && data.pages ? (
          data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((item) => (
                  <Card key={item._id || item.id || `item-${i}`} item={item} />
              ))}
            </React.Fragment>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-12">
            <p className="text-lg text-gray-600">No products available</p>
          </div>
        )}
      </div>

      {/* Modern Animated Show More Button */}
      <div className="flex justify-center mt-12">
        <AnimatedShowMoreButton
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}

export default Products;

// sayfalamaya iyi bak
