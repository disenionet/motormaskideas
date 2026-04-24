import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Motor+Ideas | Vehículos de ocasión premium',
  description: 'Encuentra tu próximo coche con Motor+Ideas. Vehículos verificados, precios transparentes y compra segura.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {/* Header global */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:bg-blue-700 transition">
                  M+
                </div>
                <span className="font-bold text-xl text-gray-900">
                  Motor<span className="text-blue-600">+Ideas</span>
                </span>
              </a>

              {/* Nav principal */}
              <nav className="hidden md:flex items-center gap-6">
                <a href="/vehiculos" className="text-gray-600 hover:text-blue-600 font-medium transition">Comprar</a>
                <a href="/vender" className="text-gray-600 hover:text-blue-600 font-medium transition">Vender</a>
                <a href="/financiacion" className="text-gray-600 hover:text-blue-600 font-medium transition">Financiación</a>
              </nav>

              {/* Acciones usuario */}
              <div className="flex items-center gap-3">
                <a href="/favoritos" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Favoritos">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </a>
                <a href="/panel" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
                  Mi cuenta
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Motor+Ideas</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/sobre-nosotros" className="hover:text-white transition">Sobre nosotros</a></li>
                  <li><a href="/contacto" className="hover:text-white transition">Contacto</a></li>
                  <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Comprar</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/vehiculos" className="hover:text-white transition">Catálogo</a></li>
                  <li><a href="/financiacion" className="hover:text-white transition">Financiación</a></li>
                  <li><a href="/garantia" className="hover:text-white transition">Garantía</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Vender</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/vender" className="hover:text-white transition">Publicar vehículo</a></li>
                  <li><a href="/precios" className="hover:text-white transition">Valoración</a></li>
                  <li><a href="/vendedores" className="hover:text-white transition">Para profesionales</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/privacidad" className="hover:text-white transition">Privacidad</a></li>
                  <li><a href="/terminos" className="hover:text-white transition">Términos</a></li>
                  <li><a href="/cookies" className="hover:text-white transition">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
              <p>© {new Date().getFullYear()} Motor+Ideas. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
