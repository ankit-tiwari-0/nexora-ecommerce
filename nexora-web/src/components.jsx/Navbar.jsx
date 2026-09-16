import React from 'react'
import { Link } from 'react-router-dom'
import {
    Home,
    ShoppingCart,
    UserPlus,
    LogIn,
    LogOut,
    Lock
} from 'lucide-react'

const Navbar = () => {
    const user = false
    const cart = []
    const isAdmin = true

    const logout = () => {
        console.log('Logout clicked')
    }

    return (
        <header
            className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md
            shadow-lg z-40 transition-all duration-300 border-b border-emerald-800 rounded-xl'
        >
            <div className='container mx-auto px-3 sm:px-4 py-3'>
                <div className='flex justify-between items-center'>

                    {/* Logo */}
                    <Link
                        to='/'
                        className='text-xl sm:text-2xl font-bold text-emerald-400 flex items-center'
                    >
                        Nexora
                    </Link>

                    {/* Navigation */}
                    <nav className='flex items-center gap-4'>

                        {/* Home */}
                        <Link
                            to='/'
                            className='flex items-center text-gray-300 hover:text-emerald-400
                            transition duration-300 ease-in-out font-medium'
                        >
                            <Home size={24} />
                        </Link>

                        {/* Cart */}
                        {user && (
                            <Link
                                to='/cart'
                                className='relative group text-gray-300 hover:text-emerald-400
                                transition duration-300 ease-in-out flex items-center'
                            >
                                <ShoppingCart
                                    size={18}
                                    className='group-hover:text-emerald-400'
                                />

                                <span className='hidden sm:inline ml-1'>
                                    Cart
                                </span>

                                {cart.length > 0 && (
                                    <span
                                        className='absolute -top-2 -left-2 bg-emerald-500 text-white
                                        rounded-full px-2 py-0.5 text-xs'
                                    >
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Admin Dashboard */}
                        {isAdmin && (
                            <Link
                                to='/secret-dashboard'
                                className='bg-emerald-700 hover:bg-emerald-600 text-white
                                px-2 sm:px-3 py-2 rounded-md font-medium
                                transition duration-300 ease-in-out flex items-center'
                            >
                                <Lock size={16} />

                                <span className='hidden sm:inline ml-1'>
                                    Dashboard
                                </span>
                            </Link>
                        )}

                        {/* Logout / Signup + Login */}
                        {user ? (
                            <button
                                className='bg-gray-700 hover:bg-gray-600 text-white
                                py-2 px-2 sm:px-4 rounded-md flex items-center
                                transition duration-300 ease-in-out'
                                onClick={logout}
                            >
                                <LogOut size={18} />

                                <span className='hidden sm:inline ml-2'>
                                    Log Out
                                </span>
                            </button>
                        ) : (
                            <>
                                {/* Sign Up */}
                                <Link
                                    to='/signup'
                                    className='bg-emerald-600 hover:bg-emerald-700 text-white
                                    py-1 px-1 lg:py-2 lg:px-2 sm:px-4  rounded-md flex items-center
                                    transition duration-300 ease-in-out'
                                >
                                    <UserPlus
                                        className='mr-1 sm:mr-2'
                                        size={18}
                                    />

                                    <span>
                                        Sign Up
                                    </span>
                                </Link>

                                {/* Login */}
                                <Link
                                    to='/login'
                                    className='bg-gray-700 hover:bg-gray-600 text-white
                                    py-1 px-1 lg:py-2 lg:px-2 sm:px-4  rounded-md flex items-center
                                    transition duration-300 ease-in-out'
                                >
                                    <LogIn
                                        className='mr-1 sm:mr-2'
                                        size={18}
                                    />

                                    <span>
                                        Login
                                    </span>
                                </Link>
                            </>
                        )}

                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar