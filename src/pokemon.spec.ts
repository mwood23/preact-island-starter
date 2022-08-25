import { test, expect } from '@playwright/test'
import { getByTestId, getIsland } from './test-utils/helpers'

test('should render the island and allow the form to be submitted', async ({
  page,
}) => {
  // This is from .env.local
  await page.route('https://pokeapi.co/api/v2/**/*', async (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        name: 'Arcanine',
        id: 59,
        sprites: {
          front_default: 'https://via.placeholder.com/150',
        },
      }),
    })
  })

  const island = await getIsland(page, 'pokemon-island')

  const input = await getByTestId(island, 'pokemon')
  await input.click()
  await input.fill('arcanine')

  const submit = await getByTestId(island, 'submitPokemon')
  await submit.click()

  await page.waitForSelector('data-testid=pokemonDetails')

  const details = await getByTestId(island, 'pokemonDetails')

  const pokemonName = await getByTestId(details, 'pokemonName')
  await expect(pokemonName).toHaveText('Name: Arcanine')

  const pokemonNumber = await getByTestId(details, 'pokemonNumber')
  await expect(pokemonNumber).toHaveText('Number: 59')
})
