import './reset.css'
import './global.css'
import { createIslandWebComponent } from 'preact-island'
import { useWebComponentEvents } from './hooks/useWebComponentEvents'

const islandName = 'tailwind-island'

export const TailwindWidget = () => {
  useWebComponentEvents(islandName)

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Tailwind CSS
        </p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Build your next idea even faster.
        </h2>
      </div>
    </div>
  )
}

const island = createIslandWebComponent(islandName, TailwindWidget)
island.render({
  selector: islandName,
})
