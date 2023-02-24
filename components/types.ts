export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export type ExpirationWarning = {
  __typename?: 'ExpirationWarning'
  claimCodesCount: Scalars['Int']
  expiringInLessThanDays: Scalars['Int']
}

/** POAP Event to create */
export type ImportPoapEventInput = {
  /** External identifier */
  externalId: Scalars['Int']
  /** Secret Code */
  secretCode: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  findOrCreateUser: User
  importPoapEvent: PoapEvent
  login: Scalars['Boolean']
  mintPoap: PoapClaimCode
  reassignPendingClaimCodes: ReassignPendingSyncResult
}

export type MutationImportPoapEventArgs = {
  data: ImportPoapEventInput
}

export type MutationLoginArgs = {
  data: SiweSessionInput
}

export type MutationReassignPendingClaimCodesArgs = {
  count: Scalars['Int']
}

export type PendingDaoRegistrySync = {
  __typename?: 'PendingDAORegistrySync'
  creatorAddress: Scalars['String']
  daoAddress: Scalars['String']
  errorLocation: Scalars['String']
}

/** PoapClaimCode */
export type PoapClaimCode = {
  __typename?: 'PoapClaimCode'
  /** DAO Address */
  daoAddress: Scalars['String']
  event: PoapEvent
  /** Unique identifier */
  id: Scalars['Int']
  /** POAP QR Hash */
  qrHash: Scalars['String']
  /** POAP Claim Code */
  status: Scalars['String']
}

/** A POAP Event */
export type PoapEvent = {
  __typename?: 'PoapEvent'
  /** Creation date */
  createdAt: Scalars['DateTime']
  /** Expiration date */
  expiresAt: Scalars['DateTime']
  /** External identifier */
  externalId: Scalars['Int']
  /** Unique identifier */
  id: Scalars['Int']
  /** Image */
  image: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  activePoapEvents: Array<PoapEvent>
  allPoapEvents: Array<PoapEvent>
  canClaimPoap: Scalars['Boolean']
  isMinted: Scalars['Boolean']
  mintedClaimCode?: Maybe<PoapClaimCode>
  nonce: Scalars['String']
  poapEvent: PoapEvent
  statistics: Statistics
}

export type QueryIsMintedArgs = {
  qrHash: Scalars['String']
}

export type QueryPoapEventArgs = {
  externalId: Scalars['Int']
}

export type ReassignPendingSyncResult = {
  __typename?: 'ReassignPendingSyncResult'
  resolved: Scalars['Int']
  unresolved: Scalars['Int']
}

export type SiweMessage = {
  /** Address */
  address: Scalars['String']
  /** Chain ID */
  chainId: Scalars['Int']
  /** Domain */
  domain: Scalars['String']
  /** Issued At */
  issuedAt: Scalars['String']
  /** Nonce */
  nonce: Scalars['String']
  /** Statement */
  statement: Scalars['String']
  /** URI */
  uri: Scalars['String']
  /** Version */
  version: Scalars['String']
}

export type SiweSessionInput = {
  /** Message to sign */
  message: SiweMessage
  /** SIWE Signature */
  signature: Scalars['String']
}

export type Statistics = {
  __typename?: 'Statistics'
  /** Number of poap codes assigned */
  assignedClaimCodesCount: Scalars['Float']
  /** Number of poap codes available */
  availableClaimCodesCount: Scalars['Float']
  /** Expiration Warning Details */
  expirationWarning: ExpirationWarning
  /** Number of poap codes minted */
  mintedClaimCodesCount: Scalars['Float']
  /** Pending DAO Registry Syncs */
  pendingSyncs: Array<PendingDaoRegistrySync>
}

/** User */
export type User = {
  __typename?: 'User'
  /** Wallet Address */
  address: Scalars['String']
  /** Unique identifier */
  id: Scalars['Int']
}
