import { createServerClient, type Cookie } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

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

  // ✅ ENFOQUE SEGURO: sin desestructuración anidada
  const authResponse = await supabase.auth.getUser()
  const user = authResponse.data?.user

  // Rutas protegidas
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
