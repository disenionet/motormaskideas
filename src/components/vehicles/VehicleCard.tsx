'use client'

import Link from 'next/link'
import { useState } from 'react'

interface VehicleCardProps {
  id: string
  slug: string
  title: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType?: string
  transmission?: string
  environmentalLabel?: string
  location?: string
  origin?: string
  image?: string
  isFeatured?: boolean
  isOffer?: boolean
}

export default function VehicleCard({
  id,
  slug,
  title,
  brand,
  model,
  year,
  price,
  mileage,
  fuelType,
  transmission,
  environmentalLabel,
  location,
  origin,
  image,
  isFeatured,
  isOffer,
}: VehicleCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  const mainImage = image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(brand + ' ' + model)}`

  return (
    <Link 
      href={`/vehiculos/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
    >
      {/* Imagen con badges y acciones */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img 
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        
        {/* Badges superpuestos */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOffer && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              ¡Oferta!
            </span>
          )}
          {origin === 'ALEMANIA' && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              🇩🇪 Importado
            </span>
          )}
        </div>
        
        {/* Botón favorito */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setIsFavorite(!isFavorite)
          }}
          className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white rounded-full shadow-sm transition hover:scale-110"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <svg 
            className={`w-4 h-4 transition ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} 
            fill={isFavorite ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        {/* Overlay con acciones rápidas (visible en hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg shadow-lg hover:bg-gray-50 transition">
              Comparar
            </button>
          </div>
        </div>
      </div>
      
      {/* Contenido de la card */}
      <div className="p-4">
        {/* Título y año/km */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
              {brand} {model}
            </h3>
            <p className="text-sm text-gray-500">
              {year} • {mileage?.toLocaleString('es-ES')} km
            </p>
          </div>
        </div>
        
        {/* Specs chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {fuelType && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">{fuelType}</span>
          )}
          {transmission && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
              {transmission === 'AUTOMATICO' ? 'Aut.' : 'Man.'}
            </span>
          )}
          {environmentalLabel && (
            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
              environmentalLabel === 'CERO_EMISIONES' ? 'bg-green-100 text-green-700' :
              environmentalLabel === 'ECO' ? 'bg-emerald-100 text-emerald-700' :
              environmentalLabel === 'C' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {environmentalLabel.replace('_', ' ')}
            </span>
          )}
        </div>
        
        {/* Precio y ubicación */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xl font-bold text-blue-600">
            {price?.toLocaleString('es-ES')} €
          </span>
          {location && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location.split(',')[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
