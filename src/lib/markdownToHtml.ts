import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export default async function markdownToHtml(markdown: string) {
  try {
    // Usar a cadeia de processamento remark -> rehype para uma conversão mais robusta
    const result = await remark()
      // Plugins remark para processar o markdown
      .use(remarkGfm)       // Suporte a tabelas, listas de tarefas, links automáticos, etc.
      .use(remarkBreaks)    // Converter quebras de linha em <br>
      
      // Converter markdown para HTML usando rehype
      .use(remarkRehype, { allowDangerousHtml: true })  // Permitir HTML inline no markdown
      .use(rehypeRaw)       // Preservar HTML inline
      .use(rehypeStringify) // Converter para string HTML final
      .process(markdown);
    
    return result.toString();
  } catch (error) {
    console.error('Erro ao converter markdown para HTML:', error);
    return `<p>Erro ao processar o conteúdo: ${error instanceof Error ? error.message : 'Erro desconhecido'}</p>`;
  }
} 