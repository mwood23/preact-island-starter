import './reset.css'

import { createIslandWebComponent } from 'preact-island'
import { Box, Button, Input, Text, Form } from './components'
import { useState } from 'preact/hooks'
import axios from 'redaxios'
import { API_URL } from './config/env'
import { JSXInternal } from 'preact/src/jsx'
import { useWebComponentEvents } from './hooks/useWebComponentEvents'

// small edit
const islandName = 'pokemon-island'

export const Pokemon = () => {
  useWebComponentEvents(islandName)
  const [pokemonDetails, setPokemonDetails] = useState<{
    name: string
    sprite: string
    number: number
  } | null>(null)
  const [pokemonInput, setPokemonInput] = useState('')
  const [pokemonError, setPokemonError] = useState<JSXInternal.Element | null>(
    null,
  )
  const [pokemonLoading, setPokemonLoading] = useState(false)

  const onSubmit = async () => {
    setPokemonLoading(true)
    const resp = await axios
      .get(`${API_URL}/pokemon/${pokemonInput}`)
      .catch((err) => {
        setPokemonDetails(null)
        setPokemonError(<Text>An error ocurred.</Text>)
      })
      .finally(() => {
        setPokemonLoading(false)
      })

    if (!resp) {
      setPokemonDetails(null)
      setPokemonError(<Text>Pokemon not found</Text>)
      return
    }

    setPokemonError(null)
    setPokemonDetails({
      name: resp.data.name,
      number: resp.data.id,
      sprite: resp.data.sprites.front_default,
    })
  }

  return (
    <Box p="4">
      <Text size="md" mb="2">
        Search a pokemon
      </Text>
      <Form
        mb="6"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit
        }}
      >
        <Input
          name="pokemon"
          value={pokemonInput}
          placeholder="squirtle"
          data-testId="pokemon"
          onInput={(e) => setPokemonInput((e.target as HTMLInputElement).value)}
        />
        <Button
          data-testId="submitPokemon"
          isLoading={pokemonLoading}
          onClick={onSubmit}
        >
          Submit
        </Button>
        {pokemonError}
      </Form>
      <Box border="sm" borderColor={'gray'} p="4">
        {pokemonDetails != null ? (
          <Box data-testId="pokemonDetails">
            <Text mb="2">Pokemon Details</Text>
            <Box display={'flex'}>
              <Box flexShrink={0}>
                <img src={pokemonDetails.sprite} />
              </Box>
              <Box>
                <Text data-testId="pokemonName">
                  Name: {pokemonDetails.name}
                </Text>
                <Text data-testId="pokemonNumber">
                  Number: {pokemonDetails.number}
                </Text>
              </Box>
            </Box>
          </Box>
        ) : (
          <Text>Submit a pokemon to see details.</Text>
        )}
      </Box>
    </Box>
  )
}

createIslandWebComponent(islandName, Pokemon).render({
  selector: islandName,
  initialProps: {},
})
