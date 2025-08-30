'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Establishment } from '@/lib/db/schema'

// Importar Leaflet dinámicamente para evitar errores de SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

interface MapProps {
  establishments: Establishment[]
  userLocation: { lat: number; lng: number } | null
}

export default function Map({ establishments, userLocation }: MapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
        <p>Cargando mapa...</p>
      </div>
    )
  }

  // Centro por defecto (Buenos Aires)
  const center = userLocation || { lat: -34.6037, lng: -58.3816 }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marcador de usuario */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}

        {/* Marcadores de establecimientos */}
        {establishments.map((establishment) => (
          <Marker
            key={establishment.id}
            position={[
              parseFloat(establishment.latitude as string),
              parseFloat(establishment.longitude as string)
            ]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{establishment.name}</h3>
                <p className="text-sm">{establishment.address}</p>
                {establishment.pricePerHour && (
                  <p className="text-green-600">${establishment.pricePerHour}/hora</p>
                )}
                {establishment.phone && (
                  <p className="text-blue-600">{establishment.phone}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}