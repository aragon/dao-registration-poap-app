import { gql, useQuery } from '@apollo/client'

const NONCE = gql(/* GraphQL */ `
  query Nonce {
    nonce
  }
`)

const LandingPage = () => {
  const { data, loading, error } = useQuery(NONCE)

  return (
    <div>
      <h1>Landing Page: {data?.nonce}</h1>
    </div>
  )
}

export default LandingPage
