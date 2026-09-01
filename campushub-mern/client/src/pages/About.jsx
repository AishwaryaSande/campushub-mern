import './About.css';

export default function About() {
  return (
    <div className="container about-page">
      <h1>About CampusHub</h1>
      <p className="about-lede">
        CampusHub is a lost-and-found board built for one campus at a time. No more scattered
        WhatsApp groups or forgotten notice boards — just a single place to report, search, and
        reunite people with their things.
      </p>

      <div className="about-grid">
        <div className="about-card card">
          <h3>Report in seconds</h3>
          <p>Log a lost or found item with a title, location, and description — no sign-up friction beyond a quick account.</p>
        </div>
        <div className="about-card card">
          <h3>Search the whole campus</h3>
          <p>Filter by category and status, or search by keyword to find a match fast.</p>
        </div>
        <div className="about-card card">
          <h3>Built with the MERN stack</h3>
          <p>MongoDB, Express, React, and Node.js power the app end to end, with JWT-based authentication.</p>
        </div>
      </div>
    </div>
  );
}
