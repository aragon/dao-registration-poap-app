/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  publicRuntimeConfig: {
    api: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    alchemy: {
      id: process.env.NEXT_PUBLIC_ALCHEMY_ID,
      appName: process.env.NEXT_PUBLIC_ALCHEMY_APP_NAME,
    },
    loginKey: process.env.NEXT_PUBLIC_LOGIN_KEY,
    networkId: process.env.NEXT_PUBLIC_NETWORK_ID,
    testVar: process.env.TEST_VAR,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
