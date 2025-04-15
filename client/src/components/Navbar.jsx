import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useBasket } from '../contexts/Basket';


const Navbar = () => {

    const { loggedIn, user } = useAuth();
    const { items } = useBasket();  // `items` dizisini al

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/signUp')
    }

    console.log(loggedIn); // Konsola login durumunu yazdır

    return (
        <nav className='w-full bg-soft-teal h-16 text-slate-gray flex justify-between items-center'>
            <div className='flex gap-x-8 ml-5 items-center'>
                <div className='flex items-center'>
                    <h2 className='text-xl font-semibold'>L O G O</h2>
                </div>
                <ul className='flex items-center gap-x-4'>
                    <li className='transition-all hover:scale-110 hover:underline hover:text-yellow-950 '>
                        <Link to="/" >
                            Products
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='mr-5 flex gap-x-6'>
                {
                    !loggedIn && (
                        <>
                            <button
                                onClick={() => navigate("/signin")}
                                className='h-10 w-40 text-xs bg-light-peach transition-all hover:bg-warm-beige rounded-md hover:scale-105 hover:text-sm hover:text-white hover:rounded-lg'
                            >Login</button>
                            <button
                                onClick={handleClick}
                                className='h-10 w-40 text-xs bg-light-peach transition-all hover:bg-warm-beige rounded-md hover:scale-105 hover:text-sm hover:text-white hover:rounded-lg'
                            >Register</button>
                        </>
                    )
                }
                {
                    loggedIn && (
                        <>
                            {
                                user.role === "admin" ? (
                                    <button
                                        onClick={() => navigate('/admin')}
                                        className='h-10 w-40 text-xs bg-light-peach transition-all hover:bg-warm-beige rounded-md hover:scale-105 hover:text-sm hover:text-white hover:rounded-lg'
                                    >
                                        Admin
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate('/basket')}
                                        className='h-10 w-40 text-xs bg-light-peach transition-all hover:bg-warm-beige rounded-md hover:scale-105 hover:text-sm hover:text-white hover:rounded-lg'
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} className='mr-3' />
                                        Shopping Cart {items?.length > 0 ? `(${items.reduce((total, item) => total + (item.quantity || 0), 0)})` : ""}
                                    </button>
                                )
                            }

                            <button
                                onClick={() => navigate('/profile')}
                                className='h-10 w-40 text-xs bg-light-peach transition-all hover:bg-warm-beige rounded-md hover:scale-105 hover:text-sm hover:text-white hover:rounded-lg'
                            >
                                <FontAwesomeIcon icon={faUser} className='mr-3' />Profile
                            </button>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;
