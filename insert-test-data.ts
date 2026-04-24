import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Cargar variables de entorno
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno. Verifica tu .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const testVehicles = [
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
    description: 'Vehículo en perfecto estado con historial completo de mantenimiento.',
    features: ['Navegador MMI', 'Techo panorámico', 'Asientos calefactables', 'Cámara 360°'],
    images: ['https://via.placeholder.com/800x450/0066cc/ffffff?text=Audi+A4+Avant'],
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
    description: 'BMW con paquete M Sport y tracción integral xDrive.',
    features: ['iDrive 7.0', 'Asientos deportivos', 'LLantas 19"', 'Head-up Display'],
    images: ['https://via.placeholder.com/800x450/1a1a1a/ffffff?text=BMW+Serie+3'],
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
    description: 'Golf GTI con motor 2.0 TSI de 245 CV y chasis deportivo DCC.',
    features: ['Chasis DCC', 'Escape deportivo', 'Pack R-Line', 'Faros Matrix LED'],
    images: ['https://via.placeholder.com/800x450/e30613/ffffff?text=Golf+GTI'],
  },
]

async function insertTestData() {
  console.log('🚗 Insertando vehículos de prueba en Supabase...\n')
  
  let successCount = 0
  
  for (const vehicle of testVehicles) {
    try {
      const {  inserted, error } = await supabase
        .from('vehicles')
        .upsert({
          ...vehicle,
          status: 'APPROVED',
          published_at: new Date().toISOString(),
        }, { 
          onConflict: 'slug',
          ignoreDuplicates: false 
        })
        .select()
        .single()

      if (error) throw error
      
      console.log(`✅ Insertado: ${vehicle.slug}`)
      successCount++
    } catch (err: any) {
      console.error(`❌ Error con ${vehicle.slug}:`, err.message)
    }
  }
  
  console.log(`\n📊 Resultado: ${successCount}/${testVehicles.length} vehículos insertados`)
  
  if (successCount > 0) {
    console.log('\n🎉 ¡Listo! Ahora prueba en tu navegador:')
    console.log(`   http://localhost:3000/vehiculos/audi-a4-avant-1`)
    console.log(`   http://localhost:3000/vehiculos/bmw-serie-3-1`)
    console.log(`   http://localhost:3000/vehiculos/volkswagen-golf-gti-1`)
  }
}

insertTestData()
