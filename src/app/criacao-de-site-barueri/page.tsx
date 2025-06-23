import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaDesktop, FaMobile, FaSearch, FaRocket, FaMapMarkerAlt, FaPhone, FaCheckCircle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Criação de Site em Barueri | Desenvolvimento Web Profissional',
  description: 'Criação de site em Barueri com design responsivo e otimizado para SEO. Desenvolvimento web personalizado para empresas locais. Orçamento gratuito.',
  keywords: 'criação de site em Barueri, desenvolvimento de site Barueri, site personalizado Barueri, web design Barueri, sites para empresas Barueri',
  openGraph: {
    title: 'Criação de Site em Barueri | Desenvolvimento Web Profissional',
    description: 'Criação de site em Barueri com design responsivo e otimizado para SEO. Desenvolvimento web personalizado para empresas locais.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
};

export default function CriacaoSiteBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-yellow-400">Criação de Site em Barueri</span> Profissional
              </h1>
              <p className="text-xl mb-8">
                Desenvolvimento de site personalizado em Barueri com design responsivo, otimização para SEO e 
                presença online profissional. Transforme sua empresa digital com sites que convertem visitantes em clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20criação%20de%20site%20em%20Barueri" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Orçamento
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#portfolio">
                    Ver Portfólio
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
                alt="Criação de site em Barueri - Desenvolvimento web profissional"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços de Criação de Site */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serviços de Criação de Site em Barueri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Desenvolvimento de site personalizado para empresas em Barueri, Alphaville e região. 
              Sites modernos, responsivos e otimizados para resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaDesktop className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Site Personalizado Barueri</h3>
              <p className="text-gray-600 mb-4">
                Desenvolvimento de site 100% personalizado para sua empresa em Barueri. 
                Design exclusivo que reflete a identidade da sua marca.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Layout exclusivo e moderno</li>
                <li>• Integração com redes sociais</li>
                <li>• Painel administrativo</li>
                <li>• Suporte técnico incluso</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaMobile className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sites Responsivos</h3>
              <p className="text-gray-600 mb-4">
                Criação de site responsivo que se adapta perfeitamente a computadores, tablets e celulares. 
                Experiência perfeita em todos os dispositivos.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Design responsivo</li>
                <li>• Otimização para mobile</li>
                <li>• Carregamento rápido</li>
                <li>• Interface intuitiva</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaSearch className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">SEO Otimizado</h3>
              <p className="text-gray-600 mb-4">
                Sites otimizados para SEO desde a criação, garantindo melhor posicionamento no Google 
                para empresas em Barueri e região.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Otimização on-page</li>
                <li>• Estrutura SEO friendly</li>
                <li>• Meta tags otimizadas</li>
                <li>• Sitemap automático</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Processo de Criação */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona a Criação do Seu Site em Barueri
            </h2>
            <p className="text-lg text-gray-600">
              Processo transparente e organizado para desenvolvimento do seu site personalizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Briefing</h3>
              <p className="text-gray-600">
                Reunião para entender suas necessidades, objetivos e público-alvo da sua empresa em Barueri.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Design</h3>
              <p className="text-gray-600">
                Criação do layout personalizado com foco na experiência do usuário e identidade visual.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Desenvolvimento</h3>
              <p className="text-gray-600">
                Programação do site com as melhores tecnologias, garantindo performance e segurança.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Entrega</h3>
              <p className="text-gray-600">
                Publicação do site, treinamento para gerenciamento e suporte contínuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Sites */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tipos de Sites que Criamos em Barueri
            </h2>
            <p className="text-lg text-gray-600">
              Desenvolvimento web especializado para diferentes segmentos e necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sites para Psicólogas</h3>
              <p className="text-gray-600 mb-4">
                Sites profissionais para psicólogas em Barueri com agendamento online, 
                blog e presença digital completa.
              </p>
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span className="text-sm">Agendamento integrado</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sites Corporativos</h3>
              <p className="text-gray-600 mb-4">
                Desenvolvimento de site corporativo para empresas em Barueri, 
                com foco em credibilidade e conversão.
              </p>
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span className="text-sm">Design profissional</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-commerce</h3>
              <p className="text-gray-600 mb-4">
                Criação de loja virtual completa com sistema de pagamento, 
                gestão de produtos e relatórios de vendas.
              </p>
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span className="text-sm">Loja virtual completa</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Landing Pages</h3>
              <p className="text-gray-600 mb-4">
                Páginas de captura otimizadas para campanhas de marketing digital 
                e geração de leads qualificados.
              </p>
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span className="text-sm">Alta conversão</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sites para Clínicas</h3>
              <p className="text-gray-600 mb-4">
                Desenvolvimento web para clínicas e consultórios em Barueri, 
                com agendamento e gestão de pacientes.
              </p>
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span className="text-sm">Sistema de agendamento</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Portfólios</h3>
              <p className="text-gray-600 mb-4">
                Sites portfólio para profissionais liberais e artistas 
                que precisam mostrar seus trabalhos online.
              </p>
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span className="text-sm">Galeria otimizada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Área de Atendimento */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Criação de Site em Barueri e Região
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Atendemos empresas em Barueri, Alphaville, Tamboré e toda região oeste da Grande São Paulo 
            com desenvolvimento web personalizado e presença online profissional.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Barueri</h3>
              <p className="text-gray-600">Desenvolvimento web local</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Alphaville</h3>
              <p className="text-gray-600">Sites corporativos</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-3xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Tamboré</h3>
              <p className="text-gray-600">Criação personalizada</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg inline-block">
            <p className="font-semibold text-gray-900">JMSOUZA - Criação de Sites</p>
            <p className="text-gray-600">Rua Maria Fernanda, 429</p>
            <p className="text-gray-600">Jardim Graziela - Barueri, SP</p>
            <p className="text-gray-600 mt-2">
              <FaPhone className="inline mr-2" />
              (11) 95499-7799
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Ter um Site Profissional?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato agora e solicite um orçamento gratuito para criação do seu site em Barueri. 
            Transforme sua presença digital com desenvolvimento web de qualidade.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Quero%20criar%20um%20site%20em%20Barueri" target="_blank">
              <FaWhatsapp className="mr-2" />
              Solicitar Orçamento Gratuito
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 