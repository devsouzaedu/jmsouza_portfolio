import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Obter o caminho para revalidar da query (por segurança, usamos um token)
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/blog';
    const token = searchParams.get('token');
    
    // Verificar se o token é válido (use uma variável de ambiente em produção)
    const validToken = process.env.REVALIDATE_TOKEN || 'test_token';
    
    if (token !== validToken) {
      return NextResponse.json(
        { message: 'Token inválido', revalidated: false },
        { status: 401 }
      );
    }
    
    // Revalidar o caminho
    revalidatePath(path);
    
    return NextResponse.json(
      { 
        message: `Cache revalidado para ${path}`, 
        revalidated: true,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao revalidar cache:', error);
    return NextResponse.json(
      { message: 'Erro ao revalidar cache', error: String(error), revalidated: false },
      { status: 500 }
    );
  }
} 