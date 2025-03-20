'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabaseBlogAdmin, type BlogPost } from '@/lib/supabase-blog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabaseBlogAdmin
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        setPosts(data as BlogPost[]);
      } catch (err) {
        setError('Erro ao carregar posts: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  async function handleDeletePost(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      const { error } = await supabaseBlogAdmin
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
      
      // Atualizar a lista após exclusão
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      alert('Erro ao excluir post: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  async function handleTogglePublish(post: BlogPost) {
    try {
      const { error } = await supabaseBlogAdmin
        .from('blog_posts')
        .update({ 
          published: !post.published,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id);

      if (error) throw new Error(error.message);
      
      // Atualizar a lista após alteração
      setPosts(posts.map(p => p.id === post.id ? {...p, published: !p.published} : p));
    } catch (err) {
      alert('Erro ao atualizar status de publicação: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl">Carregando posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Administração do Blog
        </h1>
        <Link
          href="/adminblog/novo"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Novo Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-300">
            Nenhum post encontrado.
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Comece criando seu primeiro post clicando no botão "Novo Post".
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
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
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/adminblog/editar/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(post.created_at), 'PP', { locale: ptBR })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link 
                        href={post.published ? `/blog/${post.slug}` : '#'}
                        className={`text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 ${!post.published && 'opacity-50 cursor-not-allowed'}`}
                        target={post.published ? "_blank" : undefined}
                        onClick={(e) => !post.published && e.preventDefault()}
                      >
                        {post.published ? 'Ver' : 'Não publicado'}
                      </Link>
                      <button
                        className={`${post.published ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-800' : 'text-green-600 dark:text-green-400 hover:text-green-800'}`}
                        onClick={() => handleTogglePublish(post)}
                      >
                        {post.published ? 'Despublicar' : 'Publicar'}
                      </button>
                      <Link 
                        href={`/adminblog/editar/${post.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
                      >
                        Editar
                      </Link>
                      <button
                        className="text-red-600 dark:text-red-400 hover:text-red-800"
                        onClick={() => handleDeletePost(post.id)}
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
  );
} 