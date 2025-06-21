"use client";

// src/app/page.tsx
import Navbar from '@/components/Navbar';
import { Button } from '@/components/Button';
import { ContactButton } from '@/components/ContactButton'; // Manter se usado no novo formulário/footer
import Link from 'next/link';
import Image from 'next/image';
// Importar ícones se necessário para a seção de benefícios/processos
import { FaMobileAlt, FaUsers, FaPaintBrush, FaTachometerAlt, FaHeadset, FaGoogle, FaCogs, FaLink, FaBullhorn, FaFileAlt, FaComments, FaRocket, FaCheckCircle, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';

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

// Componente de seção sem animação
const AnimatedSection = ({ children, className, id, delay = 0 }: { children: React.ReactNode, className?: string, id?: string, delay?: number }) => {
  return (
    <section
      id={id}
      className={className}
    >
      {children}
    </section>
  );
};

// Componente de contador animado para resultados
function AnimatedCounter({ value, suffix, prefix }: { value: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 1500;
    const end = Math.min(value, 9999); // Limitando para evitar contagens muito longas
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const timePassed = Date.now() - startTime;
      const progress = Math.min(timePassed / duration, 1);
      
      // Efeito de easing
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easedProgress * end);
      
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 20);
    
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-semibold">
      {prefix && <span>{prefix}</span>}
      <span ref={countRef}>{count}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

// Define o tipo para os cases
type ProjectCase = {
  id: string;
  href: string;
  img: string;
  title: string;
  desc: string;
  results: string;
  tags: string[];
  category: string;
  numericResult?: number;
};

export default function Home() {
  // Inicialização do AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  // Estado para o filtro de categorias
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Lista de categorias disponíveis
  const categories = ["Todos", "Sites", "E-commerce", "Apps", "Jogos"];

  // Lista completa de cases
  const allCases: ProjectCase[] = [
    { 
      id: "case-1",
      href: "https://www.alessandranutri.com.br/", 
      img: "/dra_alessandranutricionista_card.png", 
      title: "Dra. Alessandra Nutricionista", 
      desc: "Site profissional com agendamento online e blog de nutrição que aumentou em 45% os agendamentos de consultas.",
      results: "+200% de tráfego orgânico",
      tags: ["Site", "SEO"],
      category: "Sites",
      numericResult: 200
    },
    { 
      id: "case-2",
      href: "https://martins-balonismo-2.vercel.app/", 
      img: "/martins_balonismo_card.jpg", 
      title: "Martins Balonismo", 
      desc: "Plataforma de reservas de voos de balão que triplicou as vendas online em apenas três meses.",
      results: "+180% de conversão",
      tags: ["E-commerce", "UX"],
      category: "E-commerce",
      numericResult: 180
    },
    { 
      id: "case-3",
      href: "https://www.barbeariadagringa.com.br/", 
      img: "/barbearia_da_gringa_card.png", 
      title: "Barbearia da Gringa", 
      desc: "Sistema de agendamento que reduziu em 80% as faltas e aumentou a ocupação da agenda em 65%.",
      results: "+65% de agendamentos",
      tags: ["App", "Marketing"],
      category: "Apps",
      numericResult: 65
    },
    { 
      id: "case-4",
      href: "https://www.espacooliverbeauty.com.br/", 
      img: "/oliver_fundo_site.jpg", 
      title: "Espaço Oliver Beauty", 
      desc: "Catálogo digital que expandiu a base de clientes para novas regiões de São Paulo.",
      results: "+120% de novos clientes",
      tags: ["Site", "Branding"],
      category: "Sites",
      numericResult: 120
    },
    { 
      id: "case-5",
      href: "https://www.cristianeduarte.com.br/", 
      img: "/dra_cris_bg.png", 
      title: "Dra. Cristiane Duarte", 
      desc: "Presença digital completa que posicionou a profissional como referência em sua especialidade.",
      results: "1ª página no Google",
      tags: ["Site", "SEO"],
      category: "Sites",
      numericResult: 1
    },
    { 
      id: "case-6",
      href: "https://unia-app-nail-designer.vercel.app", 
      img: "/opera_TGia9OiBNt.png", 
      title: "Unia.App", 
      desc: "Aplicativo para nail designers que revolucionou a gestão de agendas e finanças de profissionais autônomos.",
      results: "+3000 usuários ativos",
      tags: ["App", "SaaS"],
      category: "Apps",
      numericResult: 3000
    },
  ];

  // Filtra os casos com base na categoria selecionada
  const filteredCases = activeCategory === "Todos" 
    ? allCases 
    : allCases.filter(project => project.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Seção Hero - Com Imagem */}
      <section 
        className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden px-4"
      >
        {/* Imagem de fundo */}
        <Image
          className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
          src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
          alt="Tráfego Pago Barueri JMSOUZA"
          fill
          priority
        />
        
        {/* Overlay com efeito de gradiente mais claro */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 to-black/50 z-10"></div>

        {/* Conteúdo com efeitos de animação melhorados */}
        <div className="relative z-20 px-2 text-white max-w-3xl mx-auto">
          {/* Título Hero com animação de typing */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-10">
            <span className="inline-block" data-aos="fade-up">Aumente suas vendas</span>
            <div className="overflow-hidden w-full mt-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 inline-block animate-typing" data-aos="fade-up" data-aos-delay="300">com sites inteligentes</span>
            </div>
          </h1>
           {/* Parágrafo com animação fade-in */}
          <p className="text-base sm:text-lg md:text-2xl font-medium mb-8 ">
            Parece mágica, mas é apenas a internet funcionando para sua empresa <span className="font-bold text-yellow-400">aumentar o faturamento</span>
          </p>
           {/* Botões com animações melhoradas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto sm:max-w-none ">
            {/* Botão WhatsApp */}
            <Button asChild size="lg" className="w-full bg-green-600 text-white hover:bg-green-700 hover:text-white transition-all duration-300 transform  hover:shadow-lg hover:shadow-green-500/20 animate-pulse-subtle py-6 sm:py-4 text-base sm:text-lg">
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
            <Button asChild variant="outline" size="lg" className="w-full border-white text-white hover:bg-white/30 hover:text-white transition-all duration-300 transform  hover:shadow-lg hover:shadow-white/20 py-6 sm:py-4 text-base sm:text-lg">
              <Link href="#analise-gratuita">
                Receber Análise Grátis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seção Nossos Cases - Redesenhada e posicionada logo após o Hero */}
      <section id="cases" className="py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Cases de Sucesso</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Transformamos negócios através de soluções digitais inovadoras</p>
          </div>

          {/* Estatísticas Gerais - Novo componente */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: 200, label: "Projetos Entregues", icon: FaRocket },
              { value: 95, label: "Taxa de Satisfação", suffix: "%", icon: FaCheckCircle },
              { value: 45, label: "Dias (média de entrega)", icon: FaTachometerAlt },
              { value: 86, label: "Clientes Recorrentes", suffix: "%", icon: FaUsers },
            ].map((stat, index) => (
              <div 
                key={`stat-${index}`} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center transform hover:scale-105 transition-all duration-300"
                data-aos="fade-up" 
                data-aos-delay={(50 * index).toString()}
              >
                <stat.icon className="text-blue-400 text-2xl mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white flex justify-center">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* Tabs para categorias de projetos */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-2" data-aos="fade-up" data-aos-delay="100">
            <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeCategory === category
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Cards com cases de sucesso - Design moderno com efeitos hover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCases.map((project, index) => (
              <a 
                href={project.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={project.id} 
                className="group" 
                data-aos="fade-up" 
                data-aos-delay={(100 + index * 50).toString()}
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden h-full transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-blue-500/20">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110" 
                      style={{ backgroundImage: `url(${project.img})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500"></div>
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs font-medium rounded bg-blue-600/80 text-white backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Botão "Ver projeto" que aparece no hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium text-sm backdrop-blur-sm">
                        Ver projeto
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{project.desc}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{getDomainFromUrl(project.href)}</span>
                      <span className="text-sm font-semibold text-green-400">
                        {project.results.startsWith("+") ? (
                          <>
                            <span>+</span>
                            <AnimatedCounter 
                              value={project.numericResult || 0} 
                              suffix={project.results.includes("%") ? "%" : ""}
                            />
                          </>
                        ) : project.results}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          {/* Botão "Ver mais cases" */}
          <div className="mt-12 text-center" data-aos="fade-up">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="#contato">
                Quero resultados como esses
                <FaRegArrowAltCircleRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="bg-white text-black">
        {/* Seção de Benefícios com animações melhoradas */}
        <AnimatedSection id="beneficios" className="py-16 lg:py-24 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título da seção com animação */}
            <motion.div 
              
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-2">Benefícios exclusivos</h2>
              <p className="text-white max-w-2xl mx-auto">Tecnologia e design pensados para maximizar seus resultados</p>
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
                    
                    className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-100 rounded-full  opacity-30"></div>
                      <motion.div
                        
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
              <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 transform ">
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
              <Button asChild size="lg" className="hover:bg-gray-800 transition-colors duration-300 transform ">
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
                <Button asChild size="lg" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 transform ">
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
            <h2 className="text-3xl font-bold text-black mb-4 transform transition-all duration-500  animate-in fade-in slide-in-from-bottom-12 duration-700">Sobre Mim</h2>
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