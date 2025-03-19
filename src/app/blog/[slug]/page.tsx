"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blogApi';
import { markdownToHtml, formatDate } from '@/lib/blogUtils';
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

export const revalidate = 60; // Revalidar a cada 60 segundos

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const contentHtml = markdownToHtml(post.content);

  return (
    <main className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-blue-400 mb-8 hover:text-blue-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para o blog
        </Link>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex items-center text-gray-400 mb-8">
              <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
              <span className="mx-2">•</span>
              <span>{post.author || 'Admin'}</span>
            </div>

            {post.cover_image && (
              <div className="relative aspect-video overflow-hidden rounded-xl mb-10">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-800">
              <h2 className="text-xl font-bold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link 
                    href={`/blog/tag/${tag}`} 
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
} 