import { ComponentProps } from 'preact'
import { Box, BoxProps } from './box'
import cx from 'clsx'

export type FormProps = BoxProps & {
  as?: never
} & Omit<ComponentProps<'form'>, 'size' | 'width'>

export const Form = ({ className, onSubmit, ...rest }: FormProps) => {
  return <Box as={'form'} width={'100%'} className={cx(className)} {...rest} />
}
