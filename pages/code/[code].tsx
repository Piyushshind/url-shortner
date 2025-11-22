import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { api } from '../../utils/api';

type Link = {
    id: number;
    code: string;
    url: string;
    clicks: number;
    last_clicked: string | null;
    created_at: string;
};

export default function StatsPage() {
    const router = useRouter();
    const { code } = router.query;

    const [link, setLink] = useState<Link | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!code || Array.isArray(code)) return;

        const fetchStats = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get<Link>(`/links/${code}`);
                setLink(res.data);
            } catch {
                setError('Link not found or failed to load');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [code]);

    return (
        <div style={{ maxWidth: '700px', margin: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flexGrow: 1 }}>
                <h2>Link Stats for: {code}</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {link && (
                    <div>
                        <p><strong>Short Code:</strong> {link.code}</p>
                        <p><strong>Original URL:</strong> <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></p>
                        <p><strong>Total Clicks:</strong> {link.clicks}</p>
                        <p><strong>Last Clicked:</strong> {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : 'Never'}</p>
                        <p><strong>Created At:</strong> {new Date(link.created_at).toLocaleString()}</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
