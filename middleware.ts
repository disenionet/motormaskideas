import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          return request.cookies.getAll().map(c => ({ name: c.name, value: c.value }))
        },
        setAll: (cookiesToSet: any[]) => {
          cookiesToSet.forEach(({ name, value, options }: any) => {
            request.cookies.set(name, value, options)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const authResponse = await supabase.auth.getUser()
  const user = authResponse.data?.user

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
