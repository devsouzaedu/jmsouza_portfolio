import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Função compatível com Node.js para decodificar Base64
function decodeBase64(str: string): string {
  // No ambiente do navegador
  if (typeof window !== 'undefined' && window.atob) {
    return window.atob(str);
  }
  
  // No ambiente Node.js
  return Buffer.from(str, 'base64').toString();
}

// Senha armazenada como variável de ambiente
const adminPassword = process.env.BLOG_ADMIN_PASSWORD || 'Sucesso2030A@';

export function middleware(request: NextRequest) {
  // Se o caminho não começar com /adminblog, não faz nada
  if (!request.nextUrl.pathname.startsWith('/adminblog')) {
    return NextResponse.next();
  }

  // Verificar a autenticação básica
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    try {
      const authValue = authHeader.split(' ')[1];
      const decodedAuth = decodeBase64(authValue);
      const [user, pwd] = decodedAuth.split(':');

      // Verificar se a senha está correta
      if (pwd === adminPassword) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error('Erro ao processar autenticação:', error);
    }
  }

  // Retornar um desafio de autenticação se não autenticado
  return new NextResponse('Autenticação necessária', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Administração do Blog"',
    },
  });
}

export const config = {
  matcher: '/adminblog/:path*',
}; 