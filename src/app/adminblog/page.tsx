"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts, deletePost } from '@/lib/blogApi';
import { BlogPost, formatDate } from '@/lib/blogUtils';
import { useRouter } from 'next/navigation';

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verificar se já está autenticado no localStorage
    const authenticated = localStorage.getItem('blogAdminAuth');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      fetchPosts();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2210') {
      setIsAuthenticated(true);
      localStorage.setItem('blogAdminAuth', 'true');
      fetchPosts();
    } else {
      alert('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('blogAdminAuth');
    setPosts([]);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await getAllPosts(false);
      setPosts(allPosts);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      setError('Não foi possível carregar os posts. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const result = await deletePost(slug);
      if (result.success) {
        // Atualizar a lista de posts
        setPosts(posts.filter(post => post.slug !== slug));
      } else {
        alert(`Erro ao excluir post: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      alert('Ocorreu um erro ao excluir o post. Tente novamente.');
    }
  };

  const filteredPosts = posts.filter(post => {
    const term = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.slug.toLowerCase().includes(term) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Administração do Blog</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                placeholder="Digite a senha"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Acessar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administração do Blog</h1>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/adminblog/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Novo Post
            </Link>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
          />
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-400">Carregando posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">
              {searchTerm ? 'Nenhum post encontrado para esta busca.' : 'Nenhum post criado ainda.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="p-4 font-medium">Título</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Data</th>
                  <th className="p-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-900 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-400">/{post.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.published 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                          title="Visualizar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </Link>
                        
                        <Link
                          href={`/adminblog/edit/${post.slug}`}
                          className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                          title="Editar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </Link>
                        
                        <button
                          onClick={() => handleDeletePost(post.slug)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          title="Excluir"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
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
    </div>
  );
} 