import { useLayoutEffect } from 'preact/hooks'

export const useWebComponentEvents = (name: string, parent?: string) => {
  useLayoutEffect(() => {
    const event = new CustomEvent('web-component-mount', {
      detail: { target: name, parent },
      bubbles: true,
    })

    dispatchEvent(event)

    return () => {
      const event = new CustomEvent('web-component-unmount', {
        detail: { target: name, parent },
        bubbles: true,
      })

      dispatchEvent(event)
    }
  }, [name])
}
