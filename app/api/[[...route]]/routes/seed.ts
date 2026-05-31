import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../../db';
import { users } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export const seedRoute = new Hono()
  .get('/superadmin', async (c) => {
    try {
      const existingSuperadmin = db.select().from(users).where(eq(users.role, 'superadmin')).get();
      if (existingSuperadmin) {
        return c.json({ message: 'Superadmin already exists', email: existingSuperadmin.email });
      }

      const passwordHash = await bcrypt.hash('superadmin123', 10);
      const newUserId = uuidv4();
      const defaultEmail = 'superadmin@trashbin.com';

      db.insert(users).values({
        id: newUserId,
        name: 'Super Admin',
        email: defaultEmail,
        passwordHash,
        role: 'superadmin',
        createdAt: new Date(),
      }).run();

      return c.json({ 
        message: 'Superadmin created successfully', 
        credentials: {
          email: defaultEmail, 
          password: 'superadmin123' 
        }
      });
    } catch (error: any) {
      console.error('Seed Error:', error);
      return c.json({ error: 'Failed to seed superadmin' }, 500);
    }
  });
