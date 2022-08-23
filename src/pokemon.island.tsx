import './reset.css'

import { createIslandWebComponent } from 'preact-island'
import { Box, Button, Input, Text, Form } from './components'
import { useState } from 'preact/hooks'
import axios from 'redaxios'
import { API_URL } from './config/env'
import { JSXInternal } from 'preact/src/jsx'

export const Pokemon = () => {
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
          onInput={(e) => setPokemonInput((e.target as HTMLInputElement).value)}
        />
        <Button isLoading={pokemonLoading} onClick={onSubmit}>
          Submit
        </Button>
        {pokemonError}
      </Form>
      <Box border="sm" borderColor={'gray'} p="4">
        {pokemonDetails != null ? (
          <Box>
            <Text mb="2">Pokemon Details</Text>
            <Box display={'flex'}>
              <Box flexShrink={0}>
                <img src={pokemonDetails.sprite} />
              </Box>
              <Box>
                <Text>Name: {pokemonDetails.name}</Text>
                <Text>Number: {pokemonDetails.number}</Text>
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

createIslandWebComponent('pokemon-island', Pokemon).render({
  selector: 'pokemon-island',
  initialProps: {},
})
