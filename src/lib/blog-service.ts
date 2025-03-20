import { supabaseBlog, supabaseBlogAdmin, type BlogPost } from './supabase-blog';

// Função para buscar todos os posts publicados (para a página pública)
export async function getPublishedPosts() {
  const { data, error } = await supabaseBlog
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar posts publicados:', error);
    return [];
  }

  return data as BlogPost[];
}

// Função para buscar um post específico por slug (para a página pública)
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabaseBlog
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error(`Erro ao buscar post com slug ${slug}:`, error);
    return null;
  }

  return data as BlogPost;
}

// Função para buscar posts por tag (para a página pública)
export async function getPostsByTag(tag: string) {
  const { data, error } = await supabaseBlog
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .filter('tags', 'cs', `{${tag}}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Erro ao buscar posts com tag ${tag}:`, error);
    return [];
  }

  return data as BlogPost[];
}

// FUNÇÕES ADMINISTRATIVAS (protegidas por autenticação)

// Função para buscar todos os posts (incluindo não publicados)
export async function getAllPosts() {
  const { data, error } = await supabaseBlogAdmin
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar todos os posts:', error);
    return [];
  }

  return data as BlogPost[];
}

// Função para criar um novo post
export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabaseBlogAdmin
    .from('blog_posts')
    .insert([
      {
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar post:', error);
    return null;
  }

  return data as BlogPost;
}

// Função para atualizar um post existente
export async function updatePost(id: string, post: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>) {
  const { data, error } = await supabaseBlogAdmin
    .from('blog_posts')
    .update({
      ...post,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erro ao atualizar post ${id}:`, error);
    return null;
  }

  return data as BlogPost;
}

// Função para excluir um post
export async function deletePost(id: string) {
  const { error } = await supabaseBlogAdmin
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Erro ao excluir post ${id}:`, error);
    return false;
  }

  return true;
}

// Função para transformar texto em slug
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
} 