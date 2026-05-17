import mongoose from 'mongoose';
import User from '../models/User.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed admin user if none exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found in database. Seeding admin user...');
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@be5.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      await User.create({
        name: 'BE5 Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      console.log(`Admin user auto-seeded successfully with email: ${adminEmail}`);
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
