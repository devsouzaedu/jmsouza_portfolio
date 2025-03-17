'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { titleToSlug } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';

// Senha para autenticação
const ADMIN_PASSWORD = 'Sucesso2030A@';

export default function NewPostPage() {
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('/dots_ai_bg.png');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  
  const [previewTab, setPreviewTab] = useState(false);
  
  // Gerar slug a partir do título automaticamente
  useEffect(() => {
    if (title) {
      setSlug(titleToSlug(title));
    }
  }, [title]);
  
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
  
  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      if (!title || !content || !slug) {
        throw new Error('Título, conteúdo e slug são obrigatórios');
      }
      
      // Formatando os tags como array
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Criar o post
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          slug,
          excerpt,
          cover_image: coverImage,
          tags: tagArray,
          published,
          password: ADMIN_PASSWORD,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar post');
      }
      
      // Redirecionar para a página de administração
      alert('Post criado com sucesso!');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setError(error instanceof Error ? error.message : 'Erro ao criar post');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Criar Novo Post
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
            <Link href="/admin/blog" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
              Voltar para administração
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Formulário para criação de post
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Criar Novo Post
          </h1>
          
          <Link
            href="/admin/blog"
            className="px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Voltar para administração
          </Link>
        </div>
        
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Coluna esquerda */}
              <div>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Título*
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="slug" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Slug* (gerado automaticamente)
                  </label>
                  <input
                    id="slug"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="excerpt" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Resumo
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="coverImage" className="block text-gray-700 dark:text-gray-300 mb-2">
                    URL da Imagem de Capa
                  </label>
                  <input
                    id="coverImage"
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="tags" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    id="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                
                <div className="mb-4 flex items-center">
                  <input
                    id="published"
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-gray-700 dark:text-gray-300">
                    Publicar imediatamente
                  </label>
                </div>
              </div>
              
              {/* Coluna direita */}
              <div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 dark:text-gray-300">
                      Conteúdo em Markdown*
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setPreviewTab(false)}
                        className={`px-3 py-1 rounded-md ${
                          !previewTab
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewTab(true)}
                        className={`px-3 py-1 rounded-md ${
                          previewTab
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Prévia
                      </button>
                    </div>
                  </div>
                  
                  {!previewTab ? (
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
                      rows={15}
                      required
                    />
                  ) : (
                    <div className="w-full h-96 border rounded-md p-4 overflow-auto dark:bg-gray-700 dark:border-gray-600">
                      {content ? (
                        <MarkdownContent content={content} />
                      ) : (
                        <div className="text-gray-500 dark:text-gray-400 italic">
                          Digite algum conteúdo para visualizar a prévia...
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p>Dicas de formatação:</p>
                  <ul className="list-disc list-inside ml-4">
                    <li># Título H1</li>
                    <li>## Título H2</li>
                    <li>**Texto em negrito**</li>
                    <li>*Texto em itálico*</li>
                    <li>- Item de lista</li>
                    <li>[Link](https://exemplo.com)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/blog"
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 