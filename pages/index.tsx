import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinkForm from '../components/LinkForm';
import LinksTable from '../components/LinksTable';

type Link = {
  id: number;
  code: string;
  url: string;
  clicks: number;
  last_clicked: string | null;
};

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Link[]>('/links');
      setLinks(res.data);
    } catch {
      setError('Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (code: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    try {
      await api.delete(`/links/${code}`);
      fetchLinks();
    } catch {
      alert('Failed to delete link');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <h2>Dashboard</h2>
        <LinkForm onLinkCreated={fetchLinks} />
        {loading && <p>Loading links...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <LinksTable links={links} onDelete={handleDelete} />
      </main>
      <Footer />
    </div>
  );
}
