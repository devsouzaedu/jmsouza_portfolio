// src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-white">J.M Souza</h2>
            <p className="text-gray-300 mt-2">
              Desenvolvedor Full-Stack & Especialista em IA
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <Link 
              href="/"
              className="text-gray-300 hover:text-white"
            >
              Home
            </Link>
            <Link 
              href="/#projetos"
              className="text-gray-300 hover:text-white"
            >
              Projetos
            </Link>
            <Link 
              href="/#contato"
              className="text-gray-300 hover:text-white"
            >
              Contato
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} J.M Souza. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
  