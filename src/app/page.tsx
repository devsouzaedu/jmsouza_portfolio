"use client";

// src/app/page.tsx
import Navbar from '@/components/Navbar';
import { Button } from '@/components/Button';
import { ContactButton } from '@/components/ContactButton'; // Manter se usado no novo formulário/footer
import Link from 'next/link';
import Image from 'next/image'; // Adicionar importação
// Importar ícones se necessário para a seção de benefícios/processos
import { FaMobileAlt, FaUsers, FaPaintBrush, FaTachometerAlt, FaHeadset, FaGoogle, FaCogs, FaLink, FaBullhorn, FaFileAlt, FaComments, FaRocket, FaCheckCircle, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Declaração para o gtag_report_conversion usado nos botões
declare global {
  interface Window {
    gtag_report_conversion?: (url: string) => boolean;
  }
}

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

// Componente de seção animada reutilizável
const AnimatedSection = ({ children, className, id, delay = 0 }: { children: React.ReactNode, className?: string, id?: string, delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Seção Hero - Layout Simplificado com Imagem Estática */}
      <section 
        className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center px-4"
        style={{ backgroundImage: 'url(/hero_bc_empresa.jpg)' }}
      >
        {/* Overlay Escuro com efeito de gradiente animado */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/95 to-black/90 z-10 animate-pulse duration-5000"></div>

        {/* Efeito de partículas/pontos flutuantes */}
        <div className="absolute top-0 left-0 w-full h-full z-15 opacity-30">
          <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float-slow top-1/4 left-1/4"></div>
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-float-medium top-1/3 left-2/3"></div>
          <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-float-fast top-2/3 left-1/3"></div>
          <div className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-float-slow top-1/2 left-3/4"></div>
          <div className="absolute w-3 h-3 bg-red-400 rounded-full animate-float-medium top-3/4 left-1/4"></div>
        </div>

        {/* Conteúdo com efeitos de animação melhorados */}
        <div className="relative z-20 px-2 text-white max-w-3xl mx-auto">
          {/* Título Hero com animação de typing */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block animate-pulse-subtle duration-2000">Aumente suas vendas</span>
            <div className="overflow-hidden w-full mt-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-typing inline-block">com sites inteligentes</span>
            </div>
          </h1>
           {/* Parágrafo com animação fade-in */}
          <p className="text-base sm:text-lg md:text-2xl font-medium mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Parece mágica, mas é apenas a internet funcionando para sua empresa <span className="font-bold text-yellow-400">aumentar o faturamento</span>
          </p>
           {/* Botões com animações melhoradas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto sm:max-w-none animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            {/* Botão WhatsApp */}
            <Button asChild size="lg" className="w-full bg-green-600 text-white hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 animate-pulse-subtle py-6 sm:py-4 text-base sm:text-lg">
              <a 
                href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20melhorar%20minha%20presen%C3%A7a%20digital..." 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault(); // Previne a navegação padrão imediata
                  if (window.gtag_report_conversion) {
                    window.gtag_report_conversion(e.currentTarget.href);
                  }
                  return false;
                }}
              >
                Chamar no whatsapp
              </a>
            </Button>
            {/* Botão Análise Grátis */}
            <Button asChild variant="outline" size="lg" className="w-full border-white text-white hover:bg-white/30 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/20 py-6 sm:py-4 text-base sm:text-lg">
              <Link href="#analise-gratuita">
                Receber Análise Grátis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="bg-white text-black">
        {/* Seção de Benefícios com animações melhoradas */}
        <AnimatedSection id="beneficios" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-gray-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título da seção com animação */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-black mb-2">Benefícios exclusivos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Tecnologia e design pensados para maximizar seus resultados</p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                 { icon: FaMobileAlt, title: 'Sites Responsivos', desc: 'Sites que se adaptam perfeitamente ao tamanho da tela do computador, celular ou tablet.', delay: 0.1 },
                 { icon: FaUsers, title: 'User Experience', desc: 'Estratégias de UX/UI Design focadas em otimizar a experiência do usuário, melhorar a usabilidade, navegação e conversão.', delay: 0.2 },
                 { icon: FaPaintBrush, title: 'Layout Personalizado', desc: 'O layout é exclusivo e desenvolvido por especialistas. Formas, cores, imagens, ícones. Tudo isso é pensado nos mínimos detalhes.', delay: 0.3 },
                 { icon: FaTachometerAlt, title: 'Páginas Rápidas', desc: 'Carregamento das páginas de forma rápida para aumentar o número de conversões, através de otimização e servidor cloud de alta performance.', delay: 0.4 },
                 { icon: FaHeadset, title: 'Suporte Contínuo', desc: 'Conte com um time de especialistas para dar suporte às suas necessidades. Tudo isso feito sob-demanda, quando precisar.', delay: 0.5 },
                 { icon: FaGoogle, title: 'Pronto para o Google', desc: 'Seguimos todas as diretrizes e critérios impostos pelo Google para que sua empresa apareça na maior rede de pesquisa.', delay: 0.6 },
                 { icon: FaCogs, title: 'Personalização Total', desc: 'Desenvolvemos todos os sites de forma personalizada, layouts 100% exclusivos para a sua marca. Uma aparência moderna e profissional.', delay: 0.7 },
                 { icon: FaLink, title: 'Integração', desc: "Integramos com os principais CRM's, ERP's, sistemas e plataformas de pagamentos digitais, para automatizar seus processos.", delay: 0.8 },
              ].map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping-slow opacity-30"></div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative z-10 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                      >
                        <item.icon className="text-2xl text-white" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2 hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-700 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Seção Parceiros Google - Animações de scroll */}
        <AnimatedSection id="parceiros-google" className="py-16 lg:py-24 bg-black text-center overflow-hidden" delay={0.2}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Logo com animação */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Image 
                src="/PartnerBadge.png" 
                alt="Google Partner Badge" 
                width={150} 
                height={50} 
                className="mx-auto" 
              />
            </motion.div>
            {/* Título com animação */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Orgulhosamente Parceiros Oficiais do Google
            </motion.h2> 
            {/* Parágrafo com animação */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-gray-300"
            >
              O Google processa aproximadamente 40 mil buscas por SEGUNDO. Todos os dias são realizadas 3,5 mil milhões de pesquisas no Google, ou seja, a cada minuto que você deixa de ter uma presença online, a sua empresa perde diversas oportunidades de conquistar novos clientes. E temos orgulho de ser parceiros oficiais do Google!
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Seção Por que escolher - Com animações nos cards */}
        <AnimatedSection id="porque-escolher" className="py-16 lg:py-24 bg-gray-100 overflow-hidden" delay={0.3}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-black mb-12"
            >
              Por que escolher a JMSOUZA para o seu projeto?
            </motion.h2>
             
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: FaRocket,
                  title: 'Tecnologia Atual',
                  desc: 'Criamos seu site com o que há de mais inovador em tecnologia, análise de dados avançada e o poder transformador da inteligência artificial.',
                  buttonText: 'Solicitar Orçamento',
                  buttonLink: '#orcamento',
                  buttonVariant: 'default',
                  buttonClass: 'mt-auto bg-black text-white hover:bg-gray-800 transition-colors duration-300 w-full',
                  delay: 0.1
                },
                {
                  icon: FaFileAlt,
                  title: 'Conteúdo Gerenciável',
                  desc: 'O conteúdo do site poderá ser gerenciado por você, como alteração de fotos e textos, inclusão de produtos ou postagens de notícias.',
                  buttonText: 'Receber uma Análise',
                  buttonLink: '#analise-gratuita',
                  buttonVariant: 'outline',
                  buttonClass: 'mt-auto border-black text-black hover:bg-gray-200 transition-colors duration-300 w-full',
                  delay: 0.3
                },
                {
                  icon: FaComments,
                  title: 'Treinamento na Plataforma',
                  desc: 'Após a finalização do seu site, você receberá um treinamento de como gerenciar o seu site da melhor forma possível.',
                  buttonText: 'Chamar no WhatsApp',
                  buttonLink: 'https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20saber%20mais%20sobre%20o%20treinamento...',
                  buttonVariant: 'default',
                  buttonClass: 'mt-auto bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 w-full',
                  isExternal: true,
                  delay: 0.5
                }
              ].map((card, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: card.delay }}
                  whileHover={{ y: -10 }}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center h-full"
                >
                  <card.icon className="text-4xl text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">{card.title}</h3>
                  <p className="text-gray-700 text-sm mb-6 flex-grow">{card.desc}</p>
                  
                  {card.isExternal ? (
                    <Button asChild size="default" className={card.buttonClass} variant={card.buttonVariant as any}>
                      <a href={card.buttonLink} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); if (window.gtag_report_conversion) { window.gtag_report_conversion(e.currentTarget.href); } return false; }}>
                        {card.buttonText}
                      </a>
                    </Button>
                  ) : (
                    <Button asChild size="default" className={card.buttonClass} variant={card.buttonVariant as any}>
                      <Link href={card.buttonLink}>
                        {card.buttonText}
                      </Link>
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Seção Nossos Cases - Sintaxe Corrigida (Sem animação nos cards) */}
        <section id="cases" className="py-16 lg:py-24 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-12 duration-700">
              <h2 className="text-3xl font-bold text-white mb-2 animate-fadeIn animation-delay-200">Nossos Cases</h2>
              <p className="text-lg text-gray-300 animate-fadeIn animation-delay-400">Alguns projetos realizados ao decorrer da nossa trajetória</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                 { href: "https://www.alessandranutri.com.br/", img: "/dra_alessandranutricionista_card.png", title: "Site - Dra. Alessandra", desc: "Site profissional para nutricionista especializada, com design moderno e informações sobre consultas e serviços.", delay: "0.1s" },
                 { href: "https://martins-balonismo-2.vercel.app/", img: "/martins_balonismo_card.jpg", title: "Martins Balonismo", desc: "Site para empresa de passeios de balão de ar quente, com agendamento de voos e galeria de imagens.", delay: "0.2s" },
                 { href: "https://www.barbeariadagringa.com.br/", img: "/barbearia_da_gringa_card.png", title: "Barbearia da Gringa", desc: "Site profissional para barbearia moderna, com agendamento online e apresentação dos serviços oferecidos.", delay: "0.3s" },
                 { href: "https://www.espacooliverbeauty.com.br/", img: "/oliver_fundo_site.jpg", title: "Site - Espaço Oliver", desc: "Site elegante para salão de beleza especializado em nail design, com agendamento online.", delay: "0.4s" }, 
                 { href: "https://www.cristianeduarte.com.br/", img: "/dra_cris_bg.png", title: "Site - Dra. Cristiane", desc: "Site profissional para psicóloga clínica, com design elegante e foco na experiência do paciente.", delay: "0.5s" }, 
                 { href: "https://unia-app-nail-designer.vercel.app", img: "/opera_TGia9OiBNt.png", title: "Unia.App", desc: "Transformando a vida das manicures com ferramentas digitais: inspiração, cronômetro, tutoriais, finanças e agendamento.", delay: "0.6s" },
                 { href: "https://devsouzaedu.github.io/Hotair_Hot_air_balloon_game/", img: "/opera_dd3DQtwf08.png", title: "HotAir - Jogo Multiplayer", desc: "Jogo multiplayer competitivo de balão de ar quente, unindo tecnologia (Three.js) e criatividade.", delay: "0.4s" },
                 { href: "https://libracomwindbanner.com.br", img: "/libracom_fundo_card_2.png", title: "Libracom Wind Banners", desc: "Primeiro site da LibraCom, empresa de bandeiras e comunicação visual.", delay: "0.5s" },
                 { href: "https://eduardo-libra-portfolio-2025.vercel.app/", img: "/eduardo_libra_bg.png", title: "Site - Eduardo Libra", desc: "Portfolio artístico para especialista em obras de arte infláveis gigantes.", delay: "0.6s" },
                 { href: "https://www.mariananails.com.br/", img: "/mariana_fundo_site.png", title: "Site - Mariana Nails", desc: "Site profissional para nail designer, com galeria de trabalhos e agendamento online.", delay: "0.7s" },
                 { href: "https://www.lavanderiablitz.com.br/", img: "/blitz_lavanderia_fundo_card.png", title: "Site - Blitz Lavanderia", desc: "Site para lavanderia com agendamento online e rastreamento de pedidos.", delay: "0.8s" }, 
                 { href: "https://meu-arb-fav.vercel.app/", img: "/arbitro_fundo_site.png", title: "Site - Árbitros SP", desc: "Plataforma para conectar árbitros e times amadores de futebol em São Paulo.", delay: "0.9s" },
              ].map((project, index) => (
                <Link key={index} href={project.href} target="_blank" className={`block transform transition-all duration-500 hover:-translate-y-2`}>
                  <div className="border border-black rounded-xl shadow-md bg-white hover:bg-gray-100 transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col h-full">
                    <div className="relative aspect-video w-full" style={{ backgroundImage: `url(${project.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-black mb-2">{project.title}</h3>
                      <p className="text-gray-700 text-sm flex-grow mb-3">{project.desc}</p>
                      <p className="text-xs text-gray-500 mt-auto">{getDomainFromUrl(project.href)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Seção Processos - Sintaxe Corrigida (Sem animação nos steps) */}
        <section id="processos" className="py-16 lg:py-24 bg-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-12 duration-700">
              <h2 className="text-3xl font-bold text-black mb-2">Como funcionam nossos processos?</h2>
              <p className="text-lg text-gray-700">Nossos processos são pautados pela objetividade e foco em resultados incríveis, combinando análises precisas, estratégias eficazes e treinamento contínuo.</p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-black/30 animate-in fade-in duration-1000" style={{ transform: 'translateX(-50%)' }}></div>
              <div className="space-y-8 md:space-y-12 relative">
                {[
                  { icon: FaFileAlt, title: 'Briefing e contratação', desc: 'Entendimento inicial das suas necessidades e objetivos.' },
                  { icon: FaUsers, title: 'Reunião com equipe de design', desc: 'Alinhamento criativo e definição da identidade visual.' },
                  { icon: FaBullhorn, title: 'Pesquisa de concorrentes e mercado', desc: 'Análise do cenário para encontrar oportunidades e diferenciais.' },
                  { icon: FaPaintBrush, title: 'Protótipo & Aprovação', desc: 'Criação e validação do design interativo do seu site.' },
                  { icon: FaCogs, title: 'Programação Web & Mobile', desc: 'Desenvolvimento técnico com foco em performance e responsividade.' },
                  { icon: FaRocket, title: 'Treinamento e Publicação', desc: 'Capacitação para gerenciamento e lançamento oficial do site.' },
                ].map((step, index) => (
                  <div key={index} className={`relative flex items-start md:items-center group`}>
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-black text-white absolute left-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-lg z-10">
                      <step.icon className="text-lg md:text-2xl" />
                    </div>
                    <div className={`ml-12 md:ml-0 md:w-1/2 p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'} relative`}>
                       <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45 ${index % 2 === 0 ? '-right-1.5' : '-left-1.5'}`}></div>
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-1 md:mb-2">{step.title}</h3>
                      <p className="text-gray-700 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seção Feedback Clientes - Animações Simplificadas */}
        <section id="feedback" className="py-16 lg:py-24 bg-black text-center overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
             {/* Título com animação sutil */}
            <h2 className="text-3xl font-bold text-white mb-2 animate-in fade-in slide-in-from-bottom-12 duration-700">Feedback dos nossos clientes</h2>
             {/* Parágrafo com animação */}
            <p className="text-lg text-gray-300 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">Descubra o impacto real do nosso trabalho através das vozes de quem mais importa: nossos clientes!</p>
            {/* Grid de Feedbacks - Cards com animações */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feedback 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 transform transition-transform hover:scale-110 duration-300">
                  <Image 
                    src="/garotas_feedback_pfp (1).jpg" 
                    alt="Roberta Mendes" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-gray-600 italic mb-4 flex-grow">"A JMSOUZA transformou completamente minha presença online! O site ficou muito acima das minhas expectativas e já percebi um aumento significativo nas conversões. Atendimento personalizado e profissional do início ao fim. Certamente o melhor investimento para meu negócio!"</p>
                <p className="font-semibold text-black">Roberta Mendes</p>
                <p className="text-sm text-gray-500">CEO da Mendes Contabilidade</p>
              </div>
              {/* Feedback 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 transform transition-transform hover:scale-110 duration-300">
                  <Image 
                    src="/garotas_feedback_pfp (2).jpg" 
                    alt="Carolina Alencar" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-gray-600 italic mb-4 flex-grow">"Após trabalhar com três outras agências em Barueri, finalmente encontrei a JMSOUZA! Eles desenvolveram um aplicativo para minha clínica estética que funciona perfeitamente e aumentou em 70% o número de agendamentos online. O investimento retornou em menos de 3 meses. São verdadeiros parceiros de negócio!"</p>
                <p className="font-semibold text-black">Carolina Alencar</p>
                <p className="text-sm text-gray-500">Proprietária da Estética Alencar</p>
              </div>
              {/* Feedback 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 transform transition-transform hover:scale-110 duration-300">
                  <Image 
                    src="/garotas_feedback_pfp (3).jpg" 
                    alt="Marcela Freitas" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-gray-600 italic mb-4 flex-grow">"Sou arquiteta e precisava de um portfólio online que refletisse minha identidade profissional. A equipe da JMSOUZA superou todas as expectativas! Além do design impecável, eles implementaram funcionalidades que facilitam a interação com meus clientes. Desde o lançamento, já fechei 12 projetos que vieram diretamente do site. Melhor investimento que fiz em marketing digital!"</p>
                <p className="font-semibold text-black">Marcela Freitas</p>
                <p className="text-sm text-gray-500">Arquiteta em Alphaville</p>
              </div>
            </div>
          </div>
        </section>

        {/* NOVA Seção Área de Atendimento - Animações Simplificadas */}
        <section id="area-atendimento" className="py-16 lg:py-24 bg-gray-100 overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             {/* Título com animação sutil */}
            <h2 className="text-3xl font-bold text-black mb-4 animate-in fade-in slide-in-from-bottom-12 duration-700">Atendemos sua Região</h2>
             {/* Parágrafo sem animação */}
            <p className="text-lg text-gray-700 mb-8">
              Nossa agência está localizada em Barueri, com fácil acesso para atender clientes em toda a região, incluindo Alphaville, Tamboré e cidades vizinhas.
            </p>
            {/* Endereço sem animação */}
            <div className="bg-white p-6 rounded-lg shadow-sm inline-block">
              <p className="text-black font-semibold">JMSOUZA AGENCIA</p>
              <p className="text-gray-700">Rua Maria Fernanda, 429</p>
              <p className="text-gray-700">Jardim Graziela - Barueri, SP</p>
            </div>
          </div>
        </section>

        {/* Seção Análise Gratuita CTA - Animações Simplificadas */}
        <section id="analise-gratuita" className="py-16 lg:py-24 bg-black text-center overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
             {/* Título com animação sutil */}
            <h2 className="text-3xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-12 duration-700">Receba uma análise gratuita!</h2>
             {/* Parágrafo sem animação */}
            <p className="text-lg text-gray-300 mb-8">
              Receba uma análise gratuita em sua conta de Google Ads, Facebook Ads, Site e Redes Sociais. Recomendaremos o melhor caminho para o sucesso do seu negócio na internet.
            </p>
            {/* Botões sem animação de container */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 transform hover:scale-105">
                <a
                  href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20receber%20uma%20análise%20gratuita..."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.gtag_report_conversion) {
                      window.gtag_report_conversion(e.currentTarget.href);
                    }
                    return false;
                  }}
                >
                  Chamar no Whatsapp
                </a>
              </Button>
              {/* Botão Atualizado para ir ao WhatsApp - Remover classes bg-white text-black */}
              <Button asChild size="lg" className="hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                 <a
                  href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20receber%20uma%20análise%20gratuita..."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.gtag_report_conversion) {
                      window.gtag_report_conversion(e.currentTarget.href);
                    }
                    return false;
                  }}
                 >
                   Receber análise gratuita
                 </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Seção Orçamento CTA e Formulário - Animações Simplificadas */}
        <section id="orcamento" className="py-16 lg:py-24 bg-gray-200 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               {/* Título com animação sutil */}
              <h2 className="text-3xl font-bold text-black mb-2 animate-in fade-in slide-in-from-bottom-12 duration-700">Solicite um orçamento</h2>
               {/* Parágrafo sem animação */}
              <p className="text-lg text-gray-700">Preencha o formulário abaixo com os dados necessários. Nosso setor comercial irá entrar em contato com você.</p>
            </div>
            {/* Grid sem animação nos containers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Coluna do Formulário */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                  <input type="text" name="nome" id="nome" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp</label>
                  <input type="tel" name="whatsapp" id="whatsapp" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm" placeholder="(XX) XXXXX-XXXX" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                  <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm" placeholder="seu@email.com" />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
                  <textarea name="mensagem" id="mensagem" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm" placeholder="Conte-nos sobre seu projeto..."></textarea>
                </div>
                <div>
                  {/* Ação do formulário precisa ser implementada (API, Server Action, etc.) */}
                  <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300">
                    Enviar Pedido de Orçamento
                  </Button>
                </div>
              </form>
              {/* Coluna do Texto/Botão WhatsApp */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-black mb-4">Prefere conversar diretamente?</h2>
                <p className="text-gray-700 mb-6">Clique no botão abaixo para iniciar uma conversa diretamente pelo WhatsApp e tirar suas dúvidas rapidamente.</p>
                <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 transform hover:scale-105">
                  <a
                    href="https://wa.me/5511954997799?text=Oi!,%20gostaria%20de%20solicitar%20um%20orçamento..."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.gtag_report_conversion) {
                        window.gtag_report_conversion(e.currentTarget.href);
                      }
                      return false;
                    }}
                  >
                    Chamar no Whatsapp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de "Sobre mim" - Animações Simplificadas */}
        <section id="sobre" className="py-16 lg:py-24 bg-white overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             {/* Título com animação sutil */}
            <h2 className="text-3xl font-bold text-black mb-4 transform transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-12 duration-700">Sobre Mim</h2>
             {/* Parágrafo sem animação */}
            <p className="text-lg text-gray-800">
              Desde cedo, sempre fui fascinado pela magia da tecnologia e o poder transformador da programação.
              Ao longo dos anos, desenvolvi habilidades tanto no front-end quanto no back-end, o que me permite
              criar soluções completas e integradas. Acredito que o futuro é construído hoje e estou comprometido
              em estar sempre um passo à frente, inovando e superando desafios.
            </p>
          </div>
        </section>

        {/* Usar o componente Footer importado */}
        
      </main>
    </div>
  );
}