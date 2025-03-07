// src/components/ContactButton.tsx
import Link from 'next/link';

interface ContactButtonProps {
  variant?: 'default' | 'outline'; // Opcional: para diferentes estilos
  size?: 'sm' | 'md' | 'lg';       // Opcional: para diferentes tamanhos
}

export function ContactButton({ variant = 'default', size = 'md' }: ContactButtonProps) {
  const whatsappNumber = '+5511954997799';
  const message = encodeURIComponent('Eu preciso de um projeto de TI');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Link href={whatsappLink} target="_blank">
      <button
        className={`inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${
          variant === 'default'
            ? 'bg-white text-black hover:bg-gray-200'
            : 'border border-white text-white hover:bg-white/10'
        } ${
          size === 'sm' ? 'px-3 py-1 text-sm' : size === 'md' ? 'px-4 py-2' : 'px-6 py-3 text-lg'
        }`}
      >
        Entre em contato agora
      </button>
    </Link>
  );
}