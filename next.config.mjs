/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
  },

  // Experimental features
  experimental: {
    // optimizeCss: true, // Requires critters package, disabled for now
    optimizePackageImports: ['lucide-react'],
  },

  // Compression
  compress: true,

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://*.dify.ai https://*.coze.com; frame-src https://*.dify.ai https://*.coze.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests;",
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
      {
        // Security headers for RSS feed
        source: '/rss',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/rss+xml; charset=utf-8',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [];
  },

  // Webpack configuration for bundle analysis
  webpack: (config, { dev, isServer, webpack }) => {
    // Enable bundle analysis in production when ANALYZE is set
    if (process.env.ANALYZE && !dev && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze.html',
          openAnalyzer: false,
        })
      );
    }

    // Code splitting optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
            // Split lucide-react icons
            'lucide-react': {
              test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
              name: 'lucide-react',
              priority: 10,
            },
            // Split Radix UI
            radix: {
              test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
              name: 'radix-ui',
              priority: 9,
            },
          },
        },
      };
    }

    return config;
  },

  // Production source maps (disabled for performance)
  productionBrowserSourceMaps: false,

  // Power optimizations
  poweredByHeader: false,

  // SWC minification
  swcMinify: true,

  // Output mode - remove standalone for standard deployment
  // output: 'standalone',
};

export default nextConfig;
