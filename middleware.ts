import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// ✅ Tipo Cookie definido localmente (no depende de exportación de @supabase/ssr)
type Cookie = {
  name: string
  value: string
  options?: {
    domain?: string
    path?: string
    secure?: boolean
    httpOnly?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
    maxAge?: number
    expires?: Date
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: (): Cookie[] => {
          return request.cookies.getAll().map(({ name, value }) => ({ name, value }))
        },
        setAll: (cookiesToSet: Cookie[]) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value, options)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // ✅ Enfoque seguro: sin desestructuración anidada
  const authResponse = await supabase.auth.getUser()
  const user = authResponse.data?.user

  // Rutas protegidas: solo usuarios autenticados
  if (request.nextUrl.pathname.startsWith('/panel')) {
    if (!user) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: ['/panel/:path*'],
}
