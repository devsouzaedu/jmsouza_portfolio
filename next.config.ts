import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração básica
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Otimização de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Webpack otimizations
  webpack: (config: any) => {
    // Otimização para SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
  
  // Typescript config
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint config
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig; 