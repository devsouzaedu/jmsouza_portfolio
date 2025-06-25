import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaUsers, FaCalculator, FaFileAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Contadores | Aumente Sua Carteira de Clientes',
  description: 'Especialista em tráfego pago para contadores e escritórios de contabilidade. Google Ads e Meta Ads para contadores. Atraia mais empresas.',
  keywords: 'tráfego pago para contadores, Google Ads contador, anúncios para contabilidade, marketing digital contador',
};

export default function TrafegoPagoContadoresPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-700 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tráfego Pago para <span className="text-yellow-300">Contadores</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Especialista em tráfego pago para contadores e escritórios de contabilidade. 
              Aumente sua carteira de clientes empresariais com campanhas segmentadas.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20contador%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                <FaWhatsapp className="mr-2" />
                Quero Mais Clientes
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como Atrair Mais Empresas para Seu Escritório de Contabilidade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads para Contadores</h3>
              <p className="text-gray-600">
                Apareça quando empresários procuram por contador na sua região. 
                Campanhas otimizadas para escritórios de contabilidade.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaCalculator className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Serviços Especializados</h3>
              <p className="text-gray-600">
                Campanhas específicas para abertura de empresa, imposto de renda, 
                planejamento tributário e consultoria contábil.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaFileAlt className="text-4xl text-blue-700 mb-4" />
              <h3 className="text-xl font-bold mb-3">Compliance e Fiscal</h3>
              <p className="text-gray-600">
                Estratégias para atrair empresas que precisam de 
                regularização fiscal e compliance tributário.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Expandir Sua Carteira de Clientes?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que atraem empresas que precisam de serviços contábeis.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20meu%20escritório%20de%20contabilidade" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 