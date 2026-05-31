import { getCookie } from 'hono/cookie';
import { verify } from 'jsonwebtoken';
import { createMiddleware } from 'hono/factory';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev_key';

export type JwtPayload = {
  id: string;
  role: 'superadmin' | 'admin' | 'user';
  email: string;
};

// Middleware to verify JWT and inject user payload into context
export const authMiddleware = createMiddleware<{
  Variables: { user: JwtPayload };
}>(async (c, next) => {
  const token = getCookie(c, 'auth_token');

  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;
    c.set('user', decoded);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// Middleware to ensure user is an admin or superadmin
export const adminMiddleware = createMiddleware<{
  Variables: { user: JwtPayload };
}>(async (c, next) => {
  const user = c.get('user');
  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return c.json({ error: 'Forbidden: Admin access required' }, 403);
  }
  await next();
});

// Middleware to ensure user is a superadmin
export const superAdminMiddleware = createMiddleware<{
  Variables: { user: JwtPayload };
}>(async (c, next) => {
  const user = c.get('user');
  if (!user || user.role !== 'superadmin') {
    return c.json({ error: 'Forbidden: Superadmin access required' }, 403);
  }
  await next();
});
