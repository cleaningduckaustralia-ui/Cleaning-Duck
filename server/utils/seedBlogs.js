const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');

// Load env vars
dotenv.config({ path: __dirname + '/../.env' });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogs = [
  {
    title: '5 Reasons Why Bond Cleaning is Essential Before Moving Out',
    slug: '5-reasons-bond-cleaning-essential',
    content: '<p>Moving out can be stressful, but ensuring you get your bond back doesn\'t have to be. Here are five reasons why hiring professional bond cleaners is a game-changer...</p><ul><li>Guaranteed bond return</li><li>Saves you hours of scrubbing</li><li>Professional equipment yields better results</li><li>Less stress during the move</li><li>Real estate agents prefer professional cleans</li></ul>',
    excerpt: 'Discover why professional bond cleaning is the secret to a stress-free move and getting your full deposit back.',
    tags: ['Bond Cleaning', 'Moving', 'Tips'],
    isPublished: true,
    author: 'Admin',
    seo: {
      title: '5 Reasons Bond Cleaning is Essential | Cleaning Duck',
      description: 'Discover why professional bond cleaning is the secret to a stress-free move and getting your full deposit back.',
      keywords: ['bond cleaning', 'moving out', 'brisbane']
    }
  },
  {
    title: 'The Ultimate Guide to Stain Removal for Carpets',
    slug: 'ultimate-guide-carpet-stain-removal',
    content: '<p>Spilled wine? Pet accidents? Muddy footprints? Don\'t panic. Here is the ultimate guide to removing common carpet stains before they set in permanently.</p><h3>1. Act Fast</h3><p>The quicker you treat a stain, the better...</p>',
    excerpt: 'Learn how to tackle the toughest carpet stains with everyday household items and know when it is time to call the pros.',
    tags: ['Carpet Cleaning', 'Stain Removal', 'DIY'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'How Often Should You Really Wash Your House Exterior?',
    slug: 'how-often-wash-house-exterior',
    content: '<p>Curb appeal matters, but exterior house washing is also about maintenance. Depending on where you live, you should wash your house every 1 to 2 years.</p>',
    excerpt: 'Find out the optimal frequency for exterior house washing to protect your paint and boost curb appeal.',
    tags: ['Exterior Cleaning', 'Home Maintenance'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'Why Soft Washing is Better for Your Roof',
    slug: 'why-soft-washing-better-for-roof',
    content: '<p>High pressure can damage roof tiles. Soft washing uses specialized solutions to kill algae and lichen at the root without the risk of damage.</p>',
    excerpt: 'Understand the difference between pressure washing and soft washing, and why the latter is crucial for roof longevity.',
    tags: ['Roof Cleaning', 'Soft Washing'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'The Hidden Dangers of Blocked Gutters',
    slug: 'hidden-dangers-blocked-gutters',
    content: '<p>Out of sight, out of mind? Blocked gutters can lead to severe water damage, structural issues, and even pest infestations. Here is why you must keep them clear.</p>',
    excerpt: 'Learn about the costly damages caused by blocked gutters and why regular cleaning is essential.',
    tags: ['Gutter Cleaning', 'Home Protection'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'Solar Panel Cleaning: Is It Worth It?',
    slug: 'solar-panel-cleaning-worth-it',
    content: '<p>Dirty solar panels can lose up to 30% of their efficiency. Regular cleaning ensures you are getting the most out of your solar investment.</p>',
    excerpt: 'Discover how much efficiency you lose with dirty solar panels and why regular cleaning pays for itself.',
    tags: ['Solar Cleaning', 'Energy Efficiency'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'Spring Cleaning Checklist: A Room-by-Room Guide',
    slug: 'spring-cleaning-checklist',
    content: '<p>Ready to refresh your home? Follow our comprehensive room-by-room spring cleaning checklist to ensure no corner is left untouched.</p>',
    excerpt: 'Tackle your spring cleaning effectively with our ultimate room-by-room guide.',
    tags: ['Spring Cleaning', 'Checklist'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'How to Maintain Your Upholstery Between Professional Cleans',
    slug: 'maintain-upholstery-between-cleans',
    content: '<p>Keep your sofas looking fresh and smelling great with these simple maintenance tips for your upholstery.</p>',
    excerpt: 'Simple tips and tricks to keep your furniture looking its best between professional deep cleans.',
    tags: ['Upholstery', 'Maintenance'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'Preparing Your Property for Sale: The Pre-Sale Clean',
    slug: 'preparing-property-for-sale-presale-clean',
    content: '<p>First impressions sell homes. A professional pre-sale clean can add thousands to your final sale price. Here is what it entails.</p>',
    excerpt: 'Why a flawless pre-sale clean is your best investment when putting your property on the market.',
    tags: ['Pre-sale Cleaning', 'Real Estate'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'Post-Construction Cleaning: Why You Need the Pros',
    slug: 'post-construction-cleaning-pros',
    content: '<p>Construction dust gets everywhere. Our specialized post-construction cleaning teams know exactly how to remove fine dust safely and efficiently.</p>',
    excerpt: 'Understand why builder’s cleans require specialized equipment and expertise compared to regular domestic cleaning.',
    tags: ['Construction Cleaning', 'Commercial'],
    isPublished: true,
    author: 'Admin'
  },
  {
    title: 'Eco-Friendly Cleaning Products: What We Use and Why',
    slug: 'eco-friendly-cleaning-products',
    content: '<p>We care about your health and the environment. That’s why we use biodegradable, eco-friendly cleaning products that are tough on dirt but gentle on the planet.</p>',
    excerpt: 'Learn about our commitment to eco-friendly cleaning and the safe products we use in your home.',
    tags: ['Eco-Friendly', 'Green Cleaning'],
    isPublished: true,
    author: 'Admin'
  }
];

const seedBlogs = async () => {
  try {
    const fs = require('fs');
    const path = require('path');
    const User = require('../models/User');
    
    // Load gallery images
    const galleryDataPath = path.join(__dirname, '../../client/src/data/galleryImages.json');
    let galleryImages = [];
    if (fs.existsSync(galleryDataPath)) {
      galleryImages = JSON.parse(fs.readFileSync(galleryDataPath, 'utf-8'));
    }

    const admin = await User.findOne({ role: 'admin' });
    const authorId = admin ? admin._id : new mongoose.Types.ObjectId();
    
    const blogsWithAuthorAndImage = blogs.map(b => {
      // Find a matching image from gallery based on tags
      let match = null;
      if (galleryImages.length > 0) {
        if (b.tags.includes('Bond Cleaning')) match = galleryImages.find(i => i.category.includes('Bond'));
        if (b.tags.includes('Carpet Cleaning')) match = galleryImages.find(i => i.category.includes('Carpet'));
        if (b.tags.includes('Exterior Cleaning')) match = galleryImages.find(i => i.category.includes('House'));
        if (b.tags.includes('Roof Cleaning')) match = galleryImages.find(i => i.category.includes('Roof'));
        if (b.tags.includes('Gutter Cleaning')) match = galleryImages.find(i => i.category.includes('Gutter'));
        if (b.tags.includes('Solar Cleaning')) match = galleryImages.find(i => i.category.includes('Solar'));
        if (b.tags.includes('Upholstery')) match = galleryImages.find(i => i.category.includes('Upholstery'));
        if (b.tags.includes('Pre-sale Cleaning')) match = galleryImages.find(i => i.category.includes('Presale'));
        if (b.tags.includes('Construction Cleaning')) match = galleryImages.find(i => i.category.includes('construction'));
      }
      
      return {
        ...b, 
        author: authorId,
        featuredImage: match ? { url: match.src, altText: b.title } : undefined
      };
    });
    
    await Blog.deleteMany();
    await Blog.insertMany(blogsWithAuthorAndImage);
    console.log('Blogs Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBlogs();
