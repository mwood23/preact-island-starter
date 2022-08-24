import { render } from '@testing-library/preact'
import { Pokemon } from './pokemon.island'

it('should render the pokemon component and let users type', () => {
  const container = render(<Pokemon />)

  console.log(container.debug())
})
