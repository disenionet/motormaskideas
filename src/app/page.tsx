import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section estilo Autolist */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Encuentra tu <span className="text-blue-200">coche ideal</span> con Motor+Ideas
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl">
              Miles de vehículos verificados, precios transparentes y la mejor experiencia de compra online.
            </p>

            {/* Buscador rápido estilo Autolist */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Marca</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>Todas</option>
                    <option>Audi</option>
                    <option>BMW</option>
                    <option>Mercedes-Benz</option>
                    <option>Volkswagen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Modelo</label>
                  <input type="text" placeholder="Ej: A4, Serie 3..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Precio máx.</label>
                  <input type="number" placeholder="Ej: 30000" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="flex items-end">
                  <Link 
                    href="/vehiculos"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Buscar
                  </Link>
                </div>
              </div>
              
              {/* Búsquedas populares */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Búsquedas populares:</p>
                <div className="flex flex-wrap gap-2">
                  {['SUVs bajo 20.000€', 'Eléctricos', 'Km 0', 'Importados Alemania'].map((tag) => (
                    <Link 
                      key={tag}
                      href={`/vehiculos?search=${encodeURIComponent(tag)}`}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de categorías destacadas */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explora por categoría</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'SUVs', icon: '🚙', count: '1.234' },
              { name: 'Sedanes', icon: '🚗', count: '892' },
              { name: 'Eléctricos', icon: '⚡', count: '156' },
              { name: 'Híbridos', icon: '🔋', count: '234' },
              { name: 'Deportivos', icon: '🏎️', count: '78' },
              { name: 'Furgonetas', icon: '🚐', count: '145' },
            ].map((cat) => (
              <Link 
                key={cat.name}
                href={`/vehiculos?category=${cat.name.toLowerCase()}`}
                className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition text-center"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition">{cat.icon}</div>
                <div className="font-medium text-gray-900">{cat.name}</div>
                <div className="text-sm text-gray-500">{cat.count} vehículos</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vehículos destacados */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Vehículos destacados</h2>
            <Link href="/vehiculos" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Ver todos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Grid de cards - se reutiliza el componente existente con nuevo estilo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Card ejemplo - en producción se mapea desde la BD */}
            {[1, 2, 3, 4].map((i) => (
              <Link 
                key={i}
                href={`/vehiculos/audi-a4-avant-${i}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Imagen con badge */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img 
                    src={`https://via.placeholder.com/400x300?text=Vehículo+${i}`}
                    alt="Vehículo"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {i === 1 && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      ¡Oferta!
                    </span>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition">
                    <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                {/* Contenido */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">Audi A4 Avant</h3>
                      <p className="text-sm text-gray-500">2021 • 42.000 km</p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">🇩🇪</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Diésel</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Aut.</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">C</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xl font-bold text-blue-600">28.900 €</span>
                    <span className="text-xs text-gray-400">Madrid</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de confianza */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Por qué elegir Motor+Ideas?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Diseñamos cada detalle para que comprar tu coche sea fácil, seguro y transparente.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✅', title: 'Vehículos verificados', desc: 'Cada coche pasa por una inspección de 150 puntos antes de publicarse.' },
              { icon: '💰', title: 'Precio justo garantizado', desc: 'Comparamos con el mercado para asegurarte la mejor relación calidad-precio.' },
              { icon: '🛡️', title: 'Compra segura', desc: 'Pago protegido, documentación en regla y garantía incluida.' },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
