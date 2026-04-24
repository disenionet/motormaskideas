'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function VehicleFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const params = new URLSearchParams()
    
    formData.forEach((value, key) => {
      if (value) params.set(key, value.toString())
    })
    
    router.push(`/vehiculos?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex flex-wrap gap-4">
        <select name="brand" className="border rounded px-3 py-2 text-sm">
          <option value="">Marca</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Volkswagen">Volkswagen</option>
        </select>
        
        <input name="max_price" type="number" placeholder="Precio máx." className="border rounded px-3 py-2 text-sm" />
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          Filtrar
        </button>
        <a href="/vehiculos" className="text-gray-600 hover:underline self-center text-sm">
          Limpiar
        </a>
      </div>
    </form>
  )
}
