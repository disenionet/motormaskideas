import { createPublicSupabase } from '@/lib/supabase-public'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function VehicleDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const supabase = createPublicSupabase()
  
  const {  vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'APPROVED')
    .single()

  if (!vehicle) {
    console.log('⚠️ Vehículo no encontrado:', slug)
    notFound()
  }

  const images = Array.isArray(vehicle.images) ? vehicle.images : []
  const mainImage = images[0] || 'https://via.placeholder.com/800x450'

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/vehiculos" className="hover:text-blue-600">Vehículos</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{vehicle.title}</span>
        </nav>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-video">
            <img src={mainImage} alt={vehicle.title} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.title}</h1>
              <p className="text-4xl font-bold text-blue-600">{vehicle.price?.toLocaleString('es-ES')} €</p>
            </div>

            {/* Especificaciones */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold mb-4">Especificaciones</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Año</span>
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Kilómetros</span>
                  <span>{vehicle.mileage?.toLocaleString('es-ES')} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Combustible</span>
                  <span>{vehicle.fuel_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transmisión</span>
                  <span>{vehicle.transmission === 'AUTOMATICO' ? 'Automático' : 'Manual'}</span>
                </div>
              </div>
            </div>

            {/* Acciones como enlaces/formularios simples */}
            <div className="flex gap-3">
              <a 
                href={`https://wa.me/34600000000?text=Interesado en ${encodeURIComponent(vehicle.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl text-center transition"
              >
                💬 WhatsApp
              </a>
              <a 
                href={`tel:+34600000000`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-center transition"
              >
                📞 Llamar
              </a>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-10 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold mb-4">Descripción</h3>
          <p className="text-gray-700">{vehicle.description || 'Sin descripción disponible.'}</p>
        </div>
      </div>
    </main>
  )
}
