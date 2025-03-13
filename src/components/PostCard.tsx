import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type PostCardProps = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  author: string;
  tags: string[];
};

export default function PostCard({
  title,
  date,
  excerpt,
  slug,
  coverImage,
  author,
  tags,
}: PostCardProps) {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy', { locale: ptBR });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 w-full">
        {coverImage.endsWith('.mp4') ? (
          <video 
            className="object-cover w-full h-full"
            autoPlay 
            muted 
            loop
          >
            <source src={coverImage} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={coverImage}
            alt={`Capa do post ${title}`}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${slug}`}>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Por {author}
          </span>
        </div>
      </div>
    </div>
  );
} 