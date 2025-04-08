// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`backdrop-blur-md fixed w-full z-50 shadow-sm ${
      isScrolled ? "bg-white" : "bg-white/80"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo à esquerda */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo_novo_jmsouza.png" 
                alt="J.M Souza Logo" 
                width={120} 
                height={40} 
                className="h-auto" 
              />
            </Link>
          </div>

          {/* Menu para desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#projetos" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-[#ffa300] transition-colors">
                Projetos
              </Link>
              <Link href="#sobre" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-[#ffa300] transition-colors">
                Sobre
              </Link>
              <Link href="#contato" className="px-3 py-2 rounded-md text-base font-medium text-black hover:text-[#ffa300] transition-colors">
                Contato
              </Link>
            </div>
          </div>

          {/* Botão menu hambúrguer */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black hover:text-[#ffa300] hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {/* Ícone hambúrguer */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Ícone X para fechar */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu móvel */}
      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link
            href="#projetos"
            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-[#ffa300] hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Projetos
          </Link>
          <Link
            href="#sobre"
            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-[#ffa300] hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Sobre
          </Link>
          <Link
            href="#contato"
            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-[#ffa300] hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}
