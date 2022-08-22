/**
 * This causes CSS clashes making it to where you can't run multiple islands on the same page.
 * https://github.com/seek-oss/vanilla-extract/pull/657#issuecomment-1221226058
 */
import './reset.css'

import { createIsland } from 'preact-island'

export const Preact = () => {
  return <div>Foo</div>
}

createIsland(Preact).render({
  selector: '[data-island="preact"]',
  initialProps: {},
})
