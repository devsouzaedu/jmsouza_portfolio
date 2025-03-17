import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    // Consulta direta sem usar o ORM do Supabase para filtros complexos
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .or('archived.is.null,archived.eq.false');
      
    if (error) throw error;
    
    // Revalidar a página do blog para mostrar os posts
    revalidatePath('/blog');
    
    return NextResponse.json({
      success: true,
      message: 'Posts recuperados com sucesso e cache limpo',
      count: posts?.length || 0,
      posts: posts?.map(p => ({
        slug: p.slug,
        title: p.title,
        archived: p.archived
      }))
    });
  } catch (error) {
    console.error('Erro ao diagnosticar posts:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
} 