-- Extensão de UUID para identificadores únicos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela principal para os posts do blog
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT, -- Resumo do post
  cover_image TEXT, -- URL da imagem de capa
  author TEXT NOT NULL DEFAULT 'Admin',
  published BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}', -- Array de tags
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Adicionar capacidade de pesquisa full-text
CREATE INDEX IF NOT EXISTS posts_title_content_idx ON posts USING GIN (to_tsvector('portuguese', title || ' ' || content));

-- Adicionar índice para buscas por slug (que serão frequentes)
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts (slug);

-- Habilitar RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
-- Permitir leitura pública apenas para posts publicados
CREATE POLICY "Public can view published posts" 
  ON posts FOR SELECT 
  USING (published = true);

-- Permitir todas as operações via service role
CREATE POLICY "Service role has full access" 
  ON posts FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Função para validar slugs únicos
CREATE OR REPLACE FUNCTION check_unique_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM posts 
    WHERE slug = NEW.slug AND id != NEW.id
  ) THEN
    RAISE EXCEPTION 'Slug deve ser único: %', NEW.slug;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql; 