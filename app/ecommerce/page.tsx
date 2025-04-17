import React from 'react';

export default function EcommercePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Transforme seu Negócio com uma Loja E-commerce Poderosa
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Criamos lojas virtuais personalizadas, rápidas e seguras para impulsionar suas vendas online.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out">
          Quero Vender Online
        </button>
      </div>
    </main>
  );
} 