/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mapbox-gl', 'react-map-gl'],
  // The archived v1 site is a static export in public/v1; map its
  // directory URLs to their index.html files.
  async rewrites() {
    return [
      { source: '/v1', destination: '/v1/index.html' },
      { source: '/v1/:page(projects|architecture)', destination: '/v1/:page/index.html' },
      { source: '/v1/:page(projects|architecture)/', destination: '/v1/:page/index.html' },
    ];
  },
};

export default nextConfig;
