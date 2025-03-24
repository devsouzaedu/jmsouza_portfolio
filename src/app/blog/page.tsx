import { getPublishedPosts } from '@/lib/blog-service';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/Button';

// Desativar cache da página para sempre mostrar o conteúdo mais recente
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Blog() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 animate-fadeIn">Blog</h1>
          
          {posts.length === 0 ? (
            <div className="text-center py-12 animate-fadeIn">
              <h2 className="text-2xl font-medium text-gray-300">
                Nenhum post publicado ainda.
              </h2>
              <p className="mt-4 text-gray-400">
                Volte em breve para novos conteúdos!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <article 
                  key={post.id} 
                  className="border border-gray-700 rounded-lg p-6 animate-fadeIn hover:border-gray-500 transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-400 mb-3">
                    Publicado em {format(new Date(post.created_at), 'PPP', { locale: ptBR })}
                  </p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Link 
                          key={tag} 
                          href={`/blog/tag/${tag}`}
                          className="text-xs font-medium px-2 py-1 rounded-full bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" size="sm">Ler mais</Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <Link href="/">
              <Button variant="outline" size="default">Voltar para a página inicial</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
} 