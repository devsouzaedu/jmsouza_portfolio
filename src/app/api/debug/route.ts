import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeArchived = searchParams.get('includeArchived') === 'true';
    
    // Log para diagnóstico durante a build
    console.log(`API debug: buscando posts (includeArchived=${includeArchived})`);
    
    const query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Se não incluir arquivados, filtra somente os não arquivados
    if (!includeArchived) {
      // Tratar tanto posts com archived=false quanto aqueles onde archived é nulo (posts antigos)
      query.is('archived', null).or('archived.eq.false');
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erro ao buscar posts do Supabase:', error);
      throw error;
    }
    
    console.log(`API debug: ${data?.length || 0} posts encontrados`);
    
    return NextResponse.json({ 
      success: true, 
      count: data?.length || 0,
      posts: data || []
    });
  } catch (error) {
    console.error('Erro na API debug:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar posts',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        success: false,
        posts: []
      },
      { status: 500 }
    );
  }
} 