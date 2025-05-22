import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports')({
  component: Reports,
})

function Reports() {
  return <div className="p-8 text-2xl">Отчёты</div>
}
