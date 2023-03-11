import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html,
  body {
    font-family: 'Manrope', sans-serif;
    font-weight: 400;
    font-size: 62.5%; /* base 10px */
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
  }

  body {
    position: relative;
    min-height: 100vh;

    @supports (height: 100dvh) {
      min-height: 100dvh;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
