import { getPublishedPosts } from '@/lib/blog-service';
import BlogCard from '@/components/blog-card';
import Link from 'next/link';
import RefreshButton from '@/components/refresh-button';

export const metadata = {
  title: 'Blog',
  description: 'Leia nossos artigos e tutoriais mais recentes'
};

// Desativar cache da página para sempre mostrar o conteúdo mais recente
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Blog</h1>
          <RefreshButton />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Confira os artigos mais recentes, tutoriais e insights sobre tecnologia e desenvolvimento
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-300">
            Nenhum post publicado ainda.
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Volte em breve para novos conteúdos!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
} 