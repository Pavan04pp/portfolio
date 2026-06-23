import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/works'; // Change port if needed

interface WorkItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const Works: React.FC = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWorks = async () => {
    try {
      const res = await axios.get(API_URL);
      setWorks(res.data);
    } catch (err) {
      setError('Failed to fetch works');
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) formData.append('image', image);
      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setDescription('');
      setImage(null);
      fetchWorks();
    } catch (err) {
      setError('Failed to upload work');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this work?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchWorks();
    } catch (err) {
      setError('Failed to delete work');
    }
  };

  return (
    <section id="works" className="min-h-screen pt-24 pb-12 bg-black/80 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center premium-text">Works</h2>
        <form onSubmit={handleUpload} className="mb-8 bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col gap-4 max-w-xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">Upload New Work</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="text-white"
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <div className="text-red-400">{error}</div>}
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {works.map(work => (
            <div key={work.id} className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center relative">
              {work.image && <img src={`http://localhost:3000${work.image}`} alt={work.title} className="w-full h-48 object-cover rounded mb-4" />}
              <div className="font-bold text-lg text-white mb-2">{work.title}</div>
              <div className="text-gray-300 mb-4">{work.description}</div>
              <button
                onClick={() => handleDelete(work.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works; 