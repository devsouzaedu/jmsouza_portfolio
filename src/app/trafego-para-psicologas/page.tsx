import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaMeta, FaUserMd, FaCalendarAlt, FaHeart, FaMapMarkerAlt, FaPhone, FaCheckCircle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Psicólogas | Marketing Digital Especializado',
  description: 'Tráfego pago especializado para psicólogas. Anúncios no Google e Meta Ads para atrair pacientes. Marketing digital ético para profissionais da psicologia.',
  keywords: 'tráfego pago para psicólogas, anúncios para psicólogas no Google, marketing digital para psicólogas, sites para psicólogas em Barueri, atrair pacientes com marketing digital',
  openGraph: {
    title: 'Tráfego Pago para Psicólogas | Marketing Digital Especializado',
    description: 'Tráfego pago especializado para psicólogas. Anúncios no Google e Meta Ads para atrair pacientes.',
    images: ['/dra_cris_bg.png'],
  },
};

export default function TrafegoPsicologasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-yellow-400">Tráfego Pago para Psicólogas</span> Especializado
              </h1>
              <p className="text-xl mb-8">
                Marketing digital ético e especializado para psicólogas. Anúncios para psicólogas no Google e Meta Ads 
                que respeitam as diretrizes do CFP e atraem pacientes qualificados para seu consultório.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20psicóloga%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Quero Mais Pacientes
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#casos-sucesso">
                    Ver Cases de Psicólogas
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/dra_cris_bg.png"
                alt="Tráfego pago para psicólogas - Marketing digital especializado"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Por que Psicólogas Precisam de Marketing Digital */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que Psicólogas Precisam de Marketing Digital?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              O marketing digital para psicólogas é essencial para construir uma presença online profissional 
              e atrair pacientes que realmente precisam dos seus serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaUserMd className="text-4xl text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visibilidade Profissional</h3>
              <p className="text-gray-600">
                Anúncios para psicólogas no Google aumentam sua visibilidade quando pacientes 
                procuram por ajuda psicológica na sua região.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Agenda Sempre Cheia</h3>
              <p className="text-gray-600">
                Com tráfego pago para psicólogas bem estruturado, você mantém sua agenda 
                de consultas sempre ocupada com pacientes qualificados.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaHeart className="text-4xl text-pink-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ajudar Mais Pessoas</h3>
              <p className="text-gray-600">
                Marketing digital para psicólogas permite que você alcance e ajude 
                mais pessoas que precisam de acompanhamento psicológico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Especializados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Marketing Digital Especializado para Psicólogas
            </h2>
            <p className="text-lg text-gray-600">
              Estratégias de tráfego pago que respeitam a ética profissional e as diretrizes do CFP
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <FaGoogle className="text-2xl text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Anúncios para Psicólogas no Google
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Campanhas no Google Ads especializadas para psicólogas, com palavras-chave 
                      estratégicas e anúncios que respeitam as normas éticas da profissão.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-2 flex-shrink-0" />
                        Campanhas de pesquisa local
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-2 flex-shrink-0" />
                        Anúncios éticos e profissionais
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-2 flex-shrink-0" />
                        Segmentação por especialidade
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMeta className="text-2xl text-blue-800 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Meta Ads para Psicólogas
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Campanhas no Facebook e Instagram focadas em conscientização sobre saúde mental 
                      e captação de pacientes de forma ética e responsável.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-2 flex-shrink-0" />
                        Conteúdo educativo sobre saúde mental
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-2 flex-shrink-0" />
                        Segmentação por interesses e demografia
                      </li>
                      <li className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-2 flex-shrink-0" />
                        Campanhas de conscientização
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Análise Gratuita para Psicólogas
              </h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="crp" className="block text-sm font-medium text-gray-700 mb-1">
                    CRP
                  </label>
                  <input
                    type="text"
                    id="crp"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="CRP XX/XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidade
                  </label>
                  <select
                    id="especialidade"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Selecione sua especialidade</option>
                    <option value="clinica">Psicologia Clínica</option>
                    <option value="infantil">Psicologia Infantil</option>
                    <option value="casal">Terapia de Casal</option>
                    <option value="organizacional">Psicologia Organizacional</option>
                    <option value="neuropsicologia">Neuropsicologia</option>
                    <option value="outras">Outras</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20psicóloga%20e%20quero%20uma%20análise%20gratuita" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Análise Gratuita
                  </a>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Cases de Sucesso */}
      <section id="casos-sucesso" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cases de Sucesso: Psicólogas que Transformaram sua Prática
            </h2>
            <p className="text-lg text-gray-600">
              Veja como o marketing digital para psicólogas mudou a vida profissional dessas especialistas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src="/dra_cris_bg.png"
                  alt="Dra. Cristiane Duarte - Psicóloga"
                  width={80}
                  height={80}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dra. Cristiane Duarte</h3>
                  <p className="text-gray-600">Psicóloga Clínica - CRP 06/XXXXX</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Com o tráfego pago para psicólogas da JMSOUZA, consegui triplicar o número de 
                pacientes em apenas 3 meses. Os anúncios são éticos e atraem pessoas que 
                realmente precisam de ajuda."
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-semibold">Resultados:</p>
                <ul className="text-green-700 text-sm mt-2">
                  <li>• +200% de agendamentos</li>
                  <li>• Agenda lotada em 2 meses</li>
                  <li>• ROI de 400%</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src="/dra_alessandranutricionista_card.png"
                  alt="Dra. Alessandra - Psicóloga"
                  width={80}
                  height={80}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Dra. Alessandra</h3>
                  <p className="text-gray-600">Psicóloga Infantil - CRP 06/XXXXX</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Especializada em psicologia infantil, estava com dificuldades para encontrar 
                pacientes. Com o marketing digital especializado, agora tenho uma agenda 
                consistente e posso ajudar mais famílias."
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-semibold">Resultados:</p>
                <ul className="text-blue-700 text-sm mt-2">
                  <li>• +150% de consultas infantis</li>
                  <li>• Presença digital consolidada</li>
                  <li>• Lista de espera criada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que Somos Especialistas em Marketing para Psicólogas?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-2xl text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conhecimento da Área</h3>
              <p className="text-gray-600">
                Entendemos as especificidades da psicologia e as diretrizes éticas 
                que regem a profissão.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conformidade CFP</h3>
              <p className="text-gray-600">
                Todos os anúncios respeitam as normas do Conselho Federal de Psicologia 
                e são eticamente responsáveis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Foco em Ajudar</h3>
              <p className="text-gray-600">
                Nosso objetivo é conectar psicólogas com pessoas que realmente 
                precisam de acompanhamento psicológico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-teal-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Pronta para Ter Mais Pacientes?
          </h2>
          <p className="text-xl mb-8">
            Entre em contato agora e descubra como o tráfego pago para psicólogas 
            pode transformar sua prática profissional de forma ética e eficaz.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Sou%20psicóloga%20e%20quero%20mais%20pacientes" target="_blank">
              <FaWhatsapp className="mr-2" />
              Quero Mais Pacientes Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 