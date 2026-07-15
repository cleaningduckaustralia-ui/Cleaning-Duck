import { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../../services/api';

const sidebarLinks = [
  { label: 'Dashboard',    href: '/admin/dashboard',    icon: '📊' },
  { label: 'Quotes',       href: '/admin/quotes',       icon: '📋' },
  { label: 'Services',     href: '/admin/services',     icon: '🧹' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
  { label: 'FAQs',         href: '/admin/faqs',         icon: '❓' },
  { label: 'Blog',         href: '/admin/blog',         icon: '📝' },
  { label: 'Media',        href: '/admin/media',        icon: '🖼️' },
  { label: 'Contacts',     href: '/admin/contacts',     icon: '📬' },
  { label: 'Settings',     href: '/admin/settings',     icon: '⚙️' },
];

export const AdminLayout = () => {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold">🦆</div>
            <div>
              <div className="text-white font-bold text-sm">Cleaning Duck</div>
              <div className="text-white/40 text-xs">Admin Portal</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map(({ label, href, icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="text-white text-xs font-medium">{user?.name}</div>
              <div className="text-white/40 text-xs">{user?.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-left admin-sidebar-link text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <span>🚪</span> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="block h-0.5 bg-neutral-600 rounded" />
              <span className="block h-0.5 bg-neutral-600 rounded" />
              <span className="block h-0.5 bg-neutral-600 rounded" />
            </div>
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-primary transition-colors">
              View Website ↗
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ─── Dashboard Home ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/quotes/stats').then(({ data }) => setStats(data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Quotes', value: stats?.total || '—', icon: '📋', color: 'bg-blue-50 text-blue-600' },
          { label: 'This Month',   value: stats?.thisMonth || '—', icon: '📅', color: 'bg-green-50 text-green-600' },
          { label: 'New',          value: stats?.stats?.find((s) => s._id === 'new')?.count || '0', icon: '🔔', color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Completed',    value: stats?.stats?.find((s) => s._id === 'completed')?.count || '0', icon: '✅', color: 'bg-purple-50 text-purple-600' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-soft">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${color}`}>{icon}</div>
            <div className="text-2xl font-bold text-neutral-800">{value}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sidebarLinks.slice(1).map(({ label, href, icon }) => (
          <Link key={href} to={href} className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-card transition-all flex items-center gap-3 group">
            <span className="text-2xl">{icon}</span>
            <span className="font-medium text-neutral-700 group-hover:text-primary transition-colors">{label}</span>
            <svg className="w-4 h-4 text-neutral-300 ml-auto group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
