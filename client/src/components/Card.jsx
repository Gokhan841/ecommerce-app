import React from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../contexts/Basket';

const Card = ({ item }) => {
    const { addToBasket } = useBasket();
    return (
        <div className="max-w-sm mx-auto bg-soft-white shadow-md rounded-lg border border-pale-green overflow-hidden">
            {/* Image */}
            <img
                src={item.photos[0]}
                alt="Product"
                className="w-full h-48 object-cover"
            />
            {/* Card Content */}
            <div className="p-6">
                {/* Date */}
                <p className="text-xs text-pale-rose font-medium">12 March 2025</p>
                {/* Product Name */}
                <Link to={`/product/${item._id}`}>
                    <h2 className="text-2xl font-bold text-warm-beige mt-2">{item.title}</h2>
                </Link>
                {/* Price */}
                <p className="text-lg font-semibold  text-slate-gray mt-2">{item.price}</p>
                {/* Description */}
                <p className="text-sm text-slate-gray mt-3">
                    A vintage-inspired sofa that brings elegance and comfort to your living room.
                </p>
                {/* Button */}
                <button
                    onClick={()=>{addToBasket(item)}}
                    className="mt-4 w-full px-4 py-2 bg-pale-green text-white font-medium rounded-lg hover:bg-soft-teal transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Card;
