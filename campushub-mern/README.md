# CampusHub — Campus Lost & Found Portal (MERN Stack)

A full-stack Lost & Found portal for a campus, rebuilt on the **MERN stack**
(MongoDB, Express, React, Node.js) from the original PHP/MySQL version, to
satisfy the Month 1 + Month 2 final project requirements.

## Features

- **Auth**: register/login with hashed passwords (bcrypt) and JWT sessions
- **Browse & search**: filter reported items by keyword, category, and status
- **Item details**: full view of a single reported item
- **Report an item**: logged-in students can log a lost or found item
- **My Items**: a student's own reports
- **Home dashboard**: live stats (items reported/found/returned, students) and recent items
- **REST API** built with Express + Mongoose, protected routes via JWT middleware

## Project structure

```
campushub-mern/
├── server/     Express + MongoDB (Mongoose) REST API
└── client/     React (Vite) frontend
```

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and set:
- `MONGO_URI` — your MongoDB connection string (use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster, or a local `mongodb://127.0.0.1:27017/campushub` if you have MongoDB installed)
- `JWT_SECRET` — any long random string

Then seed sample data and start the API:

```bash
npm run seed   # creates a demo user + 6 sample items
npm run dev    # starts the API on http://localhost:5000
```

Demo login after seeding: `demo@campushub.edu` / `password`

## 2. Frontend setup

```bash
cd client
npm install
npm run dev    # starts the app on http://localhost:5173
```

The frontend reads the API URL from `client/.env` (`VITE_API_URL`), already
pointed at `http://localhost:5000/api`.

## 3. Deployment

- **Backend**: deploy `server/` to Render, Railway, or Cyclic; set `MONGO_URI` and `JWT_SECRET` as environment variables there.
- **Database**: MongoDB Atlas free tier (M0).
- **Frontend**: deploy `client/` to Vercel or Netlify; set `VITE_API_URL` to your deployed backend's URL + `/api`.

## API reference

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Create an account |
| POST | `/api/auth/login` | – | Log in, returns JWT |
| GET | `/api/auth/me` | ✅ | Current user |
| GET | `/api/items?search=&category=&status=` | – | List/search items |
| GET | `/api/items/:id` | – | Single item |
| POST | `/api/items` | ✅ | Report a new item |
| GET | `/api/items/mine/all` | ✅ | Items reported by the logged-in user |
| PUT | `/api/items/:id` | ✅ (owner) | Update an item |
| DELETE | `/api/items/:id` | ✅ (owner) | Delete an item |
| GET | `/api/stats` | – | Homepage counters |

## Credits

Feature set and page structure adapted from the original PHP/MySQL
`campushub` Lost & Found prototype, reimplemented end-to-end in the MERN
stack for the final project.
