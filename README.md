# Gram Letoaba Blogging Site

## Project structure
- `backend/`: Express + MongoDB REST API
- `frontend/`: React (Vite) UI

## Requirements
- Node.js 18+
- MongoDB connection string
- Cloudinary account (optional for image uploads)

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` with:
   - `MONGO_URI=your_mongodb_uri`
   - `JWT_SECRET=your_jwt_secret`
   - `CLOUDINARY_CLOUD_NAME=...`
   - `CLOUDINARY_API_KEY=...`
   - `CLOUDINARY_API_SECRET=...`
4. `node server.js` (or use nodemon if installed)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Usage
- Sign up: `/signup`
- Login: `/login`
- Browse posts: `/`
- Create post: `/create` (requires login)
- View post: `/post/:id`
- Edit/delete: only by the post owner

## Notes
- API base URL is fixed at `http://localhost:5000/api` in `frontend/src/api/axios.js`
- If using cloudinary, image upload happens during post creation
