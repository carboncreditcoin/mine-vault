'use client';
import React, { useState, useEffect } from 'react';
import logo from "@/public/images/logo.png";
import { Menu, User, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <>
            {/* Main Navbar */}
            <nav className={`fixed z-50 w-full max-w-[2000px] mx-auto bg-white shadow-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="px-6">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Name */}
                        <div className="flex-shrink-0 pt-2">
                            <span className="text-xl font-bold text-gray-800">Mine Vault</span>
                            {/* <Image
                            src={logo}
                            alt='logo'
                            width={180}
                            height={180} /> */}
                        </div>

                        {/* Desktop User Button */}
                        <div className="hidden md:block">
                            <button className="px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100 flex items-center gap-2">
                                <User size={20} />
                                <span>User</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 z-50 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? '-translate-x-0' : '-translate-x-full'
                    } md:hidden`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4">
                    <button
                        className="w-full px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                    >
                        <User size={20} />
                        <span>User</span>
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;