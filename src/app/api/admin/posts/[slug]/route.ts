import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, savePost, deletePost } from '@/lib/supabase';
import { processMarkdown } from '@/lib/markdown';

// Senha para autenticação
const ADMIN_PASSWORD = 'Sucesso2030A@';

/**
 * GET - Obter um post pelo slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
    
    // Buscar o post
    const post = await getPostBySlug(params.slug, false);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      post
    });
  } catch (error) {
    console.error(`Erro ao buscar post ${params.slug}:`, error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar post',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH - Atualizar um post
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
    
    // Verificar se o post existe
    const existingPost = await getPostBySlug(params.slug, false);
    
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    // Preparar dados para atualização
    const updateData: any = { updated_at: new Date() };
    
    // Atualizar apenas os campos fornecidos
    if ('title' in data) updateData.title = data.title;
    if ('content' in data) updateData.content = data.content;
    if ('excerpt' in data) updateData.excerpt = data.excerpt;
    if ('cover_image' in data) updateData.cover_image = data.cover_image;
    if ('tags' in data) updateData.tags = Array.isArray(data.tags) ? data.tags : [];
    
    // Adicionar campo published apenas se foi fornecido e a coluna existir
    if ('published' in data) {
      try {
        updateData.published = Boolean(data.published);
      } catch (err) {
        console.log('Ignorando campo published, pode não existir na tabela');
      }
    }
    
    // Se o slug for atualizado, garantir que seja único
    if ('newSlug' in data && data.newSlug !== params.slug) {
      const slugExists = await getPostBySlug(data.newSlug, false);
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Já existe um post com este slug' },
          { status: 409 }
        );
      }
      
      updateData.slug = data.newSlug;
    }
    
    // Se o conteúdo for atualizado, processar markdown
    if ('content' in data) {
      await processMarkdown(data.content);
    }
    
    // Atualizar o post
    const { success, error } = await savePost({
      ...updateData,
      slug: updateData.slug || params.slug
    }, false);
    
    if (!success) {
      console.error('Erro detalhado ao atualizar post:', error);
      throw new Error(JSON.stringify(error));
    }
    
    return NextResponse.json({
      success: true,
      message: 'Post atualizado com sucesso',
      slug: updateData.slug || params.slug
    });
  } catch (error) {
    console.error(`Erro ao atualizar post ${params.slug}:`, error);
    return NextResponse.json(
      { 
        error: 'Erro ao atualizar post',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Excluir um post
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Validar senha via body
    const data = await request.json();
    
    if (data.password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Verificar se o post existe
    const existingPost = await getPostBySlug(params.slug, false);
    
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    // Excluir o post
    const { success, error } = await deletePost(params.slug);
    
    if (!success) {
      throw new Error(error || 'Erro ao excluir post');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Post excluído com sucesso'
    });
  } catch (error) {
    console.error(`Erro ao excluir post ${params.slug}:`, error);
    return NextResponse.json(
      { 
        error: 'Erro ao excluir post',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 