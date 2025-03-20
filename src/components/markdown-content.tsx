'use client';

import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configuração personalizada do marked
marked.setOptions({
  highlight: function(code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,      // Converter quebras de linha em <br>
  gfm: true,         // Usar GitHub Flavored Markdown
  headerIds: true,   // Adicionar IDs aos cabeçalhos
  mangle: false,     // Não codificar caracteres de email
  pedantic: false,   // Não conformidade estrita com especificações originais
  sanitize: false,   // Desativado pois usamos DOMPurify
  smartLists: true,  // Usar listas mais inteligentes
  smartypants: true, // Usar aspas inteligentes e traços
  xhtml: false       // Não usar XHTML
} as any);

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    try {
      // Converter markdown para HTML
      console.log('Convertendo Markdown para HTML:', content.substring(0, 100) + '...');
      const rawHtml = marked.parse(content) as string;
      
      // Sanitizar HTML para evitar XSS
      const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 
          'blockquote', 'code', 'pre', 'strong', 'em', 'img', 'hr', 'br',
          'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'div',
          'del', 'ins', 'sup', 'sub', 'dl', 'dt', 'dd', 'details', 'summary'
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'class', 'id', 'title', 'target', 'rel',
          'width', 'height', 'style'
        ]
      });
      
      setHtmlContent(sanitizedHtml);
      
      // Destacar blocos de código depois da renderização
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block as HTMLElement);
        });
      }, 0);
    } catch (error) {
      console.error('Erro ao processar Markdown:', error);
      // Mostrar o conteúdo como texto plano em caso de erro
      setHtmlContent(`<p>${content}</p>`);
    }
  }, [content]);

  return (
    <div 
      className={`prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:my-4
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5
        prose-p:my-3
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
        prose-ul:list-disc prose-ul:pl-5
        prose-ol:list-decimal prose-ol:pl-5
        prose-li:my-1
        prose-hr:my-6 prose-hr:border-gray-200
        prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded
        dark:prose-code:bg-gray-800 dark:prose-code:text-gray-200
        ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 