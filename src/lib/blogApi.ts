import { blogSupabase } from '@/lib/blogSupabase';
import { BlogPost } from './blogUtils';
import { markdownToHtml, extractExcerpt, generateSlug } from './blogUtils';

/**
 * Busca todos os posts do blog
 * @param onlyPublished Se true, retorna apenas posts publicados
 */
export async function getAllPosts(onlyPublished: boolean = true): Promise<BlogPost[]> {
  try {
    let query = blogSupabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (onlyPublished) {
      query = query.eq('published', true);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}

/**
 * Busca um post pelo slug
 * @param slug O slug do post
 * @param onlyPublished Se true, retorna apenas posts publicados
 */
export async function getPostBySlug(slug: string, onlyPublished: boolean = true): Promise<BlogPost | null> {
  try {
    let query = blogSupabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (onlyPublished) {
      query = query.eq('published', true);
    }
    
    const { data, error } = await query;
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Post não encontrado (código do Supabase para "nenhum resultado encontrado")
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Erro ao buscar post ${slug}:`, error);
    return null;
  }
}

/**
 * Verifica se um slug já existe
 * @param slug O slug a verificar
 */
export async function slugExists(slug: string): Promise<boolean> {
  try {
    const { count, error } = await blogSupabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('slug', slug);
    
    if (error) throw error;
    
    return count ? count > 0 : false;
  } catch (error) {
    console.error(`Erro ao verificar slug ${slug}:`, error);
    return false;
  }
}

/**
 * Salva ou atualiza um post
 * @param post Dados do post
 * @param isNew Se true, cria um novo post; se false, atualiza um existente
 */
export async function savePost(post: Partial<BlogPost>, isNew: boolean = true): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // Se não tem slug, gera um a partir do título
    if (!post.slug && post.title) {
      post.slug = generateSlug(post.title);
    }
    
    // Verificar unicidade do slug
    if (isNew && post.slug) {
      const exists = await slugExists(post.slug);
      if (exists) {
        return { 
          success: false, 
          error: 'Já existe um post com este slug' 
        };
      }
    }
    
    // Gerar excerpt automaticamente se não fornecido
    if (post.content && !post.excerpt) {
      post.excerpt = extractExcerpt(post.content);
    }
    
    // Para criação ou atualização
    let operation;
    
    if (isNew) {
      // Criação
      operation = blogSupabase
        .from('posts')
        .insert([post])
        .select();
    } else {
      // Atualização - requer um slug
      if (!post.slug) {
        return { 
          success: false, 
          error: 'Slug é obrigatório para atualização' 
        };
      }
      
      operation = blogSupabase
        .from('posts')
        .update(post)
        .eq('slug', post.slug)
        .select();
    }
    
    const { data, error } = await operation;
    
    if (error) {
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao salvar post:', error);
    return { success: false, error };
  }
}

/**
 * Exclui um post pelo slug
 * @param slug O slug do post a ser excluído
 */
export async function deletePost(slug: string): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await blogSupabase
      .from('posts')
      .delete()
      .eq('slug', slug);
    
    if (error) {
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Erro ao excluir post ${slug}:`, error);
    return { success: false, error };
  }
}

/**
 * Busca posts por tag
 * @param tag A tag a ser buscada
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await blogSupabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .contains('tags', [tag])
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error(`Erro ao buscar posts com tag ${tag}:`, error);
    return [];
  }
}

/**
 * Busca as tags mais populares
 * @param limit Número máximo de tags a retornar
 */
export async function getPopularTags(limit: number = 10): Promise<string[]> {
  try {
    const { data, error } = await blogSupabase
      .from('posts')
      .select('tags')
      .eq('published', true);
    
    if (error) throw error;
    
    if (!data || data.length === 0) return [];
    
    // Extrair todas as tags de todos os posts
    const allTags = data
      .flatMap(post => post.tags || [])
      .filter(tag => tag.trim().length > 0);
    
    // Contar a frequência de cada tag
    const tagCounts: Record<string, number> = {};
    
    allTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    // Ordenar as tags pela frequência e limitar ao número especificado
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1]) // Ordenar por contagem decrescente
      .slice(0, limit) // Limitar ao número especificado
      .map(entry => entry[0]); // Extrair apenas os nomes das tags
  } catch (error) {
    console.error('Erro ao buscar tags populares:', error);
    return [];
  }
} 