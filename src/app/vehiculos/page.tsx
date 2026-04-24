import { createPublicSupabase } from '@/lib/supabase-public'
import Link from 'next/link'
import VehicleFilters from '@/components/vehicles/VehicleFilters'

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const supabase = createPublicSupabase()

  let query = supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'APPROVED')
    .order('published_at', { ascending: false })
    .limit(20)

  if (params.brand) query = query.eq('brand', params.brand)
  if (params.max_price) query = query.lte('price', Number(params.max_price))

  const {  vehicles } = await query

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Vehículos</h1>
        
        {/* Filtro como Client Component autónomo */}
        <VehicleFilters />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {vehicles?.map((v: any) => (
            <Link 
              key={v.id}
              href={`/vehiculos/${v.slug}`}
              className="block bg-white rounded-xl border border-gray-200 hover:border-blue-300 p-4"
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4">
                <img src={v.images?.[0] || 'https://via.placeholder.com/400x300'} alt={v.title} className="w-full h-full object-cover rounded-lg" />
              </div>
              <h3 className="font-bold">{v.brand} {v.model}</h3>
              <p className="text-sm text-gray-500">{v.year} • {v.mileage?.toLocaleString('es-ES')} km</p>
              <p className="text-xl font-bold text-blue-600 mt-2">{v.price?.toLocaleString('es-ES')} €</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
