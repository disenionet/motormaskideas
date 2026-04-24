import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Motor+Ideas | Vehículos de ocasión',
  description: 'Encuentra tu próximo coche con Motor+Ideas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Header simple SIN interactividad */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo como enlace simple */}
              <a href="/" className="font-bold text-xl text-blue-600">
                Motor+Ideas
              </a>
              
              {/* Nav con enlaces simples (sin onClick) */}
              <nav className="hidden md:flex items-center gap-6">
                <a href="/vehiculos" className="text-gray-600 hover:text-blue-600">Comprar</a>
                <a href="/vender" className="text-gray-600 hover:text-blue-600">Vender</a>
              </nav>
              
              {/* Enlaces de usuario (sin onClick) */}
              <div className="flex items-center gap-3">
                <a href="/auth/login" className="text-sm text-blue-600 hover:underline">
                  Iniciar sesión
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>

        {/* Footer simple */}
        <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm">
            <p>© {new Date().getFullYear()} Motor+Ideas</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
