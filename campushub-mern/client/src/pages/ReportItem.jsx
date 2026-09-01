import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import './FormPage.css';

const CATEGORIES = ['Electronics', 'Bags', 'Personal', 'Documents', 'Others'];
const EMOJI_BY_CATEGORY = {
  Electronics: '💻',
  Bags: '🎒',
  Personal: '👛',
  Documents: '📄',
  Others: '📦',
};

export default function ReportItem() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: 'Electronics',
    location: '',
    status: 'Lost',
    description: '',
    contact: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const item = await api.createItem(
        { ...form, image: EMOJI_BY_CATEGORY[form.category] },
        token
      );
      navigate(`/items/${item.id || item._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-page">
      <div className="form-card card">
        <h1>Report an item</h1>
        <p className="hint">Filed reports are visible to the whole campus immediately.</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>What is it?</label>
            <input type="text" placeholder="e.g. Blue Backpack" value={form.title} onChange={update('title')} required />
          </div>

          <div className="field-row">
            <div className="field">
              <label>Category</label>
              <select value={form.category} onChange={update('category')}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Status</label>
              <select value={form.status} onChange={update('status')}>
                <option value="Lost">Lost — I'm missing this</option>
                <option value="Found">Found — I found this</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Location</label>
            <input type="text" placeholder="e.g. Library, 2nd Floor" value={form.location} onChange={update('location')} required />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea placeholder="Color, brand, distinguishing marks…" value={form.description} onChange={update('description')} />
          </div>

          <div className="field">
            <label>Contact (email or phone)</label>
            <input type="text" placeholder="How should someone reach you?" value={form.contact} onChange={update('contact')} />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit report'}
          </button>
        </form>
      </div>
    </div>
  );
}
