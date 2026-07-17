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
                <p className="text-neutral-500 text-sm">Our friendly team is available Monday to Saturday, 7am–6pm.</p>
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
