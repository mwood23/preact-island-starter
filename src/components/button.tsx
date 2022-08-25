import clsx from 'clsx'
import { FunctionComponent, ComponentProps } from 'preact'
import { Box, BoxProps } from './box'
import { button, ButtonVariants, loadingDot, disabled } from './button.css'

export type ButtonProps = BoxProps &
  ComponentProps<'div'> & {
    isLoading?: boolean
    disabled?: boolean
    onClick?: () => void
  } & ButtonVariants

const ButtonLoader = () => (
  <Box aria-hidden as="span" display={'inline-block'}>
    <Box as="span" color="white" className={loadingDot}>
      .
    </Box>
    <Box as="span" color="white" className={loadingDot}>
      .
    </Box>
    <Box as="span" color="white" className={loadingDot}>
      .
    </Box>
  </Box>
)

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  kind,
  size,
  theme,
  onClick,
  isLoading = false,
  disabled: disabledProp = false,
  className,
  ...rest
}) => {
  return (
    <Box
      role="button"
      onKeyDown={(e: any) => {
        if (disabledProp) return

        if (e.key === 'Enter') {
          onClick?.()
        }
      }}
      onClick={() => {
        if (disabledProp) return

        onClick?.()
      }}
      className={clsx(
        button({ kind, size, theme }),
        { [disabled]: disabledProp || isLoading },
        className,
      )}
      {...rest}
    >
      {children}
      {isLoading ? <ButtonLoader /> : null}
    </Box>
  )
}
