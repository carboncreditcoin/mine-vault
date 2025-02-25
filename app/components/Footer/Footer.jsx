import React from 'react';
import { Facebook, Linkedin, MessageCircle, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200">
            <div className="px-6 py-4 md:py-0">
                <div className="h-16 flex flex-col-reverse md:flex-row items-center justify-between">
                    <p className="text-sm text-gray-600">© 2025 Mine Vault. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={20} />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-green-600 transition-colors"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle size={20} />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-blue-700 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-600 hover:text-blue-700 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;