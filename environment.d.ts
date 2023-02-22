type EnvDict = {
  [P in keyof Env]: Env[P] extends number | boolean ? string : Env[P]
}

export interface Env {
  NEXT_PUBLIC_ALCHEMY_APP_NAME: string
  NEXT_PUBLIC_ALCHEMY_ID: string
  NEXT_PUBLIC_NETWORK_ID: number
  NEXT_PUBLIC_GRAPHQL_BASE_URL: string
  NEXT_PUBLIC_LOGIN_KEY: string
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends EnvDict {}
  }
}

export {}
