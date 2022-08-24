import { createIslandWebComponent, WebComponentPortal } from 'preact-island'
import { useState } from 'preact/hooks'
import cx from 'clsx'
import { Box, Button, Text } from './components'
import * as styles from './call-to-action.css'
import { useEffect } from 'preact/hooks'
import { FC } from 'preact/compat'

const islandName = 'call-to-action-island'

const useWebComponentEvents = (name: string) => {
  useEffect(() => {
    const event = new CustomEvent('web-component-mount', {
      detail: { target: name },
      bubbles: true,
    })

    dispatchEvent(event)

    return () => {
      const event = new CustomEvent('web-component-unmount', {
        detail: { target: name },
        bubbles: true,
      })

      dispatchEvent(event)
    }
  }, [name])
}

const Portalize: FC<{ name: string }> = ({ children, name }) => {
  useWebComponentEvents(name)

  // @ts-ignore types are wrong
  return <WebComponentPortal name={name}>{children}</WebComponentPortal>
}

const Widget = ({ backgroundColor }: { backgroundColor?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  useWebComponentEvents(islandName)

  return (
    <div>
      <button
        className={styles.button}
        style={{ backgroundColor: backgroundColor }}
        onClick={() => setIsOpen(true)}
      >
        All expenses paid island vacation. Click to enter!
      </button>

      {isOpen && (
        <Portalize name="bounty-modal">
          <Box className={cx(styles.modal, isOpen && styles.modalVisible)}>
            <img
              className={styles.image}
              src="https://github.com/mwood23/preact-island/raw/master/docs/preact-island.svg"
            />
            <Text>Portals work with web component islands too!</Text>
            <Button className="cta_button" onClick={() => setIsOpen(false)}>
              close
            </Button>
          </Box>
        </Portalize>
      )}
      {isOpen && (
        <Portalize name="bounty-dimmer">
          <Box
            className={cx(styles.dimmer, isOpen && styles.dimmerVisible)}
            onClick={() => setIsOpen(false)}
          />
        </Portalize>
      )}
    </div>
  )
}

const island = createIslandWebComponent(islandName, Widget)
island.render({
  selector: islandName,
})
