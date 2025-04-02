"use client";

// src/app/page.tsx
import Navbar from '@/components/Navbar';
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
          className="pt-20 md:pt-32 pb-8 md:pb-16 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
          style={{
            minHeight: 'calc(50vh)',
            position: 'relative',
          }}
        >
          {/* Vídeo de fundo */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Vídeo em loop */}
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop
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
            <h1 className="text-5xl font-bold mb-4 animate-fadeIn text-white">J.M Souza</h1>
            <p className="text-xl mb-8 max-w-3xl animate-fadeIn text-white" style={{animationDelay: '0.2s'}}>
             Eu gosto de criar, de agir, eu odeio perder tempo, se você precisa criar uma solução envolvendo código, eu sou o cara certo.
            </p>
            <Button variant="default" size="lg" className="animate-fadeIn hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.4s'}}>
              O que eu ja fiz
            </Button>
          </div>
        </section>

        {/* Seção de Projetos */}
        <section id="projetos" className="py-16 bg-black">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8 transform transition-all duration-500 hover:scale-105 animate-fadeIn">Meus Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Projeto 1 - Unia.App */}
              <Link href="https://unia-app-nail-designer.vercel.app" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
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
                      Meu projeto atual, eu quero transformar a vida das manicures facilitando a profissão com ferramentas como Gerador de inspiração, Cronometro de serviço, Detectar e gerar tutorial de unha, Organização Financeira e Agendamento.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 2 - HotAir */}
              <Link href="https://devsouzaedu.github.io/Hotair_Hot_air_balloon_game/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
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
                      Um projeto que une tecnologia e criatividade (e muito Three.js) para criar um jogo multiplayer de voo de balão de ar quente competitivo.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 3 - Libracom */}
              <Link href="https://libracomwindbanner.com.br" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/libracom_fundo_card_2.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Libracom Wind Banners Site</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      O primeiro site da LibraCom, minha empresa de bandeiras e comunicação visual (O que paga as contas).
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 4 - Dra. Cristiane */}
              <Link href="https://dra-cristiane-site.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/dra_cris_bg.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Dra. Cristiane</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Um site profissional para psicóloga clínica Cristiane Duarte, com design elegante e focado na experiência do paciente, facilitando agendamentos e apresentando seus serviços.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 5 - Eduardo Libra */}
              <Link href="https://eduardo-libra-portfolio-2025.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.5s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/eduardo_libra_bg.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Eduardo Libra</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Portfolio artístico para o especialista em obras de arte infláveis gigantes, exibindo criações impressionantes e oferecendo serviços para eventos e exposições.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 6 - Mariana Nails */}
              <Link href="https://www.mariananails.com.br/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.6s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/mariana_fundo_site.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Mariana Nails</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Site profissional para a nail designer Mariana Nails, apresentando seu trabalho artístico em unhas, galeria de designs exclusivos e sistema de agendamento para clientes.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 7 - Blitz Lavanderia */}
              <Link href="https://v2-blitz-site.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.7s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/blitz_lavanderia_fundo_card.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Blitz Lavanderia</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Site para a Blitz Lavanderia, oferecendo serviços de lavagem profissional com sistema de agendamento online, rastreamento de pedidos e informações completas sobre os serviços disponíveis.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 8 - Árbitros SP */}
              <Link href="https://meu-arb-fav.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.8s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/arbitro_fundo_site.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Árbitros SP</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Plataforma para conectar árbitros e times amadores de futebol em São Paulo, oferecendo um sistema de agendamento para jogos de várzea e garantindo mais profissionalismo e imparcialidade nas partidas.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 9 - Espaço Oliver */}
              <Link href="https://oliver-espaco-site.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.9s'}}>
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/oliver_fundo_site.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Espaço Oliver</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Site elegante para o salão de beleza Espaço Oliver, especializado em nail design, manicure e pedicure, com sistema de agendamento online, galeria de trabalhos e apresentação da equipe de profissionais.
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
            <h2 className="text-3xl font-bold text-white mb-4 transform transition-all duration-500 hover:scale-105 animate-fadeIn">Sobre Mim</h2>
            <p className="text-lg text-gray-300 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              Desde cedo, sempre fui fascinado pela magia da tecnologia e o poder transformador da programação.
              Ao longo dos anos, desenvolvi habilidades tanto no front-end quanto no back-end, o que me permite
              criar soluções completas e integradas. Acredito que o futuro é construído hoje e estou comprometido
              em estar sempre um passo à frente, inovando e superando desafios.
            </p>
          </div>
        </section>

        {/* Seção de Contato */}
        <section className="py-8 bg-black flex justify-center">
          <ContactButton variant="default" size="lg" className="animate-fadeIn hover:scale-105 transition-transform duration-300" />
        </section>
      </main>
    </>
  );
}