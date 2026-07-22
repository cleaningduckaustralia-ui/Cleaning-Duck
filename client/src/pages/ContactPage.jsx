import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import api from '../services/api';
import { BRAND } from '../utils/constants';
import { generateBreadcrumbSchema } from '../utils/seoData';

const ContactPage = () => {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const breadcrumb = generateBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await api.post('/contacts', form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please call us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Cleaning Duck Australia Brisbane"
        description="Get in touch with Cleaning Duck Australia. Call 0412 664 540, WhatsApp, or fill our contact form. We respond within 2 business hours. Serving Brisbane & All over QLD."
        keywords={['contact cleaning duck australia', 'Brisbane cleaning service contact', 'cleaning quote Brisbane']}
        canonical="/contact"
        structuredData={[breadcrumb]}
      />

      <div className="page-hero">
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-white/70 text-lg">
            We're here to help — reach out any way you prefer.
          </motion.p>
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-white/80">Contact</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Get In Touch</h2>
                <p className="text-neutral-500 text-sm">Our friendly team is available Monday to Saturday, 7am–5pm.</p>
              </div>

              {[
                { icon: '📞', label: 'Primary Phone', value: BRAND.phone.primary, href: BRAND.phoneHref.primary },
                { icon: '📞', label: 'Secondary Phone', value: BRAND.phone.secondary, href: BRAND.phoneHref.secondary },
                { icon: '📧', label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: BRAND.whatsapp },
                { icon: '📍', label: 'Location', value: BRAND.address, href: BRAND.googleMapsUrl },
              ].map(({ icon, label, value, href }) => (
                <a key={value} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-card transition-all group">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium">{label}</div>
                    <div className="text-neutral-800 font-semibold text-sm group-hover:text-primary transition-colors">{value}</div>
                  </div>
                </a>
              ))}

              <div className="p-5 rounded-2xl bg-primary text-white">
                <div className="font-semibold mb-1">Business Hours</div>
                <div className="text-white/70 text-sm">{BRAND.businessHours}</div>
                <div className="text-white/70 text-sm mt-1">Sunday: By appointment</div>
                <div className="text-xs text-white/50 mt-3">ABN {BRAND.abn}</div>
              </div>

              {/* Follow Us */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200">
                <div className="font-semibold text-neutral-800 mb-3">Follow Us</div>
                <div className="flex gap-3">
                  {[
                    { href: BRAND.social.facebook, label: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                    { href: BRAND.social.instagram, label: 'Instagram', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:opacity-90', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                    { href: BRAND.social.tiktok, label: 'TikTok', color: 'bg-neutral-900 hover:bg-neutral-700', icon: 'M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.18 1.12 1.22 2.67 1.95 4.3 2.15v3.91c-1.89-.01-3.74-.75-5.11-2.07v8.83c.09 4.31-3.14 8.08-7.44 8.44-4.52.54-8.77-2.65-9.36-7.14C-.15 13.56 2.65 8.92 7.15 8.3c1.78-.28 3.61.1 5.09 1.09V.02z' },
                  ].map(({ href, label, color, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {success ? (
                <div className="card text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                  <p className="text-neutral-500">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="btn-secondary mt-6">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card space-y-5" noValidate>
                  <h2 className="text-xl font-bold text-primary">Send Us a Message</h2>
                  {apiError && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{apiError}</div>}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label" htmlFor="name">Your Name *</label>
                      <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={`form-input ${errors.name ? 'border-red-400' : ''}`} placeholder="John Smith" />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="form-label" htmlFor="phone">Phone</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="form-input" placeholder="04XX XXX XXX" />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={`form-input ${errors.email ? 'border-red-400' : ''}`} placeholder="john@example.com" />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} className="form-input" placeholder="What's this about?" />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="message">Message *</label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`} rows={5} placeholder="How can we help you?" />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full btn-lg">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="text-xs text-neutral-400 text-center">Need a quote instead? <Link to="/request-quote" className="text-primary font-medium hover:underline">Submit a quote request →</Link></p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
