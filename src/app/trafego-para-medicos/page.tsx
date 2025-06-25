import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { FaWhatsapp, FaGoogle, FaStethoscope, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Tráfego Pago para Médicos | Aumente Sua Agenda de Consultas',
  description: 'Especialista em tráfego pago para médicos e clínicas médicas. Google Ads e Meta Ads para consultórios médicos. Atraia mais pacientes qualificados.',
  keywords: 'tráfego pago para médicos, Google Ads médico, anúncios para clínica médica, marketing digital médico, atrair pacientes médicos',
};

export default function TrafegoPagoMedicosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tráfego Pago para <span className="text-yellow-300">Médicos</span>
              </h1>
              <p className="text-xl mb-8">
                Especialista em tráfego pago para médicos e clínicas médicas. 
                Aumente sua agenda com pacientes qualificados através de campanhas éticas e segmentadas.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/5511954997799?text=Oi!%20Sou%20médico%20e%20preciso%20de%20tráfego%20pago" target="_blank">
                  <FaWhatsapp className="mr-2" />
                  Quero Mais Pacientes
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
            Marketing Digital Ético para Médicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaStethoscope className="text-4xl text-teal-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Campanhas Médicas Éticas</h3>
              <p className="text-gray-600">
                Campanhas que respeitam o Código de Ética Médica, 
                focadas em educação em saúde e informação qualificada.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Agendamento Facilitado</h3>
              <p className="text-gray-600">
                Integração com sistemas de agendamento online 
                para facilitar a marcação de consultas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaHeartbeat className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Especialidades Médicas</h3>
              <p className="text-gray-600">
                Estratégias específicas para cardiologia, dermatologia, 
                ginecologia, pediatria e outras especialidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Ter uma Agenda Cheia de Pacientes?
          </h2>
          <p className="text-xl mb-8">
            Vamos criar campanhas éticas que atraem pacientes qualificados para seu consultório médico.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <a href="https://wa.me/5511954997799?text=Quero%20tráfego%20pago%20para%20meu%20consultório%20médico" target="_blank">
              <FaWhatsapp className="mr-2" />
              Começar Agora
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
} 