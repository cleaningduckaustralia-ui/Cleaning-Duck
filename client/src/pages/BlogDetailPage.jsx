import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import { generateBreadcrumbSchema, generateBlogPostingSchema } from '../utils/seoData';
import api from '../services/api';
import { BRAND } from '../utils/constants';
import { publicAsset } from '../utils/pathHelpers';

// Map blog tags to contextually relevant photos
const getBlogImage = (blog) => {
  if (blog.featuredImage?.url) return blog.featuredImage.url;
  const tags = (blog.tags || []).map(t => t.toLowerCase()).join(' ');
  if (tags.includes('carpet')) return publicAsset('/images/Carpet cleaning/PHOTO-2026-02-09-16-12-53.jpg');
  if (tags.includes('upholstery') || tags.includes('sofa')) return publicAsset('/images/Upholstery/PHOTO-2026-02-09-16-11-51.jpg');
  if (tags.includes('bond') || tags.includes('lease') || tags.includes('moving')) return publicAsset('/images/BondEnd of lease/IMG_3067.jpg');
  if (tags.includes('roof')) return publicAsset('/images/Exterior Roof/IMG_2788.PNG');
  if (tags.includes('gutter')) return publicAsset('/images/Exterior Gutter/29768303-e678-4624-aba9-ed2acb7d2dd7.JPG');
  if (tags.includes('solar')) return publicAsset('/images/Exterior Solar/05a118f6-76ce-4a1e-a0c6-5aa514cca7e3.JPG');
  if (tags.includes('driveway') || tags.includes('pressure')) return publicAsset('/images/Exterior Drivwway/80fff1e8-5098-4dde-ad47-45b979652525.JPG');
  if (tags.includes('post') || tags.includes('construction')) return publicAsset('/images/Post construction/IMG_3239.jpg');
  if (tags.includes('pre-sale') || tags.includes('presale') || tags.includes('real estate')) return publicAsset('/images/Presale/IMG_3341.jpg');
  if (tags.includes('exterior') || tags.includes('house wash')) return publicAsset('/images/exterior-house.jpg');
  return publicAsset('/images/BondEnd of lease/IMG_2811.jpg');
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`);
        setBlog(data.data);
        
        // Fetch recent blogs for the sidebar
        const recentRes = await api.get('/blogs?limit=3');
        setRecentBlogs(recentRes.data.data.filter(b => b.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch blog', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!blog) return <Navigate to="/blog" replace />;

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: blog.title, path: `/blog/${blog.slug}` },
  ]);

  const blogImage = getBlogImage(blog);
  const blogPosting = generateBlogPostingSchema(blog, blogImage);
  const seoTitle = blog.seo?.title || blog.title;
  const seoDescription = blog.seo?.description || blog.excerpt || blog.title;
  const seoKeywords = blog.seo?.keywords || blog.tags || [];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage={blogImage}
        canonical={`/blog/${blog.slug}`}
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt || blog.createdAt}
        structuredData={[breadcrumb, blogPosting]}
        type="article"
      />

      {/* Hero Section */}
      <div className="relative min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getBlogImage(blog)}
            alt={blog.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        
        <div className="container-custom relative z-10 pb-16 pt-36">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-orange-300 line-clamp-1">{blog.title}</li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {blog.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {blog.tags.map(tag => (
                  <span key={tag} className="bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {blog.author?.name?.charAt(0) || 'C'}
                </span>
                <span>{blog.author?.name || 'Cleaning Duck'}</span>
              </div>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span>{blog.views || 0} Views</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left - Article */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-soft border border-neutral-100">
                <div 
                  className="prose prose-lg md:prose-xl max-w-none prose-headings:text-neutral-800 prose-a:text-orange-600 hover:prose-a:text-orange-500 prose-img:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Share block */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-bold text-neutral-700">Share this article:</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                  f
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:-translate-y-1 transition-transform">
                  t
                </a>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-8">
              {/* Quick Quote Widget */}
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #7c3200, #c05411)' }}>
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-3">Need Professional Cleaning?</h3>
                  <p className="text-white/80 text-sm mb-6">Get your home or business looking pristine with our expert team.</p>
                  <Link to="/request-quote" className="block w-full text-center bg-white text-orange-700 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
                    Request Free Quote
                  </Link>
                  <a href={BRAND.phoneHref.primary} className="block w-full text-center text-white border border-white/30 font-bold py-3 rounded-xl mt-3 hover:bg-white/10 transition-colors">
                    📞 {BRAND.phone.primary}
                  </a>
                </div>
              </div>

              {/* Recent Posts */}
              {recentBlogs.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-soft border border-neutral-100">
                  <h3 className="font-bold text-lg text-neutral-800 mb-5">Recent Articles</h3>
                  <div className="space-y-5">
                    {recentBlogs.map(rb => (
                      <Link key={rb._id} to={`/blog/${rb.slug}`} className="group flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={getBlogImage(rb)} 
                            alt={rb.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-neutral-800 group-hover:text-orange-600 transition-colors line-clamp-2 mb-1">
                            {rb.title}
                          </h4>
                          <p className="text-xs text-neutral-400">
                            {new Date(rb.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
