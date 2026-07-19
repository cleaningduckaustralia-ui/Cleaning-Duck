require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const Settings = require('../models/Settings');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding...');
};

// ─── SEED DATA (All extracted from cleaningduckaustralia.com.au) ─────────────

const services = [
  {
    title: 'Bond Cleaning / End of Lease Cleaning',
    slug: 'bond-cleaning',
    shortDescription: 'Comprehensive end-of-lease cleaning to help you get your full bond back. We cover every corner of your property to meet real estate inspection standards.',
    longDescription: '<p>Moving out can be stressful. Our professional bond cleaning team ensures your rental property is returned to its original condition, giving you the best chance of a full bond refund. We follow a detailed checklist that meets the requirements of real estate agents across Brisbane, Logan, Ipswich, Gold Coast, and the Sunshine Coast.</p>',
    features: [
      'Full kitchen deep clean including oven, stove, rangehood, and cupboards',
      'Bathroom and toilet scrubbing and sanitising',
      'All windows, tracks, and sills cleaned inside',
      'Walls spot-cleaned for marks and scuffs',
      'Carpet steam cleaning included (or quoted separately)',
      'Detailed checklist matching real estate standards',
      'Garage, balcony, and outdoor areas if applicable',
    ],
    benefits: ['Get your full bond back', 'Real estate-approved checklist', 'Fully insured team', 'Free re-clean if inspection fails'],
    icon: 'fa-house',
    pricing: { from: 'Call for quote', displayText: 'Free Quote', included: ['REIQ-compliant checklist', 'Oven clean', 'Carpet steam clean'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'What is included in bond cleaning?', answer: 'Our bond clean covers kitchen (oven, stovetop, rangehood, cupboards), bathrooms, toilets, all rooms, windows (inside), walls (spot clean), and floors. Carpet steam cleaning can be added separately.' },
      { question: 'Do you guarantee my bond back?', answer: 'We offer a re-clean guarantee — if your property manager is not satisfied with any area, we return within 72 hours to re-clean that area at no extra cost.' },
    ],
    order: 1,
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Bond Cleaning Brisbane | End of Lease Cleaning | Cleaning Duck Australia',
      description: 'Professional bond cleaning in Brisbane, Logan, Ipswich & Gold Coast. REIQ-approved checklist, bond-back guarantee. Free quote — call 0412 664 540.',
      keywords: ['bond cleaning Brisbane', 'end of lease cleaning Brisbane', 'bond back cleaning', 'end of tenancy cleaning Brisbane'],
      speakable: ['.service-description', '.service-features'],
    },
  },
  {
    title: 'Carpet Steam Cleaning',
    slug: 'carpet-cleaning',
    shortDescription: 'Commercial-grade hot water extraction that lifts deep-set stains, allergens, and bacteria from carpets — leaving them fresh, soft, and dry within hours.',
    longDescription: '<p>Our carpet steam cleaning service uses powerful commercial hot water extraction equipment that penetrates deep into carpet fibres. We remove embedded dirt, pet hair, stains, allergens, and odours that regular vacuuming leaves behind. Whether you have heavily soiled rental carpets or just want to freshen up your home, we deliver outstanding results.</p>',
    features: [
      'Commercial hot water extraction (steam cleaning)',
      'Pre-treatment of heavy stains and high-traffic areas',
      'Pet hair and allergen removal',
      'Deodorising treatment available',
      'Fast dry times (typically 2–4 hours)',
      'Suitable for all carpet types including wool and berber',
      'Moving furniture on request',
    ],
    benefits: ['Removes 99% of bacteria', 'Extends carpet life', 'Eliminates pet odours', 'No harsh chemicals'],
    icon: 'fa-couch',
    pricing: { from: 'Call for quote', displayText: 'Free Quote', included: ['Hot water extraction', 'Pre-treatment', 'Deodorise'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'How long does carpet cleaning take?', answer: 'A typical 3-bedroom home takes 1.5–2.5 hours. Carpets are usually dry within 2–4 hours after cleaning.' },
      { question: 'Can you remove pet stains and odours?', answer: 'Yes! We use specialised enzyme-based pre-treatments that break down pet urine and odour at a molecular level.' },
    ],
    order: 2,
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Carpet Steam Cleaning Brisbane | Carpet Cleaning Service | Cleaning Duck Australia',
      description: 'Professional carpet steam cleaning in Brisbane & All over QLD. Pet stain removal, allergen treatment. Commercial-grade equipment. Free quote today.',
      keywords: ['carpet cleaning Brisbane', 'carpet steam cleaning Brisbane', 'carpet cleaner Brisbane', 'pet stain removal carpet'],
      speakable: ['.service-description', '.service-features'],
    },
  },
  {
    title: 'Upholstery Cleaning',
    slug: 'upholstery-cleaning',
    shortDescription: 'Deep clean for sofas, couches, armchairs, rugs, and curtains — restoring freshness and removing allergens without harsh chemicals.',
    longDescription: '<p>Our upholstery cleaning service breathes new life into your furniture. Using gentle but effective low-moisture cleaning methods, we remove dust, stains, pet hair, and allergens from your sofas, chairs, rugs, and curtains. We also offer convenient rug and curtain pick-up and drop-off service.</p>',
    features: [
      'Sofa and couch deep cleaning',
      'Armchair and recliner cleaning',
      'Rug cleaning (in-home or pick-up & drop-off)',
      'Curtain cleaning with pick-up and drop-off',
      'Pet hair removal and deodorising',
      'Fabric protection treatment available',
    ],
    benefits: ['Safe for all fabric types', 'No harsh chemical smell', 'Allergen-free result', 'Fast drying'],
    icon: 'fa-chair',
    pricing: { from: 'Call for quote', displayText: 'Free Quote', included: ['Sofa clean', 'Pet hair removal', 'Deodorise'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'How long does upholstery cleaning take?', answer: 'A typical 3-seater sofa takes 30–60 minutes. Most furniture is dry within 1–2 hours.' },
      { question: 'Do you offer curtain and rug pick-up?', answer: 'Yes! We offer a convenient pick-up and drop-off service for curtains and rugs across All over QLD.' },
    ],
    order: 3,
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Upholstery Cleaning Brisbane | Sofa & Couch Cleaning | Cleaning Duck Australia',
      description: 'Professional upholstery cleaning in Brisbane. Sofa, couch, rug & curtain cleaning. Pet hair and allergen removal. Book your free quote today.',
      keywords: ['upholstery cleaning Brisbane', 'sofa cleaning Brisbane', 'couch cleaning Brisbane'],
    },
  },
  {
    title: 'Exterior House Washing',
    slug: 'exterior-house-washing',
    shortDescription: 'Soft wash technology that safely removes mould, algae, dirt, and grime from all exterior surfaces including brick, render, weatherboard, and cladding.',
    longDescription: '<p>Our exterior house washing service uses low-pressure soft wash technology combined with biodegradable cleaning solutions to safely remove mould, algae, lichen, dirt, and grime from all exterior surfaces. Unlike high-pressure washing, soft washing will not damage your paint, render, or cladding.</p>',
    features: [
      'Soft wash technology — safe for all exterior surfaces',
      'Biodegradable mould and algae treatment',
      'Brick, render, weatherboard, and cladding cleaning',
      'Eaves, fascias, gutters (exterior), and downpipes',
      'Window frames and sills',
      'Before and after photos provided',
      'Long-lasting results',
    ],
    benefits: ['Safe for painted surfaces', 'Kills mould at root', 'Biodegradable solutions', 'Boosts kerb appeal'],
    icon: 'fa-house-chimney-window',
    pricing: { from: '$599', displayText: 'From $599', included: ['Soft wash treatment', 'Mould treatment', 'Before/after photos'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'What is the difference between soft washing and pressure washing?', answer: 'Soft washing uses low pressure (similar to a garden hose) combined with biodegradable solutions to kill and remove mould and algae. Pressure washing uses high force which can damage paint, render, and delicate surfaces.' },
    ],
    order: 4,
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Exterior House Washing Brisbane | Soft Wash Service | Cleaning Duck Australia',
      description: 'Professional exterior house washing in Brisbane from $599. Soft wash technology removes mould, algae & grime safely. Free quote — call 0412 664 540.',
      keywords: ['house washing Brisbane', 'exterior cleaning Brisbane', 'soft wash Brisbane', 'mould removal Brisbane'],
    },
  },
  {
    title: 'Roof Cleaning',
    slug: 'roof-cleaning',
    shortDescription: 'Professional soft wash roof cleaning with manual lichen scrubbing and biodegradable mould treatment — extending your roof\'s life and restoring appearance.',
    longDescription: '<p>Our specialist roof cleaning service uses a safe soft wash system combined with manual lichen scrubbing and a biodegradable mould and algae treatment that penetrates and kills at the root. This prevents rapid regrowth and extends the life of your roof tiles or metal sheeting significantly.</p>',
    features: [
      'Roof soft wash — low pressure, safe for tiles and metal',
      'Manual lichen scrubbing (where needed)',
      'Biodegradable mould and algae treatment',
      'Solar panel cleaning (water rinse)',
      'Gutter debris removal and downpipe flush',
      'Exterior wall pressure rinse',
      'Safety equipment — fully insured team',
    ],
    benefits: ['Extends roof life by 10+ years', 'Prevents regrowth', 'Improves insulation efficiency', 'Maintains property value'],
    icon: 'fa-house-chimney',
    pricing: { from: '$999', displayText: 'From $999', included: ['Soft wash', 'Lichen scrub', 'Mould treatment'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'Will pressure washing damage my roof tiles?', answer: 'We use soft wash — low pressure combined with professional cleaning solutions. We never high-pressure wash roof tiles as this removes the protective coating and causes premature aging.' },
      { question: 'How long does roof cleaning take?', answer: 'Most residential roofs are completed within half a day to a full day depending on size, pitch, and degree of soiling.' },
    ],
    order: 5,
    isActive: true,
    isFeatured: true,
    seo: {
      title: 'Roof Cleaning Brisbane | Soft Wash Roof Cleaning from $999 | Cleaning Duck Australia',
      description: 'Professional roof cleaning in Brisbane from $999. Soft wash, manual lichen scrubbing & biodegradable mould treatment. Free quote — call 0412 664 540.',
      keywords: ['roof cleaning Brisbane', 'roof wash Brisbane', 'lichen removal roof Brisbane', 'soft wash roof Brisbane'],
    },
  },
  {
    title: 'Pressure Cleaning',
    slug: 'pressure-cleaning',
    shortDescription: 'High-pressure cleaning for driveways, paths, pool areas, patios, and hard surfaces — blasting away oil stains, mould, algae, and years of grime.',
    longDescription: '<p>Our pressure cleaning service restores hard surfaces to like-new condition. We use commercial-grade pressure washing equipment to clean driveways, paths, pool surrounds, patios, steps, and retaining walls. Perfect for removing oil stains, rubber marks, mould, algae, and embedded dirt that surface cleaners simply cannot shift.</p>',
    features: [
      'Driveway pressure cleaning',
      'Path and footpath cleaning',
      'Pool surround and patio cleaning',
      'Steps and retaining walls',
      'Oil and rubber stain treatment (pre-treatment applied)',
      'Mould and algae removal',
      'Commercial-grade equipment',
    ],
    benefits: ['Instant visual transformation', 'Prevents slipping hazards', 'Increases property value', 'No chemical residue'],
    icon: 'fa-droplet',
    pricing: { from: '$333', displayText: 'Driveway from $333', included: ['Pressure wash', 'Pre-treatment', 'Edge blow-down'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'Can you remove oil stains from driveways?', answer: 'Yes! We apply a specialist degreaser pre-treatment before pressure washing which dramatically improves oil stain removal on concrete and pavers.' },
    ],
    order: 6,
    isActive: true,
    isFeatured: false,
    seo: {
      title: 'Pressure Cleaning Brisbane | Driveway Cleaning from $333 | Cleaning Duck Australia',
      description: 'Professional pressure cleaning in Brisbane. Driveways from $333. Oil stain removal, mould cleaning, patio and path washing. Free quote today.',
      keywords: ['pressure cleaning Brisbane', 'driveway cleaning Brisbane', 'pressure washing Brisbane', 'concrete cleaning Brisbane'],
    },
  },
  {
    title: 'Gutter Cleaning',
    slug: 'gutter-cleaning',
    shortDescription: 'Complete gutter debris removal with downpipe flushing — preventing water damage, roof leaks, and pest nesting in your gutters.',
    longDescription: '<p>Blocked gutters are one of the most common causes of water damage in Australian homes. Our gutter cleaning service removes all leaf litter, debris, and build-up from your gutters and flushes downpipes to ensure free-flowing drainage. We also check for and report on any gutter damage or sagging we observe.</p>',
    features: [
      'Full gutter debris removal by hand',
      'Downpipe flush to confirm clear flow',
      'Gutter inspection and report of any damage',
      'Roof surface debris removal',
      'Before and after photos provided',
      'Fully insured — working at heights certified',
    ],
    benefits: ['Prevents water damage', 'Avoids roof leaks', 'Deters pest nesting', 'Extends gutter life'],
    icon: 'fa-water',
    pricing: { from: '$169', displayText: 'From $169', included: ['Debris removal', 'Downpipe flush', 'Inspection report'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'How often should gutters be cleaned?', answer: 'We recommend cleaning gutters at least twice a year — ideally in autumn after leaf fall and in spring before the wet season. Properties near large trees may need quarterly cleaning.' },
    ],
    order: 7,
    isActive: true,
    isFeatured: false,
    seo: {
      title: 'Gutter Cleaning Brisbane | Downpipe Flushing from $169 | Cleaning Duck Australia',
      description: 'Professional gutter cleaning in Brisbane from $169. Debris removal, downpipe flushing & inspection report included. Book your free quote today.',
      keywords: ['gutter cleaning Brisbane', 'gutter cleaning Logan', 'downpipe flushing Brisbane', 'gutter clean Gold Coast'],
    },
  },
  {
    title: 'Solar Panel Cleaning',
    slug: 'solar-panel-cleaning',
    shortDescription: 'Specialist water rinse cleaning of solar panels to restore maximum energy efficiency — dirty panels can lose up to 25% of their output.',
    longDescription: '<p>Dirty solar panels can lose between 15–25% of their energy generation capacity due to dust, bird droppings, and pollution build-up. Our specialist solar panel cleaning uses pure water rinsing with no detergents or abrasives, leaving panels streak-free and generating at maximum efficiency.</p>',
    features: [
      'Pure water rinse — no detergents or abrasives',
      'Streak-free finish using deionised water',
      'Bird dropping and dust removal',
      'Safe — no roof walking where possible',
      'Can be combined with roof or gutter clean for savings',
      'Before and after production comparison advice',
    ],
    benefits: ['Restore 15–25% lost efficiency', 'No warranty-voiding chemicals', 'Extend panel lifespan', 'Save on electricity bills'],
    icon: 'fa-solar-panel',
    pricing: { from: '$18/panel', displayText: 'From $18 per panel', included: ['Pure water rinse', 'Streak-free finish', 'Bird dropping removal'] },
    serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
    faq: [
      { question: 'How often should solar panels be cleaned?', answer: 'We recommend cleaning solar panels every 6–12 months. In dusty areas or properties with many trees or birds, quarterly cleaning may be beneficial.' },
      { question: 'Do you use soap or chemicals on solar panels?', answer: 'No. We only use deionised pure water which leaves no residue or streaks and does not void your solar panel warranty.' },
    ],
    order: 8,
    isActive: true,
    isFeatured: false,
    seo: {
      title: 'Solar Panel Cleaning Brisbane | From $18 Per Panel | Cleaning Duck Australia',
      description: 'Professional solar panel cleaning in Brisbane from $18/panel. Pure water rinse restores up to 25% lost efficiency. Free quote — call 0412 664 540.',
      keywords: ['solar panel cleaning Brisbane', 'solar cleaning Brisbane', 'solar panel wash Brisbane', 'solar cleaning Gold Coast'],
    },
  },
];

const testimonials = [
  {
    name: 'Robert Roberto',
    rating: 5,
    review: 'Used Cleaning Duck Australia for carpet cleaning in Brisbane after moving out of a rental. The carpets were heavily soiled, but they managed to bring them back to life. Very professional service and easy to deal with.',
    service: 'Carpet Cleaning',
    location: 'Brisbane',
    source: 'Google',
    isActive: true,
    isFeatured: true,
    order: 1,
  },
  {
    name: 'Nischal Karki',
    rating: 5,
    review: "Booked Cleaning Duck Australia for a full clean including carpets, couch, plus rug and curtain hand cleaning with pick-up and drop-off. The quote was $800, and I thought it was expensive at first. After comparing with other companies, I realised it was actually reasonable. I'm extremely happy I chose them. The results were amazing, everything looks fresh, and the service was very professional. I wouldn't hesitate to recommend them.",
    service: 'Full Clean Package',
    location: 'Brisbane',
    source: 'Google',
    isActive: true,
    isFeatured: true,
    order: 2,
  },
  {
    name: 'Ada',
    rating: 5,
    review: 'Booked carpet cleaning in Brisbane for my home in Annerley and I\'m very satisfied with the results. The team was on time, worked efficiently, and removed old stains I couldn\'t get rid of myself. Great service overall.',
    service: 'Carpet Cleaning',
    location: 'Annerley, Brisbane',
    source: 'Google',
    isActive: true,
    isFeatured: true,
    order: 3,
  },
  {
    name: 'Tommy',
    rating: 5,
    review: 'I used Cleaning Duck Australia for upholstery cleaning in Coorparoo, and the difference is huge. My couch looks clean, feels soft, and no harsh smell at all. The whole experience was smooth and hassle-free.',
    service: 'Upholstery Cleaning',
    location: 'Coorparoo, Brisbane',
    source: 'Google',
    isActive: true,
    isFeatured: true,
    order: 4,
  },
  {
    name: 'Abishekh Oad',
    rating: 5,
    review: "Booked them to clean our sofa and rug, and the results were excellent. They removed all the pet hair and stains without leaving any strong smell. Really impressed.",
    service: 'Upholstery Cleaning',
    location: 'Brisbane',
    source: 'Google',
    isActive: true,
    isFeatured: false,
    order: 5,
  },
];

const faqs = [
  {
    question: 'What areas do you service?',
    answer: 'Cleaning Duck Australia provides cleaning services throughout Brisbane, Logan, Ipswich, Gold Coast, and the Sunshine Coast. Our team works with homeowners, tenants, landlords, and businesses across All over QLD.',
    category: 'areas',
    order: 1,
    isActive: true,
    isFeatured: true,
  },
  {
    question: 'How do I get a quote?',
    answer: 'Getting a quote is easy! You can submit a request through our online quote form, call us on 0412 664 540 or 0430 614 643, or send us an email. We typically respond within 2 business hours.',
    category: 'booking',
    order: 2,
    isActive: true,
    isFeatured: true,
  },
  {
    question: 'Are you insured?',
    answer: 'Yes, Cleaning Duck Australia is fully insured with public liability insurance. Our team members are background-checked and professionally trained.',
    category: 'general',
    order: 3,
    isActive: true,
    isFeatured: true,
  },
  {
    question: 'Do you charge extra for weekend or evening bookings?',
    answer: 'We offer flexible time slots including morning, evening, and weekends. Please contact us for weekend and after-hours pricing.',
    category: 'pricing',
    order: 4,
    isActive: true,
    isFeatured: true,
  },
  {
    question: 'Do you bring your own cleaning equipment and products?',
    answer: 'Yes! We arrive fully equipped with all professional cleaning products and commercial-grade equipment. You don\'t need to provide anything.',
    category: 'general',
    order: 5,
    isActive: true,
    isFeatured: true,
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We ask for at least 24 hours notice for cancellations or rescheduling. Late cancellations may incur a fee. Please contact us as soon as possible if you need to change your booking.',
    category: 'booking',
    order: 6,
    isActive: true,
    isFeatured: false,
  },
  {
    question: 'How long have you been operating?',
    answer: 'Cleaning Duck Australia has been serving All over QLD since 2024. We are proud to be trusted by over 500 happy clients and have completed more than 2,000 jobs.',
    category: 'general',
    order: 7,
    isActive: true,
    isFeatured: false,
  },
  {
    question: 'Do you offer regular cleaning schedules?',
    answer: 'Yes! We offer weekly, fortnightly, and monthly cleaning schedules for both residential and commercial clients. Regular clients receive priority booking and discounted rates.',
    category: 'booking',
    order: 8,
    isActive: true,
    isFeatured: false,
  },
];

const siteSettings = [
  { key: 'site_name', value: 'Cleaning Duck Australia', group: 'general', label: 'Site Name', isPublic: true },
  { key: 'site_tagline', value: 'Professional Cleaning Services In Brisbane & All over QLD', group: 'general', label: 'Tagline', isPublic: true },
  { key: 'abn', value: '89 383 045 240', group: 'general', label: 'ABN', isPublic: true },
  { key: 'phone_primary', value: '0412 664 540', group: 'contact', label: 'Primary Phone', isPublic: true },
  { key: 'phone_secondary', value: '0430 614 643', group: 'contact', label: 'Secondary Phone', isPublic: true },
  { key: 'email_contact', value: 'info@cleaningduckaustralia.com.au', group: 'contact', label: 'Contact Email', isPublic: true },
  { key: 'address', value: 'Brisbane, Queensland, Australia', group: 'contact', label: 'Address', isPublic: true },
  { key: 'service_areas', value: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'], group: 'general', label: 'Service Areas', isPublic: true },
  { key: 'business_hours', value: 'Mon–Sat: 7:00am – 6:00pm | Sun: By appointment', group: 'general', label: 'Business Hours', isPublic: true },
  { key: 'google_reviews_count', value: '18', group: 'general', label: 'Google Reviews Count', isPublic: true },
  { key: 'google_rating', value: '5.0', group: 'general', label: 'Google Rating', isPublic: true },
  { key: 'google_place_id', value: 'ChIJIyityxQbHwQR55-2nOHlIwE', group: 'general', label: 'Google Place ID', isPublic: true },
  { key: 'stats_jobs', value: '2000+', group: 'general', label: 'Jobs Completed', isPublic: true },
  { key: 'stats_technicians', value: '10+', group: 'general', label: 'Expert Technicians', isPublic: true },
  { key: 'stats_clients', value: '2500+', group: 'general', label: 'Satisfied Clients', isPublic: true },
  { key: 'facebook_url', value: '', group: 'social', label: 'Facebook URL', isPublic: true },
  { key: 'instagram_url', value: '', group: 'social', label: 'Instagram URL', isPublic: true },
  { key: 'whatsapp_number', value: '61412664540', group: 'contact', label: 'WhatsApp Number (international)', isPublic: true },
  { key: 'footer_text', value: '© 2024 Cleaning Duck Australia. ABN 89 383 045 240. All rights reserved.', group: 'general', label: 'Footer Copyright Text', isPublic: true },
  { key: 'seo_default_title', value: 'Professional Cleaning Services In Brisbane | Free Quote | Cleaning Duck Australia', group: 'seo', label: 'Default SEO Title', isPublic: false },
  { key: 'seo_default_description', value: 'Need reliable cleaning services in Brisbane? We offer carpet, roof, upholstery & house cleaning. Get your free quote today. Call 0412 664 540.', group: 'seo', label: 'Default Meta Description', isPublic: false },
];

// ─── Seeder Function ──────────────────────────────────────────────────────────

const seedDB = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
      FAQ.deleteMany({}),
      Settings.deleteMany({}),
    ]);

    // Create admin user
    console.log('Creating admin user...');
    await User.create({
      name: 'Cleaning Duck Admin',
      email: process.env.ADMIN_EMAIL || 'admin@cleaningduckaustralia.com.au',
      password: process.env.ADMIN_PASSWORD || 'Admin@CDA2024!',
      role: 'superadmin',
    });

    // Seed all data
    console.log('Seeding services...');
    await Service.insertMany(services);

    console.log('Seeding testimonials...');
    await Testimonial.insertMany(testimonials);

    console.log('Seeding FAQs...');
    await FAQ.insertMany(faqs);

    console.log('Seeding settings...');
    await Settings.insertMany(siteSettings);

    console.log('\n✅ Database seeded successfully!');
    console.log(`   Admin email: ${process.env.ADMIN_EMAIL || 'admin@cleaningduckaustralia.com.au'}`);
    console.log(`   Admin password: ${process.env.ADMIN_PASSWORD || 'Admin@CDA2024!'}`);
    console.log(`   Services: ${services.length}`);
    console.log(`   Testimonials: ${testimonials.length}`);
    console.log(`   FAQs: ${faqs.length}`);
    console.log(`   Settings: ${siteSettings.length}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDB();
