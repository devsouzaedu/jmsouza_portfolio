'use client';

import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configuração do marked para usar highlight.js
marked.setOptions({
  highlight: function(code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
} as any);

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Converter markdown para HTML
    const rawHtml = marked.parse(content) as string;
    // Sanitizar HTML para evitar XSS
    const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 
        'blockquote', 'code', 'pre', 'strong', 'em', 'img', 'hr', 'br',
        'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'div'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'id', 'target']
    });
    setHtmlContent(sanitizedHtml);
    
    // Destacar blocos de código depois da renderização
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }, 0);
  }, [content]);

  return (
    <div 
      className={`prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 