import { ComponentChildren, ComponentProps } from 'preact'
import { baseReset } from '../reset.css'
import { layoutProperties, sprinkles } from '../sprinkles.css'
import cx from 'clsx'

/**
 * Parses out what properties are sprinkles compared to props
 */
const parsePropsFromSprinkles = (props: any) => {
  const componentProps: Record<any, any> = {}
  const sprinkleProps: Record<any, any> = {}

  for (const key in props) {
    // @ts-ignore not worth the effort to type the index signature
    if (layoutProperties['styles'][key]) {
      sprinkleProps[key] = props[key]
    } else {
      componentProps[key] = props[key]
    }
  }

  return [componentProps, sprinkleProps]
}

/**
 * Add props to the pick as you need them.
 */
export type BoxProps = Pick<
  ComponentProps<'div'>,
  'role' | 'className' | 'style' | 'onClick' | 'onKeyDown' | 'href'
> & {
  as?: any
  children?: ComponentChildren | ComponentChildren[]
  testId?: string
  id?: string
} & Parameters<typeof sprinkles>[0]

/**
 * This is a base primitive that all over elements are built off of.
 */
export const Box = ({
  as: Component = 'div',
  children,
  className,
  testId,
  style,
  ...maybeSprinkles
}: BoxProps) => {
  const [componentProps, sprinkleProps] =
    parsePropsFromSprinkles(maybeSprinkles)

  return (
    <Component
      className={cx(baseReset, sprinkles(sprinkleProps), className)}
      style={style}
      data-testid={testId}
      {...componentProps}
    >
      {children}
    </Component>
  )
}
