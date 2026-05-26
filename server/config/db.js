import mongoose from 'mongoose';
import User from '../models/User.js';
import TeamMember from '../models/TeamMember.js';
import EventPackage from '../models/EventPackage.js';
import PackageAddon from '../models/PackageAddon.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import Hero from '../models/Hero.js';
import Gallery from '../models/Gallery.js';

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
    } else {
      // Automatically update legacy "BE5 Admin" to "B5 Admin"
      const legacyAdmin = await User.findOne({ name: 'BE5 Admin' });
      if (legacyAdmin) {
        legacyAdmin.name = 'B5 Admin';
        await legacyAdmin.save();
        console.log('Successfully updated legacy admin user name from BE5 Admin to B5 Admin');
      }
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

    // Auto-seed services if none exists
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log('No services found in database. Seeding default services...');
      const seedServices = [
        {
          title: 'Wedding Planning',
          description: 'End-to-end wedding management – venue, decor, catering, guest coordination, and more.',
          priceRange: '₹6L – ₹50L+',
          imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_service_wedding',
          includes: ['Venue booking', 'Catering', 'Decor', 'Makeup', 'Entertainment', 'Transport'],
          popularAddOn: 'Drone cinematography',
          pastEvent: 'Anjali & Rohit – Udaipur Wedding (Premium Package)',
          isActive: true
        },
        {
          title: 'Pre-Wedding Shoot',
          description: 'Capture your love story before the big day. Local, destination, or cinematic.',
          priceRange: '₹25k – ₹3L',
          imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_service_prewedding',
          includes: ['Photographer', 'HD photos', 'Drone (optional)', 'Album design'],
          popularAddOn: 'Behind-the-scenes reel',
          pastEvent: 'Neha & Vikram – Jaipur Pre-Wedding (Drone included)',
          isActive: true
        },
        {
          title: 'Engagement Ceremony',
          description: 'Ring ceremonies, surprise proposals, and roka celebrations.',
          priceRange: '₹3L – ₹12L',
          imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_service_engagement',
          includes: ['Venue', 'Photography', 'Catering', 'Decor', 'Return gifts'],
          popularAddOn: 'Surprise proposal coordination',
          pastEvent: 'Priya & Karan – Surprise Rooftop Proposal',
          isActive: true
        },
        {
          title: 'Corporate Events',
          description: 'Product launches, annual galas, conferences, and team offsites.',
          priceRange: '₹5L – ₹25L+',
          imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_service_corporate',
          includes: ['AV setup', 'Stage design', 'Catering', 'Guest management', 'Branding'],
          popularAddOn: 'Celebrity speaker booking',
          pastEvent: 'TechCorp Annual Gala – 800 guests',
          isActive: true
        },
        {
          title: 'Small Functions',
          description: 'Birthdays, anniversaries, baby showers, and retirement parties.',
          priceRange: '₹1L – ₹8L',
          imageUrl: 'https://media.istockphoto.com/id/583736396/photo/wedding-hall-or-other-function-facility-set-for-fine-dining.jpg?s=612x612&w=0&k=20&c=gPoRBCkB-wGxvb_BI1vUyjiVryaOjnHhB8RSS4EZmog=',
          cloudinaryId: 'seeded_service_small',
          includes: ['Theme decor', 'Cake', 'Photography', 'Return gifts', 'Entertainment'],
          popularAddOn: 'Themed Photo Booth',
          pastEvent: "Rohan's 1st Birthday – Jungle Theme (45 guests, ₹3.2L)",
          isActive: true
        }
      ];
      await Service.insertMany(seedServices);
      console.log('Default services auto-seeded successfully.');
    }

    // Auto-seed portfolio items if none exists
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      console.log('No portfolio items found in database. Seeding default portfolios...');
      const seedPortfolios = [
        { title: 'Grand Wedding Reception', category: 'wedding', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', cloudinaryId: 'seeded_portfolio_1' },
        { title: 'Tech Corporate Gala', category: 'corporate', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', cloudinaryId: 'seeded_portfolio_2' },
        { title: 'College Cultural Fest', category: 'college', imageUrl: 'https://i.pinimg.com/1200x/0f/e9/84/0fe984a1e10c7394f44b6b396cea17a5.jpg', cloudinaryId: 'seeded_portfolio_3' },
        { title: 'Luxury Birthday Bash', category: 'party', imageUrl: 'https://i.pinimg.com/1200x/9d/5b/e4/9d5be4eb8bea1c525e7a1868ef731a95.jpg', cloudinaryId: 'seeded_portfolio_4' },
        { title: 'Smartphone Launch Event', category: 'product', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80', cloudinaryId: 'seeded_portfolio_5' },
        { title: 'Elegant Engagement', category: 'wedding', imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', cloudinaryId: 'seeded_portfolio_6' },
        { title: 'Annual Sports Meet', category: 'college', imageUrl: 'https://www.nafl.in/img/2024-2025/events/annual-sports-day-2024-2025/annual-sports-day-2024-2025-1-lg.jpg', cloudinaryId: 'seeded_portfolio_7' },
        { title: 'Startup Networking Night', category: 'corporate', imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', cloudinaryId: 'seeded_portfolio_8' },
        { title: 'Theme Anniversary Party', category: 'party', imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80', cloudinaryId: 'seeded_portfolio_9' }
      ];
      await Portfolio.insertMany(seedPortfolios);
      console.log('Default portfolio items auto-seeded successfully.');
    }

    // Auto-seed Hero configuration if none exists
    const heroCount = await Hero.countDocuments();
    if (heroCount === 0) {
      console.log('No hero configuration found in database. Seeding default hero...');
      const seedHero = new Hero({
        leftImageUrl: 'https://images.unsplash.com/photo-1530023367847-a683933f4172',
        leftImageCloudinaryId: 'seeded_hero_left',
        rightImageUrl: 'https://www.bfivewarriors.com/assets/images/gallery/image16.png',
        rightImageCloudinaryId: 'seeded_hero_right',
        badgeText: '✨ WE DESIGN. YOU CELEBRATE.',
        title: 'Where Every Event Becomes a Story',
        subtitle: 'Weddings • Engagements • Birthdays • Anniversaries • Corporate Events',
        ctaPrimaryText: 'Start Planning',
        ctaPrimaryLink: '#contact',
        ctaSecondaryText: 'View Packages',
        ctaSecondaryLink: '/packages',
      });
      await seedHero.save();
      console.log('Default hero section config auto-seeded successfully.');
    }

    // Auto-seed gallery items if none exists
    await Gallery.deleteMany({ cloudinaryId: { $regex: /^seeded_gallery_/ } });
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      console.log('No gallery items found in database. Seeding default gallery...');
      const seedGallery = [
        {
          title: 'Udaipur Gala 1',
          category: 'Wedding',
          imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
          cloudinaryId: 'seeded_gallery_1',
          span: 'col-span-1 md:col-span-2 row-span-2',
          order: 0
        },
        {
          title: 'Udaipur Gala 2',
          category: 'Wedding',
          imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_gallery_2',
          span: 'col-span-1 row-span-1',
          order: 1
        },
        {
          title: 'Udaipur Gala 3',
          category: 'Wedding',
          imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_gallery_3',
          span: 'col-span-1 row-span-1',
          order: 2
        },
        {
          title: 'Udaipur Gala 4',
          category: 'Corporate',
          imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_gallery_4',
          span: 'col-span-1 md:col-span-2 row-span-1',
          order: 3
        },
        {
          title: 'Udaipur Gala 5',
          category: 'Wedding',
          imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_gallery_5',
          span: 'col-span-1 row-span-2',
          order: 4
        },
        {
          title: 'Udaipur Gala 6',
          category: 'Corporate',
          imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_gallery_6',
          span: 'col-span-1 row-span-1',
          order: 5
        },
        {
          title: 'Udaipur Gala 7',
          category: 'Private Party',
          imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
          cloudinaryId: 'seeded_gallery_7',
          span: 'col-span-1 row-span-1',
          order: 6
        },
        {
          title: 'Udaipur Gala 8',
          category: 'Corporate',
          imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
          cloudinaryId: 'seeded_gallery_8',
          span: 'col-span-1 md:col-span-3 row-span-2',
          order: 7
        }
      ];
      await Gallery.insertMany(seedGallery);
      console.log('Default gallery items auto-seeded successfully.');
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
