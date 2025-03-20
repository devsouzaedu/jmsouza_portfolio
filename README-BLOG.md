# Sistema de Blog

Este é um sistema de blog completo integrado ao Supabase, com área administrativa protegida por senha e visualização pública.

## Recursos

- 📝 Criação, edição e exclusão de posts
- 🏷️ Suporte a tags para categorização de conteúdo
- 📄 Conteúdo em Markdown com formatação rica
- 🔒 Área administrativa protegida por senha
- 🌍 Área pública para leitura dos posts
- 🖼️ Suporte a imagens de capa para posts
- 📱 Interface responsiva e moderna

## Estrutura do Sistema

- **Área Pública**: `/blog` - Visualização de todos os posts publicados
- **Detalhes do Post**: `/blog/[slug]` - Página de um post específico
- **Filtro por Tag**: `/blog/tag/[tag]` - Filtra posts por tag
- **Administração**: `/adminblog` - Lista todos os posts (publicados e rascunhos)
- **Novo Post**: `/adminblog/novo` - Cria um novo post
- **Edição de Post**: `/adminblog/editar/[id]` - Edita um post existente

## Configuração do Banco de Dados

1. Acesse o [Console do Supabase](https://app.supabase.io)
2. Selecione seu projeto
3. Vá para o Editor SQL
4. Cole e execute o script SQL localizado em `src/scripts/create_blog_table.sql`

Este script irá:
- Criar a tabela `blog_posts` com todos os campos necessários
- Configurar índices para melhor desempenho
- Configurar políticas de segurança:
  - Usuários anônimos só podem ver posts publicados
  - O backend com a chave de serviço tem acesso completo

## Autenticação Administrativa

A área administrativa em `/adminblog` está protegida por autenticação básica HTTP:
- Senha: `Sucesso2030A@`
- A senha pode ser alterada no arquivo `src/middleware.ts`

## Uso

### Criação de Posts

1. Acesse `/adminblog` (insira a senha quando solicitado)
2. Clique em "Novo Post"
3. Preencha os campos:
   - **Título**: Título do post
   - **URL da Imagem de Capa**: URL para a imagem de destaque (opcional)
   - **Tags**: Tags separadas por vírgula (ex: "desenvolvimento, web, javascript")
   - **Conteúdo**: Conteúdo em Markdown
   - **Publicar imediatamente**: Marque para publicar, desmarque para salvar como rascunho
4. Use a aba "Pré-visualizar" para ver como o post ficará
5. Clique em "Salvar Post"

### Edição de Posts

1. Na lista de posts em `/adminblog`, clique no título do post ou no botão "Editar"
2. Faça as alterações necessárias
3. Clique em "Salvar Alterações"

### Publicação/Despublicação

- Na lista de posts, clique em "Publicar" para publicar um rascunho
- Clique em "Despublicar" para transformar um post publicado em rascunho

### Exclusão de Posts

- Na lista de posts, clique em "Excluir" para remover permanentemente um post
- Uma confirmação será solicitada antes da exclusão

## Formato Markdown

O sistema suporta Markdown completo, incluindo:
- Cabeçalhos (`#`, `##`, `###`)
- Listas (`*`, `-`, `1.`)
- **Negrito** e *Itálico*
- Links `[texto](url)`
- Imagens `![alt](url)`
- Blocos de código com syntax highlighting (`` ```javascript ```)
- Citações (`>`)
- Tabelas
- E mais...

## Integração com o Supabase

O sistema utiliza:
- `supabaseBlog`: Cliente para acesso público (somente leitura de posts publicados)
- `supabaseBlogAdmin`: Cliente com chave de serviço para operações administrativas

Estas configurações estão em `src/lib/supabase-blog.ts`. 