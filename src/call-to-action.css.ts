import { style } from '@vanilla-extract/css'

export const button = style({
  border: 'none',
  backgroundColor: '#294eab',
  borderRadius: '5px',
  padding: '10px',
  fontWeight: 'bold',
  color: 'white',
  cursor: 'pointer',
  fontFamily: 'inherit',
})

export const dimmer = style({
  position: 'fixed',
  display: 'none',
  zIndex: '90',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
})

export const dimmerVisible = style({
  display: 'block',
  animation: 'show 0.2s',
  animationFillMode: 'forwards',
})

export const modal = style({
  position: 'fixed',
  outline: 'none',
  zIndex: '100',
  backgroundColor: 'white',
  display: 'none !important',
  width: '380px',
  borderRadius: '24px',
  padding: '34px 21px',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'inherit',
  overflowY: 'auto',
  height: '650px',
  textAlign: 'center',
})

export const image = style({
  width: '100%',
  marginBottom: '1rem',
})

export const modalVisible = style({
  display: 'block !important',
  animation: 'show 0.3s',
  animationFillMode: 'forwards',
})
