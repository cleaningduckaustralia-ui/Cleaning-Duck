import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, NAV_LINKS } from '../../utils/constants';

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown]     = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdown(null); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'bg-orange-800/40 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
        }`}
      >
        <nav className="container-custom flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" aria-label="Cleaning Duck Australia Home">
            <img
              src={BRAND.logoUrl}
              alt="Cleaning Duck Australia Logo"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-400/70 shadow-lg"
              loading="eager"
              width="48" height="48"
            />
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-lg leading-tight">Cleaning Duck</span>
              <span className="text-orange-300 text-lg font-medium">Australia</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7" ref={dropdownRef}>
            {NAV_LINKS.map((link) => {
              if (link.grouped) {
                /* ── Mega grouped dropdown ── */
                return (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                      className="nav-link flex items-center gap-1"
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {dropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50"
                          style={{ width: 700 }}
                        >
                          {/* Header bar */}
                          <div className="px-5 py-3 bg-gradient-to-r from-orange-700 to-orange-500 flex items-center justify-between">
                            <span className="text-white font-semibold text-sm tracking-wide">Our Services</span>
                            <Link
                              to="/services"
                              onClick={() => setDropdown(null)}
                              className="text-orange-200 text-xs hover:text-white transition-colors font-medium"
                            >
                              View All Services →
                            </Link>
                          </div>
                          {/* 4-column grid */}
                          <div className="grid grid-cols-4 divide-x divide-neutral-100 p-4 gap-0">
                            {link.groups.map((group) => (
                              <div key={group.heading} className="px-3 py-1">
                                <div className="flex items-center gap-1.5 mb-3">
                                  <span className="text-base leading-none">{group.icon}</span>
                                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                                    {group.heading}
                                  </span>
                                </div>
                                <ul className="space-y-0.5">
                                  {group.items.map((item) => (
                                    <li key={item.href}>
                                      <Link
                                        to={item.href}
                                        onClick={() => setDropdown(null)}
                                        className="flex items-start gap-2 px-2 py-1.5 rounded-lg text-sm text-neutral-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-150 font-medium group/item"
                                      >
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-300 group-hover/item:bg-orange-500 transition-colors flex-shrink-0" />
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (link.children) {
                /* ── Simple flat dropdown (fallback) ── */
                return (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                      className="nav-link flex items-center gap-1"
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <svg className={`w-3.5 h-3.5 transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {dropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-card-lg overflow-hidden border border-neutral-100"
                        >
                          <div className="p-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => setDropdown(null)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-primary hover:text-white transition-all duration-200 font-medium group"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-white transition-colors" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              /* ── Plain NavLink ── */
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) => `nav-link ${isActive ? 'active text-white' : ''}`}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex flex-col gap-1 items-end mr-2">
              <a href={BRAND.phoneHref.primary} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">📞</span>
                {BRAND.phone.primary}
              </a>
              <a href={BRAND.phoneHref.secondary} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">📞</span>
                {BRAND.phone.secondary}
              </a>
            </div>
            <Link to="/request-quote" className="btn-primary btn-sm">
              Free Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-40 w-80 max-w-full shadow-2xl overflow-y-auto"
            style={{ background: 'linear-gradient(180deg, #7c3200 0%, #c05411 100%)' }}
          >
            <div className="p-6 pt-24 pb-10">
              <nav className="space-y-1">
                {NAV_LINKS.map((link) => {
                  if (link.grouped) {
                    return (
                      <div key={link.label}>
                        <Link
                          to={link.href}
                          className="block px-4 py-2.5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                        >
                          {link.label}
                        </Link>
                        <div className="ml-3 mt-1 mb-3 space-y-3">
                          {link.groups.map((group) => (
                            <div key={group.heading} className="border-l-2 border-white/15 pl-4">
                              <div className="flex items-center gap-1.5 py-1 mb-0.5">
                                <span className="text-sm">{group.icon}</span>
                                <span className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                                  {group.heading}
                                </span>
                              </div>
                              {group.items.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  className="block py-1.5 pl-2 text-sm text-white/70 hover:text-white transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={link.label}>
                      <Link
                        to={link.href}
                        className="block px-4 py-3 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Mobile CTAs */}
              <div className="mt-8 space-y-3">
                <a
                  href={BRAND.phoneHref.primary}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  <span className="text-lg">📞</span>
                  {BRAND.phone.primary}
                </a>
                <a
                  href={BRAND.phoneHref.secondary}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  <span className="text-lg">📞</span>
                  {BRAND.phone.secondary}
                </a>
                <Link to="/request-quote" className="btn-primary w-full text-center py-3 rounded-xl block">
                  Get Free Quote
                </Link>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-white/5">
                <p className="text-white/50 text-xs mb-2">Service Areas</p>
                <p className="text-white text-sm">{BRAND.serviceAreas.join(' · ')}</p>
                <p className="text-white/50 text-xs mt-3">ABN {BRAND.abn}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/60" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
