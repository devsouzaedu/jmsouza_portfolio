'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, slugify } from '@/lib/blog-service';
import MarkdownContent from '@/components/markdown-content';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    cover_image_url: '',
    tags: '',
    published: false
  });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      const slug = slugify(formData.title);

      const result = await createPost({
        title: formData.title,
        content: formData.content,
        slug,
        cover_image_url: formData.cover_image_url,
        tags: tagsArray,
        published: formData.published
      });

      if (!result) throw new Error('Erro ao criar post');

      router.push('/adminblog');
    } catch (err) {
      setError('Erro ao salvar post: ' + (err instanceof Error ? err.message : String(err)));
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Novo Post
        </h1>
        <Link
          href="/adminblog"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors"
        >
          ← Voltar à administração
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 mr-2 ${!preview ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setPreview(false)}
          >
            Editar
          </button>
          <button
            className={`px-4 py-2 ${preview ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={() => setPreview(true)}
          >
            Pré-visualizar
          </button>
        </div>

        {!preview ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cover_image_url" className="block text-gray-700 dark:text-gray-300 mb-2">
                URL da Imagem de Capa
              </label>
              <input
                type="url"
                id="cover_image_url"
                name="cover_image_url"
                value={formData.cover_image_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tags" className="block text-gray-700 dark:text-gray-300 mb-2">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="desenvolvimento, web, javascript"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 mb-2">
                Conteúdo (Markdown)
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Publicar imediatamente
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/adminblog')}
                className="mr-4 px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Post'}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-4">
            {formData.title ? (
              <>
                {formData.cover_image_url && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={formData.cover_image_url} 
                      alt={formData.title}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </div>
                )}
                
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formData.title}
                  </h1>
                  
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.tags.split(',').map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  {formData.content ? (
                    <MarkdownContent content={formData.content} />
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Nenhum conteúdo para exibir. Adicione algo no modo de edição.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Adicione um título e conteúdo para ver a pré-visualização.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 