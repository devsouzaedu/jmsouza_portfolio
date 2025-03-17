import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Force revalidation on each request to see the latest posts
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog | JMSOUZA ',
  description: 'Artigos diários, Minhas opiniões pessoais sobre o mundo e o futuro.',
  openGraph: {
    title: 'Blog | JMSOUZA',
    description: 'Artigos diários, Minhas opiniões pessoais sobre o mundo e o futuro.',
  },
};

type Post = {
  slug: string;
  title: string;
  date: Date;
  coverImage: string;
  excerpt: string;
  tags: string[];
  author: string;
};

export default async function BlogPage() {
  // Defina explicitamente includeArchived como false para mostrar apenas posts publicados
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
  ], false) as Post[];
  
  // Verifique se há posts retornados
  console.log(`Blog: ${allPosts.length} posts encontrados`);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog - JMSOUZA 
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Artigos diários, Minhas opiniões pessoais sobre o mundo e o futuro..
          </p>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/blog/novo"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Novo Post
          </Link>
          <Link 
            href="/blog?refresh=true"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Atualizar
          </Link>
        </div>
      </div>

      {allPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              date={format(post.date, 'dd MMMM yyyy', { locale: ptBR })}
              slug={post.slug}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              author={post.author}
              tags={post.tags}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Ainda não há posts publicados. Seja o primeiro a criar um!
          </p>
          <Link 
            href="/blog/novo"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Criar Primeiro Post
          </Link>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Voltar para o Portfólio
        </Link>
      </div>
    </main>
  );
} 