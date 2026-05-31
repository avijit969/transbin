import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { authRoute } from './routes/auth';
import { adminRoute } from './routes/admin';
import { userRoute } from './routes/user';
import { superAdminRoute } from './routes/superadmin';
import { seedRoute } from './routes/seed';

export const app = new Hono().basePath('/api');

// Mount routes
app.route('/auth', authRoute);
app.route('/admin', adminRoute);
app.route('/user', userRoute);
app.route('/superadmin', superAdminRoute);
app.route('/seed', seedRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
