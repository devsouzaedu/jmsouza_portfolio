import { getPostsByTag } from '@/lib/blog-service';
import BlogCard from '@/components/blog-card';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { tag: string }}) {
  return {
    title: `Posts com a tag #${params.tag}`,
    description: `Confira todos os posts relacionados à tag #${params.tag}`
  };
}

export default async function TagPage({ params }: { params: { tag: string }}) {
  const posts = await getPostsByTag(params.tag);
  const tag = params.tag;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            Posts com a tag{' '}
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
              #{tag}
            </span>
          </h1>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            ← Voltar para o blog
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-600 dark:text-gray-300">
              Nenhum post encontrado com a tag #{tag}.
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Tente procurar por outra tag ou volte para o blog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 