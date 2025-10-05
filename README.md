# Chatify App

[![Live Demo](https://img.shields.io/badge/live_demo-visit-blue?logo=vercel)](https://chatify-n7umh.sevalla.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/react-19-61dafb?logo=react&logoColor=white)](https://react.dev/)

Lightweight real‑time chat with httpOnly-cookie auth, Socket.IO websockets, and a responsive UI (mobile/desktop) built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

---

## Features

- Real‑time messaging: Socket.IO with online user indicator and instant delivery
- Authentication: JWT stored in httpOnly cookie; axios requests use `withCredentials`
- Profile: avatar via Cloudinary and profile updates
- Conversations: chat/contact lists, message history, text and image sending
- UX niceties: optimistic sends, keyboard/notification sounds, toast messages
- Responsive layout:
  - Mobile: single‑pane flow (list → chat with back button)
  - Desktop: two‑pane layout; animated border only on `md+`
- Security: CORS with credentials, Arcjet protection against bots/abuse

---

## Tech Stack

- Frontend: React (Vite), Zustand, socket.io-client, axios, react-hot-toast, lucide-react, Tailwind CSS
- Backend: Node.js, Express, socket.io, jsonwebtoken, cookie-parser, cors, mongoose, cloudinary, resend
- Utilities: dotenv, Arcjet

---

## Project Structure

```
backend/
  src/server.js                # Express app + HTTP server bootstrap
  src/lib/socket.js            # Socket.IO server, CORS, middleware, events
  src/lib/env.js               # Environment variables loader
  src/lib/db.js                # MongoDB connection
  src/routes/*.route.js        # API routes (/api/auth, /api/messages)
  src/controllers/*.controller.js
  src/middleware/*.middleware.js
  src/models/*.js              # User, Message

frontend/
  src/store/useAuthStore.js    # auth + socket connection lifecycle
  src/store/useChatStore.js    # chats/contacts/messages state
  src/pages/*.jsx              # Login, SignUp, Chat
  src/components/*.jsx         # UI building blocks
  src/lib/axios.js             # axios base instance (withCredentials)
```

---

## API Overview

Auth (`/api/auth`)

- `POST /signup`
- `POST /login`
- `POST /logout`
- `GET /check` — returns current user via cookie
- `PUT /update-profile` — update profile (protected)

Messages (`/api/messages`)

- `GET /contacts` — all contacts
- `GET /chats` — active chat partners
- `GET /:userId` — conversation history
- `POST /send/:receiverId` — send text/image message

All protected endpoints require a valid httpOnly `jwt` cookie.

---

## Socket Events

- Server → Client: `getOnlineUsers` (array of online userIds)
- Server → Client (targeted): `newMessage` (delivered to the receiver)

Socket authentication uses the `jwt` cookie via `socketAuthMiddleware`.

---

## Environment Variables (backend/.env)

Required

- `PORT=3000`
- `MONGO_URI=...`
- `JWT_SECRET=...`
- `NODE_ENV=development` or `production`
- `CLIENT_URL=http://localhost:5173` (or your frontend origin)

Optional

- Email: `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_FROM_NAME`
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Arcjet: `ARCJET_KEY`, `ARCJET_ENV`

---

## Local Development

Prereqs: Node 18+, npm, running MongoDB.

Backend

1. `cd backend`
2. `npm install`
3. Create `backend/.env` (see above)
4. Run: `npm run dev` (or `node src/server.js`)

Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev` (Vite)

Note on cookies in dev: with `sameSite: "strict"`, httpOnly cookies won’t be sent across different origins. Prefer a single origin (proxy) or test using production mode where the backend serves the built frontend.

---

## Production Build

1. `cd frontend && npm run build`
2. `cd backend && set NODE_ENV=production && node src/server.js`

In production, the backend serves `frontend/dist`, so API and Socket share one origin.

---

## Troubleshooting

- Cookie/JWT not persisting:

  - Verify `CLIENT_URL` and CORS; axios/socket must use `withCredentials: true`.
  - Different origins + `sameSite: "strict"` prevent cookie sending. Use a single origin or production mode.

- Socket not connecting:
  - Ensure `CLIENT_URL` exactly matches the frontend origin.
  - User must be authenticated before `connectSocket()` is called.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
