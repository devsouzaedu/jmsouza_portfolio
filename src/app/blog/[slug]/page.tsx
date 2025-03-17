import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

// Permitir renderização de rotas não geradas durante a build
export const dynamicParams = true;

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug, ['title', 'excerpt']);
    
    if (!post) {
      return {
        title: 'Post não encontrado',
      };
    }
    
    return {
      title: post.title as string,
      description: post.excerpt as string,
    };
  } catch (error) {
    console.error(`Erro ao gerar metadados para o post ${params.slug}:`, error);
    return {
      title: 'Erro ao carregar o post',
      description: 'Ocorreu um erro ao carregar as informações do post',
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts(['slug'], false);
    
    if (!posts || posts.length === 0) {
      console.log('Nenhum post encontrado para gerar páginas estáticas');
      return [];
    }
    
    console.log(`Gerando páginas estáticas para ${posts.length} posts`);
    
    return posts.map((post) => ({
      slug: post.slug as string,
    }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [];
  }
}

export default async function Post({ params }: Params) {
  try {
    const post = await getPostBySlug(params.slug, [
      'title',
      'date',
      'slug',
      'author',
      'content',
      'coverImage',
      'tags',
      'archived',
    ]);
    
    if (!post || post.archived) {
      return notFound();
    }
    
    const content = await markdownToHtml(post.content as string || '');
    
    const postDate = post.date instanceof Date 
      ? post.date 
      : new Date(post.date as string || Date.now());
      
    const formattedDate = format(postDate, 'dd MMMM yyyy', { locale: ptBR });

    const tags = Array.isArray(post.tags) ? post.tags : [];
    
    return (
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <Link 
            href="/blog"
            className="inline-block mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            ← Voltar para todos os posts
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title as string}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-8">
              <span>Por {post.author as string}</span>
              <span className="mx-2">•</span>
              <time dateTime={postDate.toISOString()}>{formattedDate}</time>
            </div>
          </div>

          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            {typeof post.coverImage === 'string' && (post.coverImage as string).endsWith('.mp4') ? (
              <video 
                className="object-cover w-full h-full"
                autoPlay 
                muted 
                loop
                controls
              >
                <source src={post.coverImage as string} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={post.coverImage as string || '/dots_ai_bg.png'}
                alt={`Capa do post ${post.title as string}`}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-img:rounded-lg prose-img:my-8 prose-hr:my-8 max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
    );
  } catch (error) {
    console.error(`Erro ao renderizar post ${params.slug}:`, error);
    return notFound();
  }
} 