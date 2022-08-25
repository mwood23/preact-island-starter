import { ComponentProps } from 'preact'
import { Box, BoxProps } from './box'
import { input, InputVariants } from './input.css'
import cx from 'clsx'

export type InputProps = BoxProps & {
  as?: never
} & Omit<ComponentProps<'input'>, 'size' | 'width'> &
  InputVariants

export const Input = ({ size, theme, className, ...rest }: InputProps) => {
  return (
    <Box
      as={'input'}
      width={'100%'}
      className={cx(input({ size, theme }), className)}
      {...rest}
    />
  )
}
