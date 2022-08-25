import { style } from '@vanilla-extract/css'
import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { sprinkles } from '../sprinkles.css'

export const text = recipe({
  variants: {
    size: {
      xs: style({ fontSize: 'xs', lineHeight: '1' }),
      sm: sprinkles({ fontSize: 'sm', lineHeight: '1' }),
      md: sprinkles({ fontSize: 'md', lineHeight: '1' }),
      lg: sprinkles({ fontSize: 'lg', lineHeight: '1' }),
      xl: sprinkles({ fontSize: 'xl', lineHeight: '1' }),
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type TextVariants = RecipeVariants<typeof text>
