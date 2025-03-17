import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

/**
 * Interface que define o resultado do processamento de um arquivo Markdown
 */
export interface MarkdownResult {
  frontMatter: {
    title?: string;
    excerpt?: string;
    coverImage?: string;
    date?: string;
    author?: string;
    tags?: string[];
    [key: string]: any;
  };
  content: string;
  html: string;
}

/**
 * Processa um texto Markdown completo (com frontmatter)
 * @param markdown - O texto markdown a ser processado
 * @returns Um objeto com o frontmatter, conteúdo e HTML resultante
 */
export async function processMarkdown(markdown: string): Promise<MarkdownResult> {
  console.log('Processando markdown...');

  try {
    // Extrair frontmatter usando gray-matter
    const { data, content } = matter(markdown);

    console.log('Frontmatter extraído:', data);
    console.log('Conteúdo extraído (primeiras 100 caracteres):', content.slice(0, 100));

    // Processar markdown para HTML
    const html = await markdownToHtml(content);

    return {
      frontMatter: {
        title: data.title || '',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        date: data.date ? (data.date instanceof Date ? data.date.toISOString() : data.date) : '',
        author: data.author || 'Eduardo',
        tags: Array.isArray(data.tags) ? data.tags : [],
        ...data
      },
      content,
      html
    };
  } catch (error) {
    console.error('Erro ao processar markdown:', error);
    throw error;
  }
}

/**
 * Converte markdown para HTML usando unified e plugins
 * @param markdown - O texto markdown a ser convertido
 * @returns HTML resultante
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    console.log('Convertendo markdown para HTML (primeiras 100 caracteres):', markdown.slice(0, 100));

    const result = await unified()
      .use(remarkParse)           // Parse markdown
      .use(remarkRehype, {        // Turn markdown into HTML
        allowDangerousHtml: true  // Enable raw HTML in markdown
      })
      .use(rehypeRaw)             // Process raw HTML in markdown
      .use(rehypeSanitize)        // Sanitize HTML
      .use(rehypeStringify)       // Turn HTML into a string
      .process(markdown);

    const html = result.toString();
    console.log('HTML gerado (primeiras 100 caracteres):', html.slice(0, 100));

    return html;
  } catch (error) {
    console.error('Erro durante a conversão de markdown para HTML:', error);
    return `<div class="error">Erro ao processar markdown: ${error instanceof Error ? error.message : 'Erro desconhecido'}</div>`;
  }
}

/**
 * Cria um slug a partir de um título
 * @param title - O título do post
 * @returns Um slug URL-friendly
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')                 // Normalizar acentos
    .replace(/[\u0300-\u036f]/g, '')  // Remover diacríticos
    .replace(/[^\w\s-]/g, '')         // Remover caracteres especiais
    .replace(/\s+/g, '-')             // Substituir espaços por hífens
    .replace(/-+/g, '-')              // Remover hífens consecutivos
    .trim();                          // Remover espaços no início e fim
} 