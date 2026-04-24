import { createSupabaseServer } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PanelPage() {
  const supabase = await createSupabaseServer()
  
  // Enfoque seguro: sin desestructuración anidada
  const authResponse = await supabase.auth.getUser()
  const user = authResponse.data?.user

  if (!user) {
    redirect('/auth/login?redirect=/panel')
  }

  // Obtener vehículos del vendedor actual
  const {  vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      {/* Header con logout */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🎛️ Panel de Vendedor</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.email}</span>
          <form action="/auth/logout" method="post">
            <button className="text-sm text-red-600 hover:text-red-800 font-medium">Cerrar sesión</button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total vehículos</p>
          <p className="text-2xl font-bold">{vehicles?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Publicados</p>
          <p className="text-2xl font-bold text-green-600">{vehicles?.filter((v: any) => v.status === 'APPROVED').length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">{vehicles?.filter((v: any) => v.status === 'PENDING').length || 0}</p>
        </div>
      </div>

      {/* Listado */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg">Mis vehículos</h2>
        </div>
        {!vehicles || vehicles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="mb-4">Aún no has publicado ningún vehículo.</p>
            <Link href="/admin/crear-vehiculo" className="text-blue-600 hover:underline font-medium">Publicar tu primer vehículo →</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {vehicles.map((v: any) => (
              <div key={v.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div>
                  <h3 className="font-medium text-gray-900">{v.title}</h3>
                  <p className="text-sm text-gray-500">{v.price?.toLocaleString('es-ES')} € • {v.mileage?.toLocaleString('es-ES')} km</p>
                  <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${v.status === 'APPROVED' ? 'bg-green-100 text-green-700' : v.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{v.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/vehiculos/${v.slug}`} target="_blank" className="text-sm text-blue-600 hover:underline">Ver</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
