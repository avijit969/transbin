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

  // Edit any user
  .patch(
    '/users/:id',
    zValidator(
      'json',
      z.object({
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional().or(z.literal('')),
        role: z.enum(['superadmin', 'admin', 'user']).optional(),
      })
    ),
    async (c) => {
      const id = c.req.param('id');
      const { name, email, password, role } = c.req.valid('json');

      const targetUser = db.select().from(users).where(eq(users.id, id)).get();
      if (!targetUser) return c.json({ error: 'User not found' }, 404);

      const payload = c.get('user');
      if (id === payload.id && role && role !== targetUser.role) {
        return c.json({ error: 'Cannot change your own role' }, 403);
      }

      const updates: any = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (role) updates.role = role;
      if (password && password.length > 0) {
        updates.passwordHash = await bcrypt.hash(password, 10);
      }

      if (Object.keys(updates).length > 0) {
        db.update(users).set(updates).where(eq(users.id, id)).run();
      }

      return c.json({ message: 'User updated successfully' });
    }
  )

  // Delete any user
  .delete('/users/:id', async (c) => {
    const id = c.req.param('id');
    
    const targetUser = db.select().from(users).where(eq(users.id, id)).get();
    if (!targetUser) return c.json({ error: 'User not found' }, 404);

    const payload = c.get('user');
    if (id === payload.id) {
      return c.json({ error: 'Cannot delete yourself' }, 403);
    }

    // Cascade delete invoices
    db.delete(invoices).where(eq(invoices.userId, id)).run();
    db.delete(users).where(eq(users.id, id)).run();

    return c.json({ message: 'User deleted successfully' });
  })

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
