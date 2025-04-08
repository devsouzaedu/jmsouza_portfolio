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

  // Prevenir scroll quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
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
                  width={80} 
                  height={32} 
                  className="h-10 w-auto" 
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
                <Link href="/blog" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-[#ffa300] transition-colors">
                  Blog
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
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-[#ffa300] focus:outline-none"
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
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu móvel em tela cheia */}
      <div 
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-black hover:text-[#ffa300] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
          <div className="flex-grow flex flex-col justify-center px-8">
            <div className="space-y-6">
              <Link
                href="/"
                className="block text-2xl font-medium text-black hover:text-[#ffa300]"
                onClick={toggleMenu}
              >
                Início
              </Link>
              <Link
                href="#projetos"
                className="block text-2xl font-medium text-black hover:text-[#ffa300]"
                onClick={toggleMenu}
              >
                Projetos
              </Link>
              <Link
                href="#sobre"
                className="block text-2xl font-medium text-black hover:text-[#ffa300]"
                onClick={toggleMenu}
              >
                Sobre
              </Link>
              <Link
                href="/blog"
                className="block text-2xl font-medium text-black hover:text-[#ffa300]"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                href="#contato"
                className="block text-2xl font-medium text-black hover:text-[#ffa300]"
                onClick={toggleMenu}
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
