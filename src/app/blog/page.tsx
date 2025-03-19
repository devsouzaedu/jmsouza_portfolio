"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blogApi';
import { BlogPost, formatDate } from '@/lib/blogUtils';

export const revalidate = 60; // Revalidar a cada 60 segundos

export default async function BlogPage() {
  const posts = await getAllPosts(true); // Buscar apenas posts publicados

  return (
    <main className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-400">
            Reflexões, tutoriais e insights sobre desenvolvimento e tecnologia
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-400">Nenhum post publicado ainda</h2>
            <p className="mt-4 text-gray-500">
              Volte em breve para novos conteúdos
            </p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: BlogPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="aspect-video relative overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-blue-900 flex items-center justify-center">
              <span className="text-3xl font-bold text-white opacity-30">Blog</span>
            </div>
          )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h2>
          
          <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
          
          <div className="mt-auto flex items-center text-sm text-gray-500">
            <span>{formatDate(post.created_at)}</span>
            
            {post.tags && post.tags.length > 0 && (
              <div className="ml-auto flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
} 