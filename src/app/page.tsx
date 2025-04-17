"use client";

// src/app/page.tsx
import Navbar from '@/components/Navbar';
import { Button } from '@/components/Button';
import { ContactButton } from '@/components/ContactButton'; // Manter se usado no novo formulário/footer
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
// Importar ícones se necessário para a seção de benefícios/processos
import { FaMobileAlt, FaUsers, FaPaintBrush, FaTachometerAlt, FaHeadset, FaGoogle, FaCogs, FaLink, FaBullhorn, FaFileAlt, FaComments, FaRocket, FaCheckCircle, FaRegArrowAltCircleRight } from 'react-icons/fa';

// Atualizado com os novos vídeos, priorizando webm
const videos = [
  { webm: '/videohero_ (2).webm', mp4: '/videohero_ (2) (1).mp4' },
  { webm: '/videohero_ (3).webm', mp4: '/videohero_ (3) (1).mp4' },
  { webm: '/videohero_ (4).webm', mp4: '/videohero_ (4) (1).mp4' },
];

// Helper para extrair domínio da URL
const getDomainFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace('www.', '');
  } catch (e) {
    // Retorna a URL original se não for uma URL válida (ex: link interno ou inválido)
    // Ou pode retornar uma string vazia/placeholder
    console.error("Erro ao parsear URL:", e, url);
    return url; // Ou retorne "" ou um placeholder
  }
};

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    // Limpeza ao desmontar o componente
    return () => {
      if (videoElement) { // Checa se ainda existe
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []); // Dependência vazia para rodar apenas uma vez

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    // Garante que o vídeo recarregue e toque quando o índice mudar
    videoElement.load();
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Erro ao tentar tocar o vídeo:", error);
        // Navegadores podem bloquear autoplay sem interação do usuário
      });
    }
  }, [currentVideoIndex]);

  return (
    <>
      <Navbar />
      {/* Seção Hero - Layout Ajustado */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center text-center overflow-hidden">
        {/* Vídeo Background */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          key={currentVideoIndex} // Chave para forçar recriação/recarregamento
          muted // Autoplay geralmente requer muted
          autoPlay
          playsInline // Para compatibilidade mobile
          preload="auto"
        >
          {/* Fontes WebM e MP4 */}
          <source src={videos[currentVideoIndex].webm} type="video/webm" />
          <source src={videos[currentVideoIndex].mp4} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>

        {/* Overlay Escuro */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div> {/* Overlay um pouco mais escuro */}

        {/* Conteúdo - Layout Ajustado conforme print */}
        <div className="relative z-20 px-4 text-white max-w-3xl mx-auto"> {/* Largura máxima e margem automática */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn animation-delay-200">
            Aumente suas vendas com sites inteligentes
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fadeIn animation-delay-400">
            Parece mágica, mas é apenas a internet funcionando para sua empresa aumentar o faturamento
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn animation-delay-600">
            {/* Botão WhatsApp - Estilo ajustado: Branco -> Verde */}
            <Button asChild size="lg" className="bg-white text-black hover:bg-green-500 hover:text-white transition-colors duration-300 transform hover:scale-105">
              <a href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20melhorar%20minha%20presença%20digital..." target="_blank" rel="noopener noreferrer">
                Chamar no whatsapp
              </a>
            </Button>
            {/* Botão Análise Grátis */}
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20 hover:text-white transition-colors duration-300 transform hover:scale-105">
              <Link href="#analise-gratuita"> {/* Link para a nova seção de análise */}
                Receber Análise Grátis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="bg-white text-black">
        {/* Seção de Benefícios */}
        <section id="beneficios" className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                { icon: FaMobileAlt, title: 'Sites Responsivos', desc: 'Sites que se adaptam perfeitamente ao tamanho da tela do computador, celular ou tablet.' },
                { icon: FaUsers, title: 'User Experience', desc: 'Estratégias de UX/UI Design focadas em otimizar a experiência do usuário, melhorar a usabilidade, navegação e conversão.' },
                { icon: FaPaintBrush, title: 'Layout Personalizado', desc: 'O layout é exclusivo e desenvolvido por especialistas. Formas, cores, imagens, ícones. Tudo isso é pensado nos mínimos detalhes.' },
                { icon: FaTachometerAlt, title: 'Páginas Rápidas', desc: 'Carregamento das páginas de forma rápida para aumentar o número de conversões, através de otimização e servidor cloud de alta performance.' },
                { icon: FaHeadset, title: 'Suporte Contínuo', desc: 'Conte com um time de especialistas para dar suporte às suas necessidades. Tudo isso feito sob-demanda, quando precisar.' },
                { icon: FaGoogle, title: 'Pronto para o Google', desc: 'Seguimos todas as diretrizes e critérios impostos pelo Google para que sua empresa apareça na maior rede de pesquisa.' },
                { icon: FaCogs, title: 'Personalização Total', desc: 'Desenvolvemos todos os sites de forma personalizada, layouts 100% exclusivos para a sua marca. Uma aparência moderna e profissional.' },
                { icon: FaLink, title: 'Integração', desc: "Integramos com os principais CRM's, ERP's, sistemas e plataformas de pagamentos digitais, para automatizar seus processos." },
              ].map((item, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <item.icon className="text-4xl text-[#ffa300] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção Parceiros Google */}
        <section id="parceiros-google" className="py-16 lg:py-24 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Adicionar a imagem do logo do Google Partner aqui se tiver */}
            {/* <Image src="/google-partner-logo.png" alt="Google Partner Logo" width={150} height={50} className="mx-auto mb-6"/> */}
            <h2 className="text-3xl font-bold text-black mb-4">Orgulhosamente Parceiros Oficiais do Google</h2>
            <p className="text-lg text-gray-700">
              O Google processa aproximadamente 40 mil buscas por SEGUNDO. Todos os dias são realizadas 3,5 mil milhões de pesquisas no Google, ou seja, a cada minuto que você deixa de ter uma presença online, a sua empresa perde diversas oportunidades de conquistar novos clientes. E temos orgulho de ser parceiros oficiais do Google!
            </p>
          </div>
        </section>

        {/* Seção Por que escolher */}
        <section id="porque-escolher" className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-12">Por que escolher a JMSOUZA para o seu projeto?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                <FaRocket className="text-4xl text-[#ffa300] mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">Tecnologia Atual</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">Criamos seu site com o que há de mais inovador em tecnologia, análise de dados avançada e o poder transformador da inteligência artificial.</p>
                <Button asChild size="default" className="mt-auto bg-[#ffa300] text-black hover:bg-[#ffc107] transition-colors duration-300 w-full">
                  <Link href="#orcamento">Solicitar Orçamento</Link>
                </Button>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                <FaFileAlt className="text-4xl text-[#ffa300] mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">Conteúdo Gerenciável</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">O conteúdo do site poderá ser gerenciado por você, como alteração de fotos e textos, inclusão de produtos ou postagens de notícias.</p>
                <Button asChild size="default" className="mt-auto border-[#ffa300] text-[#ffa300] hover:bg-[#ffa300]/10 transition-colors duration-300 w-full" variant="outline">
                  <Link href="#analise-gratuita">Receber uma Análise</Link>
                </Button>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                <FaComments className="text-4xl text-[#ffa300] mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">Treinamento na Plataforma</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">Após a finalização do seu site, você receberá um treinamento de como gerenciar o seu site da melhor forma possível.</p>
                <Button asChild size="default" className="mt-auto bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 w-full">
                   <a href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20saber%20mais%20sobre%20o%20treinamento..." target="_blank" rel="noopener noreferrer">
                     Chamar no WhatsApp
                   </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Nossos Cases (Antiga Meus Projetos) */}
        <section id="cases" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-2">Nossos Cases</h2>
              <p className="text-lg text-gray-600">Alguns projetos realizados ao decorrer da nossa trajetória</p>
            </div>
            {/* Mantendo a estrutura de grid anterior, ajustando o conteúdo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { href: "https://unia-app-nail-designer.vercel.app", img: "/opera_TGia9OiBNt.png", title: "Unia.App", desc: "Transformando a vida das manicures com ferramentas digitais: inspiração, cronômetro, tutoriais, finanças e agendamento.", delay: "0.1s", anim: "animate-slideInLeft" },
                { href: "https://devsouzaedu.github.io/Hotair_Hot_air_balloon_game/", img: "/opera_dd3DQtwf08.png", title: "HotAir - Jogo Multiplayer", desc: "Jogo multiplayer competitivo de balão de ar quente, unindo tecnologia (Three.js) e criatividade.", delay: "0.2s", anim: "animate-slideInBottom" },
                { href: "https://libracomwindbanner.com.br", img: "/libracom_fundo_card_2.png", title: "Libracom Wind Banners", desc: "Primeiro site da LibraCom, empresa de bandeiras e comunicação visual.", delay: "0.3s", anim: "animate-slideInRight" },
                { href: "https://dra-cristiane-site.vercel.app/", img: "/dra_cris_bg.png", title: "Site - Dra. Cristiane", desc: "Site profissional para psicóloga clínica, com design elegante e foco na experiência do paciente.", delay: "0.4s", anim: "animate-slideInLeft" },
                { href: "https://eduardo-libra-portfolio-2025.vercel.app/", img: "/eduardo_libra_bg.png", title: "Site - Eduardo Libra", desc: "Portfolio artístico para especialista em obras de arte infláveis gigantes.", delay: "0.5s", anim: "animate-slideInBottom" },
                { href: "https://www.mariananails.com.br/", img: "/mariana_fundo_site.png", title: "Site - Mariana Nails", desc: "Site profissional para nail designer, com galeria de trabalhos e agendamento online.", delay: "0.6s", anim: "animate-slideInRight" },
                { href: "https://v2-blitz-site.vercel.app/", img: "/blitz_lavanderia_fundo_card.png", title: "Site - Blitz Lavanderia", desc: "Site para lavanderia com agendamento online e rastreamento de pedidos.", delay: "0.7s", anim: "animate-slideInLeft" },
                { href: "https://meu-arb-fav.vercel.app/", img: "/arbitro_fundo_site.png", title: "Site - Árbitros SP", desc: "Plataforma para conectar árbitros e times amadores de futebol em São Paulo.", delay: "0.8s", anim: "animate-slideInBottom" },
                { href: "https://oliver-espaco-site.vercel.app/", img: "/oliver_fundo_site.jpg", title: "Site - Espaço Oliver", desc: "Site elegante para salão de beleza especializado em nail design, com agendamento online.", delay: "0.9s", anim: "animate-slideInRight" },
              ].map((project, index) => (
                <Link key={index} href={project.href} target="_blank" className={`block transform transition-all duration-500 hover:-translate-y-2 ${project.anim}`} style={{ animationDelay: project.delay }}>
                  <div
                    className="border border-[#ffa300] rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full"
                  >
                    <div className="relative aspect-video w-full" // Container para a imagem de fundo
                      style={{
                        backgroundImage: `url(${project.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                       <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div> {/* Overlay sobre a imagem */}
                    </div>
                    <div className="p-6 flex flex-col flex-grow"> {/* Conteúdo abaixo da imagem */}
                      <h3 className="text-xl font-semibold text-black mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm flex-grow mb-3">{project.desc}</p>
                      <p className="text-xs text-gray-500 mt-auto">{getDomainFromUrl(project.href)}</p> {/* Domínio adicionado */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* Seção Processos */}
        <section id="processos" className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-2">Como funcionam nossos processos?</h2>
              <p className="text-lg text-gray-600">Nossos processos são pautados pela objetividade e foco em resultados incríveis, combinando análises precisas, estratégias eficazes e treinamento contínuo.</p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              {/* Linha vertical (opcional, para visualização de timeline) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#ffa300]/30 hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>

              <div className="space-y-12">
                {[
                  { icon: FaFileAlt, title: 'Briefing e contratação', desc: 'Entendimento inicial das suas necessidades e objetivos.' },
                  { icon: FaUsers, title: 'Reunião com equipe de design', desc: 'Alinhamento criativo e definição da identidade visual.' },
                  { icon: FaBullhorn, title: 'Pesquisa de concorrentes e mercado', desc: 'Análise do cenário para encontrar oportunidades e diferenciais.' },
                  { icon: FaPaintBrush, title: 'Protótipo & Aprovação', desc: 'Criação e validação do design interativo do seu site.' },
                  { icon: FaCogs, title: 'Programação Web & Mobile', desc: 'Desenvolvimento técnico com foco em performance e responsividade.' },
                  { icon: FaRocket, title: 'Treinamento e Publicação', desc: 'Capacitação para gerenciamento e lançamento oficial do site.' },
                ].map((step, index) => (
                  <div key={index} className="relative md:flex md:items-center group">
                    {/* Ponto na timeline */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#ffa300] text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-10">
                      <step.icon className="text-2xl" />
                    </div>
                    {/* Conteúdo do Passo */}
                    <div className={`md:w-1/2 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'} relative`}>
                       {/* Seta indicadora (opcional) */}
                       <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45 ${index % 2 === 0 ? '-right-1.5' : '-left-1.5'}`}></div>
                      <h3 className="text-xl font-semibold text-black mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seção Feedback Clientes */}
        <section id="feedback" className="py-16 lg:py-24 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-2">Feedback dos nossos clientes</h2>
            <p className="text-lg text-gray-600 mb-8">Descubra o impacto real do nosso trabalho através das vozes de quem mais importa: nossos clientes!</p>
            {/* Placeholder para o carrossel/grid de depoimentos */}
            <div className="border border-dashed border-gray-300 rounded-lg p-8 text-gray-400">
              Em breve: Depoimentos de clientes satisfeitos.
            </div>
          </div>
        </section>

        {/* Seção Análise Gratuita CTA */}
        <section id="analise-gratuita" className="py-16 lg:py-24 bg-[#ffa300] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-4">Receba uma análise gratuita!</h2>
            <p className="text-lg text-gray-800 mb-8">
              Receba uma análise gratuita em sua conta de Google Ads, Facebook Ads, Site e Redes Sociais. Recomendaremos o melhor caminho para o sucesso do seu negócio na internet.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 transform hover:scale-105">
                <a href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20receber%20uma%20análise%20gratuita..." target="_blank" rel="noopener noreferrer">
                  Chamar no Whatsapp
                </a>
              </Button>
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                {/* Idealmente, isso abriria um modal ou iria para uma página de formulário */}
                Receber análise gratuita
              </Button>
            </div>
          </div>
        </section>

        {/* Seção Orçamento CTA e Formulário */}
        <section id="orcamento" className="py-16 lg:py-24 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-2">Solicite um orçamento</h2>
              <p className="text-lg text-gray-600">Preencha o formulário abaixo com os dados necessários. Nosso setor comercial irá entrar em contato com você.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Coluna do Formulário */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                  <input type="text" name="nome" id="nome" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffa300] focus:border-[#ffa300] sm:text-sm" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp</label>
                  <input type="tel" name="whatsapp" id="whatsapp" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffa300] focus:border-[#ffa300] sm:text-sm" placeholder="(XX) XXXXX-XXXX" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                  <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffa300] focus:border-[#ffa300] sm:text-sm" placeholder="seu@email.com" />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
                  <textarea name="mensagem" id="mensagem" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ffa300] focus:border-[#ffa300] sm:text-sm" placeholder="Conte-nos sobre seu projeto..."></textarea>
                </div>
                <div>
                  {/* Ação do formulário precisa ser implementada (API, Server Action, etc.) */}
                  <Button type="submit" size="lg" className="w-full bg-[#ffa300] text-black hover:bg-[#ffc107] transition-colors duration-300">
                    Enviar Pedido de Orçamento
                  </Button>
                </div>
              </form>
              {/* Coluna do Texto/Botão WhatsApp */}
              <div className="text-center md:text-left">
                 <h3 className="text-2xl font-semibold text-black mb-4">Prefere falar agora?</h3>
                 <p className="text-gray-600 mb-6">Clique no botão abaixo para iniciar uma conversa diretamente pelo WhatsApp e tirar suas dúvidas rapidamente.</p>
                 <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 transform hover:scale-105 w-full md:w-auto">
                    <a href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20solicitar%20um%20orçamento..." target="_blank" rel="noopener noreferrer">
                        Chamar no Whatsapp
                    </a>
                 </Button>
              </div>
            </div>
          </div>
        </section>

         {/* Seção de "Sobre mim" - Movida para perto do final */}
         <section id="sobre" className="py-16 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-4 transform transition-all duration-500 hover:scale-105 animate-slideDown">Sobre Mim</h2>
            <p className="text-lg text-gray-700 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              Desde cedo, sempre fui fascinado pela magia da tecnologia e o poder transformador da programação.
              Ao longo dos anos, desenvolvi habilidades tanto no front-end quanto no back-end, o que me permite
              criar soluções completas e integradas. Acredito que o futuro é construído hoje e estou comprometido
              em estar sempre um passo à frente, inovando e superando desafios.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} JMSOUZA Soluções Digitais. Todos os direitos reservados.</p>
            {/* Adicionar links de redes sociais ou outras informações se necessário */}
            {/* Exemplo:
            <div className="flex justify-center space-x-4 mt-4">
              <Link href="#" className="hover:text-white"><FaInstagram /></Link>
              <Link href="#" className="hover:text-white"><FaLinkedin /></Link>
            </div>
            */}
          </div>
        </footer>

      </main>
    </>
  );
}