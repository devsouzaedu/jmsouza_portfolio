import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    // Verificar se a senha está correta
    if (password !== 'Sucesso2030A@') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    const { slug } = params;
    
    // Excluir o post
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('slug', slug);
    
    if (error) throw error;
    
    // Revalidar a página do blog
    revalidatePath('/blog');
    revalidatePath('/dashboard_blog');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir o post' },
      { status: 500 }
    );
  }
}

// Para atualizar posts existentes
export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json();
    
    // Verificar se a senha está correta
    if (data.password !== 'Sucesso2030A@') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    const { slug } = params;
    const { title, content, archived } = data;
    
    // Preparar dados para atualização
    const updateData: any = {};
    
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) {
      // Extrair tags, excerpt e coverImage do conteúdo
      let tags = [];
      const frontmatterMatch = content.match(/tags:\s*(\[.*?\])/);
      if (frontmatterMatch && frontmatterMatch[1]) {
        try {
          tags = JSON.parse(frontmatterMatch[1]);
        } catch (e) {
          console.error('Erro ao parsear tags:', e);
        }
      }
      
      // Extrair excerpt
      let excerpt = '';
      const excerptMatch = content.match(/excerpt:\s*'(.+?)'/);
      if (excerptMatch && excerptMatch[1]) {
        excerpt = excerptMatch[1];
      }
      
      // Extrair coverImage
      let coverImage = '';
      const coverImageMatch = content.match(/coverImage:\s*'(.+?)'/);
      if (coverImageMatch && coverImageMatch[1]) {
        coverImage = coverImageMatch[1];
      }
      
      updateData.content = content;
      updateData.excerpt = excerpt;
      updateData.cover_image = coverImage;
      updateData.tags = tags;
    }
    
    if (archived !== undefined) updateData.archived = archived;
    
    // Atualizar o post
    const { data: updatedPost, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('slug', slug)
      .select();
    
    if (error) throw error;
    
    // Revalidar as páginas
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/dashboard_blog');
    
    return NextResponse.json({ success: true, post: updatedPost[0] });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar o post' },
      { status: 500 }
    );
  }
} 