import mongoose from 'mongoose';
import User from '../models/User.js';
import TeamMember from '../models/TeamMember.js';
import EventPackage from '../models/EventPackage.js';
import PackageAddon from '../models/PackageAddon.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed admin user if none exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found in database. Seeding admin user...');
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@b5.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      await User.create({
        name: 'B5 Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      console.log(`Admin user auto-seeded successfully with email: ${adminEmail}`);
    }

    // Auto-seed team members if none exists
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      console.log('No team members found in database. Seeding default team members...');
      const seedMembers = [
        {
          name: 'Aarav Sharma',
          role: 'Founder & Lead Planner',
          bio: '12+ years orchestrating weddings and corporate galas across Rajasthan. Passionate about storytelling through events.',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          cloudinaryId: 'seeded_aarav',
          specialty: 'Weddings & Destination Events',
          events: '200+ events',
          type: 'mastermind',
          isActive: true
        },
        {
          name: 'Priya Malhotra',
          role: 'Creative Director',
          bio: "Former set designer turned event decorator. She turns any space into an immersive world your guests won't forget.",
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
          cloudinaryId: 'seeded_priya',
          specialty: 'Décor & Theming',
          events: '150+ themes',
          type: 'mastermind',
          isActive: true
        },
        {
          name: 'Rohan Mehta',
          role: 'Corporate Events Head',
          bio: 'MBA graduate who manages large-scale corporate events, product launches, and conferences with military precision.',
          imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
          cloudinaryId: 'seeded_rohan',
          specialty: 'Corporate & Galas',
          events: '80+ corporate shows',
          type: 'mastermind',
          isActive: true
        },
        {
          name: 'Anjali Sharma',
          role: 'Senior Wedding Architect',
          bio: 'With 8 years in luxury weddings, Anjali specializes in traditional Indian heritage events.',
          imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          cloudinaryId: 'seeded_anjali',
          type: 'lead',
          isActive: true
        },
        {
          name: 'Vikram Malhotra',
          role: 'Corporate Experience Lead',
          bio: 'Expert in technical logistics and large-scale corporate gala productions.',
          imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
          cloudinaryId: 'seeded_vikram',
          type: 'lead',
          isActive: true
        },
        {
          name: 'Priya Das',
          role: 'Design & Decor Specialist',
          bio: 'Our creative visionary who turns vague moodboards into stunning visual realities.',
          imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
          cloudinaryId: 'seeded_priyadas',
          type: 'lead',
          isActive: true
        }
      ];
      await TeamMember.insertMany(seedMembers);
      console.log('Default team members auto-seeded successfully.');
    }

    // Auto-seed packages if none exists
    const packageCount = await EventPackage.countDocuments();
    if (packageCount === 0) {
      console.log('No event packages found in database. Seeding default packages...');
      const seedPackages = [
        {
          name: 'Basic Package',
          description: 'Perfect for intimate gatherings and simple, elegant setups.',
          price: '₹5-10 Lakhs',
          popular: false,
          isActive: true,
          features: [
            { name: 'Basic Venue & Decoration', included: true },
            { name: 'Standard Photography', included: true },
            { name: 'Limited Hospitality Menu', included: true },
            { name: 'Videography', included: false },
            { name: 'Pre-Wedding Shoot', included: false },
            { name: 'DJ Services', included: false },
            { name: 'Cinematic Drone Shoot', included: false },
            { name: 'Luxury Hospitality', included: false },
          ]
        },
        {
          name: 'Medium Package',
          description: 'A well-rounded experience with themed decor and full coverage.',
          price: '₹15-20 Lakhs',
          popular: true,
          isActive: true,
          features: [
            { name: 'Themed Decoration', included: true },
            { name: 'Photography & Videography', included: true },
            { name: 'Standard Hospitality', included: true },
            { name: 'Pre-Wedding Shoot', included: true },
            { name: 'DJ Services', included: true },
            { name: 'Cinematic Drone Shoot', included: false },
            { name: 'Luxury Hospitality', included: false },
          ]
        },
        {
          name: 'Premium Package',
          description: 'High-end luxury venues with cinematic documentation.',
          price: '₹25-30 Lakhs',
          popular: false,
          isActive: true,
          features: [
            { name: 'Luxury Venue & Premium Decor', included: true },
            { name: 'Cinematic Video & Drone', included: true },
            { name: 'Premium Hospitality Spread', included: true },
            { name: 'Pre-Wedding (Outstation)', included: true },
            { name: 'Full Entertainment Setup', included: true },
            { name: 'Luxury Hospitality', included: false },
          ]
        },
        {
          name: 'Luxury Package',
          description: 'The ultimate destination wedding experience with zero compromises.',
          price: '₹40L+',
          popular: false,
          isActive: true,
          features: [
            { name: 'Destination Wedding Venue', included: true },
            { name: 'Top-tier Cinematic Production', included: true },
            { name: 'Exotic Hospitality & Mixology', included: true },
            { name: 'Pre-Wedding (International)', included: true },
            { name: 'Celebrity Entertainment Ops', included: true },
            { name: 'Complete Guest Hospitality', included: true },
          ]
        }
      ];
      await EventPackage.insertMany(seedPackages);
      console.log('Default event packages auto-seeded successfully.');
    }

    // Auto-seed addons if none exists
    const addonCount = await PackageAddon.countDocuments();
    if (addonCount === 0) {
      console.log('No package addons found in database. Seeding default addons...');
      const seedAddons = [
        { name: 'Drone Cinematography', price: '₹25,000', description: '4K aerial shots of your venue and ceremony.', isActive: true },
        { name: 'Live Acoustic Band', price: '₹45,000', description: 'Soulful live music for your reception or dinner.', isActive: true },
        { name: 'Themed Photo Booth', price: '₹15,000', description: 'Custom props and instant print services.', isActive: true },
        { name: 'Celebrity MUA', price: '₹35,000', description: 'Premium makeup services for the bride and family.', isActive: true },
        { name: 'Pyrotechnic Display', price: '₹20,000', description: 'Cold fire entries and grand stage sparkles.', isActive: true },
        { name: 'Virtual Streaming', price: '₹12,000', description: 'Live HD stream for guests who can\'t travel.', isActive: true },
        { name: 'Custom Mixology Bar', price: '₹30,000', description: 'Signature cocktails themed to your event.', isActive: true },
        { name: 'Premium Guest Kit', price: '₹8,000', description: 'Handcrafted welcome hampers for outstation guests.', isActive: true },
      ];
      await PackageAddon.insertMany(seedAddons);
      console.log('Default package addons auto-seeded successfully.');
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
