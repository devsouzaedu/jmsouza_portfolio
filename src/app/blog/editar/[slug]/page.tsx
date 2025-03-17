"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

export default function EditPostPage({ params }: Props) {
  const router = useRouter();
  const { slug } = params;
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    coverImage: '',
    content: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markdownPreview, setMarkdownPreview] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [rawContent, setRawContent] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchPost();
    }
  }, [isAuthenticated, slug]);

  const fetchPost = async () => {
    try {
      // Primeiro, buscar o post diretamente do Supabase via API debug
      const response = await fetch(`/api/debug`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error('Erro ao carregar posts');
      }
      
      const post = data.posts.find((p: any) => p.slug === slug);
      
      if (!post) {
        throw new Error('Post não encontrado');
      }
      
      // Extrair o frontmatter
      let title = post.title;
      let excerpt = post.excerpt || '';
      let coverImage = post.cover_image || '';
      let tags = post.tags || [];
      
      // Configurar o formulário
      setFormData({
        title,
        excerpt,
        coverImage,
        content: post.content.split('---')[2]?.trim() || '',
        tags: Array.isArray(tags) ? tags.join(', ') : '',
      });
      
      setRawContent(post.content);
      setMarkdownPreview(post.content.split('---')[2]?.trim() || '');
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      setSubmitError('Erro ao carregar o post. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'content') {
      setMarkdownPreview(value);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const tags = formData.tags.split(',').map((tag) => tag.trim());

      const markdownContent = `---
title: '${formData.title}'
excerpt: '${formData.excerpt}'
coverImage: '${formData.coverImage}'
author: 'Eduardo'
tags: ${JSON.stringify(tags)}
---

${formData.content}`;

      // Enviar para a API
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: markdownContent,
          password: "Sucesso2030A@",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar o post');
      }
      
      alert(`Post "${formData.title}" atualizado com sucesso!`);
      
      // Redirecionar para a página do dashboard
      router.push('/dashboard_blog');
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      setSubmitError(error instanceof Error ? error.message : 'Ocorreu um erro ao atualizar o post. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <Link 
            href="/dashboard_blog"
            className="inline-block mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Voltar para o Dashboard
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Área Restrita
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

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/dashboard_blog"
            className="inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Voltar para o Dashboard
          </Link>
          
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Sair da área administrativa
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Editar Post: {slug}
        </h1>

        {submitError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resumo
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Imagem de Capa (URL)
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Conteúdo (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white font-mono"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pré-visualização do Markdown
            </h3>
            <div 
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-md prose dark:prose-invert max-w-none min-h-[300px] bg-white dark:bg-gray-800"
              dangerouslySetInnerHTML={{ __html: markdownPreview }}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 