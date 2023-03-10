import getConfig from 'next/config'
import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

const { publicRuntimeConfig } = getConfig()

const uri =
  publicRuntimeConfig.processEnv.DEPLOYMENT_ENV === 'production'
    ? 'https://poap-claim-api.aragon.org/graphql'
    : 'https://poap-claim-api-dev.aragon.org/graphql'

const httpLink = createHttpLink({
  uri,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(
    publicRuntimeConfig.processEnv.NEXT_PUBLIC_LOGIN_KEY ?? ''
  )
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})
