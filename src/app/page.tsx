'use client'

import { useState, useEffect } from 'react'
import Map from '@/components/Map'
import EstablishmentCard from '@/components/EstablishmentCard'
import { Establishment } from '@/lib/db/schema'
import { getUserLocation, calculateDistance } from '@/lib/db/utils'

export default function HomePage() {
  const [establishments, setEstablishments] = useState<Establishment[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [locationPermission, setLocationPermission] = useState<string>('prompt')

  // Obtener ubicación del usuario
  const requestLocation = async () => {
    try {
      setLocationPermission('requesting')
      const location = await getUserLocation()
      setUserLocation(location)
      setLocationPermission('granted')
      fetchEstablishments(location)
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
      setLocationPermission('denied')
      setError('No se pudo obtener tu ubicación. Mostrando todos los establecimientos.')
      fetchEstablishments()
    }
  }

  // Obtener establecimientos
  const fetchEstablishments = async (location?: { lat: number; lng: number }) => {
    try {
      const params = location 
        ? `?lat=${location.lat}&lng=${location.lng}&radius=10`
        : ''
      
      const response = await fetch(`/api/establishments${params}`)
      
      if (!response.ok) {
        throw new Error('Error al cargar establecimientos')
      }

      const data = await response.json()
      setEstablishments(data.establishments)
    } catch (error) {
      console.error('Error fetching establishments:', error)
      setError('Error al cargar los establecimientos')
    } finally {
      setLoading(false)
    }
  }

  // Efecto inicial
  useEffect(() => {
    requestLocation()
  }, [])

  // Calcular distancia para cada establecimiento
  const establishmentsWithDistance = establishments.map(establishment => {
    if (!userLocation) return { establishment, distance: undefined }
    
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      parseFloat(establishment.latitude as string),
      parseFloat(establishment.longitude as string)
    )
    
    return { establishment, distance }
  }).sort((a, b) => {
    if (!a.distance || !b.distance) return 0
    return a.distance - b.distance
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">TeloChucu</h1>
          <p className="text-gray-600">Encuentra telos cercanos a tu ubicación</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Información de ubicación */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {locationPermission === 'requesting' && (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
              <p className="text-gray-600">Obteniendo tu ubicación...</p>
            </div>
          )}
          
          {locationPermission === 'denied' && (
            <div className="flex items-center justify-between">
              <p className="text-amber-600">Ubicación no disponible - Mostrando todos los establecimientos</p>
              <button 
                onClick={requestLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {locationPermission === 'granted' && userLocation && (
            <p className="text-green-600">
              Ubicación detectada - Mostrando establecimientos cercanos
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando establecimientos...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mapa */}
            <div className="order-2 lg:order-1">
              <h2 className="text-lg font-semibold mb-4">Mapa</h2>
              <Map establishments={establishments} userLocation={userLocation} />
            </div>

            {/* Lista de establecimientos */}
            <div className="order-1 lg:order-2">
              <h2 className="text-lg font-semibold mb-4">
                Establecimientos encontrados ({establishments.length})
              </h2>
              
              {establishments.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg">
                  <p className="text-gray-500">No se encontraron establecimientos cercanos.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Intenta ampliar el radio de búsqueda o verifica tu ubicación.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {establishmentsWithDistance.map(({ establishment, distance }) => (
                    <EstablishmentCard
                      key={establishment.id}
                      establishment={establishment}
                      distance={distance}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}