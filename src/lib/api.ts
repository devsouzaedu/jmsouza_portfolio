import matter from 'gray-matter';
import { supabase } from './supabase';

export async function getPostSlugs() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug');
  
  if (error) throw error;
  return data?.map(post => post.slug) || [];
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  
  if (!data) return null;
  
  const { data: frontmatter, content } = matter(data.content);
  
  type Items = {
    [key: string]: string | string[] | Date;
  };
  
  const items: Items = {};
  
  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = data.slug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'date') {
      items[field] = new Date(data.created_at);
    }
    if (frontmatter[field]) {
      items[field] = frontmatter[field];
    }
  });
  
  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
  
  console.log('Posts recuperados do Supabase:', data);
  
  if (!data || data.length === 0) {
    console.log('Nenhum post encontrado no Supabase');
    return [];
  }
  
  return data.map(post => {
    try {
      const { data: frontmatter, content } = matter(post.content);
      
      type Items = {
        [key: string]: string | string[] | Date;
      };
      
      const items: Items = {};
      
      fields.forEach((field) => {
        if (field === 'slug') {
          items[field] = post.slug;
        }
        if (field === 'content') {
          items[field] = content;
        }
        if (field === 'date') {
          items[field] = new Date(post.created_at);
        }
        if (frontmatter && frontmatter[field]) {
          items[field] = frontmatter[field];
        }
      });
      
      return items;
    } catch (error) {
      console.error(`Erro ao processar post ${post.slug}:`, error);
      return { slug: post.slug }; // Retorna pelo menos o slug em caso de erro
    }
  });
} 