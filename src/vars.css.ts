import { createGlobalTheme } from '@vanilla-extract/css'
import { modularScale } from 'polished'

const createScale = (ratio: number, base: number) => (steps: number) =>
  `${modularScale(steps, base, ratio)}px`

const spaceScale = createScale(1.4, 4)
const fontSizeScale = createScale(1.3, 16)
const lineHeightScale = createScale(1.25, 24)
const borderRadiusScale = createScale(1.5, 4)

export const mediaQueries = {
  tablet: 'screen and (min-width: 768px)',
  desktop: 'screen and (min-width: 1024px)',
}

export const vars = createGlobalTheme(':root', {
  space: {
    nudge: '-1px',
    '0': '0',
    '1': spaceScale(1),
    '2': spaceScale(2),
    '3': spaceScale(3),
    '4': spaceScale(4),
    '5': spaceScale(5),
    '6': spaceScale(6),
    '7': spaceScale(7),
    '8': spaceScale(8),
  },
  borderRadius: {
    '1': borderRadiusScale(0),
    '2': borderRadiusScale(1),
    '3': borderRadiusScale(2),
    '4': borderRadiusScale(3),
    '5': borderRadiusScale(4),
    '6': borderRadiusScale(5),
    full: '99999px',
  },
  border: {
    none: 'none',
    sm: '1px solid',
    md: '2px solid',
    lg: '5px solid',
  },
  color: {
    white: '#fff',
    black: '#000',
    text: '#0E0E0E',
    gray: '#848484',
    transparent: 'transparent',
    primaryColor: '#52528C',
    secondaryColor: '#7C9EB2',
  },
  fontSize: {
    xs: fontSizeScale(-2),
    sm: fontSizeScale(-1),
    md: fontSizeScale(0),
    lg: fontSizeScale(1),
    xl: fontSizeScale(2),
    xxl: fontSizeScale(3),
    xxxl: fontSizeScale(4),
  },
  lineHeight: {
    '1': lineHeightScale(0),
    '2': lineHeightScale(1),
    '3': lineHeightScale(2),
    '4': lineHeightScale(3),
    '5': lineHeightScale(4),
    '6': lineHeightScale(5),
  },
})
