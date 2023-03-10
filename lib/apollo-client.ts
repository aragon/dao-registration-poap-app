import getConfig from 'next/config'
import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

const { publicRuntimeConfig } = getConfig()

const httpLink = createHttpLink({
  uri: publicRuntimeConfig.processEnv.NEXT_PUBLIC_GRAPHQL_BASE_URL,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(publicRuntimeConfig.loginKey ?? '')
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
