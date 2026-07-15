import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

const AdminMedia = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/media');
      setMedia(data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      setError('');
      const formData = new FormData();
      formData.append('image', file);
      // Let backend use default folder or we can specify it:
      formData.append('folder', 'cleaning-duck/gallery');

      await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Refresh list
      await fetchMedia();
      
      // Clear input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to upload image. Did you add your Cloudinary keys to the server?');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image? It will be removed from your website immediately.')) return;
    
    try {
      await api.delete(`/media/${id}`);
      setMedia(media.filter(m => m._id !== id));
    } catch (err) {
      setError('Failed to delete image');
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Media & Gallery Manager</h1>
        
        <div className="flex gap-4 items-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/jpeg,image/png,image/webp" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-primary hover:bg-secondary text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-soft flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <span>➕</span> Upload Photo
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 flex items-start gap-3">
          <span>⚠️</span>
          <div>
            <div className="font-bold">Upload Error</div>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {media.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold text-neutral-800 mb-2">No photos found</h3>
          <p className="text-neutral-500 mb-6 max-w-sm mx-auto">Upload some photos to show them in your website's gallery.</p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-accent/10 text-accent font-semibold px-6 py-2.5 rounded-xl hover:bg-accent/20 transition-colors inline-block"
          >
            Upload your first photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-soft group relative border border-neutral-100">
              <div className="aspect-square bg-neutral-100 relative">
                <img 
                  src={item.url} 
                  alt={item.alt || 'Gallery photo'} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-transform transform hover:scale-110 shadow-lg"
                    title="Delete Photo"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="p-3 border-t border-neutral-100 bg-neutral-50/50">
                <div className="text-xs text-neutral-500 truncate" title={item.alt || item.publicId}>
                  {item.alt || item.publicId.split('/').pop()}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
