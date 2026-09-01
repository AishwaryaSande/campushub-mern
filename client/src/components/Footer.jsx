import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="brand footer-brand">◆ CampusHub</div>
          <p className="footer-tag">The lost &amp; found board built for your campus.</p>
        </div>
        <div className="footer-links">
          <Link to="/items">Browse Items</Link>
          <Link to="/report">Report an Item</Link>
          <Link to="/about">About</Link>
        </div>
        <p className="footer-copy">MERN Stack Final Project — CampusHub © 2026</p>
      </div>
    </footer>
  );
}
