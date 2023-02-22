import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: {
    'http://localhost:3000/graphql': {
      headers: {
        Authorization: 'YOUR-TOKEN-HERE',
      },
    },
  },
  generates: {
    './components/types.ts': {
      plugins: ['typescript'],
    },
  },
}
export default config
