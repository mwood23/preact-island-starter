import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { inputReset } from '../reset.css'
import { vars } from '../vars.css'
import { sprinkles } from '../sprinkles.css'

export const input = recipe({
  base: [inputReset],
  variants: {
    theme: {
      primary: style({
        border: `1px solid ${vars.color.text}`,
        '::placeholder': {
          color: vars.color.text,
          opacity: '0.5',
          fontWeight: 'normal',
        },
      }),
    },
    size: {
      sm: sprinkles({ px: '2', py: '2' }),
      md: sprinkles({ px: '3', py: '3' }),
      lg: sprinkles({ px: '4', py: '4' }),
    },
  },
  defaultVariants: {
    theme: 'primary',
    size: 'md',
  },
})

export type InputVariants = RecipeVariants<typeof input>
