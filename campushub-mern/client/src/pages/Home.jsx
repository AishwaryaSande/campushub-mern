import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import ItemCard from '../components/ItemCard';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getItems(), api.getStats()])
      .then(([itemsData, statsData]) => {
        setItems(itemsData.slice(0, 6));
        setStats(statsData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items${query ? `?search=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>Lost something on campus? Someone probably found it.</h1>
            <p className="hero-sub">
              CampusHub is where students report, search, and reclaim lost belongings —
              from water bottles to laptops — without the group-chat chaos.
            </p>
            <form className="hero-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by item, e.g. 'blue backpack'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <div className="hero-actions">
              <span className="hint">Or</span>
              <a href="/report">report an item you lost or found →</a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-blob">
              <span>🎒</span>
              <span>🔑</span>
              <span>💻</span>
              <span>🎧</span>
            </div>
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="stats-bar">
          <div className="container stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container recent-section">
        <div className="section-head">
          <h2>Recently reported</h2>
          <a href="/items">View all →</a>
        </div>

        {loading ? (
          <p className="loading-state">Loading items…</p>
        ) : items.length === 0 ? (
          <p className="empty-state">Nothing reported yet — be the first.</p>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard key={item.id || item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
