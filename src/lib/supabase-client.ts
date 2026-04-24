import { createBrowserClient } from '@supabase/ssr'

// ✅ Client Components: sin cookies explícitas (el cliente maneja todo)
export const createSupabaseClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
