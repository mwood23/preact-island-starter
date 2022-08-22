import { style } from '@vanilla-extract/css'
import { vars } from './vars.css'

export const baseReset = style({
  margin: 0,
  padding: '0',
  border: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  fontFamily: 'inherit',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
  color: vars.color.text,
})

const inheritFontReset = style({
  fontFamily: 'inherit',
})

const blockReset = style({
  display: 'block',
})

const lineHeightReset = style({
  lineHeight: '1',
})

const appearanceReset = style({
  appearance: 'none',
})

const activeReset = style({
  boxShadow: 'none',
  outline: 'none',
})

const transparentReset = style({
  backgroundColor: 'transparent',
})

const field = style([
  blockReset,
  appearanceReset,
  transparentReset,
  inheritFontReset,
  lineHeightReset,
  activeReset,
])

export const buttonReset = style([
  baseReset,
  transparentReset,
  inheritFontReset,
])

export const inputReset = style([
  field,
  style({
    selectors: {
      '&::-ms-clear': {
        display: 'none',
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none',
      },
    },
  }),
])
