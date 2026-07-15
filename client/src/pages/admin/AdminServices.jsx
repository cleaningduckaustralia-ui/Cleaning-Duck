import { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    features: '',
    benefits: '',
    fromPrice: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/services');
      setServices(data.data);
    } catch (err) {
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      shortDescription: service.shortDescription,
      longDescription: service.longDescription || '',
      features: service.features?.join('\n') || '',
      benefits: service.benefits?.join('\n') || '',
      fromPrice: service.pricing?.from || '',
    });
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingService(null);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Format arrays
      const payload = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        features: formData.features.split('\n').filter(f => f.trim() !== ''),
        benefits: formData.benefits.split('\n').filter(b => b.trim() !== ''),
        pricing: {
          ...editingService.pricing,
          from: formData.fromPrice,
        }
      };

      await api.put(`/services/${editingService._id}`, payload);
      setSuccess('Service saved successfully!');
      
      // Update local state
      setServices(services.map(s => s._id === editingService._id ? { ...s, ...payload } : s));
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save service');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Manage Services & Content</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 flex items-center gap-3">
          <span>⚠️</span> <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 border border-green-100 flex items-center gap-3">
          <span>✅</span> <span>{success}</span>
        </div>
      )}

      {editingService ? (
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-8 border border-neutral-100">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
            <h2 className="text-xl font-bold text-neutral-800">Edit Service</h2>
            <button 
              onClick={handleCancel}
              className="text-neutral-500 hover:text-neutral-700 font-medium"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Service Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Starting Price (e.g. $199)</label>
                <input 
                  type="text" 
                  name="fromPrice" 
                  value={formData.fromPrice} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Short Description (Appears on Home Page)</label>
              <textarea 
                name="shortDescription" 
                value={formData.shortDescription} 
                onChange={handleChange} 
                rows="2"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Long Description (Appears on Service Detail Page)</label>
              <textarea 
                name="longDescription" 
                value={formData.longDescription} 
                onChange={handleChange} 
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Features (One per line)</label>
                <textarea 
                  name="features" 
                  value={formData.features} 
                  onChange={handleChange} 
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
                  placeholder="Vacuuming&#10;Mopping&#10;Dusting"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Benefits (One per line)</label>
                <textarea 
                  name="benefits" 
                  value={formData.benefits} 
                  onChange={handleChange} 
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
                  placeholder="Saves time&#10;Professional equipment&#10;100% Bond Back Guarantee"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button 
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl text-neutral-600 font-medium hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-soft"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 flex flex-col h-full">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center text-xl">
                    <i className={`fa-solid ${service.icon || 'fa-broom'}`}></i>
                  </div>
                  {service.pricing?.from && (
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      {service.pricing.from}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-neutral-800 mb-2">{service.title}</h3>
                <p className="text-neutral-500 text-sm line-clamp-3 mb-4">
                  {service.shortDescription}
                </p>
              </div>
              
              <button 
                onClick={() => handleEdit(service)}
                className="w-full py-2.5 bg-neutral-50 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors"
              >
                Edit Content
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
