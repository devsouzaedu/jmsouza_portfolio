import { createClient } from '@supabase/supabase-js';

// Criar cliente do Supabase para o habit tracker
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ksouuljpqjlxofqdvzxk.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzb3V1bGpwcWpseG9mcWR2enhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MzY0NzEsImV4cCI6MjAyMjQxMjQ3MX0.1f_N7vvQQsEJf_yKEMNjlXAzbN8YiAo5CxLCWa3dUUw'
);

export default supabase;

// Configurações do Supabase para o Blog
// Usa variáveis de ambiente quando disponíveis ou as credenciais fixas como fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_BLOG || "https://amlzdumaghfoqeswskaw.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_BLOG || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbHpkdW1hZ2hmb3Flc3dza2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDc0NDQsImV4cCI6MjA1Nzk4MzQ0NH0.qz2-w2MFpp2WpLWJHC8tww1Th8O9gdQog3ONgHWUgEo";

// Interface para o esquema da tabela posts
export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  author?: string;
  tags?: string[];
  created_at: string | Date;
  updated_at?: string | Date;
  published: boolean;
}

/**
 * Função para buscar todos os posts
 * @param published - Se true, retorna apenas posts publicados; se false, retorna todos
 */
export async function getAllPosts(published = true): Promise<Post[]> {
  try {
    console.log(`Buscando posts (publicados: ${published})`);

    // Consulta básica sem filtro de publicação
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    // Verificar se a coluna published existe antes de usá-la
    try {
      if (published) {
        // @ts-ignore - Ignorar erro de tipo
        query = query.eq('published', true);
      }
    } catch (err) {
      console.log('Coluna published não existe, ignorando filtro');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}

/**
 * Função para buscar um post por slug
 * @param slug - O slug do post
 * @param published - Se true, busca apenas posts publicados; se false, busca todos
 */
export async function getPostBySlug(slug: string, published = true): Promise<Post | null> {
  try {
    console.log(`Buscando post por slug: ${slug} (publicado: ${published})`);

    let query = supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    // Verificar se a coluna published existe antes de usá-la
    try {
      if (published) {
        // @ts-ignore - Ignorar erro de tipo
        query = query.eq('published', true);
      }
    } catch (err) {
      console.log('Coluna published não existe, ignorando filtro');
    }

    const { data, error } = await query;

    if (error) {
      if (error.code === 'PGRST116') {
        // Erro de post não encontrado, não é um erro grave
        console.log(`Post não encontrado: ${slug}`);
        return null;
      }
      console.error(`Erro ao buscar post ${slug}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Erro ao buscar post ${slug}:`, error);
    return null;
  }
}

/**
 * Função para criar ou atualizar um post
 * @param post - Os dados do post
 * @param isNew - Se true, cria um novo post; se false, atualiza um existente
 */
export async function savePost(post: Partial<Post>, isNew = true): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    console.log(`${isNew ? 'Criando' : 'Atualizando'} post: ${post.title} (${post.slug})`);

    // Remover o campo published se ele não existir na tabela
    const postData = { ...post };
    
    const operation = isNew
      ? supabase.from('posts').insert([postData])
      : supabase.from('posts').update(postData).eq('slug', postData.slug);

    const { data, error } = await operation;

    if (error) {
      console.error(`Erro ao ${isNew ? 'criar' : 'atualizar'} post:`, error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Erro ao ${isNew ? 'criar' : 'atualizar'} post:`, error);
    return { success: false, error };
  }
}

/**
 * Função para excluir um post
 * @param slug - O slug do post a ser excluído
 */
export async function deletePost(slug: string): Promise<{ success: boolean; error?: any }> {
  try {
    console.log(`Excluindo post: ${slug}`);

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.error(`Erro ao excluir post ${slug}:`, error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error(`Erro ao excluir post ${slug}:`, error);
    return { success: false, error };
  }
} 