import React from 'react';

type Link = {
  id: number;
  code: string;
  url: string;
  clicks: number;
  last_clicked: string | null;
};

type Props = {
  links: Link[];
  onDelete: (code: string) => void;
};

export default function LinksTable({ links, onDelete }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>Short Code</th>
          <th>Target URL</th>
          <th>Total Clicks</th>
          <th>Last Clicked</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.length === 0 && <tr><td colSpan={5}>No links found</td></tr>}
        {links.map(link => (
          <tr key={link.id} style={{ borderBottom: '1px solid #eee' }}>
            <td>{link.code}</td>
            <td title={link.url} style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.url}</td>
            <td>{link.clicks}</td>
            <td>{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : 'Never'}</td>
            <td>
              <button onClick={() => copyToClipboard(`${window.location.origin}/${link.code}`)}>Copy</button>
              <button onClick={() => onDelete(link.code)} style={{ marginLeft: '0.5rem' }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
