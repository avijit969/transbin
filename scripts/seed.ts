import { db } from '../db';
import { users } from '../db/schema';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');
  
  const adminEmail = 'admin@trashbin.com';
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  try {
    await db.insert(users).values({
      id: uuidv4(),
      name: 'Super Admin',
      email: adminEmail,
      passwordHash: passwordHash,
      role: 'admin',
      createdAt: new Date(),
    });
    console.log('✅ Admin user created successfully.');
    console.log('Email: admin@trashbin.com');
    console.log('Password: admin123');
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      console.log('⚠️ Admin user already exists.');
    } else {
      console.error('❌ Error seeding database:', error);
    }
  }
}

seed();
