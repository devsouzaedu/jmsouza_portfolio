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
  
  try {
    type Items = {
      [key: string]: string | string[] | Date;
    };
    
    const items: Items = {};
    
    // Use direct fields from database
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = data.slug;
      }
      if (field === 'title') {
        items[field] = data.title;
      }
      if (field === 'content') {
        // Try to extract content without frontmatter
        const contentMatch = data.content.match(/---(.|\n)*?---\n((.|\n)*)/);
        items[field] = contentMatch ? contentMatch[2] : data.content;
      }
      if (field === 'date') {
        items[field] = new Date(data.created_at);
      }
      if (field === 'excerpt') {
        items[field] = data.excerpt || '';
      }
      if (field === 'coverImage') {
        items[field] = data.cover_image || '';
      }
      if (field === 'author') {
        items[field] = data.author || 'Eduardo';
      }
      if (field === 'tags') {
        items[field] = data.tags || [];
      }
    });
    
    return items;
  } catch (error) {
    console.error(`Erro ao processar post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(fields: string[] = [], includeArchived: boolean = false) {
  try {
    const query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!includeArchived) {
      query.or('archived.is.null,archived.eq.false');
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erro ao buscar posts:', error);
      throw error;
    }
    
    console.log('Posts recuperados do Supabase:', data?.length || 0);
    
    if (!data || data.length === 0) {
      console.log('Nenhum post encontrado no Supabase');
      return [];
    }
    
    return data.map(post => {
      try {
        // Usar diretamente os campos do banco de dados em vez de depender do frontmatter
        type Items = {
          [key: string]: string | string[] | Date;
        };
        
        const items: Items = {};
        
        fields.forEach((field) => {
          if (field === 'slug') {
            items[field] = post.slug;
          }
          if (field === 'title') {
            items[field] = post.title;
          }
          if (field === 'content') {
            // Tentar extrair o conteúdo sem o frontmatter
            const contentMatch = post.content.match(/---(.|\n)*?---\n((.|\n)*)/);
            items[field] = contentMatch ? contentMatch[2] : post.content;
          }
          if (field === 'date') {
            items[field] = new Date(post.created_at);
          }
          if (field === 'excerpt') {
            items[field] = post.excerpt || '';
          }
          if (field === 'coverImage') {
            items[field] = post.cover_image || '';
          }
          if (field === 'author') {
            items[field] = post.author || 'Eduardo';
          }
          if (field === 'tags') {
            items[field] = post.tags || [];
          }
        });
        
        return items;
      } catch (error) {
        console.error(`Erro ao processar post ${post.slug}:`, error);
        // Criar um objeto com valores padrão para evitar erros
        const fallbackItems: Record<string, any> = {
          slug: post.slug,
          title: post.title || 'Título não disponível',
          date: new Date(post.created_at),
          excerpt: post.excerpt || '',
          coverImage: post.cover_image || '/dots_ai_bg.png',
          author: post.author || 'Eduardo',
          tags: post.tags || []
        };
        
        // Filtrar apenas os campos solicitados
        return fields.reduce((obj, field) => {
          if (fallbackItems[field]) obj[field] = fallbackItems[field];
          return obj;
        }, {} as Record<string, any>);
      }
    });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
} 