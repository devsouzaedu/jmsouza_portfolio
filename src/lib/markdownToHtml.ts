import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export default async function markdownToHtml(markdown: string) {
  // Usar plugins adicionais para melhorar o processamento de markdown
  const result = await remark()
    .use(remarkGfm)       // Suporte a tabelas, listas de tarefas, links automáticos, etc.
    .use(remarkBreaks)    // Converter quebras de linha em <br>
    .use(html)            // Converter para HTML
    .process(markdown);
  
  return result.toString();
} 