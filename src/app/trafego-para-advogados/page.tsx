import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaGavel, FaUsers, FaShieldAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Advogados | Atraia Mais Clientes para Seu Escritório',
  description: 'Especialista em tráfego pago para advogados e escritórios de advocacia. Google Ads e Meta Ads para advogados. Aumente sua carteira de clientes.',
  keywords: 'tráfego pago para advogados, Google Ads advogado, anúncios para escritório advocacia, marketing digital advogado, atrair clientes advocacia',
};

export default function TrafegoPagoAdvogadosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tráfego Pago para <span className="text-yellow-400">Advogados</span>
              </h1>
              <p className="text-xl mb-8">
                Especialista em tráfego pago para advogados e escritórios de advocacia. 
                Aumente sua carteira de clientes com campanhas éticas e segmentadas.
              </p>
              <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20advogado%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Quero Mais Clientes
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Marketing Digital Ético para Advogados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGavel className="text-4xl text-blue-900 mb-4" />
              <h3 className="text-xl font-bold mb-3">Campanhas Éticas</h3>
              <p className="text-gray-600">
                Campanhas que respeitam o Código de Ética da OAB, 
                focadas em educação jurídica e autoridade profissional.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaUsers className="text-4xl text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Segmentação Precisa</h3>
              <p className="text-gray-600">
                Direcionamento para pessoas que realmente precisam 
                de serviços jurídicos na sua área de atuação.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaShieldAlt className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Áreas Especializadas</h3>
              <p className="text-gray-600">
                Estratégias específicas para direito civil, trabalhista, 
                criminal, família e outras especialidades jurídicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Expandir Sua Carteira de Clientes?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas éticas que atraem clientes qualificados para seu escritório de advocacia.
          </p>
          <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20meu%20escritório%20de%20advocacia" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 