import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import './ItemDetails.css';

const pillClass = { Lost: 'pill-lost', Found: 'pill-found', Returned: 'pill-returned' };

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getItem(id).then(setItem).catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="container center-page">
        <div className="empty-state">
          <h3>Item not found</h3>
          <p>{error}</p>
          <Link to="/items" className="btn btn-outline" style={{ marginTop: 16 }}>Back to browse</Link>
        </div>
      </div>
    );
  }

  if (!item) return <p className="loading-state">Loading…</p>;

  return (
    <div className="container detail-page">
      <Link to="/items" className="back-link">← Back to all items</Link>

      <div className="detail-grid">
        <div className="detail-image card">{item.image || '📦'}</div>

        <div className="detail-info">
          <div className="detail-top">
            <h1>{item.title}</h1>
            <span className={`pill ${pillClass[item.status] || ''}`}>{item.status}</span>
          </div>

          <p className="detail-meta">📍 {item.location} · {item.category}</p>
          <p className="detail-meta">Reported {new Date(item.createdAt).toLocaleString()}</p>

          <div className="detail-section">
            <h3>Description</h3>
            <p>{item.description || 'No additional description provided.'}</p>
          </div>

          <div className="detail-section">
            <h3>Reported by</h3>
            <p>{item.user?.name || 'A CampusHub user'}</p>
            {item.contact && <p className="hint">Contact: {item.contact}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
