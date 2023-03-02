export const queries = {
  base: '(min-width: 0px)',
  sm: '(min-width: 320px)',
  md: '(min-width: 760px)',
  lg: '(min-width: 1025px)',
  xl: '(min-width: 1441px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
}
const theme = {
  bp: {
    base: `@media only screen and ${queries.base}`,
    sm: `@media only screen and ${queries.sm}`,
    sm_landscape: `@media only screen and ${queries.sm} and ${queries.landscape}`,
    md: `@media only screen and ${queries.md}`,
    md_landscape: `@media only screen and ${queries.md} and ${queries.landscape}`,
    lg: `@media only screen and ${queries.lg}`,
    xl: `@media only screen and ${queries.xl}`,
    portrait: `@media only screen and ${queries.portrait}`,
    landscape: `@media only screen and ${queries.landscape}`,
  },
  colors: {
    neutral000: '#FFFFFF',
    neutral500: '#616E7C',
    neutral800: '#1D2B2A',
    primary400: '#3164FA',
  },
}

export const availableColors = Object.keys(theme.colors)

export type ColorName = keyof typeof theme.colors

export default theme
