"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    coverImage: '/dots_ai_bg.png',
    content: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markdownPreview, setMarkdownPreview] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

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
      const date = new Date().toISOString().split('T')[0];
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');

      const tags = formData.tags.split(',').map((tag) => tag.trim());

      const markdownContent = `---
title: '${formData.title}'
date: '${date}'
excerpt: '${formData.excerpt}'
coverImage: '${formData.coverImage}'
author: 'Eduardo'
tags: ${JSON.stringify(tags)}
---

${formData.content}`;

      // Enviar para a API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: markdownContent,
          slug,
          date,
          password: "Sucesso2030A@", // Incluir a senha para autenticação na API
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar o post');
      }
      
      alert(`Post "${formData.title}" criado com sucesso!`);
      
      // Redirecionar para a página do blog
      router.push('/blog');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setSubmitError(error instanceof Error ? error.message : 'Ocorreu um erro ao criar o post. Tente novamente.');
    } finally {
      setIsSubmitting(false);
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

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
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
          Criar Novo Post
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
              Imagem de Capa
            </label>
            <select
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="/dots_ai_bg.png">Fundo IA</option>
              <option value="/dots_video.mp4">Vídeo de Pontos</option>
              <option value="/opera_s8bkasJJpo.png">Imagem Opera 1</option>
              <option value="/opera_TGia9OiBNt.png">Imagem Opera 2</option>
              <option value="/opera_dd3DQtwf08.png">Imagem Opera 3</option>
            </select>
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
              placeholder="IA, Machine Learning, Tecnologia"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Conteúdo (Markdown)
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white font-mono"
                placeholder="# Título do Post

Escreva seu conteúdo aqui usando Markdown.

## Subtítulo

Parágrafo com **texto em negrito** e *texto em itálico*.

- Item de lista 1
- Item de lista 2

[Link de exemplo](https://exemplo.com)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pré-visualização
              </label>
              <div className="w-full h-full p-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm overflow-auto dark:bg-gray-800 dark:text-white prose prose-sm max-w-none">
                {markdownPreview ? (
                  <div className="markdown-preview">
                    {markdownPreview.split('\n').map((line, index) => (
                      <div key={index}>
                        {line.startsWith('# ') ? (
                          <h1 className="text-2xl font-bold">{line.substring(2)}</h1>
                        ) : line.startsWith('## ') ? (
                          <h2 className="text-xl font-bold">{line.substring(3)}</h2>
                        ) : line.startsWith('### ') ? (
                          <h3 className="text-lg font-bold">{line.substring(4)}</h3>
                        ) : line.startsWith('- ') ? (
                          <ul className="list-disc list-inside">
                            <li>{line.substring(2)}</li>
                          </ul>
                        ) : (
                          <p className="mb-2">{line}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    A pré-visualização do conteúdo aparecerá aqui...
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Criando...' : 'Criar Post'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 