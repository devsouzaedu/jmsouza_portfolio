import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaUsers, FaCalendarAlt, FaPaw } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Veterinários | Aumente Sua Carteira de Clientes Pet',
  description: 'Especialista em tráfego pago para veterinários e clínicas veterinárias. Google Ads e Meta Ads para pet shops e clínicas veterinárias.',
  keywords: 'tráfego pago para veterinários, Google Ads veterinário, anúncios para clínica veterinária, marketing digital veterinário',
};

export default function TrafegoPagoVeterinariosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tráfego Pago para <span className="text-yellow-300">Veterinários</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Especialista em tráfego pago para veterinários e clínicas veterinárias. 
              Atraia mais tutores de pets com campanhas segmentadas e eficazes.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20veterinário%20e%20preciso%20de%20tráfego%20pago" target="_blank">
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
            Como Atrair Mais Tutores para Sua Clínica Veterinária
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads para Veterinários</h3>
              <p className="text-gray-600">
                Apareça quando tutores procuram por veterinário na sua região. 
                Campanhas otimizadas para clínicas veterinárias e pet shops.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaPaw className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Segmentação Pet</h3>
              <p className="text-gray-600">
                Campanhas direcionadas para tutores de cães, gatos, 
                aves exóticas e outros animais de estimação.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaCalendarAlt className="text-4xl text-pink-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Emergências 24h</h3>
              <p className="text-gray-600">
                Campanhas específicas para atendimento de emergência 
                e plantão veterinário 24 horas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Atender Mais Pets?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que trazem tutores preocupados com a saúde dos seus pets.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20minha%20clínica%20veterinária" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 