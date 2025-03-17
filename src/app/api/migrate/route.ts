import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Obter todos os posts
    const { data: posts, error: fetchError } = await supabase
      .from('posts')
      .select('*');
    
    if (fetchError) throw fetchError;
    
    if (!posts || posts.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Nenhum post para migrar' 
      });
    }
    
    const results = [];
    
    // Migrar cada post
    for (const post of posts) {
      try {
        // Reformatar o conteúdo
        const formattedContent = `---
title: '${post.title}'
date: '${post.created_at.split('T')[0]}'
excerpt: '${post.excerpt || ""}'
coverImage: '${post.cover_image || "/dots_ai_bg.png"}'
author: '${post.author || "Eduardo"}'
tags: ${JSON.stringify(post.tags || [])}
---

${post.content.split('---')[2]?.trim() || post.content}`;
        
        // Atualizar o post
        const { data: updatedPost, error: updateError } = await supabase
          .from('posts')
          .update({ content: formattedContent })
          .eq('id', post.id)
          .select();
        
        if (updateError) throw updateError;
        
        results.push({
          slug: post.slug,
          status: 'success'
        });
      } catch (error) {
        results.push({
          slug: post.slug,
          status: 'error',
          message: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      count: results.length,
      results 
    });
  } catch (error) {
    console.error('Erro ao migrar posts:', error);
    return NextResponse.json(
      { error: 'Erro ao migrar posts' },
      { status: 500 }
    );
  }
} 