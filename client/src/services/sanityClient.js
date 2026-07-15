import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// WARNING: You must replace 'YOUR_PROJECT_ID_HERE' with your actual Sanity project ID
export const client = createClient({
  projectId: 'lxbafr20',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
