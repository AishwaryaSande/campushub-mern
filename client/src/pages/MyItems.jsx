import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';

export default function MyItems() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMyItems(token).then(setItems).finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="container browse-page">
      <div className="browse-head">
        <h1>My reported items</h1>
        <p className="hint">Everything you've submitted to CampusHub.</p>
      </div>

      {loading ? (
        <p className="loading-state">Loading…</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h3>You haven't reported anything yet</h3>
          <p>Lost or found something on campus? Log it so others can help.</p>
          <Link to="/report" className="btn btn-primary" style={{ marginTop: 16 }}>Report an item</Link>
        </div>
      ) : (
        <div className="items-grid" style={{ marginTop: 20 }}>
          {items.map((item) => (
            <ItemCard key={item.id || item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
