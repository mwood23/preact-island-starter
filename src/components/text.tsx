import { Box, BoxProps } from './box'
import { text, TextVariants } from './Text.css'
import cx from 'clsx'

export type TextProps = BoxProps & {
  as?: Extract<BoxProps['as'], 'span' | 'div' | 'b' | 'i' | 'u'>
} & TextVariants

/**
 * We are using a div here because the place you embed the island on may have global styles applied
 * to HTML elements.
 */
export const Text = ({ as = 'div', size, className, ...rest }: TextProps) => {
  return <Box as={as} className={cx(text({ size }), className)} {...rest} />
}
