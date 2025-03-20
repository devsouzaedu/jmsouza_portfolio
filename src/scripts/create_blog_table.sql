-- Esquema para a tabela de posts do blog

-- Ativar a extensão pgcrypto para uso com uuids
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criar a tabela blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar índices para melhorar o desempenho
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);

-- Criar política RLS (Row Level Security) para controle de acesso
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura anônima apenas de posts publicados
CREATE POLICY blog_posts_anon_select ON blog_posts
  FOR SELECT
  TO anon
  USING (published = TRUE);

-- Política para permitir operações completas para usuários autenticados
CREATE POLICY blog_posts_service_all ON blog_posts
  FOR ALL
  TO service_role
  USING (TRUE);

-- Dicas de uso:
-- 1. Copie este script SQL
-- 2. Acesse o painel do Supabase (https://app.supabase.io)
-- 3. Vá para o editor SQL
-- 4. Cole e execute este script 