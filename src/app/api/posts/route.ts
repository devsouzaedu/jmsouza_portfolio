import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Verificar se a senha está correta
    if (data.password !== 'Sucesso2030A@') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    const { content, slug } = data;
    
    // Criar o diretório se não existir
    const postsDirectory = path.join(process.cwd(), 'src/content/blog');
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
    
    // Salvar o arquivo
    const filePath = path.join(postsDirectory, `${slug}.md`);
    fs.writeFileSync(filePath, content);
    
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Erro ao salvar post:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar o post' },
      { status: 500 }
    );
  }
} 