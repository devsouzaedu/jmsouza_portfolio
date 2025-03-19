import { createClient } from '@supabase/supabase-js';

// URL e chave anônima do Supabase para o Blog
const supabaseUrl = process.env.NEXT_PUBLIC_BLOG_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_BLOG_SUPABASE_ANON_KEY || '';

// Verificação de configuração
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Atenção: Variáveis de ambiente do Supabase do Blog não configuradas corretamente');
}

// Criar o cliente do Supabase para o Blog
export const blogSupabase = createClient(supabaseUrl, supabaseAnonKey);

export default blogSupabase; 