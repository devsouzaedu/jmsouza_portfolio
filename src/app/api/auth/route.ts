import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Duração do cookie de autenticação (1 dia)
const TOKEN_EXPIRY = 60 * 60 * 24;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { password } = data;
    
    // Senha definida como variável de ambiente ou valor padrão
    const adminPassword = process.env.BLOG_ADMIN_PASSWORD || 'Sucesso2030A@';
    
    if (password === adminPassword) {
      // Criar um cookie para autenticação
      // @ts-ignore - Ignorar erro de tipagem, pois o método set existe
      cookies().set('blog_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: TOKEN_EXPIRY,
        path: '/',
        sameSite: 'strict',
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json(
      { success: false, message: 'Senha incorreta' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erro durante autenticação:', error);
    return NextResponse.json(
      { success: false, message: 'Erro no servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Verificar se o usuário está autenticado
    // @ts-ignore - Ignorar erro de tipagem, pois o método get existe
    const authCookie = cookies().get('blog_auth');
    
    if (authCookie && authCookie.value === 'authenticated') {
      return NextResponse.json({ authenticated: true });
    }
    
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 