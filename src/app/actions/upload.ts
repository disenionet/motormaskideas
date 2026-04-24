'use server'

import { createClient } from '@supabase/supabase-js'

export async function uploadVehicleImages(formData: FormData) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      throw new Error('Faltan variables de entorno de Supabase en .env.local')
    }

    const supabase = createClient(url, key)

    const files = formData.getAll('images')
    const validFiles = files.filter((f): f is File => f instanceof File)

    if (validFiles.length === 0) {
      return []
    }

    const urls: string[] = []

    for (const file of validFiles) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const uniqueName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`

      const { error: uploadError } = await supabase.storage
        .from('vehicles-images')
        .upload(uniqueName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('❌ Error de Supabase:', uploadError)
        throw new Error(`Error subiendo ${file.name}: ${uploadError.message}`)
      }

      // ✅ Sintaxis segura sin desestructuración anidada
      const response = supabase.storage.from('vehicles-images').getPublicUrl(uniqueName)
      const publicUrl = response.data.publicUrl

      if (publicUrl) {
        urls.push(publicUrl)
      }
    }

    return urls

  } catch (error: any) {
    console.error('❌ Error en Server Action:', error)
    throw new Error(error.message || 'Error desconocido al subir imágenes')
  }
}