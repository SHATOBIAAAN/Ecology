import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/investigations')({
  component: Investigations,
})

function Investigations() {
  return <div className="p-8 text-2xl">Расследования</div>
}
