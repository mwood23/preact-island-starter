import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { buttonReset } from '../reset.css'
import { sprinkles } from '../sprinkles.css'
import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '../vars.css'

export const button = recipe({
  base: [
    buttonReset,
    sprinkles({
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    style({
      cursor: 'pointer',
      textDecoration: 'none',
    }),
  ],
  variants: {
    kind: {
      button: sprinkles({ display: 'inline-flex' }),
      link: style([
        sprinkles({ display: 'inline-flex' }),
        {
          textDecoration: 'underline',
        },
      ]),
    },
    theme: {
      primary: {},
      secondary: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  defaultVariants: {
    kind: 'button',
    theme: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      variants: {
        kind: 'button',
        size: 'sm',
      },
      style: sprinkles({ px: '4', py: '2' }),
    },
    {
      variants: {
        kind: 'button',
        size: 'md',
      },
      style: sprinkles({ px: '6', py: '3' }),
    },
    {
      variants: {
        kind: 'button',
        size: 'lg',
      },
      style: sprinkles({ px: '8', py: '4' }),
    },
    {
      variants: {
        kind: 'link',
        size: 'sm',
      },
      style: sprinkles({ px: '0', py: '2' }),
    },
    {
      variants: {
        kind: 'link',
        size: 'md',
      },
      style: sprinkles({ px: '0', py: '3' }),
    },
    {
      variants: {
        kind: 'link',
        size: 'lg',
      },
      style: sprinkles({ px: '0', py: '4' }),
    },
    {
      variants: {
        kind: 'button',
        theme: 'primary',
      },
      style: [
        sprinkles({ color: 'white' }),
        style({
          backgroundColor: vars.color.primaryColor,
        }),
      ],
    },
    {
      variants: {
        kind: 'button',
        theme: 'secondary',
      },
      style: [
        sprinkles({ color: 'text' }),
        style({ backgroundColor: vars.color.secondaryColor }),
      ],
    },
  ],
})

export const disabled = style({
  cursor: 'not-allowed',
})

const dot1 = keyframes({
  '14%': {
    opacity: 0,
  },
  '15%,100%': {
    opacity: 1,
  },
})

const dot2 = keyframes({
  '29%': {
    opacity: 0,
  },
  '30%,100%': {
    opacity: 1,
  },
})

const dot3 = keyframes({
  '44%': {
    opacity: 0,
  },
  '45%,100%': {
    opacity: 1,
  },
})

export const loadingDot = style({
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  opacity: 0,
  selectors: {
    [`&:nth-child(1)`]: {
      animationName: dot1,
    },
    [`&:nth-child(2)`]: {
      animationName: dot2,
    },
    [`&:nth-child(3)`]: {
      animationName: dot3,
    },
  },
})

export type ButtonVariants = RecipeVariants<typeof button>
