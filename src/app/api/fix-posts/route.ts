import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  // Verificar senha no parâmetro da URL
  const url = new URL(request.url);
  const password = url.searchParams.get('password');
  
  if (password !== 'Sucesso2030A@') {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    );
  }
  
  try {
    console.log('Iniciando processo de correção dos posts...');
    
    // Buscar todos os posts
    const { data: posts, error } = await supabase
      .from('posts')
      .select('id, slug, content')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Erro ao buscar posts: ${error.message}`);
    }
    
    console.log(`Encontrados ${posts.length} posts para corrigir...`);
    
    const resultados = [];
    
    // Processar cada post
    for (const post of posts) {
      try {
        const content = post.content;
        
        // Verificar se o conteúdo contém frontmatter
        const contentParts = content.split(/---\s*\n/);
        
        if (contentParts.length < 3) {
          resultados.push({
            slug: post.slug,
            status: 'ignorado',
            motivo: 'Formato não reconhecido'
          });
          continue;
        }
        
        // Extrair frontmatter e conteúdo real
        const frontmatter = contentParts[1];
        const postContent = contentParts.slice(2).join('---\n').trim();
        
        // Preservar metadados do frontmatter
        const extractValue = (regex: RegExp, defaultValue = '') => {
          const match = frontmatter.match(regex);
          return match && match[1] ? match[1].replace(/^['"]|['"]$/g, '') : defaultValue;
        };
        
        const title = extractValue(/title:\s*['"](.+?)['"]/);
        const date = extractValue(/date:\s*['"](.+?)['"]/);
        const excerpt = extractValue(/excerpt:\s*['"](.+?)['"]/);
        const coverImage = extractValue(/coverImage:\s*['"](.+?)['"]/, '/dots_ai_bg.png');
        const author = extractValue(/author:\s*['"](.+?)['"]/, 'Eduardo');
        
        // Extrair tags
        let tags = [];
        try {
          const tagMatch = frontmatter.match(/tags:\s*(\[.*?\])/);
          if (tagMatch && tagMatch[1]) {
            const tagStr = tagMatch[1].replace(/'/g, '"');
            tags = JSON.parse(tagStr);
          }
        } catch (e) {
          console.error(`Erro ao extrair tags do post ${post.slug}:`, e);
        }
        
        // Reconstruir o frontmatter corretamente
        const newFormattedContent = `---
title: '${title.replace(/'/g, "\\'")}'
date: '${date}'
excerpt: '${excerpt.replace(/'/g, "\\'")}'
coverImage: '${coverImage}'
author: '${author}'
tags: ${JSON.stringify(tags)}
---

${postContent}`;
        
        // Atualizar o post no Supabase
        const { error: updateError } = await supabase
          .from('posts')
          .update({ content: newFormattedContent })
          .eq('id', post.id);
        
        if (updateError) {
          resultados.push({
            slug: post.slug,
            status: 'erro',
            motivo: updateError.message
          });
        } else {
          resultados.push({
            slug: post.slug,
            status: 'corrigido'
          });
        }
      } catch (e) {
        resultados.push({
          slug: post.slug,
          status: 'erro',
          motivo: e instanceof Error ? e.message : 'Erro desconhecido'
        });
      }
    }
    
    // Revalidar as páginas para refletir as mudanças
    revalidatePath('/blog');
    
    return NextResponse.json({
      success: true,
      total: posts.length,
      resultados
    });
  } catch (error) {
    console.error('Erro ao corrigir posts:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao corrigir posts',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 