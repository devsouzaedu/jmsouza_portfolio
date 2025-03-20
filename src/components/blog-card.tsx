import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { BlogPost } from '@/lib/supabase-blog';

interface BlogCardProps {
  post: BlogPost;
}

// Função para converter Markdown em texto plano para a prévia
function getPlainTextExcerpt(markdown: string, maxLength: number = 150): string {
  // Remove headers (#)
  let text = markdown.replace(/#{1,6}\s+/g, '');
  
  // Remove marcações de negrito e itálico
  text = text.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1');
  
  // Remove links [texto](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove blocos de código
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  
  // Remove HTML tags se houver
  text = text.replace(/<[^>]*>/g, '');
  
  // Remove linhas horizontais e outros caracteres especiais
  text = text.replace(/---/g, '');
  
  // Remove quebras de linha extras e espaços
  text = text.replace(/\n+/g, ' ').trim();
  
  // Limita o tamanho e adiciona reticências
  return text.length > maxLength 
    ? text.substring(0, maxLength) + '...' 
    : text;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      {post.cover_image_url && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.cover_image_url} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Link 
              key={tag} 
              href={`/blog/tag/${tag}`}
              className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {getPlainTextExcerpt(post.content, 180)}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(post.created_at), 'PP', { locale: ptBR })}
          </span>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </div>
  );
} 