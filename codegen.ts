import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: {
    'http://localhost:3000/graphql': {
      headers: {
        Authorization: 'YOUR-TOKEN-HERE',
      },
    },
  },
  documents: 'components/**/*.graphql',
  generates: {
    './components/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}
export default config
