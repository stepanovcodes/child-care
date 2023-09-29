/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    env: {
      NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
      NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
      NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    },
  };

// module.exports = nextConfig
