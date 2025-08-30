import { Establishment } from '@/lib/db/schema'

interface EstablishmentCardProps {
  establishment: Establishment
  distance?: number
}

export default function EstablishmentCard({ establishment, distance }: EstablishmentCardProps) {
  const whatsappMessage = `Hola, me interesa información sobre ${establishment.name}`
  const whatsappUrl = establishment.phone 
    ? `https://wa.me/54${establishment.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
    : null

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{establishment.name}</h3>
        {distance && (
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {distance.toFixed(1)} km
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-2">{establishment.address}</p>
      
      {establishment.pricePerHour && (
        <div className="flex items-center mb-2">
          <span className="text-green-600 font-semibold text-lg">
            ${establishment.pricePerHour}/hora
          </span>
        </div>
      )}

      {establishment.services && establishment.services.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {(establishment.services as string[]).map((service, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {establishment.description && (
        <p className="text-gray-600 text-sm mb-3">{establishment.description}</p>
      )}

      <div className="flex gap-2">
        {establishment.phone && (
          <a
            href={`tel:${establishment.phone}`}
            className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-center text-sm hover:bg-blue-600 transition-colors"
          >
            Llamar
          </a>
        )}
        
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-2 px-3 rounded text-center text-sm hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}