'use client'

import { useState, useRef, useCallback } from 'react'
import { uploadVehicleImages } from '@/app/actions/upload'

interface Props {
  onChange: (urls: string[]) => void
  existingUrls?: string[]
}

export default function ImageUploader({ onChange, existingUrls = [] }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>(existingUrls)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return
    const fileArray = Array.from(newFiles)
    setFiles(prev => [...prev, ...fileArray])
    
    // Generar vistas previas locales
    fileArray.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => setPreviews(prev => [...prev, e.target?.result as string])
      reader.readAsDataURL(file)
    })
  }, [])

  const removeImage = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('images', f))
      const urls = await uploadVehicleImages(formData)
      onChange(urls)
      setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Imágenes del vehículo</label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          + Seleccionar archivos
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Grid de vistas previas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {previews.map((src, idx) => (
          <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}
        {previews.length === 0 && (
          <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 text-sm">
            Arrastra imágenes aquí o haz clic en "Seleccionar archivos"
          </div>
        )}
      </div>

      {files.length > 0 && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? '⏳ Subiendo a Supabase...' : '☁️ Subir imágenes seleccionadas'}
        </button>
      )}

      {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>}
    </div>
  )
}
