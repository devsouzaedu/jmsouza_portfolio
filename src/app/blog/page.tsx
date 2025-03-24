"use client";

import Navbar from '@/components/Navbar';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Blog() {
  useEffect(() => {
    // Scroll para o topo quando a página carrega
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 animate-fadeIn">Blog</h1>
          
          <div className="space-y-8">
            {/* Artigo 1 */}
            <article className="border border-gray-700 rounded-lg p-6 animate-fadeIn hover:border-gray-500 transition-all duration-300" style={{animationDelay: '0.1s'}}>
              <h2 className="text-2xl font-semibold mb-2">Como escolhi as tecnologias para meus projetos</h2>
              <p className="text-gray-400 mb-3">Publicado em 15 de abril de 2025</p>
              <p className="text-gray-300 mb-4">
                Neste artigo, compartilho minha jornada na escolha de tecnologias como React, Next.js e Three.js 
                para meus projetos recentes, e como essas decisões impactaram o desenvolvimento...
              </p>
              <Button variant="outline" size="sm">Ler mais</Button>
            </article>
            
            {/* Artigo 2 */}
            <article className="border border-gray-700 rounded-lg p-6 animate-fadeIn hover:border-gray-500 transition-all duration-300" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-semibold mb-2">A importância da experiência do usuário em sites modernos</h2>
              <p className="text-gray-400 mb-3">Publicado em 2 de abril de 2025</p>
              <p className="text-gray-300 mb-4">
                Analisando como pequenas decisões de design e interação podem transformar completamente a 
                percepção dos usuários sobre um site ou aplicativo...
              </p>
              <Button variant="outline" size="sm">Ler mais</Button>
            </article>
            
            {/* Artigo 3 */}
            <article className="border border-gray-700 rounded-lg p-6 animate-fadeIn hover:border-gray-500 transition-all duration-300" style={{animationDelay: '0.3s'}}>
              <h2 className="text-2xl font-semibold mb-2">Construindo o HotAir: Desafios de um jogo multiplayer</h2>
              <p className="text-gray-400 mb-3">Publicado em 18 de março de 2025</p>
              <p className="text-gray-300 mb-4">
                Um relato detalhado sobre os desafios técnicos enfrentados durante o desenvolvimento 
                do jogo de balão de ar quente multiplayer, especialmente relacionados à física e sincronização...
              </p>
              <Button variant="outline" size="sm">Ler mais</Button>
            </article>
          </div>
          
          <div className="mt-12 text-center animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <Link href="/">
              <Button variant="outline" size="default">Voltar para a página inicial</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
} 