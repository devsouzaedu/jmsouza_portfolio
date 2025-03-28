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
    cover_image_alt: '',
    meta_description: '',
    focus_keyword: '',
    secondary_keywords: '',
    tags: '',
    published: false,
    structured_data: false,
    category: 'blog',
    seo_title: '',
    canonical_url: '',
  });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seoScore, setSeoScore] = useState(0);
  
  const categories = [
    'blog',
    'criacao-sites',
    'desenvolvimento-apps',
    'sistemas',
    'landing-pages',
    'suporte-tecnico',
    'otimizacao-seo'
  ];

  function calculateSeoScore() {
    let score = 0;
    const maxScore = 100;
    
    if (formData.title && formData.title.length >= 30 && formData.title.length <= 60) score += 10;
    else if (formData.title) score += 5;
    
    if (formData.meta_description && formData.meta_description.length >= 120 && formData.meta_description.length <= 160) score += 10;
    else if (formData.meta_description) score += 5;
    
    if (formData.focus_keyword) {
      score += 5;
      if (formData.title.toLowerCase().includes(formData.focus_keyword.toLowerCase())) score += 5;
      if (formData.meta_description.toLowerCase().includes(formData.focus_keyword.toLowerCase())) score += 5;
    }
    
    if (formData.content) {
      if (formData.content.length > 300) score += 10;
      if (formData.content.split(' ').length > 800) score += 10;
    }
    
    if (formData.cover_image_url) score += 5;
    if (formData.cover_image_alt) score += 5;
    
    if (formData.tags) score += 5;
    if (formData.category !== 'blog') score += 5;
    
    if (formData.secondary_keywords) score += 5;
    
    if (formData.structured_data) score += 5;
    
    if (formData.canonical_url) score += 5;
    
    return Math.min(Math.round((score / 70) * 100), 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      let slug = formData.focus_keyword 
        ? slugify(formData.focus_keyword) 
        : slugify(formData.title);
      
      if (formData.category !== 'blog') {
        slug = `${formData.category}/${slug}`;
      }

      const seoMetadata = {
        meta_description: formData.meta_description,
        focus_keyword: formData.focus_keyword,
        secondary_keywords: formData.secondary_keywords
          .split(',')
          .map(keyword => keyword.trim())
          .filter(keyword => keyword),
        seo_title: formData.seo_title || formData.title,
        canonical_url: formData.canonical_url,
        structured_data: formData.structured_data,
        category: formData.category
      };

      const result = await createPost({
        title: formData.title,
        content: formData.content,
        slug,
        cover_image_url: formData.cover_image_url,
        cover_image_alt: formData.cover_image_alt,
        tags: tagsArray,
        published: formData.published,
        seo_metadata: seoMetadata
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
    
    if (['title', 'meta_description', 'focus_keyword', 'content', 'cover_image_url', 'cover_image_alt', 'tags', 'category', 'secondary_keywords'].includes(name)) {
      setSeoScore(calculateSeoScore());
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    if (name === 'structured_data') {
      setSeoScore(calculateSeoScore());
    }
  }

  function suggestMetaDescription() {
    if (formData.content) {
      const firstParagraph = formData.content.split('\n\n')[0].replace(/[#*_]/g, '').trim();
      const description = firstParagraph.length > 160 ? firstParagraph.substring(0, 157) + '...' : firstParagraph;
      setFormData(prev => ({ ...prev, meta_description: description }));
      setSeoScore(calculateSeoScore());
    }
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
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Score SEO</h3>
                <span className={`px-3 py-1 rounded-full text-white ${
                  seoScore >= 80 ? 'bg-green-500' : 
                  seoScore >= 50 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}>
                  {seoScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    seoScore >= 80 ? 'bg-green-500' : 
                    seoScore >= 50 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`} 
                  style={{ width: `${seoScore}%` }}
                ></div>
              </div>
              {seoScore < 50 && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Melhore seu score completando os campos de SEO abaixo
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Título*
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
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formData.title.length}/60 caracteres (ideal: 50-60)
                </p>
              </div>

              <div>
                <label htmlFor="seo_title" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Título SEO (opcional)
                </label>
                <input
                  type="text"
                  id="seo_title"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Título otimizado para SEO (se diferente do título principal)"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formData.seo_title.length}/60 caracteres
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="meta_description" className="block text-gray-700 dark:text-gray-300 mb-2">
                Meta Descrição*
              </label>
              <div className="flex">
                <textarea
                  id="meta_description"
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={suggestMetaDescription}
                  className="ml-2 px-3 py-1 h-fit bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Gerar
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {formData.meta_description.length}/160 caracteres (ideal: 120-160)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="focus_keyword" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Palavra-chave Principal*
                </label>
                <input
                  type="text"
                  id="focus_keyword"
                  name="focus_keyword"
                  value={formData.focus_keyword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ex: criação de sites profissionais"
                  required
                />
              </div>

              <div>
                <label htmlFor="secondary_keywords" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Palavras-chave Secundárias
                </label>
                <input
                  type="text"
                  id="secondary_keywords"
                  name="secondary_keywords"
                  value={formData.secondary_keywords}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="design responsivo, seo otimizado, ecommerce"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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

              <div>
                <label htmlFor="cover_image_alt" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Texto Alternativo da Imagem
                </label>
                <input
                  type="text"
                  id="cover_image_alt"
                  name="cover_image_alt"
                  value={formData.cover_image_alt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Descrição da imagem para acessibilidade e SEO"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="canonical_url" className="block text-gray-700 dark:text-gray-300 mb-2">
                URL Canônica (para conteúdo republicado)
              </label>
              <input
                type="url"
                id="canonical_url"
                name="canonical_url"
                value={formData.canonical_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://site-original.com/post-original"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 mb-2">
                Conteúdo (Markdown)*
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
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {formData.content.split(' ').length} palavras (recomendado: 800+ para melhor SEO)
              </p>
            </div>

            <div className="mb-6 space-y-3">
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
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="structured_data"
                  checked={formData.structured_data}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Adicionar structured data (Schema.org) para rich snippets
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
                      alt={formData.cover_image_alt || formData.title}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </div>
                )}
                
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formData.title}
                  </h1>
                  
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Categoria: {formData.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </div>
                  
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
                
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Preview SEO
                  </h3>
                  
                  <div className="mb-4">
                    <div className="text-blue-600 dark:text-blue-400 text-xl font-medium truncate">
                      {formData.seo_title || formData.title}
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-sm">
                      {window.location.origin}/{formData.category !== 'blog' ? `${formData.category}/` : ''}{slugify(formData.focus_keyword || formData.title)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {formData.meta_description}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div><strong>Palavra-chave principal:</strong> {formData.focus_keyword}</div>
                    {formData.secondary_keywords && (
                      <div><strong>Palavras-chave secundárias:</strong> {formData.secondary_keywords}</div>
                    )}
                    {formData.structured_data && (
                      <div className="mt-2 text-green-600 dark:text-green-400">
                        ✓ Marcação estruturada (Schema.org) ativada
                      </div>
                    )}
                  </div>
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