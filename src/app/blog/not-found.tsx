import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Conteúdo não encontrado
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          O post que você está procurando pode ter sido removido ou não está disponível no momento.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Voltar para o blog
        </Link>
      </div>
    </div>
  );
} 
 