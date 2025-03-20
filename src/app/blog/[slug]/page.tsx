import { getPostBySlug, getPublishedPosts } from '@/lib/blog-service';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import MarkdownContent from '@/components/markdown-content';

export async function generateMetadata({ params }: { params: { slug: string }}) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'O artigo que você procura não foi encontrado'
    };
  }
  
  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/[#*`]/g, '')
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string }}) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        {post.cover_image_url && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={post.cover_image_url} 
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Link 
              key={tag} 
              href={`/blog/tag/${tag}`}
              className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-10">
          <time dateTime={post.created_at}>
            {format(new Date(post.created_at), 'PPP', { locale: ptBR })}
          </time>
          {post.updated_at !== post.created_at && (
            <span className="ml-4">
              (Atualizado em {format(new Date(post.updated_at), 'PPP', { locale: ptBR })})
            </span>
          )}
        </div>

        <MarkdownContent content={post.content} className="mb-10" />
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link 
            href="/blog"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            ← Voltar para o blog
          </Link>
        </div>
      </article>
    </main>
  );
} 