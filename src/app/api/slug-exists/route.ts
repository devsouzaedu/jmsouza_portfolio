import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Endpoint para verificar se um slug já existe
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json(
      { error: 'Slug não fornecido' },
      { status: 400 }
    );
  }

  try {
    const { data, error, count } = await supabase
      .from('posts')
      .select('slug', { count: 'exact' })
      .eq('slug', slug);

    if (error) {
      throw error;
    }

    const exists = count ? count > 0 : false;

    return NextResponse.json({ exists });
  } catch (error: any) {
    console.error('Erro ao verificar slug:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao verificar slug' },
      { status: 500 }
    );
  }
}