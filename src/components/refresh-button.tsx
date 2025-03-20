'use client';

import { useState } from 'react';

export default function RefreshButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setMessage('');

      // Fazer a chamada para a API de revalidação
      const response = await fetch(`/api/revalidate?path=/blog&token=test_token`);
      const data = await response.json();

      if (response.ok) {
        setMessage('Conteúdo atualizado com sucesso!');
        // Recarregar a página após um curto atraso
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error);
      setMessage('Erro ao atualizar conteúdo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleRefresh}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Atualizando...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar conteúdo
          </>
        )}
      </button>
      {message && (
        <span className={`text-sm mt-2 ${message.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </span>
      )}
    </div>
  );
} 