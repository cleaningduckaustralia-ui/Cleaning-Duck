import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import api from '../../services/api';
import { BRAND, SERVICE_OPTIONS, PROPERTY_TYPES } from '../../utils/constants';

const initialState = {
  fullName: '', email: '', phone: '', service: '', propertyType: '',
  bedrooms: '', bathrooms: '', address: '', preferredDate: '', message: '',
};

const QuoteFormSection = () => {
  const [form, setForm]       = useState(initialState);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.1 });

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())      e.fullName = 'Full name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim())         e.phone = 'Phone number is required';
    if (!form.service)              e.service = 'Please select a service';
    if (!form.propertyType)         e.propertyType = 'Please select property type';
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
    setApiError('');
    try {
      await api.post('/quotes', form);
      setSuccess(true);
      setForm(initialState);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-primary relative overflow-hidden" aria-label="Request a free quote" id="request-quote" ref={ref}>
      {/* bg decoration */}
      <div className="absolute inset-0 pattern-dots opacity-10" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left side — info */}
          <motion.div
            className="lg:col-span-2 text-white"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-yellow-300 mb-3 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20">
              Free Quote
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Get Your <span className="text-yellow-300">Free Quote</span> Today
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Fill in the form and our team will respond within 2 business hours with a
              personalised quote. Alternatively, call us directly for an instant quote.
            </p>

            {/* Contact options */}
            <div className="space-y-4">
              {[
                { icon: '📞', label: 'Primary Phone', value: BRAND.phone.primary, href: BRAND.phoneHref.primary },
                { icon: '📞', label: 'Secondary Phone', value: BRAND.phone.secondary, href: BRAND.phoneHref.secondary },
                { icon: '✉️', label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: '📍', label: 'Service Area', value: 'Brisbane & All over QLD', href: '#' },
              ].map(({ icon, label, value, href }) => (
                <a key={value} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 group">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="text-white/60 text-xs">{label}</div>
                    <div className="text-white font-semibold">{value}</div>
                  </div>
                  <svg className="w-4 h-4 text-white/40 ml-auto group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['✅ No obligation', '⚡ 2hr response', '🛡️ Fully insured'].map((b) => (
                <span key={b} className="text-xs text-white/80 font-medium px-3 py-1.5 rounded-full bg-white/10 border border-white/15">{b}</span>
              ))}
            </div>
          </motion.div>

          {/* Right side — form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {success ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-card-lg">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Quote Request Received!</h3>
                <p className="text-neutral-500 mb-6">
                  Thank you! Our team will be in touch within 2 business hours with your personalised quote.
                </p>
                <p className="text-sm text-neutral-400">Need it sooner? Call <a href={BRAND.phoneHref.primary} className="text-primary font-semibold">{BRAND.phone.primary}</a> or <a href={BRAND.phoneHref.secondary} className="text-primary font-semibold">{BRAND.phone.secondary}</a></p>
                <button onClick={() => setSuccess(false)} className="btn-secondary mt-6">Submit Another Quote</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-card-lg space-y-5" noValidate>
                <h3 className="text-xl font-bold text-primary">Request a Free Quote</h3>

                {apiError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{apiError}</div>
                )}

                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="fullName">Full Name *</label>
                    <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange}
                      className={`form-input ${errors.fullName ? 'border-red-400 focus:ring-red-200' : ''}`}
                      placeholder="John Smith" autoComplete="name" />
                    {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                      className={`form-input ${errors.phone ? 'border-red-400 focus:ring-red-200' : ''}`}
                      placeholder="04XX XXX XXX" autoComplete="tel" />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                    className={`form-input ${errors.email ? 'border-red-400 focus:ring-red-200' : ''}`}
                    placeholder="john@example.com" autoComplete="email" />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                {/* Row 2 — Service & Property */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="service">Service Required *</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange}
                      className={`form-select ${errors.service ? 'border-red-400 focus:ring-red-200' : ''}`}>
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="form-error">{errors.service}</p>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="propertyType">Property Type *</label>
                    <select id="propertyType" name="propertyType" value={form.propertyType} onChange={handleChange}
                      className={`form-select ${errors.propertyType ? 'border-red-400 focus:ring-red-200' : ''}`}>
                      <option value="">Select type</option>
                      {PROPERTY_TYPES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                    {errors.propertyType && <p className="form-error">{errors.propertyType}</p>}
                  </div>
                </div>

                {/* Row 3 — Bed/Bath */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="form-label" htmlFor="bedrooms">Bedrooms</label>
                    <select id="bedrooms" name="bedrooms" value={form.bedrooms} onChange={handleChange} className="form-select">
                      <option value="">—</option>
                      {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}
                      <option value="7+">7+</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="bathrooms">Bathrooms</label>
                    <select id="bathrooms" name="bathrooms" value={form.bathrooms} onChange={handleChange} className="form-select">
                      <option value="">—</option>
                      {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="preferredDate">Preferred Date</label>
                    <input id="preferredDate" name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="form-label" htmlFor="address">Property Address</label>
                  <input id="address" name="address" type="text" value={form.address} onChange={handleChange}
                    className="form-input" placeholder="123 Example St, Brisbane QLD" autoComplete="street-address" />
                </div>

                {/* Message */}
                <div>
                  <label className="form-label" htmlFor="message">Additional Notes</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange}
                    className="form-input resize-none" rows={3}
                    placeholder="Any specific requirements, access instructions, or areas of concern..." />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full btn-lg">
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Request Free Quote
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-neutral-400">
                  By submitting, you agree to be contacted by our team. No spam — ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteFormSection;
