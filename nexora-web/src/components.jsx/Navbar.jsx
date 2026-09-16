import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ShoppingCart,
    UserPlus,
    LogIn,
    LogOut,
    Lock,
    Menu,
    X,
} from "lucide-react";

const Navbar = () => {
    const user = false;
    const cart = [];
    const isAdmin = true;

    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        console.log("Logout clicked");
        setMenuOpen(false);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-40 bg-gray-900/95 backdrop-blur-md border-b border-emerald-800 shadow-lg">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl sm:text-3xl font-bold text-emerald-400"
                    >
                        Nexora
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-3 lg:gap-5">

                        {/* Home */}
                        <Link
                            to="/"
                            className="text-gray-200 hover:text-emerald-400 transition"
                        >
                            Home
                        </Link>

                        {/* Cart */}
                        {user && (
                            <Link
                                to="/cart"
                                className="relative flex items-center text-gray-300 hover:text-emerald-400 transition"
                            >
                                <ShoppingCart size={21} />

                                <span className="ml-1">
                                    Cart
                                </span>

                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-emerald-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Admin Dashboard */}
                        {isAdmin && (
                            <Link
                                to="/secret-dashboard"
                                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-md flex items-center transition"
                            >
                                <Lock size={18} />
                                <span className="ml-1">
                                    Dashboard
                                </span>
                            </Link>
                        )}

                        {/* Login / Signup / Logout */}
                        {user ? (
                            <button
                                onClick={logout}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md flex items-center transition"
                            >
                                <LogOut size={18} />
                                <span className="ml-2">
                                    Logout
                                </span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md flex items-center transition"
                                >
                                    <UserPlus size={18} />
                                    <span className="ml-1">
                                        Sign Up
                                    </span>
                                </Link>

                                <Link
                                    to="/login"
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md flex items-center transition"
                                >
                                    <LogIn size={18} />
                                    <span className="ml-1">
                                        Login
                                    </span>
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-200 p-2 rounded-md hover:bg-gray-800 transition"
                    >
                        {menuOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <nav className="md:hidden border-t border-gray-700 py-4">

                        <div className="flex flex-col gap-2">

                            {/* Home */}
                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="text-gray-200 hover:bg-gray-800 hover:text-emerald-400 px-3 py-3 rounded-md transition"
                            >
                                Home
                            </Link>

                            {/* Cart */}
                            {user && (
                                <Link
                                    to="/cart"
                                    onClick={closeMenu}
                                    className="flex items-center text-gray-200 hover:bg-gray-800 hover:text-emerald-400 px-3 py-3 rounded-md transition"
                                >
                                    <ShoppingCart size={20} />

                                    <span className="ml-2">
                                        Cart
                                    </span>

                                    {cart.length > 0 && (
                                        <span className="ml-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>
                            )}

                            {/* Admin */}
                            {isAdmin && (
                                <Link
                                    to="/secret-dashboard"
                                    onClick={closeMenu}
                                    className="flex items-center bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-3 rounded-md transition"
                                >
                                    <Lock size={19} />

                                    <span className="ml-2">
                                        Dashboard
                                    </span>
                                </Link>
                            )}

                            {/* Logout */}
                            {user ? (
                                <button
                                    onClick={logout}
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-3 rounded-md flex items-center transition"
                                >
                                    <LogOut size={19} />

                                    <span className="ml-2">
                                        Logout
                                    </span>
                                </button>
                            ) : (
                                <>
                                    {/* Signup */}
                                    <Link
                                        to="/signup"
                                        onClick={closeMenu}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-3 rounded-md flex items-center transition"
                                    >
                                        <UserPlus size={19} />

                                        <span className="ml-2">
                                            Sign Up
                                        </span>
                                    </Link>

                                    {/* Login */}
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-3 rounded-md flex items-center transition"
                                    >
                                        <LogIn size={19} />

                                        <span className="ml-2">
                                            Login
                                        </span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;