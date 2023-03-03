import theme, { ColorName } from '../../styles/theme'
import styled, { css } from 'styled-components'

interface TypographyProps {
  $color?: ColorName
}

const fonts = {
  primary: 'Manrope',
}

const headerSharedStyles = css<TypographyProps>`
  font-family: ${fonts.primary};
  font-weight: 600;
  font-style: normal;
  margin: 0;
  color: ${(props) =>
    props.$color ? props.theme.colors[props.$color] : theme.colors.neutral800};
`

const h1Styles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-size: 2.4rem;
  line-height: 3.1rem;
  line-height: 120%;
`

const h2Styles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.1rem;
`

const h3Styles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.9rem;
`

const bodyStyles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 150%;
`

const captionStyles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 1.28rem;
  line-height: 150%;
`

const captionBoldStyles = css`
  ${headerSharedStyles}
  font-family: ${fonts.primary};
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 150%;
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`

export const H1 = styled.h1`
  ${h1Styles}
`

export const H2 = styled.h2`
  ${h2Styles}
`

export const H3 = styled.h3`
  ${h3Styles}
`

export const Body = styled.p`
  ${bodyStyles}
`

export const Caption = styled.p`
  ${captionStyles}
`

export const CaptionBold = styled.p`
  ${captionBoldStyles}
`
