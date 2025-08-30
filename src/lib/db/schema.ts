import { pgTable, serial, varchar, text, decimal, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const establishments = pgTable('establishments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  pricePerHour: decimal('price_per_hour', { precision: 8, scale: 2 }),
  services: jsonb('services').$type<string[]>().default([]),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  imageUrl: text('image_url'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Establishment = typeof establishments.$inferSelect
export type NewEstablishment = typeof establishments.$inferInsert