import { Link } from 'react-router-dom';
import './ItemCard.css';

const pillClass = {
  Lost: 'pill-lost',
  Found: 'pill-found',
  Returned: 'pill-returned',
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 1) return 'just now';
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.id || item._id}`} className="item-card card">
      <div className="item-image">{item.image || '📦'}</div>
      <div className="item-body">
        <div className="item-top">
          <h3>{item.title}</h3>
          <span className={`pill ${pillClass[item.status] || ''}`}>{item.status}</span>
        </div>
        <p className="item-meta">📍 {item.location}</p>
        <p className="item-desc">{item.description}</p>
        <p className="item-time">{timeAgo(item.createdAt)} · {item.category}</p>
      </div>
    </Link>
  );
}
