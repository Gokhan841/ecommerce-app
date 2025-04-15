import React from 'react';
import { useParams } from 'react-router-dom';
import { FetchProduct } from '../api';
import { useQuery } from '@tanstack/react-query';
import Slider from "react-slick";
import { useBasket } from '../contexts/Basket';

const ProductDetail = () => {
   
    const maxQuantity = 2 // sepete ekleyebilecği maksimum ürün sayısını verir.

    const { productId } = useParams();
    const { addToBasket } = useBasket();


    //#region Ürünü Çekme İşlemi
    const { data, error, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => FetchProduct(productId),
        onSuccess: (data) => {
           // console.log("Veri başarıyla alındı: ", data?.data?.photos);
        },
    });


    if (isLoading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error.response?.data?.message || error.message}</div>;
    //#endregion

    // data.data içerisindeki photos verisini alıyoruz
    const photos = data?.data?.photos && data.data.photos.length > 0 ? data.data.photos : null;
   // console.log(photos)

    const settings = {
        dots: true, // Sayfa noktalarını göster
        infinite: true, // Sonsuz kaydırma
        speed: 500, // Kaydırma hızı
        slidesToShow: 3, // Aynı anda üç fotoğraf göster
        slidesToScroll: 1, // Her kaydırmada bir fotoğraf kaydır
        centerMode: true, // Ortalanmış kaydırma
        centerPadding: "0", // Kenar boşluklarını sıfırlamak
        adaptiveHeight: false, // Yüksekliği sabitlemek
    };

    return (
        <div className="bg-pale-rose min-h-screen flex items-center justify-center py-8 px-4">
            <div className="max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Ürün Görseli */}
                {photos ? (
                    <Slider {...settings} className="w-full">
                        {photos.map((photo, index) => (
                            <div key={index} className="flex justify-center">
                                <img
                                    src={photo}
                                    alt={`Slide ${index}`}
                                    className="w-full object-cover"
                                    style={{ maxHeight: '500px', height: 'auto' }} // Yükseklik için uyum
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="w-full h-64 flex items-center justify-center text-xl text-gray-500">
                        Görsel mevcut değil
                    </div>
                )}

                {/* Ürün Bilgisi */}
                <div className="p-6">
                    <h1 className="text-slate-gray text-3xl font-bold mb-4">{data?.data?.title}</h1>
                    <p className="text-slate-gray text-base mb-6">{data?.data?.description}</p>
                    <p className="text-warm-beige text-2xl font-semibold mb-6">${data?.data?.price}</p>
                    <button
                        onClick={() => {
                            addToBasket(data)
                        }}
                        className="bg-soft-teal text-white py-2 px-6 rounded-lg hover:bg-pale-green transition">
                        Add To Basket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
