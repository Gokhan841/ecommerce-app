import React from 'react'
import { useBasket } from '../contexts/Basket'
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Basket = () => {
    const { items, removeFromBasket, increaseQuantity, decreaseQuantity ,totalPrice} = useBasket();
    const navigate = useNavigate();


    return (
        <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">

            {/* Sepet Boşsa */}
            {items.length < 1 && (
                <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-lg border border-gray-300 max-w-lg mx-auto">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                        alt="Empty Cart"
                        className="w-36 h-36 mb-5 opacity-90"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Discover amazing products and add them to your cart!
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105"
                    >
                        Start Shopping
                    </button>
                </div>
            )}

            {/* Sepet Doluysa */}
            {items.length > 0 && (
                <div className="w-full max-w-4xl space-y-6">
                    {items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">

                            {/* Ürün Fotoğrafı ve Bilgileri */}
                            <div className="flex items-center space-x-5">
                                <img
                                    src={item.photos[0]}
                                    alt="Product"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                </div>
                            </div>

                            {/* Adet Sayacı ve Fiyat */}
                            <div className="flex items-center space-x-6">

                                {/* Adet Sayacı */}
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => { decreaseQuantity(item._id) }}
                                        className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 transition">-</button>
                                    <input type="text" value={item.quantity} readOnly className="w-12 text-center border-none outline-none bg-gray-100 text-gray-700 font-semibold" />
                                    <button
                                        onClick={() => { increaseQuantity(item._id) }}
                                        className="px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 transition">+</button>
                                </div>

                                {/* Fiyat */}
                                <p className="text-xl font-bold text-teal-600">{item.price * item.quantity} TL</p>
                            </div>

                            {/* Sepetten Çıkarma Butonu */}
                            <button
                                onClick={() => removeFromBasket(item._id)}
                                className="text-gray-500 hover:text-red-600 text-2xl"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}

                    {/* Toplam Tutar */}
                    <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md border border-gray-200 mt-4 text-xl font-bold">
                        <span className="text-gray-700">Total Price:</span>
                        <span className="text-teal-600">{totalPrice} TL</span>
                    </div>

                    {/* Sepeti Onayla Butonu */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => navigate("/order")}
                            className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105"
                        >
                            Confirm Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Basket;
