// src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Eduardo</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Desenvolvedor Full-Stack & Especialista em IA
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
            <Link 
              href="/blog"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Blog
            </Link>
            <Link 
              href="/#projetos"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Projetos
            </Link>
            <Link 
              href="/#contato"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Contato
            </Link>
            {/* Link escondido para o dashboard do blog - só visível ao passar o mouse */}
            <Link 
              href="/dashboard_blog"
              className="text-gray-50 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white transition-colors duration-300"
              aria-label="Área administrativa"
            >
              •
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Eduardo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
  