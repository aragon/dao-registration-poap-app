/* eslint-disable @typescript-eslint/no-explicit-any */

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Record<string, string>
    bp: Record<string, string>
  }
}
