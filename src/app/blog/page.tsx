import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Blog sobre IA | Eduardo - Desenvolvedor Full-Stack & IA',
  description: 'Artigos diários sobre Inteligência Artificial, Machine Learning, e como essas tecnologias estão transformando o mundo.',
  openGraph: {
    title: 'Blog sobre IA | Eduardo - Desenvolvedor Full-Stack & IA',
    description: 'Artigos diários sobre Inteligência Artificial, Machine Learning, e como essas tecnologias estão transformando o mundo.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
  ]);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog sobre Inteligência Artificial
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Artigos diários sobre IA, Machine Learning e como essas tecnologias estão transformando o mundo.
          </p>
        </div>
        <Link 
          href="/blog/novo"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Novo Post
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard
              key={post.slug as string}
              title={post.title as string}
              date={post.date as string}
              slug={post.slug as string}
              excerpt={post.excerpt as string}
              coverImage={post.coverImage as string}
              author={post.author as string}
              tags={post.tags as string[]}
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