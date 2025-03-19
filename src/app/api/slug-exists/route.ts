import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ksouuljpqjlxofqdvzxk.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzb3V1bGpwcWpseG9mcWR2enhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MzY0NzEsImV4cCI6MjAyMjQxMjQ3MX0.1f_N7vvQQsEJf_yKEMNjlXAzbN8YiAo5CxLCWa3dUUw';
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