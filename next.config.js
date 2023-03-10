/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ALCHEMY_APP_NAME: process.env.NEXT_PUBLIC_ALCHEMY_APP_NAME,
    NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
    NEXT_PUBLIC_GRAPHQL_BASE_URL: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    NEXT_PUBLIC_LOGIN_KEY: process.env.NEXT_PUBLIC_LOGIN_KEY,
    NEXT_PUBLIC_NETWORK_ID: process.env.NEXT_PUBLIC_NETWORK_ID,
    DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,
  },
  publicRuntimeConfig: {
    processEnv: {
      NEXT_PUBLIC_ALCHEMY_APP_NAME: process.env.NEXT_PUBLIC_ALCHEMY_APP_NAME,
      NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
      NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
      NEXT_PUBLIC_GRAPHQL_BASE_URL: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
      NEXT_PUBLIC_LOGIN_KEY: process.env.NEXT_PUBLIC_LOGIN_KEY,
      NEXT_PUBLIC_NETWORK_ID: process.env.NEXT_PUBLIC_NETWORK_ID,
      DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,
    },
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
