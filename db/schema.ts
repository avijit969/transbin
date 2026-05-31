import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('user'), // 'superadmin' | 'admin' | 'user'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  fileUrl: text('file_url').notNull(),
  fileType: text('file_type').notNull(), // 'pdf' | 'image'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
