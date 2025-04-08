"use client";

// src/app/page.tsx
import Navbar from '@/components/Navbar';
import { Button } from '@/components/Button';
import { ContactButton } from '@/components/ContactButton'; // Novo import
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black" 
        style={{
          backgroundImage: `url(/vercel.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Seção de Projetos */}
        <section id="projetos" className="pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-black mb-8 transform transition-all duration-500 hover:scale-105 animate-fadeIn">Meus Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Projeto 1 - Unia.App */}
              <Link href="https://unia-app-nail-designer.vercel.app" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_TGia9OiBNt.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Unia.App</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Meu projeto atual, eu quero transformar a vida das manicures facilitando a profissão com ferramentas como Gerador de inspiração, Cronometro de serviço, Detectar e gerar tutorial de unha, Organização Financeira e Agendamento.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 2 - HotAir */}
              <Link href="https://devsouzaedu.github.io/Hotair_Hot_air_balloon_game/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_dd3DQtwf08.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">HotAir - Jogo de Balão Multiplayer</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Um projeto que une tecnologia e criatividade (e muito Three.js) para criar um jogo multiplayer de voo de balão de ar quente competitivo.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 3 - Libracom */}
              <Link href="https://libracomwindbanner.com.br" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/libracom_fundo_card_2.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Libracom Wind Banners Site</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      O primeiro site da LibraCom, minha empresa de bandeiras e comunicação visual (O que paga as contas).
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 4 - Dra. Cristiane */}
              <Link href="https://dra-cristiane-site.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/dra_cris_bg.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Site - Dra. Cristiane</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Um site profissional para psicóloga clínica Cristiane Duarte, com design elegante e focado na experiência do paciente, facilitando agendamentos e apresentando seus serviços.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 5 - Eduardo Libra */}
              <Link href="https://eduardo-libra-portfolio-2025.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.5s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/eduardo_libra_bg.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Site - Eduardo Libra</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Portfolio artístico para o especialista em obras de arte infláveis gigantes, exibindo criações impressionantes e oferecendo serviços para eventos e exposições.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 6 - Mariana Nails */}
              <Link href="https://www.mariananails.com.br/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.6s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/mariana_fundo_site.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Site - Mariana Nails</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Site profissional para a nail designer Mariana Nails, apresentando seu trabalho artístico em unhas, galeria de designs exclusivos e sistema de agendamento para clientes.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 7 - Blitz Lavanderia */}
              <Link href="https://v2-blitz-site.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.7s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/blitz_lavanderia_fundo_card.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Site - Blitz Lavanderia</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Site para a Blitz Lavanderia, oferecendo serviços de lavagem profissional com sistema de agendamento online, rastreamento de pedidos e informações completas sobre os serviços disponíveis.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 8 - Árbitros SP */}
              <Link href="https://meu-arb-fav.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.8s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/arbitro_fundo_site.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Site - Árbitros SP</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Plataforma para conectar árbitros e times amadores de futebol em São Paulo, oferecendo um sistema de agendamento para jogos de várzea e garantindo mais profissionalismo e imparcialidade nas partidas.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 9 - Espaço Oliver */}
              <Link href="https://oliver-espaco-site.vercel.app/" target="_blank" className="transform transition-all duration-500 hover:-translate-y-2 animate-fadeIn" style={{animationDelay: '0.9s'}}>
                <div
                  className="border border-[#ffa300] p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/oliver_fundo_site.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-black">Site - Espaço Oliver</h3>
                    <p className="mt-4 text-gray-700 flex-grow">
                      Site elegante para o salão de beleza Espaço Oliver, especializado em nail design, manicure e pedicure, com sistema de agendamento online, galeria de trabalhos e apresentação da equipe de profissionais.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Seção de "Sobre mim" */}
        <section id="sobre" className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-black mb-4 transform transition-all duration-500 hover:scale-105 animate-fadeIn">Sobre Mim</h2>
            <p className="text-lg text-gray-700 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              Desde cedo, sempre fui fascinado pela magia da tecnologia e o poder transformador da programação.
              Ao longo dos anos, desenvolvi habilidades tanto no front-end quanto no back-end, o que me permite
              criar soluções completas e integradas. Acredito que o futuro é construído hoje e estou comprometido
              em estar sempre um passo à frente, inovando e superando desafios.
            </p>
          </div>
        </section>

        {/* Seção de Contato - Footer */}
        <section id="contato" className="py-8 bg-[#ffa300] flex justify-center">
          <ContactButton variant="default" size="lg" className="animate-fadeIn hover:scale-105 transition-transform duration-300 bg-black text-[#ffa300] hover:bg-gray-800" />
        </section>
      </main>
    </>
  );
}