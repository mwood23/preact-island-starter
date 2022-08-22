import { createIsland } from 'preact-island'

export const Santorini = () => {
  return <div>Foo</div>
}

createIsland(Santorini).render({
  selector: '[data-island="santorini"]',
  initialProps: {
    snippetLocation: 'LANDINGPAGE',
    isAutoplaced: false,
  },
})
