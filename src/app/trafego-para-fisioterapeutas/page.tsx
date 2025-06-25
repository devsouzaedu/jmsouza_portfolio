import { Metadata } from 'next';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaUsers, FaCalendarAlt, FaRunning } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Fisioterapeutas | Aumente Sua Agenda de Pacientes',
  description: 'Especialista em tráfego pago para fisioterapeutas. Google Ads e Meta Ads para clínicas de fisioterapia. Atraia mais pacientes qualificados.',
  keywords: 'tráfego pago para fisioterapeutas, Google Ads fisioterapeuta, anúncios para fisioterapia, marketing digital fisioterapeuta',
};

export default function TrafegoPagoFisioterapeutasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tráfego Pago para <span className="text-yellow-300">Fisioterapeutas</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Especialista em tráfego pago para fisioterapeutas. Aumente sua agenda com pacientes 
              qualificados através de campanhas segmentadas no Google Ads e redes sociais.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20fisioterapeuta%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                <FaWhatsapp className="mr-2" />
                Quero Mais Pacientes
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como Atrair Mais Pacientes para Sua Clínica de Fisioterapia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaGoogle className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Google Ads para Fisioterapeutas</h3>
              <p className="text-gray-600">
                Apareça quando as pessoas procuram por fisioterapeuta na sua região. 
                Campanhas otimizadas para clínicas de fisioterapia.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaRunning className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Especialidades em Fisioterapia</h3>
              <p className="text-gray-600">
                Campanhas específicas para fisioterapia esportiva, ortopédica, 
                neurológica, respiratória e outras especialidades.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaCalendarAlt className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Agendamento Online</h3>
              <p className="text-gray-600">
                Integração com sistemas de agendamento para facilitar 
                o processo de marcação de sessões de fisioterapia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Ter uma Agenda Cheia de Pacientes?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas que trazem pacientes qualificados para sua clínica de fisioterapia.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20minha%20clínica%20de%20fisioterapia" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 