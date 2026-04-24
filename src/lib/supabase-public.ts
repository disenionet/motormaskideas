import { createClient } from '@supabase/supabase-js'

// ✅ Cliente público para Server Components que solo leen datos
// No maneja cookies → perfecto para páginas públicas como /vehiculos/[slug]
export const createPublicSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
