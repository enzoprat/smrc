/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/accueil", destination: "/", permanent: true },
      { source: "/devis", destination: "/contact", permanent: true },
      { source: "/services", destination: "/club", permanent: true },
      { source: "/qui-sommes-nous", destination: "/club", permanent: true },
      { source: "/news", destination: "/actualites", permanent: true },
      { source: "/partners", destination: "/partenaires", permanent: true },
    ];
  },
};

export default nextConfig;
