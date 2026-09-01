import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import ItemCard from '../components/ItemCard';
import './LostItems.css';

const CATEGORIES = ['All', 'Electronics', 'Bags', 'Personal', 'Documents', 'Others'];
const STATUSES = ['All', 'Lost', 'Found', 'Returned'];

export default function LostItems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await api.getItems({ search, category, status });
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, status]);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
    fetchItems();
  };

  return (
    <div className="container browse-page">
      <div className="browse-head">
        <h1>Browse reported items</h1>
        <p className="hint">Search and filter everything the campus community has logged.</p>
      </div>

      <form className="filter-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by title, description, or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {loading ? (
        <p className="loading-state">Loading items…</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h3>No items match your filters</h3>
          <p>Try a different keyword or clear the filters.</p>
        </div>
      ) : (
        <>
          <p className="result-count">{items.length} item{items.length !== 1 ? 's' : ''} found</p>
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard key={item.id || item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
