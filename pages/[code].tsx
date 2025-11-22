import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RedirectPage() {
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        if (code) {
            window.location.href = `http://localhost:4000/${code}`;
        }
    }, [code]);

    return <p>Redirecting...</p>;
}
