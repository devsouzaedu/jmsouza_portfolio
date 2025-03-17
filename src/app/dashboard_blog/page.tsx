"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  created_at: string;
  archived: boolean;
};

export default function DashboardBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Carregar posts após autenticação
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, showArchived]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/debug?includeArchived=${showArchived}`);
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.posts || []);
      } else {
        setError('Erro ao carregar posts');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao buscar posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar a senha (a senha correta é "Sucesso2030A@")
    if (password === "Sucesso2030A@") {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Senha incorreta. Tente novamente.');
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm(`Tem certeza que deseja excluir o post "${slug}"?`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/posts/${slug}?password=Sucesso2030A@`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatusMessage(`Post "${slug}" excluído com sucesso!`);
        // Atualiza a lista de posts
        fetchPosts();
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
      } else {
        setError(`Erro ao excluir post: ${data.error}`);
      }
    } catch (err) {
      setError('Erro ao excluir post');
      console.error('Erro ao excluir post:', err);
    }
  };

  const toggleArchivePost = async (slug: string, currentStatus: boolean) => {
    try {
      const action = currentStatus ? 'desarquivar' : 'arquivar';
      
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: 'Sucesso2030A@',
          archived: !currentStatus,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatusMessage(`Post "${slug}" ${action}do com sucesso!`);
        fetchPosts();
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
      } else {
        setError(`Erro ao ${action} post: ${data.error}`);
      }
    } catch (err) {
      setError(`Erro ao atualizar post`);
      console.error('Erro ao atualizar post:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <Link 
            href="/blog"
            className="inline-block mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Voltar para o Blog
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard Administrativo
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Esta área é restrita ao administrador do blog. Por favor, digite a senha para continuar.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {passwordError}
                </p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/blog"
            className="inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Voltar para o Blog
          </Link>
          
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Sair da área administrativa
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Dashboard do Blog
        </h1>

        {statusMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {statusMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
            <button 
              className="ml-4 text-sm underline" 
              onClick={() => setError('')}
            >
              Fechar
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowArchived(!showArchived)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              {showArchived ? 'Ocultar Arquivados' : 'Mostrar Arquivados'}
            </button>
            
            <button 
              onClick={() => fetchPosts()}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors"
            >
              Atualizar Lista
            </button>
          </div>
          
          <Link 
            href="/blog/novo"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          >
            + Novo Post
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {showArchived 
                ? 'Não há posts arquivados.' 
                : 'Não há posts para exibir.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {posts.map((post) => (
                  <tr 
                    key={post.id} 
                    className={post.archived ? "bg-gray-50 dark:bg-gray-900" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {post.excerpt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {post.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(post.created_at), 'dd MMM yyyy', { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.archived 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' 
                          : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      }`}>
                        {post.archived ? 'Arquivado' : 'Publicado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          target="_blank"
                        >
                          Ver
                        </Link>
                        <Link 
                          href={`/blog/editar/${post.slug}`}
                          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Editar
                        </Link>
                        <button 
                          onClick={() => toggleArchivePost(post.slug, post.archived)}
                          className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                        >
                          {post.archived ? 'Desarquivar' : 'Arquivar'}
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.slug)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
} 