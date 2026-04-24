import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Actualizando vehículos con datos completos...')
  await prisma.vehicle.deleteMany()
  
  await prisma.vehicle.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'cuid_001',
        title: 'Audi A4 Avant 2.0 TDI S-Line',
        slug: 'audi-a4-avant-20-tdi-s-line',
        brand: 'Audi',
        model: 'A4 Avant',
        year: 2021,
        price: 28900,
        mileage: 42000,
        fuelType: 'DIESEL',
        transmission: 'AUTOMATICO',
        environmentalLabel: 'C',
        location: 'Madrid, España',
        origin: 'ALEMANIA',
        description: 'Audi A4 Avant en perfecto estado, con historial de mantenimiento completo en servicio oficial. Equipamiento S-Line con llantas de 19", techo panorámico y sistema de sonido Bang & Olufsen. Vehículo importado de Alemania con IVA deducible para profesionales.',
        features: ['Navegador MMI Plus', 'Techo panorámico', 'Asientos calefactables', 'Cámara 360°', 'Apple CarPlay', 'Control de crucero adaptativo'],
        images: [
          'https://via.placeholder.com/800x450/1a1a2e/ffffff?text=Audi+A4+Avant+1',
          'https://via.placeholder.com/800x450/16213e/ffffff?text=Audi+A4+Avant+2',
          'https://via.placeholder.com/800x450/0f3460/ffffff?text=Audi+A4+Avant+3',
        ],
        status: 'APPROVED',
        publishedAt: new Date(),
        views: 127,
        contacts: 8,
      },
      {
        id: 'cuid_002',
        title: 'BMW Serie 3 320d xDrive',
        slug: 'bmw-serie-3-320d-xdrive',
        brand: 'BMW',
        model: 'Serie 3',
        year: 2020,
        price: 24500,
        mileage: 68000,
        fuelType: 'DIESEL',
        transmission: 'AUTOMATICO',
        environmentalLabel: 'C',
        location: 'Barcelona, España',
        origin: 'ESPANA',
        description: 'BMW Serie 3 con tracción integral xDrive, ideal para todo tipo de condiciones. Paquete M con acabado deportivo, interior en cuero Dakota y sistema de infoentretenimiento iDrive 7.0. Único propietario y siempre en garaje.',
        features: ['Paquete M Sport', 'iDrive 7.0', 'Asientos deportivos', 'Faros LED adaptativos', 'Apple CarPlay', 'Sensor de aparcamiento'],
        images: [
          'https://via.placeholder.com/800x450/1a1a2e/ffffff?text=BMW+Serie+3+1',
          'https://via.placeholder.com/800x450/16213e/ffffff?text=BMW+Serie+3+2',
        ],
        status: 'APPROVED',
        publishedAt: new Date(),
        views: 89,
        contacts: 5,
      },
      {
        id: 'cuid_003',
        title: 'Volkswagen Golf 8 GTI',
        slug: 'volkswagen-golf-8-gti',
        brand: 'Volkswagen',
        model: 'Golf',
        year: 2022,
        price: 31200,
        mileage: 18500,
        fuelType: 'GASOLINA',
        transmission: 'AUTOMATICO',
        environmentalLabel: 'C',
        location: 'Valencia, España',
        origin: 'ALEMANIA',
        description: 'Golf 8 GTI con el legendario motor 2.0 TSI de 245 CV. Chasis DCC ajustable, escape deportivo y asientos deportivos con calefacción. La combinación perfecta entre deportividad y uso diario. Importado de Alemania con garantía oficial vigente.',
        features: ['Motor 2.0 TSI 245 CV', 'Chasis DCC', 'Escape deportivo', 'Asientos deportivos', 'Digital Cockpit Pro', 'Matrix LED'],
        images: [
          'https://via.placeholder.com/800x450/1a1a2e/ffffff?text=Golf+GTI+1',
          'https://via.placeholder.com/800x450/16213e/ffffff?text=Golf+GTI+2',
          'https://via.placeholder.com/800x450/0f3460/ffffff?text=Golf+GTI+3',
        ],
        status: 'APPROVED',
        publishedAt: new Date(),
        views: 203,
        contacts: 15,
      },
    ],
  })
  console.log('✅ 3 vehículos actualizados con datos completos')
}

main()
  .catch(e => { console.error('❌ Error:', e); process.exit(1) })
  .finally(async () => await prisma.$disconnect())
