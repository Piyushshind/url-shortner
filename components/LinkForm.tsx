import React, { useState } from 'react';
import styles from '../styles/LinkForm.module.css';
import { api } from '../utils/api';

type Props = {
    onLinkCreated: () => void;
};

export default function LinkForm({ onLinkCreated }: Props) {
    const [url, setUrl] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        if (!url) {
            setError('URL is required');
            return;
        }
        setLoading(true);
        try {
            const res = await api.post('/links', { url, code: code || undefined });
            setSuccess(`Short URL created: ${res.data.shortUrl}`);
            setUrl('');
            setCode('');
            onLinkCreated();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="url"
                placeholder="Enter URL to shorten"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                required
                className={styles.inputUrl}
            />

            <input
                type="text"
                placeholder="Custom code (optional)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
                maxLength={8}
                className={styles.inputCode}
            />

            <button
                type="submit"
                disabled={loading}
                className={`${styles.button} ${loading ? styles.buttonDisabled : ''}`}
            >
                {loading ? 'Creating...' : 'Create Link'}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </form>
    );
}
