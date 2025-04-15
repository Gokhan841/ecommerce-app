import React, { createContext, useState, useContext, useEffect } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {

    //  burda önce epette eleman varsa localStorage'dan alıyoruz, yoksa boş diziyle başlıyoruz.
    const [items, setItems] = useState(() => { 
        const storedItems = localStorage.getItem("basketItems");
        return storedItems ? JSON.parse(storedItems) : [];
    });


    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const price = items.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(price);
    }, [items]); // items değiştiğinde toplam fiyatı güncelle


    // `items` her değiştiğinde localStorage'da sepetteki elemanları saklıyoruz.
    useEffect(() => { 
        localStorage.setItem("basketItems", JSON.stringify(items));
    }, [items]);     

 
    const addToBasket = (data) => {
        
        const existingItem = items.find(item => item._id === data._id);

        if (existingItem) { // Ürün zaten sepette varsa miktarını arttırıyoruz
            setItems((prevItems) => {
                return prevItems.map((item) => (
                    item._id == data._id ? { ...item, quantity: item.quantity + 1 } : item
                ));
            });
        } else { // Ürün sepette yoksa, yeni ürünü ekliyoruz                 
            setItems((prevItems) => {
                return [...prevItems, { ...data, quantity: 1 }];
            });
        }
    };

  
    const removeFromBasket = (id) => {
        setItems(prevItems => prevItems.filter(item => item._id != id));
    };

    
    const increaseQuantity = (id) => {
        setItems(prev => (
            prev.map(item =>
                id === item._id ? { ...item, quantity: item.quantity + 1 } : item
            )
        ));
    };


    const decreaseQuantity = (id) => {
        setItems(prev => (
            prev.map(item =>
                id === item._id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        ));
    };

    // Context ile sağladığımız değerler
    const values = { items, setItems, addToBasket, removeFromBasket, increaseQuantity, decreaseQuantity, totalPrice };

    // Context'i sağlayarak children bileşenlerini render ediyoruz
    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>;
};

// Context'e erişim sağlamak için custom hook
export const useBasket = () => useContext(BasketContext);
