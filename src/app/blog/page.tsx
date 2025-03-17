import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/supabase';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Force revalidation on each request to see the latest posts
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog | Eduardo',
  description: 'Artigos sobre tecnologia, programação e desenvolvimento.',
  openGraph: {
    title: 'Blog | Eduardo',
    description: 'Artigos sobre tecnologia, programação e desenvolvimento.',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts(true);
  
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Blog
        </h1>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-600 dark:text-gray-400">
              Ainda não há posts publicados.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => {
              const postDate = post.created_at instanceof Date 
                ? post.created_at 
                : new Date(post.created_at);
                
              const formattedDate = format(postDate, 'dd MMMM yyyy', { locale: ptBR });
              
              return (
                <article 
                  key={post.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.cover_image || '/dots_ai_bg.png'}
                        alt={`Capa do post ${post.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <Link href={`/blog/${post.slug}`} className="block mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <span>{post.author || 'Eduardo'}</span>
                      <span className="mx-2">•</span>
                      <time dateTime={postDate.toISOString()}>{formattedDate}</time>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                      {post.excerpt || 'Clique para ler mais sobre este post...'}
                    </p>
                    
                    {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      Leia mais &rarr;
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
} 