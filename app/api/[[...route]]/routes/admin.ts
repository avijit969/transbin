import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../../db';
import { users, invoices } from '../../../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware, adminMiddleware } from '../middleware';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const adminRoute = new Hono()
  .use('*', authMiddleware, adminMiddleware)
  
  // Get all users
  .get('/users', async (c) => {
    const allUsers = db.select({ id: users.id, name: users.name, email: users.email, role: users.role }).from(users).all();
    return c.json({ users: allUsers });
  })
  
  // Create a new user
  .post(
    '/users',
    zValidator(
      'json',
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['admin', 'user']).default('user'),
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

  // Upload invoice
  .post('/invoices', async (c) => {
    try {
      const body = await c.req.parseBody();
      const userId = body['userId'] as string;
      const file = body['file'] as File;

      if (!userId || !file) {
        return c.json({ error: 'Missing userId or file' }, 400);
      }

      // Check if user exists
      const userExists = db.select().from(users).where(eq(users.id, userId)).get();
      if (!userExists) {
        return c.json({ error: 'User not found' }, 404);
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary using stream
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'trashbin_invoices', resource_type: 'auto' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      const fileUrl = uploadResult.secure_url;
      const fileType = uploadResult.resource_type === 'image' ? 'image' : 'pdf';
      const invoiceId = uuidv4();

      db.insert(invoices).values({
        id: invoiceId,
        userId,
        fileUrl,
        fileType,
        createdAt: new Date(),
      }).run();

      return c.json({ message: 'Invoice uploaded successfully', url: fileUrl });
    } catch (error: any) {
      console.error('Upload Error:', error);
      return c.json({ error: 'Failed to upload invoice' }, 500);
    }
  });
