const apiOrigin = (process.env.API_ORIGIN || 'http://localhost:5000').replace(/\/$/, '')

const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiOrigin}/api/:path*` }]
  },
}

export default nextConfig