import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export default async function markdownToHtml(markdown: string) {
  try {
    // Verificar se o conteúdo contém frontmatter
    const frontmatterRegex = /^---[\s\S]+?---/;
    const hasFrontmatter = frontmatterRegex.test(markdown);
    
    // Extrair apenas o conteúdo Markdown, removendo o frontmatter se existir
    let cleanMarkdown = markdown;
    if (hasFrontmatter) {
      const parts = markdown.split('---');
      if (parts.length >= 3) {
        // O conteúdo real estará após o segundo '---'
        cleanMarkdown = parts.slice(2).join('---').trim();
      }
    }
    
    console.log('Processando markdown:', cleanMarkdown.substring(0, 100) + '...');
    
    // Usar a cadeia de processamento remark -> rehype para uma conversão mais robusta
    const result = await remark()
      // Plugins remark para processar o markdown
      .use(remarkGfm)       // Suporte a tabelas, listas de tarefas, links automáticos, etc.
      .use(remarkBreaks)    // Converter quebras de linha em <br>
      
      // Converter markdown para HTML usando rehype
      .use(remarkRehype, { 
        allowDangerousHtml: true,
        footnoteLabel: 'Notas',
        footnoteBackLabel: 'Voltar ao texto'
      })
      .use(rehypeRaw)       // Preservar HTML inline
      .use(rehypeStringify) // Converter para string HTML final
      .process(cleanMarkdown);
    
    const htmlResult = result.toString();
    console.log('HTML gerado:', htmlResult.substring(0, 100) + '...');
    
    return htmlResult;
  } catch (error) {
    console.error('Erro ao converter markdown para HTML:', error);
    return `<p>Erro ao processar o conteúdo: ${error instanceof Error ? error.message : 'Erro desconhecido'}</p>`;
  }
} 