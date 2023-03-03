import { HTMLAttributes } from 'react'
import { CSSProperties } from 'styled-components'
import theme, { ColorName } from '../../styles/theme'
import styled from 'styled-components'

import logoSvg from './logo.svg'
import poapSvg from './poap.svg'
import warningSvg from './warning.svg'

interface SvgsMap {
  [key: string]: React.ElementType
}

export const SvgsMapping = {
  logo: logoSvg,
  poap: poapSvg,
  warning: warningSvg,
  error: warningSvg,
} as SvgsMap

export type SvgName = keyof typeof SvgsMapping

interface StylesProps extends CSSProperties {
  '--svg-color'?: string
}

interface SvgProps extends HTMLAttributes<HTMLDivElement> {
  name: SvgName
  size?: number
  width?: number
  height?: number
  color?: ColorName
}

const Svg = ({ name, width, height, size, color, ...divProps }: SvgProps) => {
  const SvgComponent = SvgsMapping[name]

  if (!SvgComponent) {
    throw new Error(`There is no svg named: ${name}.`)
  }

  const styles = {} as StylesProps

  if (width) {
    styles.width = `${width}rem`
  }
  if (height) {
    styles.height = `${height}rem`
  }

  if (size) {
    styles.width = `${size}rem`
    styles.height = `${size}rem`
  }
  if (color) {
    styles['--svg-color'] = theme.colors[color as ColorName] || '#111827'
  }

  return (
    <SvgContainer>
      <SvgComponent style={{ ...styles, ...divProps.style }} />
    </SvgContainer>
  )
}

const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
`

export default Svg
