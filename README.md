# SnapSpot

SnapSpot is a responsive React + Vite demo web application for browsing and purchasing images with user authentication and a simple Node/Express + MongoDB backend.

A compact, easy-to-run project intended for learning, demos, and small prototypes. Place example images in `public/images/` to get started quickly.

## Features

- Responsive gallery grid with image detail views
- User authentication (Sign up / Log in) and simple session handling
- Demo upload and image management pages
- Search and basic filters by title/category
- Demo checkout page (`Pay`) for purchasing images
- Backend API with MongoDB persistence (`/backend/server.js`)

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (connection in `backend/mongodb.js`)
- Bundler/Dev server: Vite

## Quick Start (Windows / PowerShell)

1. Install dependencies for frontend and backend:

```powershell
cd gallary
npm install
cd backend
npm install
```

2. Start the backend server (in `gallary/backend`):

```powershell
# from project root
cd gallary\backend
npm run dev   # or: node server.js
```

3. Start the frontend (from `gallary`):

```powershell
cd gallary
npm run dev
```

Open the frontend at the address shown by Vite (usually `http://localhost:5173`).

## Environment / Configuration

- Configure your MongoDB URI in `backend/mongodb.js` or via environment variables before starting the backend. Example env variable name used by the project: `MONGO_URI`.
- If you integrate payments, use sandbox/test keys for the payment provider.

## Project Structure (high level)

- `gallary/` — frontend root (Vite + React)
	- `src/` — React pages & components (`Home.jsx`, `Gallary.jsx`, `Login.jsx`, etc.)
	- `public/images/` — sample images used by the gallery
	- `index.html`, `vite.config.js` — Vite config and app entry
- `gallary/backend/` — backend server
	- `server.js` — Express app and routes
	- `mongodb.js` — MongoDB connection helper

## Usage Tips

- Add images to `gallary/public/images/free/` and reference them in the gallery or use the app's upload flow when available.
- For development, run both backend and frontend concurrently in separate terminals.

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a clear description of the change.

## License

This project is provided as-is for learning and demo purposes. Add a license file if you intend to publish or share it widely.

---

If you'd like, I can also add badges, a shorter 3-line summary at the top, or update `package.json` scripts to add a combined `dev` that starts frontend + backend together.
