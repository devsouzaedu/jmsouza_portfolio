"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MarkdownContent from '@/components/MarkdownContent';

// Tipos para os posts
type Post = {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  created_at: string;
  tags: string[];
  author: string;
};

// Cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        if (!slug) {
          throw new Error('Slug não fornecido');
        }

        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }

        setPost(data);
      } catch (error: any) {
        console.error('Erro ao buscar post:', error);
        setError(error.message || 'Erro ao carregar o post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-10">
            <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Erro</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
            <Link 
              href="/blog" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Post não encontrado</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">O post que você está tentando acessar não existe ou foi removido.</p>
            <Link 
              href="/blog" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-block text-blue-500 hover:text-blue-700 mb-6 transition-colors"
          >
            ← Voltar para o Blog
          </Link>

          {post.cover_image && (
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-8">
              <img 
                src={post.cover_image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            {post.author && (
              <div className="mr-4">Por: {post.author}</div>
            )}
            <div className="mr-4">{formatDate(post.created_at)}</div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 shadow-md">
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <MarkdownContent content={post.content} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 