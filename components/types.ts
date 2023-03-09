import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BulkActionResult = {
  __typename?: 'BulkActionResult';
  resolved: Scalars['Int'];
  unresolved: Scalars['Int'];
};

export type DaoRegistryEvent = {
  __typename?: 'DaoRegistryEvent';
  creator: Scalars['String'];
  dao: Scalars['String'];
  subdomain: Scalars['String'];
};

export type DaoRegistryFilterInput = {
  creator?: InputMaybe<Scalars['String']>;
  dao?: InputMaybe<Scalars['String']>;
};

export type ExpirationWarning = {
  __typename?: 'ExpirationWarning';
  claimCodesCount: Scalars['Int'];
  expiringInLessThanDays: Scalars['Int'];
};

/** POAP Event to create */
export type ImportPoapEventInput = {
  /** External identifier */
  externalId: Scalars['Int'];
  /** Secret Code */
  secretCode: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignClaimCode: PoapClaimCode;
  backfillDAORegisteredEvents: BulkActionResult;
  deleteEvent: Scalars['Boolean'];
  findOrCreateUser: User;
  grantAdmin: Scalars['Boolean'];
  importPoapEvent: PoapEvent;
  login: Scalars['Boolean'];
  mintPoap: PoapClaimCode;
  reassignPendingClaimCodes: BulkActionResult;
};


export type MutationAssignClaimCodeArgs = {
  address: Scalars['String'];
  daoAddres: Scalars['String'];
};


export type MutationBackfillDaoRegisteredEventsArgs = {
  count?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteEventArgs = {
  externalId: Scalars['Int'];
};


export type MutationGrantAdminArgs = {
  address: Scalars['String'];
};


export type MutationImportPoapEventArgs = {
  data: ImportPoapEventInput;
};


export type MutationLoginArgs = {
  data: SiweSessionInput;
};


export type MutationReassignPendingClaimCodesArgs = {
  count: Scalars['Int'];
  creatorAddress?: InputMaybe<Scalars['String']>;
};

export type PendingDaoRegistrySync = {
  __typename?: 'PendingDAORegistrySync';
  creatorAddress: Scalars['String'];
  daoAddress: Scalars['String'];
  errorLocation: Scalars['String'];
};

/** PoapClaimCode */
export type PoapClaimCode = {
  __typename?: 'PoapClaimCode';
  /** DAO Address */
  daoAddress: Scalars['String'];
  event: PoapEvent;
  /** Unique identifier */
  id: Scalars['Int'];
  /** POAP QR Hash */
  qrHash: Scalars['String'];
  /** POAP Claim Code */
  status: Scalars['String'];
  /** Token ID */
  tokenId?: Maybe<Scalars['Int']>;
  user: User;
};

/** A POAP Event */
export type PoapEvent = {
  __typename?: 'PoapEvent';
  /** Creation date */
  createdAt: Scalars['DateTime'];
  /** Expiration date */
  expiresAt: Scalars['DateTime'];
  /** External identifier */
  externalId: Scalars['Int'];
  /** Unique identifier */
  id: Scalars['Int'];
  /** Image */
  image: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  DAORegisteredEvents: Array<DaoRegistryEvent>;
  activePoapEvents: Array<PoapEvent>;
  allPoapEvents: Array<PoapEvent>;
  assignedCodes: Array<PoapClaimCode>;
  canClaimPoap: Scalars['Boolean'];
  isMinted: Scalars['Boolean'];
  mintedClaimCode?: Maybe<PoapClaimCode>;
  nonce: Scalars['String'];
  poapEvent: PoapEvent;
  statistics: Statistics;
};


export type QueryDaoRegisteredEventsArgs = {
  data?: InputMaybe<DaoRegistryFilterInput>;
};


export type QueryCanClaimPoapArgs = {
  address: Scalars['String'];
};


export type QueryIsMintedArgs = {
  qrHash: Scalars['String'];
};


export type QueryPoapEventArgs = {
  externalId: Scalars['Int'];
};

export type SiweMessage = {
  /** Address */
  address: Scalars['String'];
  /** Chain ID */
  chainId: Scalars['Int'];
  /** Domain */
  domain: Scalars['String'];
  /** Issued At */
  issuedAt: Scalars['String'];
  /** Nonce */
  nonce: Scalars['String'];
  /** Statement */
  statement: Scalars['String'];
  /** URI */
  uri: Scalars['String'];
  /** Version */
  version: Scalars['String'];
};

export type SiweSessionInput = {
  /** Message to sign */
  message: SiweMessage;
  /** SIWE Signature */
  signature: Scalars['String'];
};

export type Statistics = {
  __typename?: 'Statistics';
  /** Number of poap codes assigned */
  assignedClaimCodesCount: Scalars['Float'];
  /** Number of poap codes available */
  availableClaimCodesCount: Scalars['Float'];
  /** Expiration Warning Details */
  expirationWarning: ExpirationWarning;
  /** Number of poap codes minted */
  mintedClaimCodesCount: Scalars['Float'];
  /** Pending DAO Registry Syncs */
  pendingSyncs: Array<PendingDaoRegistrySync>;
};

/** User */
export type User = {
  __typename?: 'User';
  /** Wallet Address */
  address: Scalars['String'];
  /** Unique identifier */
  id: Scalars['Int'];
};

export type CanClaimPoapQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type CanClaimPoapQuery = { __typename?: 'Query', canClaimPoap: boolean };

export type LoginMutationVariables = Exact<{
  domain: Scalars['String'];
  address: Scalars['String'];
  nonce: Scalars['String'];
  statement: Scalars['String'];
  uri: Scalars['String'];
  version: Scalars['String'];
  chainId: Scalars['Int'];
  issuedAt: Scalars['String'];
  signature: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type NonceQueryVariables = Exact<{ [key: string]: never; }>;


export type NonceQuery = { __typename?: 'Query', nonce: string };

export type MintedPoapFragment = { __typename?: 'PoapClaimCode', id: number, qrHash: string, daoAddress: string, tokenId?: number | null, event: { __typename?: 'PoapEvent', externalId: number } };

export type MintPoapMutationVariables = Exact<{ [key: string]: never; }>;


export type MintPoapMutation = { __typename?: 'Mutation', mintPoap: { __typename?: 'PoapClaimCode', id: number, qrHash: string, daoAddress: string, tokenId?: number | null, event: { __typename?: 'PoapEvent', externalId: number } } };

export const MintedPoapFragmentDoc = gql`
    fragment MintedPoap on PoapClaimCode {
  id
  qrHash
  daoAddress
  event {
    externalId
  }
  tokenId
}
    `;
export const CanClaimPoapDocument = gql`
    query CanClaimPoap($address: String!) {
  canClaimPoap(address: $address)
}
    `;

/**
 * __useCanClaimPoapQuery__
 *
 * To run a query within a React component, call `useCanClaimPoapQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanClaimPoapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanClaimPoapQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useCanClaimPoapQuery(baseOptions: Apollo.QueryHookOptions<CanClaimPoapQuery, CanClaimPoapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CanClaimPoapQuery, CanClaimPoapQueryVariables>(CanClaimPoapDocument, options);
      }
export function useCanClaimPoapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CanClaimPoapQuery, CanClaimPoapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CanClaimPoapQuery, CanClaimPoapQueryVariables>(CanClaimPoapDocument, options);
        }
export type CanClaimPoapQueryHookResult = ReturnType<typeof useCanClaimPoapQuery>;
export type CanClaimPoapLazyQueryHookResult = ReturnType<typeof useCanClaimPoapLazyQuery>;
export type CanClaimPoapQueryResult = Apollo.QueryResult<CanClaimPoapQuery, CanClaimPoapQueryVariables>;
export const LoginDocument = gql`
    mutation Login($domain: String!, $address: String!, $nonce: String!, $statement: String!, $uri: String!, $version: String!, $chainId: Int!, $issuedAt: String!, $signature: String!) {
  login(
    data: {message: {domain: $domain, address: $address, nonce: $nonce, statement: $statement, uri: $uri, version: $version, chainId: $chainId, issuedAt: $issuedAt}, signature: $signature}
  )
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      domain: // value for 'domain'
 *      address: // value for 'address'
 *      nonce: // value for 'nonce'
 *      statement: // value for 'statement'
 *      uri: // value for 'uri'
 *      version: // value for 'version'
 *      chainId: // value for 'chainId'
 *      issuedAt: // value for 'issuedAt'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const NonceDocument = gql`
    query Nonce {
  nonce
}
    `;

/**
 * __useNonceQuery__
 *
 * To run a query within a React component, call `useNonceQuery` and pass it any options that fit your needs.
 * When your component renders, `useNonceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNonceQuery({
 *   variables: {
 *   },
 * });
 */
export function useNonceQuery(baseOptions?: Apollo.QueryHookOptions<NonceQuery, NonceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NonceQuery, NonceQueryVariables>(NonceDocument, options);
      }
export function useNonceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NonceQuery, NonceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NonceQuery, NonceQueryVariables>(NonceDocument, options);
        }
export type NonceQueryHookResult = ReturnType<typeof useNonceQuery>;
export type NonceLazyQueryHookResult = ReturnType<typeof useNonceLazyQuery>;
export type NonceQueryResult = Apollo.QueryResult<NonceQuery, NonceQueryVariables>;
export const MintPoapDocument = gql`
    mutation MintPoap {
  mintPoap {
    ...MintedPoap
  }
}
    ${MintedPoapFragmentDoc}`;
export type MintPoapMutationFn = Apollo.MutationFunction<MintPoapMutation, MintPoapMutationVariables>;

/**
 * __useMintPoapMutation__
 *
 * To run a mutation, you first call `useMintPoapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMintPoapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mintPoapMutation, { data, loading, error }] = useMintPoapMutation({
 *   variables: {
 *   },
 * });
 */
export function useMintPoapMutation(baseOptions?: Apollo.MutationHookOptions<MintPoapMutation, MintPoapMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MintPoapMutation, MintPoapMutationVariables>(MintPoapDocument, options);
      }
export type MintPoapMutationHookResult = ReturnType<typeof useMintPoapMutation>;
export type MintPoapMutationResult = Apollo.MutationResult<MintPoapMutation>;
export type MintPoapMutationOptions = Apollo.BaseMutationOptions<MintPoapMutation, MintPoapMutationVariables>;