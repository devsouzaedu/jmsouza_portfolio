import React from 'react';

export default function LandingPagesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Capture Mais Leads com Landing Pages de Alta Conversão
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Desenvolvemos landing pages otimizadas para transformar visitantes em clientes.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out">
          Criar Minha Landing Page
        </button>
      </div>
    </main>
  );
} 