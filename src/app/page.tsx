"use client";

// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/Button';
import { ContactButton } from '@/components/ContactButton'; // Novo import
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ajusta a velocidade de reprodução do vídeo para câmera lenta
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        {/* Seção de Introdução */}
        <section 
          className="py-16 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
          style={{
            minHeight: '80vh',
            position: 'relative',
          }}
        >
          {/* Vídeo de fundo */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute w-full h-full object-cover"
              style={{
                filter: 'blur(2px)',
                opacity: 0.7,
              }}
            >
              <source src="/dots_video.mp4" type="video/mp4" />
            </video>
            
            {/* Gradiente para melhorar a legibilidade do texto */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 to-black/80"></div>
          </div>
          
          {/* Conteúdo diretamente sobre o vídeo, sem o card */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 animate-slideUp text-white">Olá, eu sou J.M Souza</h1>
            <p className="text-xl mb-8 max-w-3xl animate-slideUp text-white" style={{animationDelay: '0.2s'}}>
              Sou um desenvolvedor full-stack obcecado por criar soluções para os mais variados problemas.
              Minha paixão por tecnologia me impulsiona a buscar sempre o próximo desafio e transformar ideias
              em aplicações reais e funcionais. Com experiência em diversas linguagens e frameworks, estou sempre
              em busca de inovações e melhorias para tornar o mundo digital um lugar melhor.
            </p>
            <Button variant="default" size="lg" className="animate-slideUp" style={{animationDelay: '0.4s'}}>
              Confira meus projetos
            </Button>
          </div>
        </section>

        {/* Seção de Projetos */}
        <section id="projetos" className="py-16 bg-black">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Meus Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Projeto 1 - Unia.App */}
              <Link href="https://unia-app-nail-designer.vercel.app" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_TGia9OiBNt.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Unia.App</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Uma plataforma inovadora que integra diversas soluções para entregar um canivete suiço para Nail designers.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 2 - HotAir */}
              <Link href="https://devsouzaedu.github.io/Hotair_Hot_air_balloon_game/" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_dd3DQtwf08.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">HotAir - Jogo de Balão Multiplayer</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Um projeto que une tecnologia e criatividade (e muito Three.js) para criar um jogo de voo de balão de ar quente competitivo.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 3 - Libracom */}
              <Link href="https://libracomwindbanner.com.br" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_s8bkasJJpo.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Libracom Wind Banners Site</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Um site moderno e responsivo para a Libracom, com foco em design, SEO e Vendas, para a minha empresa de comunicação visual.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Seção opcional de "Sobre mim" ou outros conteúdos */}
        <section id="sobre" className="py-16 bg-black">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">Sobre Mim</h2>
            <p className="text-lg text-gray-300">
              Desde cedo, sempre fui fascinado pela magia da tecnologia e o poder transformador da programação.
              Ao longo dos anos, desenvolvi habilidades tanto no front-end quanto no back-end, o que me permite
              criar soluções completas e integradas. Acredito que o futuro é construído hoje e estou comprometido
              em estar sempre um passo à frente, inovando e superando desafios.
            </p>
          </div>
        </section>

        {/* Seção de Contato */}
        <section className="py-8 bg-black flex justify-center">
          <ContactButton variant="default" size="lg" />
        </section>
      </main>
      <Footer />
    </>
  );
}