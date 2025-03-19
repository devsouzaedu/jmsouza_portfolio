import { marked } from 'marked';
import { sanitize } from 'isomorphic-dompurify';
import hljs from 'highlight.js';

/**
 * Interface que representa um post do blog
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author: string;
  published: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Configurar o marked para usar highlight.js para realce de sintaxe
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true,
  highlight: function(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
});

/**
 * Converte markdown para HTML com sanitização
 * @param markdown O conteúdo em markdown
 * @returns HTML sanitizado
 */
export function markdownToHtml(markdown: string): string {
  // Converter markdown para HTML
  const html = marked.parse(markdown);
  
  // Sanitizar HTML para prevenir XSS
  return sanitize(html);
}

/**
 * Extrai um resumo do conteúdo markdown
 * @param markdown O conteúdo em markdown
 * @param maxLength Comprimento máximo do resumo (padrão: 160 caracteres)
 * @returns Resumo como texto simples
 */
export function extractExcerpt(markdown: string, maxLength: number = 160): string {
  // Remover marcações markdown
  let text = markdown
    .replace(/#+\s+/g, '') // Remover títulos
    .replace(/\*\*|__/g, '') // Remover negrito
    .replace(/\*|_/g, '') // Remover itálico
    .replace(/`{1,3}.*?`{1,3}/g, '') // Remover código inline e blocos
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Substituir links por texto
    .replace(/!\[([^\]]+)\]\([^)]+\)/g, '') // Remover imagens
    .replace(/^\s*>\s*(.*)$/gm, '$1') // Remover blockquotes
    .replace(/^\s*[-*+]\s+/gm, '') // Remover listas não ordenadas
    .replace(/^\s*\d+\.\s+/gm, '') // Remover listas ordenadas
    .replace(/\n{2,}/g, '\n') // Substituir múltiplas quebras de linha por uma única
    .trim();
  
  // Limitar ao comprimento máximo, evitando cortar palavras
  if (text.length <= maxLength) {
    return text;
  }
  
  // Encontrar o último espaço antes do comprimento máximo
  const lastSpace = text.lastIndexOf(' ', maxLength);
  
  // Se não encontrar espaço, corta no comprimento máximo
  const breakPoint = lastSpace > 0 ? lastSpace : maxLength;
  
  return text.substring(0, breakPoint) + '...';
}

/**
 * Gera um slug a partir de um texto
 * @param text O texto para gerar o slug
 * @returns Slug amigável para URL
 */
export function generateSlug(text: string): string {
  return text
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove múltiplos hífens
    .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

/**
 * Formata uma data no estilo brasileiro
 * @param dateString String de data ISO
 * @returns Data formatada (ex: "25 de Outubro de 2023")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Lista de meses em português
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} de ${month} de ${year}`;
}

/**
 * Formata tags para exibição
 * @param tags Array de tags
 * @returns String formatada de tags
 */
export function formatTags(tags: string[]): string {
  if (!tags || tags.length === 0) {
    return '';
  }
  
  return tags.join(', ');
} 