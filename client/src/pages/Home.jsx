import React from 'react'
import ProductSlider from '../components/sliders/ProductSlider'
import Products from '../components/Products'
import HeroSection from '../components/HeroSection'
import useProductlist from '../hooks/useProductlist'

const Home = () => {
    const { products, loading, error } = useProductlist(); // bu satır veriyi çeker

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
                    <p className="text-gray-600">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Custom Hero Section */}
            <HeroSection />

            {/* Products Grid Component */}
            <Products />

            {/* Best Sellers Slider */}
            <ProductSlider 
                products={products} 
                title="Çok Satanlar" 
                loading={loading}
            />

            {/* Buraya daha fazla slider ekleyebiliriz */}
            {/* Örnek: Son Görüntülenenler, Yeni Ürünler vs. */}
        </div>
    )
}

export default Home