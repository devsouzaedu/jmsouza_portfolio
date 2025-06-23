import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaMeta, FaInstagram, FaFacebook, FaChartLine, FaUsers, FaHeart, FaEye } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Meta Ads Barueri | Especialista em Facebook e Instagram Ads',
  description: 'Especialista em Meta Ads Barueri. Gestão profissional de Facebook Ads e Instagram Ads para empresas locais. Aumente suas vendas nas redes sociais.',
  keywords: 'Meta Ads Barueri, Facebook Ads Barueri, Instagram Ads Barueri, gestor Meta Ads Barueri, anúncios redes sociais Barueri',
  openGraph: {
    title: 'Meta Ads Barueri | Especialista em Facebook e Instagram Ads',
    description: 'Especialista em Meta Ads Barueri. Gestão profissional de Facebook Ads e Instagram Ads para empresas locais.',
    images: ['/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg'],
  },
};

export default function MetaAdsBareruiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Especialista em <span className="text-yellow-400">Meta Ads Barueri</span>
              </h1>
              <p className="text-xl mb-8">
                Gestão profissional de Meta Ads (Facebook e Instagram) para empresas em Barueri. 
                Alcance seu público-alvo nas redes sociais com campanhas que geram resultados reais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="https://wa.me/5511954997799?text=Oi!%20Preciso%20de%20Meta%20Ads%20em%20Barueri" target="_blank">
                    <FaWhatsapp className="mr-2" />
                    Solicitar Proposta
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#estrategia-meta">
                    Ver Estratégias
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero_imagem_fundo_trafego_pago_barueri_jmsouza.jpg"
                alt="Especialista em Meta Ads Barueri - Facebook e Instagram Ads"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Meta Ads */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Serviços de Meta Ads em Barueri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Como especialista em Meta Ads Barueri, oferecemos gestão completa de campanhas 
              no Facebook e Instagram para empresas que buscam aumentar vendas e engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaFacebook className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Facebook Ads Barueri</h3>
              <p className="text-gray-600 mb-4">
                Campanhas no Facebook segmentadas para empresas em Barueri. 
                Alcance seu público-alvo com precisão na maior rede social do mundo.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Campanhas de conversão</li>
                <li>• Segmentação demográfica</li>
                <li>• Remarketing Facebook</li>
                <li>• Lookalike Audiences</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaInstagram className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instagram Ads Barueri</h3>
              <p className="text-gray-600 mb-4">
                Anúncios no Instagram para empresas locais em Barueri. 
                Conecte-se com seu público através de conteúdo visual impactante.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Stories e Feed Ads</li>
                <li>• Reels promocionais</li>
                <li>• Shopping no Instagram</li>
                <li>• Campanhas de awareness</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <FaMeta className="text-4xl text-blue-800 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meta Business Manager</h3>
              <p className="text-gray-600 mb-4">
                Gestão completa através do Meta Business Manager para empresas em Barueri. 
                Controle total das suas campanhas e resultados.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Configuração de pixels</li>
                <li>• Catálogos de produtos</li>
                <li>• Eventos de conversão</li>
                <li>• Relatórios detalhados</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cases de Sucesso */}
      <section id="casos-sucesso" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cases de Sucesso em Meta Ads Barueri
            </h2>
            <p className="text-lg text-gray-600">
              Resultados reais de empresas em Barueri que investiram em Meta Ads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/barbearia_da_gringa_card.png"
                alt="Case Barbearia da Gringa - Meta Ads Barueri"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Barbearia da Gringa</h3>
                <p className="text-gray-600 mb-4">
                  Campanha no Instagram para barbearia em Barueri. Aumento de 250% em agendamentos 
                  através de anúncios segmentados para homens de 25-45 anos na região.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-semibold">+250% Agendamentos</span>
                  <span className="text-blue-600 font-semibold">ROI: 4.2x</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src="/mariana_fundo_site.png"
                alt="Case Mariana Nails - Meta Ads Barueri"
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mariana Nails</h3>
                <p className="text-gray-600 mb-4">
                  Estúdio de unhas em Barueri com campanhas no Facebook e Instagram. 
                  Segmentação para mulheres locais resultou em agenda sempre lotada.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-semibold">+180% Clientes</span>
                  <span className="text-blue-600 font-semibold">ROI: 3.8x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Dominar as Redes Sociais em Barueri?
          </h2>
          <p className="text-xl mb-8">
            Comece hoje mesmo com uma análise gratuita das suas possibilidades no Meta Ads. 
            Descubra como alcançar mais clientes em Barueri através do Facebook e Instagram.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <a href="https://wa.me/5511954997799?text=Oi!%20Quero%20dominar%20as%20redes%20sociais%20em%20Barueri" target="_blank">
                <FaWhatsapp className="mr-2" />
                Começar Agora
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/">
                Conhecer Outros Serviços
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 