# Uber Clone — Full Project Overview

End-to-end Uber-like application with a React frontend and a Node.js/Express backend. The project supports user and captain (driver) authentication, registration, and basic profile access, along with a clean UI built using Tailwind CSS.

## What this project includes
- **User flow**: sign up, log in, view profile, and log out.
- **Captain flow**: sign up and log in with vehicle details.
- **Authentication**: JWT-based auth with protected routes and token invalidation.
- **Frontend**: responsive pages for user and captain authentication.
- **Backend**: REST API for users and captains.

## Tech stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT

## Project structure
- [frontend/](frontend/)
	- React app (pages, assets, app shell)
- [backend/](backend/)
	- Express server, routes, controllers, services, and models

## Setup (quick start)
### Backend
1. Install dependencies.
2. Set environment variables for:
	 - `PORT`
	 - `DB_CONNECT` or `MONGO_URI`
	 - `JWT_SECRET`
3. Start the server.

### Frontend
1. Install dependencies.
2. Start the dev server.
3. Open the app URL shown in the terminal.

## API overview
The backend exposes authentication endpoints for users and captains. For full details, see:
- [backend/README.md](backend/README.md)

## Current scope
This project focuses on authentication and profile flows, laying the foundation for future ride-matching and real-time features.
