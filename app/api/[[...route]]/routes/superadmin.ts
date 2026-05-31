import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../../db';
import { users, invoices } from '../../../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware, superAdminMiddleware } from '../middleware';

export const superAdminRoute = new Hono()
  .use('*', authMiddleware, superAdminMiddleware)

  // Get all users and admins (superadmin can see everyone except maybe themselves, or including themselves)
  .get('/users', async (c) => {
    const allUsers = db.select({ id: users.id, name: users.name, email: users.email, role: users.role }).from(users).all();
    return c.json({ users: allUsers });
  })

  // Create a new admin or user
  .post(
    '/users',
    zValidator(
      'json',
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['superadmin', 'admin', 'user']).default('user'),
      })
    ),
    async (c) => {
      const { name, email, password, role } = c.req.valid('json');

      const existingUser = db.select().from(users).where(eq(users.email, email)).get();
      if (existingUser) {
        return c.json({ error: 'Email already exists' }, 400);
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUserId = uuidv4();

      db.insert(users).values({
        id: newUserId,
        name,
        email,
        passwordHash,
        role,
        createdAt: new Date(),
      }).run();

      return c.json({ message: 'User created successfully', id: newUserId });
    }
  )

  // Get all invoices (no role restriction for superadmin)
  .get('/invoices/all', async (c) => {
    const allInvoices = db
      .select({
        id: invoices.id,
        fileUrl: invoices.fileUrl,
        fileType: invoices.fileType,
        createdAt: invoices.createdAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        }
      })
      .from(invoices)
      .innerJoin(users, eq(invoices.userId, users.id))
      .orderBy(desc(invoices.createdAt))
      .all();

    return c.json({ invoices: allInvoices });
  })

  // Get global analytics
  .get('/analytics', async (c) => {
    const totalUsers = db.select({ id: users.id }).from(users).all().length;
    const totalInvoices = db.select({ id: invoices.id }).from(invoices).all().length;

    return c.json({ totalUsers, totalInvoices });
  });
