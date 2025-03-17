'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Post } from '@/lib/supabase';
import { titleToSlug } from '@/lib/markdown';

// Senha para autenticação simples
const ADMIN_PASSWORD = 'Sucesso2030A@';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showPublished, setShowPublished] = useState(true);

  // Buscar posts após autenticação
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, showPublished]);

  // Função para buscar todos os posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/posts?published=${showPublished}`);
      const data = await res.json();
      
      if (res.ok) {
        setPosts(data.posts || []);
        setStatusMessage(data.message || '');
      } else {
        setError(data.error || 'Erro ao carregar posts');
      }
    } catch (err) {
      setError('Erro ao comunicar com o servidor');
      console.error('Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para autenticação
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setError('Senha incorreta');
    }
  };

  // Função para alterar visibilidade do post
  const togglePostVisibility = async (slug: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          published: !currentStatus,
          password: ADMIN_PASSWORD
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatusMessage(`Post ${!currentStatus ? 'publicado' : 'despublicado'} com sucesso`);
        fetchPosts();
        
        // Limpar a mensagem após 3 segundos
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setError(data.error || 'Erro ao atualizar post');
      }
    } catch (err) {
      setError('Erro ao comunicar com o servidor');
      console.error('Erro:', err);
    }
  };

  // Função para excluir post
  const deletePost = async (slug: string) => {
    if (!confirm(`Tem certeza que deseja excluir o post "${slug}"?`)) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: ADMIN_PASSWORD })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatusMessage('Post excluído com sucesso');
        fetchPosts();
        
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        setError(data.error || 'Erro ao excluir post');
      }
    } catch (err) {
      setError('Erro ao comunicar com o servidor');
      console.error('Erro:', err);
    }
  };

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Administração do Blog
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Acesso restrito. Por favor, digite a senha para continuar.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Entrar
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
              Voltar para o blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Página principal de administração
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Administração do Blog
          </h1>
          
          <div className="flex space-x-4">
            <Link 
              href="/blog" 
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Ver Blog
            </Link>
            
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
        
        {statusMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100 rounded-md">
            {statusMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 rounded-md">
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
              onClick={() => setShowPublished(!showPublished)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
            >
              {showPublished ? 'Mostrar Rascunhos' : 'Mostrar Publicados'}
            </button>
            
            <button
              onClick={fetchPosts}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-md"
            >
              Atualizar Lista
            </button>
          </div>
          
          <Link
            href="/admin/blog/novo"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            + Novo Post
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {showPublished 
                ? 'Não há posts publicados.' 
                : 'Não há rascunhos de posts.'}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Título
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
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {posts.map((post) => {
                  const postDate = post.created_at instanceof Date 
                    ? post.created_at 
                    : new Date(post.created_at);
                    
                  const formattedDate = format(postDate, 'dd MMM yyyy', { locale: ptBR });
                  
                  return (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {post.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.published 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                        }`}>
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            target="_blank"
                          >
                            Ver
                          </Link>
                          <Link
                            href={`/admin/blog/editar/${post.slug}`}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => togglePostVisibility(post.slug, post.published)}
                            className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                          >
                            {post.published ? 'Despublicar' : 'Publicar'}
                          </button>
                          <button
                            onClick={() => deletePost(post.slug)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 