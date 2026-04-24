import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          const cookie = request.headers.get('cookie')
          return cookie?.split('; ').find(c => c.startsWith(name + '='))?.split('=')[1]
        },
        set: () => {},
        remove: () => {},
      },
    }
  )
  
  await supabase.auth.signOut()
  
  return NextResponse.redirect(new URL('/vehiculos', request.url))
}
