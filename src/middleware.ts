import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obter a resposta original
  const response = NextResponse.next();

  // Adicionar cabeçalhos para desativar cache apenas para rotas específicas
  if (request.nextUrl.pathname.startsWith('/blog') || 
      request.nextUrl.pathname.startsWith('/api/')) {
    
    // Adicionar cabeçalhos para evitar cache
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    // Adicionar um timestamp para evitar cache
    const url = request.nextUrl.clone();
    const timestamp = Date.now();
    
    // Adicionar ou atualizar o parâmetro de timestamp apenas para GETs
    if (request.method === 'GET' && 
        !request.nextUrl.searchParams.has('_t')) {
      url.searchParams.set('_t', timestamp.toString());
      return NextResponse.rewrite(url);
    }
  }

  return response;
}

// Configurar quais rotas o middleware deve processar
export const config = {
  matcher: [
    '/blog/:path*',
    '/api/:path*',
  ],
}; 