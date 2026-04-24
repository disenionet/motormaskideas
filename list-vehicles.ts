import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Cargar variables de entorno desde .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

async function listVehicles() {
  console.log('🔍 Consultando vehículos APPROVED en Supabase...\n')
  
  const {  vehicles, error } = await supabase
    .from('vehicles')
    .select('slug, title, brand, model, price, status, origin')
    .eq('status', 'APPROVED')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  if (!vehicles || vehicles.length === 0) {
    console.log('⚠️ No hay vehículos con status = APPROVED')
    console.log('\n💡 Prueba:')
    console.log('   1. Insertar datos con: npm run seed (si tienes el script)')
    console.log('   2. O ejecutar este SQL en Supabase:')
    console.log(`
   INSERT INTO vehicles (title, slug, brand, model, year, price, mileage, status, published_at)
   VALUES ('Audi A4', 'audi-a4-1', 'Audi', 'A4', 2021, 28900, 42000, 'APPROVED', NOW());
    `)
    process.exit(0)
  }

  console.log(`✅ Encontrados: ${vehicles.length} vehículos\n`)
  console.log('📋 Slugs disponibles (copia y usa en la URL):')
  console.log('─'.repeat(80))
  
  vehicles.forEach((v: any, i: number) => {
    const url = `http://localhost:3000/vehiculos/${v.slug}`
    const origin = v.origin === 'ALEMANIA' ? '🇩🇪' : '🇪🇸'
    console.log(`${i + 1}. ${v.slug}`)
    console.log(`   🚗 ${v.brand} ${v.model} • ${v.price?.toLocaleString('es-ES')}€ • ${origin}`)
    console.log(`   🔗 ${url}`)
    console.log()
  })
  
  console.log('─'.repeat(80))
  console.log('💡 Para probar: copia un slug y visita')
  console.log(`   http://localhost:3000/vehiculos/EL-SLUG`)
}

listVehicles()
