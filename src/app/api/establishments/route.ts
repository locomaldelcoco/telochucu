import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { establishments } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius') || '10'
    
    let result
    
    if (lat && lng) {
      result = await db.execute(
        sql`
          SELECT *,
          (
            6371 * acos(
              cos(radians(${parseFloat(lat)})) * 
              cos(radians(latitude::float)) * 
              cos(radians(longitude::float) - radians(${parseFloat(lng)})) + 
              sin(radians(${parseFloat(lat)})) * 
              sin(radians(latitude::float))
            )
          ) AS distance
          FROM establishments
          WHERE (
            6371 * acos(
              cos(radians(${parseFloat(lat)})) * 
              cos(radians(latitude::float)) * 
              cos(radians(longitude::float) - radians(${parseFloat(lng)})) + 
              sin(radians(${parseFloat(lat)})) * 
              sin(radians(latitude::float))
            )
          ) <= ${parseFloat(radius)}
          ORDER BY distance ASC
        `
      )
    } else {
      result = await db.select().from(establishments)
    }

    return NextResponse.json({ establishments: result })
  } catch (error) {
    console.error('Error fetching establishments:', error)
    return NextResponse.json(
      { error: 'Error fetching establishments' },
      { status: 500 }
    )
  }
}