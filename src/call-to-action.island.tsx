import './reset.css'

import { createIslandWebComponent, WebComponentPortal } from 'preact-island'
import { useState } from 'preact/hooks'
import cx from 'clsx'
import { Box, Button, Text } from './components'
import * as styles from './call-to-action.css'
import { FC } from 'preact/compat'
import { useWebComponentEvents } from './hooks/useWebComponentEvents'

const islandName = 'call-to-action-island'

const Portalize: FC<{ name: string; parent: string }> = ({
  children,
  name,
  parent,
}) => {
  useWebComponentEvents(name, parent)

  // @ts-ignore types are wrong
  return <WebComponentPortal name={name}>{children}</WebComponentPortal>
}

export const CallToAction = ({
  backgroundColor,
}: {
  backgroundColor?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useWebComponentEvents(islandName)

  return (
    <div>
      <button
        className={styles.button}
        style={{ backgroundColor: backgroundColor }}
        onClick={() => setIsOpen(true)}
        data-testid="callToAction"
      >
        All expenses paid island vacation. Click to enter!
      </button>

      {isOpen && (
        <Portalize name="starter-modal" parent={islandName}>
          <Box
            data-testId="modal-content"
            className={cx(styles.modal, isOpen && styles.modalVisible)}
          >
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
        <Portalize name="starter-dimmer" parent={islandName}>
          <Box
            data-testId="modal-dimmer"
            className={cx(styles.dimmer, isOpen && styles.dimmerVisible)}
            onClick={() => setIsOpen(false)}
          />
        </Portalize>
      )}
    </div>
  )
}

const island = createIslandWebComponent(islandName, CallToAction)
island.render({
  selector: islandName,
})
