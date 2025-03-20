'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Verificar se o usuário já está autenticado
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth', {
          // Adicionar cache: 'no-store' para evitar o cache da requisição
          cache: 'no-store',
          headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'x-timestamp': Date.now().toString()
          }
        });
        
        // Apenas redirecionar se a resposta for bem-sucedida e autenticada
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated === true) {
            // Usuário já está autenticado, redirecionar para a página de administração
            router.replace('/adminblog');
            return;
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Exibir o erro, mas permitir que o usuário tente fazer login
        setError('Erro ao verificar autenticação. Você pode tentar fazer login mesmo assim.');
      } finally {
        setCheckingAuth(false);
      }
    }
    
    checkAuth();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          'pragma': 'no-cache'
        },
        body: JSON.stringify({ password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Autenticação bem-sucedida, redirecionar para a página de administração
        router.replace('/adminblog');
      } else {
        setError(data.message || 'Senha incorreta');
      }
    } catch (error) {
      setError('Erro ao tentar fazer login. Tente novamente.');
      console.error('Erro durante login:', error);
    } finally {
      setLoading(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-300">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Área Administrativa
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Digite a senha para acessar o painel administrativo do blog
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Senha"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <Link 
            href="/blog"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >
            ← Voltar para o blog
          </Link>
        </div>
      </div>
    </div>
  );
} 