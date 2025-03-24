// src/components/ContactButton.tsx
"use client";
import { useEffect } from 'react';

interface ContactButtonProps {
  variant?: 'default' | 'outline'; // Opcional: para diferentes estilos
  size?: 'sm' | 'md' | 'lg';       // Opcional: para diferentes tamanhos
  className?: string;              // Classe CSS adicional
}

export function ContactButton({ variant = 'default', size = 'md', className = '' }: ContactButtonProps) {
  const whatsappNumber = '+5511954997799';
  const message = encodeURIComponent('Eu preciso de um projeto de TI');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Definindo a função gtag_report_conversion no escopo global
  useEffect(() => {
    // @ts-ignore
    window.gtag_report_conversion = function(url: string | undefined) {
      var callback = function () {
        if (typeof(url) != 'undefined') {
          window.location.href = url;
        }
      };
      // @ts-ignore
      gtag('event', 'conversion', {
        'send_to': 'AW-16927678460/CU5DCJ2Tk6oaEPy_34c_',
        'value': 1.0,
        'currency': 'BRL',
        'event_callback': callback
      });
      return false;
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // @ts-ignore
    window.gtag_report_conversion(whatsappLink);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${
        variant === 'default'
          ? 'bg-white text-black hover:bg-gray-200'
          : 'border border-white text-white hover:bg-white/10'
      } ${
        size === 'sm' ? 'px-3 py-1 text-sm' : size === 'md' ? 'px-4 py-2' : 'px-6 py-3 text-lg'
      } ${className}`}
    >
      Entre em contato agora
    </button>
  );
}