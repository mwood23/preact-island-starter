import { createIsland } from 'preact-island'
import { API_URL } from './config/env'

export const Bali = () => {
  return <div>Foo</div>
}

console.log(API_URL)

createIsland(Bali).render({
  selector: '[data-island="bali"]',
  initialProps: {
    snippetLocation: 'LANDINGPAGE',
    isAutoplaced: false,
  },
})
