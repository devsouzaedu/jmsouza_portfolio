import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Verificar se a senha está correta
    if (data.password !== 'Sucesso2030A@') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    const { title, content, slug, date } = data;
    
    // Extrair tags do conteúdo markdown
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
    
    // Salvar no Supabase
    const { data: postData, error } = await supabase
      .from('posts')
      .insert([
        { 
          slug,
          title, 
          content,
          excerpt,
          cover_image: coverImage,
          author: 'Eduardo',
          tags,
          created_at: date ? new Date(date) : new Date()
        }
      ])
      .select();
    
    if (error) throw error;
    
    // Revalidar a página do blog após criar um novo post
    revalidatePath('/blog');
    
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Erro ao salvar post:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar o post' },
      { status: 500 }
    );
  }
} 