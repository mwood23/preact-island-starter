import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { mediaQueries, vars } from './vars.css'

export const layoutProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': mediaQueries.tablet },
    desktop: { '@media': mediaQueries.desktop },
  },
  defaultCondition: 'mobile',
  properties: {
    // None always has to be at the end!
    display: ['block', 'flex', 'inline-flex', 'inline', 'inline-block', 'none'],
    position: ['absolute', 'relative', 'fixed'],
    flexDirection: ['row', 'column'],
    flexWrap: ['nowrap', 'wrap'],
    flexShrink: [0, 1],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-between',
    ],
    width: ['100%', '25%', '50%', 'auto'],
    textAlign: ['left', 'center', 'right'],
    fontWeight: ['normal', 'inherit', 'bold', 500, 300],
    gap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    borderRadius: vars.borderRadius,
    fontSize: vars.fontSize,
    lineHeight: vars.lineHeight,
    // Order matters here, border color always at the bottom so the style can override!
    border: vars.border,
    borderTop: vars.border,
    borderBottom: vars.border,
    borderColor: vars.color,
    background: vars.color,
    color: vars.color,
  },
  shorthands: {
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    pr: ['paddingRight'],
    pl: ['paddingLeft'],
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    mr: ['marginRight'],
    ml: ['marginLeft'],
  },
  responsiveArray: ['mobile', 'tablet', 'desktop'],
})

export const sprinkles = createSprinkles(layoutProperties)
