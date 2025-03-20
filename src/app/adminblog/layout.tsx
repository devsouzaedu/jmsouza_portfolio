'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const isLoginPage = pathname === '/adminblog/login';

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth');
        const isAuthenticated = response.ok;
        
        setAuthenticated(isAuthenticated);
        
        // Se não estiver autenticado e não estiver na página de login, redirecionar
        if (!isAuthenticated && !isLoginPage) {
          router.replace('/adminblog/login');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Em caso de erro, redirecionar para login por segurança
        if (!isLoginPage) {
          router.replace('/adminblog/login');
        }
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, [router, isLoginPage]);

  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-300">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se estiver na página de login ou autenticado, renderiza o conteúdo
  if (isLoginPage || authenticated) {
    return children;
  }

  // Caso padrão - não deve chegar aqui normalmente devido ao redirecionamento
  return null;
} 