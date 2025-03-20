import { createClient } from '@supabase/supabase-js';

// Usando variáveis de ambiente para as credenciais
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_BLOG_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_BLOG_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_BLOG_SERVICE_ROLE_KEY || '';

// Cliente para uso no cliente (usuários anônimos)
export const supabaseBlog = createClient(supabaseUrl, supabaseAnonKey);

// Cliente para uso no servidor (acesso completo)
export const supabaseBlogAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Tipo para os posts do blog
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
} 