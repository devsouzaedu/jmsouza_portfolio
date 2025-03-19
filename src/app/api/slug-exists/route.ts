import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Cliente Supabase para o Blog
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_BLOG || "https://amlzdumaghfoqeswskaw.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_BLOG || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbHpkdW1hZ2hmb3Flc3dza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDc0NDQsImV4cCI6MjA1Nzk4MzQ0NH0.qz2-w2MFpp2WpLWJHC8tww1Th8O9gdQog3ONgHWUgEo";
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