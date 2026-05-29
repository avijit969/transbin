import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { setCookie, deleteCookie } from 'hono/cookie';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../../../../db';
import { users } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { authMiddleware } from './../middleware';

export const authRoute = new Hono()
  .post(
    '/login',
    zValidator(
      'json',
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    ),
    async (c) => {
      const { email, password } = c.req.valid('json');

      const user = db.select().from(users).where(eq(users.email, email)).get();

      if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';
      const token = sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      setCookie(c, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return c.json({
        message: 'Logged in successfully',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    }
  )
  .post('/logout', (c) => {
    deleteCookie(c, 'auth_token', { path: '/' });
    return c.json({ message: 'Logged out successfully' });
  })
  .get('/me', authMiddleware, (c) => {
    const user = c.get('user');
    return c.json({ user });
  });
