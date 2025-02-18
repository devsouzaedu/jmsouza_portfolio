// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        {/* Seção de Introdução */}
        <section className="py-16 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Olá, eu sou J.M Souza</h1>
          <p className="text-xl mb-8 max-w-3xl">
            Sou um desenvolvedor full-stack obcecado por criar soluções para os mais variados problemas.
            Minha paixão por tecnologia me impulsiona a buscar sempre o próximo desafio e transformar ideias
            em aplicações reais e funcionais. Com experiência em diversas linguagens e frameworks, estou sempre
            em busca de inovações e melhorias para tornar o mundo digital um lugar melhor.
          </p>
          <Button variant="default" size="lg">
            Confira meus projetos
          </Button>
        </section>

        {/* Seção de Projetos */}
        <section id="projetos" className="py-16 bg-black">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Meus Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Projeto 1 */}
              <div className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors">
                <h3 className="text-xl font-semibold text-white">Unia.App</h3>
                <p className="mt-4 text-gray-300">
                  Uma plataforma inovadora que integra diversas soluções para conectar pessoas e negócios de forma simples e eficiente.
                </p>
              </div>
              {/* Projeto 2 */}
              <div className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors">
                <h3 className="text-xl font-semibold text-white">Jazzy</h3>
                <p className="mt-4 text-gray-300">
                  Um projeto que une tecnologia e criatividade para desenvolver experiências digitais interativas e envolventes.
                </p>
              </div>
              {/* Projeto 3 */}
              <div className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors">
                <h3 className="text-xl font-semibold text-white">Libracom Wind Banners Site</h3>
                <p className="mt-4 text-gray-300">
                  Um site moderno e responsivo para a Libracom, com foco em design minimalista e funcionalidade, apresentando banners dinâmicos e interativos.
                </p>
              </div>
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
      </main>
      <Footer />
    </>
  );
}
