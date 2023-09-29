/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export'
}

module.exports = {
  // nextConfig,
    env: {
      NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
      NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    },
  };

// module.exports = nextConfig
