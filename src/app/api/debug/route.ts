import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeArchived = searchParams.get('includeArchived') === 'true';
    
    const query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Se não incluir arquivados, filtra somente os não arquivados
    if (!includeArchived) {
      query.is('archived', null).or('archived.eq.false');
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({ 
      success: true, 
      count: data?.length || 0,
      posts: data 
    });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    );
  }
} 