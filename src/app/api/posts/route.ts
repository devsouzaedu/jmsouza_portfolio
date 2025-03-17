import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    console.log('Iniciando criação de post');
    const data = await request.json();
    
    // Verificar se a senha está correta
    if (data.password !== 'Sucesso2030A@') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    const { title, content, slug, date } = data;
    console.log(`Processando post: ${title} (${slug})`);
    
    // Extrair tags do conteúdo markdown de forma mais robusta
    let tags = [];
    try {
      // Tentar extrair tags do frontmatter
      const tagMatch = content.match(/tags:\s*(\[.*?\])/);
      if (tagMatch && tagMatch[1]) {
        const tagStr = tagMatch[1].replace(/'/g, '"'); // Substituir aspas simples por duplas para JSON válido
        tags = JSON.parse(tagStr);
      }
    } catch (e) {
      console.error('Erro ao parsear tags, usando array vazio:', e);
      tags = [];
    }
    
    // Extrair excerpt com tratamento de erro
    let excerpt = '';
    try {
      const excerptMatch = content.match(/excerpt:\s*['"](.+?)['"]/);
      if (excerptMatch && excerptMatch[1]) {
        excerpt = excerptMatch[1];
      }
    } catch (e) {
      console.error('Erro ao extrair excerpt:', e);
    }
    
    // Extrair coverImage com tratamento de erro
    let coverImage = '/dots_ai_bg.png'; // Valor padrão
    try {
      const coverImageMatch = content.match(/coverImage:\s*['"](.+?)['"]/);
      if (coverImageMatch && coverImageMatch[1]) {
        coverImage = coverImageMatch[1];
      }
    } catch (e) {
      console.error('Erro ao extrair coverImage:', e);
    }
    
    // Separar apenas o conteúdo do post, removendo o frontmatter
    let postContent = content;
    const contentParts = content.split(/---\s*\n/);
    if (contentParts.length >= 3) {
      // Se tem frontmatter, pegue o conteúdo após o segundo '---'
      postContent = contentParts.slice(2).join('---\n').trim();
    }
    
    // Formatar o conteúdo com quebras de linha para o frontmatter
    const formattedContent = `---
title: '${title.replace(/'/g, "\\'")}'
date: '${date}'
excerpt: '${excerpt.replace(/'/g, "\\'")}'
coverImage: '${coverImage}'
author: 'Eduardo'
tags: ${JSON.stringify(tags)}
---

${postContent}`;
    
    // Verificar se o slug já existe
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    
    if (checkError) {
      console.error('Erro ao verificar slug existente:', checkError);
      throw new Error(`Erro ao verificar slug: ${checkError.message}`);
    }
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'Já existe um post com este slug' },
        { status: 409 }
      );
    }
    
    console.log('Salvando post no Supabase...');
    
    // Salvar no Supabase com mais logs
    const { data: postData, error } = await supabase
      .from('posts')
      .insert([
        { 
          slug,
          title, 
          content: formattedContent,
          excerpt,
          cover_image: coverImage,
          author: 'Eduardo',
          tags,
          created_at: date ? new Date(date) : new Date(),
          archived: false // Garantir que não esteja arquivado
        }
      ])
      .select();
    
    if (error) {
      console.error('Erro do Supabase ao salvar post:', error);
      throw new Error(`Erro do Supabase: ${error.message}`);
    }
    
    console.log('Post salvo com sucesso, revalidando páginas...');
    
    // Revalidar as páginas
    revalidatePath('/blog');
    revalidatePath('/dashboard_blog');
    
    return NextResponse.json({ 
      success: true, 
      slug,
      message: 'Post criado com sucesso'
    });
  } catch (error) {
    console.error('Erro detalhado ao salvar post:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao salvar o post',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 