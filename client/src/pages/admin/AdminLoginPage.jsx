import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEOHead from '../../components/common/SEOHead';
import { BRAND } from '../../utils/constants';

const AdminLoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Admin Login" noIndex />
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={BRAND.logoUrl} alt="Cleaning Duck Australia" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover ring-4 ring-white/20" />
            <h1 className="text-white text-2xl font-bold">Admin Portal</h1>
            <p className="text-white/50 text-sm mt-1">Cleaning Duck Australia</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-card-lg space-y-5">
            <h2 className="text-lg font-bold text-primary">Sign In</h2>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
            )}

            <div>
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email" name="email" type="email" required
                value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="form-input" placeholder="admin@cleaningduckaustralia.com.au"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password" name="password" type="password" required
                value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="form-input" placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full btn-lg">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
          <p className="text-white/30 text-xs text-center mt-6">Restricted access — authorised personnel only</p>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
