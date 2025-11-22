
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <h1><Link href="/">URL Shortener</Link></h1>
    </header>
  );
}
