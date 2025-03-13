import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

interface PageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const post = getPostBySlug(params.slug, ['title', 'excerpt', 'coverImage']);

  if (!post.title) {
    return {
      title: 'Post não encontrado',
      description: 'O post que você está procurando não existe.',
    };
  }

  return {
    title: `${post.title} | Blog sobre IA`,
    description: post.excerpt as string,
    openGraph: {
      title: post.title as string,
      description: post.excerpt as string,
      images: [
        {
          url: post.coverImage as string,
          width: 1200,
          height: 630,
          alt: post.title as string,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']);

  return posts.map((post) => ({
    slug: post.slug as string,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
    'tags',
  ]);

  if (!post.title) {
    return notFound();
  }

  const content = await markdownToHtml(post.content as string);
  const formattedDate = format(new Date(post.date as string), 'dd MMMM yyyy', { locale: ptBR });

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
            {(post.tags as string[]).map((tag) => (
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
            <time dateTime={post.date as string}>{formattedDate}</time>
          </div>
        </div>

        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          {(post.coverImage as string).endsWith('.mp4') ? (
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
              src={post.coverImage as string}
              alt={`Capa do post ${post.title as string}`}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </main>
  );
} 