import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/blog-service';
import { revalidatePath } from 'next/cache';

// Desativar cache para esta API
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Timestamp para debug
    const timestamp = new Date().toISOString();
    console.log(`[API] Buscando posts em ${timestamp}`);

    // Buscar posts publicados
    const posts = await getPublishedPosts();
    
    // Forçar revalidação da página do blog
    revalidatePath('/blog');
    
    // Responder com os posts e cabeçalhos para evitar cache
    return NextResponse.json(
      { data: posts, timestamp, count: posts.length },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error('[API] Erro ao buscar posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts', message: String(error) },
      { status: 500 }
    );
  }
} 