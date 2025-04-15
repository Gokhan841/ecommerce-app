import React, { useState } from 'react';
import { useBasket } from '../contexts/Basket';
//import { FetchOrder } from '../api';

const Order = () => {
    const { items, totalPrice } = useBasket();

    const [address, setaddress] = useState("");
    const [name, setName] = useState("");
    const ItemIds = items.map(item => item._id) // backend bizden itemId ve adres istiyor. Name'e gerek yok.

    const handleSubmitForm = async () => {
        const input = {
            address,
            items: ItemIds  // JSON.stringify kullanma!
        };
       // const response = await FetchOrder(input);
    };

    return (
        <div className="p-8 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg border border-pale-green">
                <h2 className="text-2xl font-semibold text-slate-gray mb-6 text-center">Sipariş Özeti</h2>

                {/* Sipariş Bilgileri */}
                <div className="bg-light-peach p-4 rounded-lg mb-6 shadow-sm">
                    <p className="text-slate-gray"><strong>Sipariş Numarası:</strong> {Math.floor(100000 + Math.random() * 900000)}</p>
                    <p className="text-slate-gray"><strong>Sipariş Tarihi:</strong> {new Date().toLocaleDateString()}</p>
                    <p className="text-slate-gray"><strong>Sipariş Durumu:</strong> Hazırlanıyor...</p>
                    <p className="text-gray-600 font-bold mt-2 text-xl"><strong>Toplam Tutar:</strong> {totalPrice} TL</p>
                </div>

                {/* Teslimat Bilgileri */}
                <div className="bg-warm-beige p-4 rounded-lg mb-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-gray mb-2">Teslimat Bilgileri</h3>
                    <div>
                        <label className="block text-slate-gray mb-2">Adı Soyadı:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            className="w-full p-3 rounded-lg border border-slate-300 mb-4"
                            placeholder="Adınız ve Soyadınız"
                        />
                        <label className="block text-slate-gray mb-2">Teslimat Adresi:</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => {
                                setaddress(e.target.value)
                            }}
                            className="w-full p-3 rounded-lg border border-slate-300"
                            placeholder="Adresinizi giriniz"
                        />
                    </div>
                </div>



                {/* Sipariş Edilen Ürünler */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sipariş Edilen Ürünler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                    <img
                                        src={item.photos[0]}
                                        alt="Product"
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4 flex flex-col items-center text-center">
                                        <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                                        <p className="text-gray-600">Adet: {item.quantity}</p>
                                        <p className="text-green-600 font-bold mt-2">{(item.price * item.quantity).toFixed(2)} TL</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center col-span-full">Sepetiniz boş.</p>
                        )}
                    </div>
                </div>
                {/* Sipariş Onay Butonu */}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleSubmitForm}
                        className="bg-soft-teal text-white py-2 px-8 rounded-full font-semibold hover:bg-teal-500 focus:outline-none">
                        Siparişi Onayla
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;
