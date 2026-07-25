/**
 * Transforms Cloudinary URLs on the fly to add parameters for width, quality, and format.
 * Example input: https://res.cloudinary.com/demo/image/upload/v123456/sample.jpg
 * Example output: https://res.cloudinary.com/demo/image/upload/w_800,q_auto,f_auto/v123456/sample.jpg
 */
export const cdnUrl = (url, { width = 800, quality = 'auto', format = 'auto' } = {}) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  
  // Replace HTTP with HTTPS if needed
  let secureUrl = url.replace(/^http:/, 'https:');
  
  // Apply Cloudinary optimization tags
  if (secureUrl.includes('/upload/')) {
    return secureUrl.replace('/upload/', `/upload/w_${width},q_${quality},f_${format}/`);
  }
  
  return secureUrl;
};
