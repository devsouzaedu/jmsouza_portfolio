"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MarkdownContent from '@/components/MarkdownContent';

// Tipo para o post
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  tags: string[];
  created_at: string;
};

// Cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    author: '',
    tags: ''
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        if (!id) {
          throw new Error('ID não fornecido');
        }

        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error('Post não encontrado');
        }

        // Converte o array de tags para string
        const tagsString = data.tags ? data.tags.join(', ') : '';

        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          cover_image: data.cover_image || '',
          author: data.author || '',
          tags: tagsString
        });
      } catch (error: any) {
        console.error('Erro ao buscar post:', error);
        setError(error.message || 'Erro ao carregar o post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const slug = value
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove caracteres especiais
      .replace(/\s+/g, '-')      // Substitui espaços por hífens
      .replace(/-+/g, '-');      // Remove múltiplos hífens
    
    setFormData({
      ...formData,
      slug
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.content) {
      setError('Os campos título, slug e conteúdo são obrigatórios');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Converte a string de tags em array
      const tagArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const { data, error } = await supabase
        .from('posts')
        .update({
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt,
          cover_image: formData.cover_image,
          author: formData.author,
          tags: tagArray.length > 0 ? tagArray : null
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      router.push('/adminblog');
    } catch (error: any) {
      console.error('Erro ao atualizar post:', error);
      setError(error.message || 'Erro ao atualizar o post');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-10">
            <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Erro</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <Link 
              href="/adminblog" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Voltar para o Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Post</h1>
          <Link 
            href="/adminblog" 
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            ← Voltar para o Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-4 flex space-x-2">
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className={`px-4 py-2 rounded-md ${!previewMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className={`px-4 py-2 rounded-md ${previewMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              disabled={!formData.content}
            >
              Visualizar
            </button>
          </div>

          {!previewMode ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug* (usado na URL do post)
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Resumo
                </label>
                <input
                  type="text"
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL da Imagem de Capa
                </label>
                <input
                  type="url"
                  id="cover_image"
                  name="cover_image"
                  value={formData.cover_image}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Autor
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="tecnologia, dicas, tutorial"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conteúdo* (formato Markdown)
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push('/adminblog')}
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Salvando...' : 'Atualizar Post'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{formData.title}</h1>
              
              {formData.cover_image && (
                <div className="w-full max-h-96 overflow-hidden rounded-lg mb-6">
                  <img 
                    src={formData.cover_image} 
                    alt={formData.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              
              <div className="prose prose-blue dark:prose-invert max-w-none">
                <MarkdownContent content={formData.content} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 