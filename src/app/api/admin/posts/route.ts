import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, savePost } from '@/lib/supabase';
import { processMarkdown } from '@/lib/markdown';

// Senha para autenticação
const ADMIN_PASSWORD = 'Sucesso2030A@';

/**
 * GET - Listar todos os posts
 */
export async function GET(request: NextRequest) {
  try {
    // Validar senha via query param
    const url = new URL(request.url);
    const password = url.searchParams.get('password');
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Filtro de publicação
    const publishedFilter = url.searchParams.get('published');
    const onlyPublished = publishedFilter === 'true';
    
    // Buscar todos os posts
    const posts = await getAllPosts(onlyPublished);
    
    return NextResponse.json({
      success: true,
      message: `${posts.length} posts encontrados`,
      posts
    });
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao listar posts',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Criar um novo post
 */
export async function POST(request: NextRequest) {
  try {
    // Validar requisição
    const data = await request.json();
    
    // Validar senha
    if (data.password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Validar campos obrigatórios
    if (!data.title || !data.content || !data.slug) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: title, content, slug' },
        { status: 400 }
      );
    }
    
    // Processar o markdown para criar frontmatter se necessário
    const { title, content, slug, excerpt, cover_image, tags } = data;
    
    // Processar o markdown para extrair o HTML
    const { html } = await processMarkdown(content);
    
    // Criar objeto do post
    const post = {
      title,
      content,
      slug,
      excerpt: excerpt || '',
      cover_image: cover_image || '/dots_ai_bg.png',
      author: 'Eduardo',
      tags: Array.isArray(tags) ? tags : [],
      created_at: new Date(),
      updated_at: new Date()
    };
    
    // Adicionar campo published apenas se foi fornecido
    if (typeof data.published !== 'undefined') {
      // @ts-ignore
      post.published = data.published === true;
    }
    
    // Salvar no banco de dados
    const { success, error } = await savePost(post, true);
    
    if (!success) {
      console.error('Erro detalhado ao salvar post:', error);
      throw new Error(JSON.stringify(error));
    }
    
    return NextResponse.json({
      success: true,
      message: 'Post criado com sucesso',
      slug
    });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao criar post',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 