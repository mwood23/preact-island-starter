import './test'

import { createIsland } from 'preact-island'

export const Preact = () => {
  return <div>Foo</div>
}

createIsland(Preact).render({
  selector: '[data-island="preact"]',
  initialProps: {
    snippetLocation: 'LANDINGPAGE',
  },
})
