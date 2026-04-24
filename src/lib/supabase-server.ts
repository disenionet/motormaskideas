import { createServerClient, type Cookie } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ✅ SOLO para Route Handlers, Server Actions y middleware
// Donde SÍ se permite escribir cookies
export const createSupabaseServer = async () => {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: (): Cookie[] => {
          const all = cookieStore.getAll()
          return all.map(({ name, value }) => ({ name, value }))
        },
        setAll: (cookiesToSet: Cookie[]) => {
          // ✅ Esto SOLO funciona en Route Handlers / Server Actions / middleware
          // En Server Components puros, esto lanzará error (por diseño de Next.js)
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )
}
