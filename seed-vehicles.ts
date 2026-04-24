import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

async function seed() {
  console.log('🌱 Insertando vehículos de prueba...')
  
  const vehicles = [
    {
      title: 'Audi A4 Avant 2.0 TDI',
      slug: 'audi-a4-avant-1',
      brand: 'Audi',
      model: 'A4 Avant',
      year: 2021,
      price: 28900,
      mileage: 42000,
      fuel_type: 'DIESEL',
      transmission: 'AUTOMATICO',
      environmental_label: 'C',
      location: 'Madrid, España',
      origin: 'ALEMANIA',
      description: 'Vehículo en perfecto estado con historial completo.',
      features: ['Navegador MMI', 'Techo panorámico', 'Asientos calefactables'],
      images: ['https://via.placeholder.com/800x450?text=Audi+A4'],
    },
    {
      title: 'BMW Serie 3 320d',
      slug: 'bmw-serie-3-1',
      brand: 'BMW',
      model: 'Serie 3',
      year: 2020,
      price: 24500,
      mileage: 68000,
      fuel_type: 'DIESEL',
      transmission: 'AUTOMATICO',
      environmental_label: 'C',
      location: 'Barcelona, España',
      origin: 'ESPANA',
      description: 'BMW con paquete M Sport y tracción integral.',
      features: ['iDrive 7.0', 'Asientos deportivos', 'LLantas 19"'],
      images: ['https://via.placeholder.com/800x450?text=BMW'],
    },
    {
      title: 'Volkswagen Golf GTI',
      slug: 'volkswagen-golf-gti-1',
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2022,
      price: 31200,
      mileage: 18500,
      fuel_type: 'GASOLINA',
      transmission: 'AUTOMATICO',
      environmental_label: 'C',
      location: 'Valencia, España',
      origin: 'ALEMANIA',
      description: 'Golf GTI con motor 2.0 TSI de 245 CV.',
      features: ['Chasis DCC', 'Escape deportivo', 'Pack R-Line'],
      images: ['https://via.placeholder.com/800x450?text=Golf+GTI'],
    },
  ]

  for (const v of vehicles) {
    const { error } = await supabase.from('vehicles').upsert({
      ...v,
      status: 'APPROVED',
      published_at: new Date().toISOString(),
    }, { onConflict: 'slug' })
    
    if (error) {
      console.error(`❌ Error con ${v.slug}:`, error.message)
    } else {
      console.log(`✅ Insertado: ${v.slug}`)
    }
  }
  
  console.log('\n🎉 ¡Listo! Ahora prueba:')
  console.log('   http://localhost:3000/vehiculos/audi-a4-avant-1')
}

seed()
