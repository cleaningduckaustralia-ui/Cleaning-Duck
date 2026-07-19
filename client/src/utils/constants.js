// Brand constants (extracted from cleaningduckaustralia.com.au)
export const BRAND = {
  name: 'Cleaning Duck Australia',
  tagline: 'Professional Cleaning Services In Brisbane & All over QLD',
  abn: '89 383 045 240',
  phone: { primary: '0412 664 540', secondary: '0430 614 643' },
  phoneHref: { primary: 'tel:0412664540', secondary: 'tel:0430614643' },
  whatsapp: 'https://wa.me/61412664540',
  email: 'info@cleaningduckaustralia.com.au',
  address: 'Brisbane, Queensland, Australia',
  businessHours: 'Mon–Sat: 7:00am – 6:00pm',
  serviceAreas: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast', 'Sunshine Coast'],
  googleMapsUrl: 'https://maps.google.com/?q=Cleaning+Duck+Australia+Brisbane',
  googleReviewUrl: 'https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJIyityxQbHwQR55-2nOHlIwE',
  logoUrl: 'https://cleaningduckaustralia.com.au/wp-content/uploads/2025/12/cropped-Untitled-design23-270x270.png',
};

export const STATS = [
  { value: 700, suffix: '+', label: 'Jobs Completed' },
  { value: 10,   suffix: '+', label: 'Expert Technicians' },
  { value: 700, suffix: '+', label: 'Satisfied Clients' },
  { value: 5,    suffix: '★', label: 'Google Rating' },
];

export const SERVICE_SLUGS = [
  'bond-cleaning',
  'carpet-cleaning',
  'upholstery-cleaning',
  'exterior-house-washing',
  'roof-cleaning',
  'pressure-cleaning',
  'gutter-cleaning',
  'solar-panel-cleaning',
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    // grouped: true means the dropdown renders with section headings
    grouped: true,
    groups: [
      {
        heading: 'Interior',
        icon: '🏠',
        items: [
          { label: 'Carpet Cleaning',     href: '/services/carpet-cleaning' },
          { label: 'Upholstery Cleaning', href: '/services/upholstery-cleaning' },
        ],
      },
      {
        heading: 'Exterior',
        icon: '🏡',
        items: [
          { label: 'Roof Washing',               href: '/services/roof-cleaning' },
          { label: 'House Washing',              href: '/services/exterior-house-washing' },
          { label: 'Solar Cleaning',             href: '/services/solar-panel-cleaning' },
          { label: 'Driveway Pressure Washing',  href: '/services/pressure-cleaning' },
          { label: 'Gutter Cleaning',            href: '/services/gutter-cleaning' },
        ],
      },
      {
        heading: 'Packages',
        icon: '📦',
        items: [
          { label: 'P1 – The High Duck',   href: '/packages/high-duck' },
          { label: 'P2 – The Ground Duck', href: '/packages/ground-duck' },
          { label: 'P3 – The Full Duck',   href: '/packages/full-duck' },
        ],
      },
      {
        heading: 'Specialised',
        icon: '✨',
        items: [
          { label: 'End of Lease / Bond Cleaning', href: '/services/end-of-lease-cleaning' },
          { label: 'Post Construction Cleaning',   href: '/services/post-construction-cleaning' },
          { label: 'Pre Sale Cleaning',            href: '/services/pre-sale-cleaning' },
        ],
      },
    ],
    // flat children kept for mobile menu fallback
    children: [
      { label: 'Carpet Cleaning',               href: '/services/carpet-cleaning' },
      { label: 'Upholstery Cleaning',           href: '/services/upholstery-cleaning' },
      { label: 'Roof Washing',                  href: '/services/roof-cleaning' },
      { label: 'House Washing',                 href: '/services/exterior-house-washing' },
      { label: 'Solar Cleaning',                href: '/services/solar-panel-cleaning' },
      { label: 'Driveway Pressure Washing',     href: '/services/pressure-cleaning' },
      { label: 'Gutter Cleaning',               href: '/services/gutter-cleaning' },
      { label: 'P1 – The High Duck',            href: '/packages/high-duck' },
      { label: 'P2 – The Ground Duck',          href: '/packages/ground-duck' },
      { label: 'P3 – The Full Duck',            href: '/packages/full-duck' },
      { label: 'End of Lease / Bond Cleaning',  href: '/services/end-of-lease-cleaning' },
      { label: 'Post Construction Cleaning',    href: '/services/post-construction-cleaning' },
      { label: 'Pre Sale Cleaning',             href: '/services/pre-sale-cleaning' },
    ],
  },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
];

export const PROPERTY_TYPES = [
  { value: 'house',      label: 'House' },
  { value: 'apartment',  label: 'Apartment / Unit' },
  { value: 'townhouse',  label: 'Townhouse' },
  { value: 'commercial', label: 'Commercial Property' },
  { value: 'other',      label: 'Other' },
];

export const SERVICE_OPTIONS = [
  'Bond Cleaning / End of Lease',
  'Carpet Steam Cleaning',
  'Upholstery Cleaning',
  'Exterior House Washing',
  'Roof Cleaning',
  'Pressure Cleaning',
  'Gutter Cleaning',
  'Solar Panel Cleaning',
  'Full Duck Package',
  'Multiple Services',
];

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
