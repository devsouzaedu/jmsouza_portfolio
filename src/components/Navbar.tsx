// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome, FaCode, FaEnvelope, FaBlog, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para detectar o scroll e mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed w-full z-50 flex justify-between items-center p-4 transition-all duration-300 ease-in-out ${
          isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <h1 className="text-xl font-bold text-white">J.M. Souza</h1>
        
        {/* Menu para Desktop - Ícones */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-300">
            <div className="flex flex-col items-center">
              <FaHome className="text-xl mb-1" />
              <span className="text-xs">Home</span>
            </div>
          </Link>
          <Link href="#projetos" className="text-white hover:text-gray-300 transition-colors duration-300">
            <div className="flex flex-col items-center">
              <FaCode className="text-xl mb-1" />
              <span className="text-xs">Projetos</span>
            </div>
          </Link>
          <Link href="/blog" className="text-white hover:text-gray-300 transition-colors duration-300">
            <div className="flex flex-col items-center">
              <FaBlog className="text-xl mb-1" />
              <span className="text-xs">Blog</span>
            </div>
          </Link>
          <Link href="#contato" className="text-white hover:text-gray-300 transition-colors duration-300">
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-xl mb-1" />
              <span className="text-xs">Contato</span>
            </div>
          </Link>
        </div>

        {/* Botão sanduíche para mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
      </nav>

      {/* Menu fullscreen mobile */}
      <div 
        className={`fixed inset-0 bg-black z-50 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button 
          onClick={() => setIsMenuOpen(false)} 
          className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
        >
          <FaTimes />
        </button>
        
        <div className="flex flex-col space-y-8 items-center">
          <Link 
            href="/" 
            className="text-white text-2xl hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-4">
              <FaHome className="text-xl" />
              <span>Home</span>
            </div>
          </Link>
          
          <Link 
            href="#projetos" 
            className="text-white text-2xl hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-4">
              <FaCode className="text-xl" />
              <span>Projetos</span>
            </div>
          </Link>
          
          <Link 
            href="/blog" 
            className="text-white text-2xl hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-4">
              <FaBlog className="text-xl" />
              <span>Blog</span>
            </div>
          </Link>
          
          <Link 
            href="#contato" 
            className="text-white text-2xl hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-xl" />
              <span>Contato</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
