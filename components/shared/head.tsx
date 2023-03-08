import Head from 'next/head'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
console.log('🚀 ~ file: head.tsx:5 ~ publicRuntimeConfig:', publicRuntimeConfig)
console.log(
  '🚀 ~ file: head.tsx:6 ~ publicRuntimeConfig.api',
  publicRuntimeConfig.api
)

console.log(
  '🚀 ~ file: head.tsx:12 ~ publicRuntimeConfig.testVar:',
  publicRuntimeConfig.testVar
)

console.log(
  '🚀 ~ file: head.tsx:7 ~ process.env.NODE_ENV:',
  process.env.NODE_ENV
)

console.log(
  '🚀 ~ file: head.tsx:8 ~ process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL',
  process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL
)

console.log(
  '🚀 ~ file: head.tsx:9 ~ publicRuntimeConfig.myEnvVar',
  publicRuntimeConfig.myEnvVar
)

const TITLE = 'Aragon | Build Better, Together'
const DESCRIPTION = 'Claim your POAP for launching a DAO on Aragon'

const origin = 'https://poap-claim-app.aragon.org'

export const AppHead = ({
  description,
  pathname = '',
  titlePrefix = '',
}: {
  description?: string
  pathname?: string
  titlePrefix?: string
}) => {
  const pageTitle = `${
    titlePrefix?.length ? `${titlePrefix} - ` : ''
  }${TITLE}`.trim()
  const pageDescription = description?.trim() || DESCRIPTION

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
      />
      <meta property="og:site_name" content={TITLE.trim()} key="og:site_name" />
      {pageTitle ? (
        <>
          <title key="title">{pageTitle}</title>
          <meta name="twitter:title" content={pageTitle} key="twitter:title" />
          <meta property="og:title" content={pageTitle} key="og:title" />
        </>
      ) : null}
      <meta name="description" content={pageDescription} key="description" />
      <meta
        name="twitter:description"
        content={pageDescription}
        key="twitter:description"
      />
      <meta
        property="og:description"
        content={pageDescription}
        key="og:description"
      />
      <meta property="og:url" content={`${origin}${pathname}`} key="og:url" />
      <link rel="icon" href="/favicon.ico" sizes="any" key="icon:ico" />
      <link
        rel="icon"
        href="/favicon.svg"
        type="image/svg+xml"
        key="icon:svg"
      />
      <link
        rel="icon"
        href="/favicon-16x16.png"
        sizes="16x16"
        type="image/png"
        key="favicon:16"
      />
      <link
        rel="icon"
        href="/favicon-32x32.png"
        sizes="32x32"
        type="image/png"
        key="favicon:32"
      />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        sizes="152x152"
        key="apple:152"
      />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        sizes="167x167"
        key="apple:167"
      />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        sizes="180x180"
        key="apple:180"
      />
      <meta
        name="twitter:image"
        content="/images/og-image.png"
        key="twitter:image"
      />
      <meta property="og:image" content="/images/og-image.png" key="og:image" />
      <meta property="og:image:type" content="image/png" key="og:image:type" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:image:alt" content={DESCRIPTION} key="og:image:alt" />
      <meta name="twitter:site" content="@aragonproject" key="twitter:site" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="noindex, nosnippet, noimageindex" />
    </Head>
  )
}
