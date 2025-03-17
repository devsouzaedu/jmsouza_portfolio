'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Componente para renderização de conteúdo Markdown com formatação avançada
 */
export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-lg font-semibold mt-4 mb-2" {...props} />,
          
          // Paragraphs and text formatting
          p: ({ node, ...props }) => <p className="my-4 leading-relaxed" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          
          // Lists
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          
          // Links and images
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-4 max-w-full h-auto" {...props} alt={props.alt || 'Imagem'} />
          ),
          
          // Code blocks
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                className="rounded-md my-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-red-500 dark:text-pink-400`}
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Blockquote
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />
          ),
          
          // Horizontal rule
          hr: ({ node, ...props }) => <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 