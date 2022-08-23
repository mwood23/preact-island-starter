/**
 * This causes CSS clashes making it to where you can't run multiple islands on the same page.
 * https://github.com/seek-oss/vanilla-extract/pull/657#issuecomment-1221226058
 */
import './reset.css'

import { createIslandWebComponent } from 'preact-island'

export const Preact = () => {
  return <div>foo</div>
}

createIslandWebComponent('preact-web-component', Preact).render({
  selector: 'preact-web-component',
  initialProps: {},
})
