import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Se o caminho não começar com /adminblog, não faz nada
  if (!request.nextUrl.pathname.startsWith('/adminblog')) {
    return NextResponse.next();
  }

  // Verificar a autenticação básica
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const authValue = authHeader.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Verificar se a senha está correta
    if (pwd === 'Sucesso2030A@') {
      return NextResponse.next();
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