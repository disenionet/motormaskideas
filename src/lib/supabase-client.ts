import { createBrowserClient } from '@supabase/ssr'

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan variables de entorno de Supabase')
  }

  return createBrowserClient(
    supabaseUrl || '',
    supabaseKey || ''
  )
}
