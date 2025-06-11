import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import SliderCard from './SliderCard';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ProductSlider = ({ products, title = "Ürünler", loading = false }) => {
  if (loading) {
    return (
      <div className="w-full px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      {/* Slider Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={15}
        slidesPerView={1.8}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // Mobile - 2 cards
          480: {
            slidesPerView: 2.3,
            spaceBetween: 15,
          },
          // Small tablet - 3 cards
          640: {
            slidesPerView: 3.2,
            spaceBetween: 15,
          },
          // Tablet - 4 cards
          768: {
            slidesPerView: 4,
            spaceBetween: 18,
          },
          // Desktop - 5 cards
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          // Large Desktop - 6 cards
          1280: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
        }}
        className="product-slider"
        style={{
          '--swiper-navigation-color': '#3b82f6',
        }}
      >
        {products && products.length > 0 ? (
          products.map((product) => (
            <SwiperSlide key={product.id}>
              <SliderCard item={product} />
            </SwiperSlide>
          ))
        ) : (
          <div className="flex justify-center items-center py-12">
            <p className="text-lg text-gray-600">No products available</p>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
