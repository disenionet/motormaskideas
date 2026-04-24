'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/components/vehicles/ImageUploader'
import { createClient } from '@supabase/supabase-js'

export default function CreateVehiclePage() {
  const router = useRouter()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as Record<string, string>

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.from('vehicles').insert({
      title: `${data.brand} ${data.model} ${data.year || ''}`,
      slug: `${data.brand?.toLowerCase()}-${data.model?.toLowerCase().replace(/\s+/g, '-')}-${data.year || 'new'}`,
      brand: data.brand,
      model: data.model,
      year: Number(data.year) || new Date().getFullYear(),
      price: Number(data.price),
      mileage: Number(data.mileage),
      fuel_type: data.fuel_type,
      transmission: data.transmission,
      environmental_label: data.environmental_label,
      location: data.location,
      origin: data.origin,
      description: data.description,
      images: imageUrls,
      status: 'APPROVED',
      published_at: new Date().toISOString()
    })

    setLoading(false)
    if (error) {
      alert('Error guardando: ' + error.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/vehiculos'), 1500)
    }
  }

  if (success) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-green-700 mb-2">✅ Vehículo creado</h2>
        <p className="text-gray-600">Redirigiendo al listado...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">➕ Añadir Vehículo</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <input name="brand" required className="w-full border rounded-lg px-3 py-2" placeholder="Ej: Audi" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
              <input name="model" required className="w-full border rounded-lg px-3 py-2" placeholder="Ej: A4 Avant" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
              <input name="year" type="number" required className="w-full border rounded-lg px-3 py-2" placeholder="2022" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (€)</label>
              <input name="price" type="number" required className="w-full border rounded-lg px-3 py-2" placeholder="28900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kilómetros</label>
              <input name="mileage" type="number" required className="w-full border rounded-lg px-3 py-2" placeholder="42000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Combustible</label>
              <select name="fuel_type" className="w-full border rounded-lg px-3 py-2">
                <option value="DIESEL">Diésel</option>
                <option value="GASOLINA">Gasolina</option>
                <option value="HIBRIDO">Híbrido</option>
                <option value="ELECTRICO">Eléctrico</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmisión</label>
              <select name="transmission" className="w-full border rounded-lg px-3 py-2">
                <option value="AUTOMATICO">Automático</option>
                <option value="MANUAL">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta DGT</label>
              <select name="environmental_label" className="w-full border rounded-lg px-3 py-2">
                <option value="C">C</option>
                <option value="ECO">ECO</option>
                <option value="CERO_EMISIONES">0 Emisiones</option>
                <option value="B">B</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
              <input name="location" required className="w-full border rounded-lg px-3 py-2" placeholder="Madrid, España" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
              <select name="origin" className="w-full border rounded-lg px-3 py-2">
                <option value="ESPANA">Nacional 🇪🇸</option>
                <option value="ALEMANIA">Importado 🇩🇪</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea name="description" rows={3} className="w-full border rounded-lg px-3 py-2" placeholder="Detalles del vehículo..."></textarea>
          </div>

          {/* Componente de subida */}
          <ImageUploader onChange={setImageUrls} />

          <button 
            type="submit" 
            disabled={loading || imageUrls.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Guardando...' : '💾 Publicar Vehículo'}
          </button>
        </form>
      </div>
    </main>
  )
}
