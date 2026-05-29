import { Hono } from 'hono';
import { db } from '../../../../db';
import { invoices } from '../../../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware';

export const userRoute = new Hono()
  .use('*', authMiddleware)
  
  // Get my invoices
  .get('/invoices', async (c) => {
    const user = c.get('user');

    const userInvoices = db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, user.id))
      .orderBy(desc(invoices.createdAt))
      .all();

    return c.json({ invoices: userInvoices });
  });
