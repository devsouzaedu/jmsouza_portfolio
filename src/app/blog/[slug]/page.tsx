import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, Post } from '@/lib/supabase';
import MarkdownContent from '@/components/MarkdownContent';
import { processMarkdown } from '@/lib/markdown';

// Permitir renderização de rotas não geradas durante a build
export const dynamicParams = true;

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Post não encontrado',
      };
    }
    
    return {
      title: `${post.title} | Blog`,
      description: post.excerpt || `Leia o post "${post.title}" no blog.`,
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
    const posts = await getAllPosts(true);
    
    if (!posts || posts.length === 0) {
      console.log('Nenhum post encontrado para gerar páginas estáticas');
      return [];
    }
    
    console.log(`Gerando páginas estáticas para ${posts.length} posts`);
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [];
  }
}

export default async function PostPage({ params }: Params) {
  try {
    console.log(`Carregando post: ${params.slug}`);
    
    const post = await getPostBySlug(params.slug);
    
    if (!post || !post.published) {
      console.log(`Post não encontrado ou não publicado: ${params.slug}`);
      return notFound();
    }
    
    console.log(`Post encontrado: ${post.title}`);
    
    // Processar o conteúdo Markdown
    const { html, content } = await processMarkdown(post.content);
    console.log(`HTML gerado para o post ${params.slug}`);
    
    const postDate = post.created_at instanceof Date 
      ? post.created_at 
      : new Date(post.created_at);
      
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
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.length > 0 && tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-8">
              <span>Por {post.author || 'Eduardo'}</span>
              <span className="mx-2">•</span>
              <time dateTime={postDate.toISOString()}>{formattedDate}</time>
            </div>
          </div>

          {post.cover_image && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              {post.cover_image.endsWith('.mp4') ? (
                <video 
                  className="object-cover w-full h-full"
                  autoPlay 
                  muted 
                  loop
                  controls
                >
                  <source src={post.cover_image} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={post.cover_image || '/dots_ai_bg.png'}
                  alt={`Capa do post ${post.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          )}
          
          {/* Renderizar o conteúdo Markdown */}
          <MarkdownContent content={content} className="mb-12" />
        </article>
      </main>
    );
  } catch (error) {
    console.error(`Erro ao renderizar post ${params.slug}:`, error);
    return notFound();
  }
} 