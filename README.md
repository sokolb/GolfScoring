# Golf Scoring

A golf match play league management application built with React and Python, featuring a lightweight SQLite database.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Client Setup](#client-setup)
- [Production Deployment](#production-deployment)
- [Project Structure](#project-structure)

## Overview

This application is designed to manage golf match play leagues, providing features for tracking players, teams, matches, and scorecards. It also serves as a learning project for React and Python development.

## Tech Stack

- **Frontend:** React 18 with Vite
- **Backend:** Python (Flask)
- **Database:** SQLite

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python:** 3.11.6 or higher
- **Node.js:** 16.20.2 or higher
- **npm:** (comes with Node.js)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install Python dependencies:

   ```bash
   pip3 install -r requirements.txt
   ```

3. Start the backend server:

   ```bash
   python3 server.py
   ```

4. Run backend tests:

   ```bash
   pytest
   ```

   Additional test options:

   ```bash
   # Run with verbose output
   pytest -v

   # Run specific test file
   pytest tests/test_entities.py

   # Run with coverage report
   pytest --cov=. --cov-report=html

   # Run tests matching a pattern
   pytest -k "test_player"
   ```

> **Note:** If you don't set the `DATABASE_LOCATION` environment variable, create the folder `GolfScoring/backend/data`. The application will automatically create an empty `league.db` file on startup.

### Client Setup

1. Navigate to the client app directory:

   ```bash
   cd client-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables (optional):

   Copy `.env.development` and configure as needed:

   ```bash
   # Backend API URL (defaults to http://localhost:8082)
   VITE_API_URL=http://localhost:8082

   # GHIN credentials for automatic handicap updates (optional)
   VITE_USERNAME=your.email@example.com
   VITE_PASSWORD=your_password
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:5173` (Vite default port)

5. Run tests:
   ```bash
   npm test
   ```

> **Note:** The frontend uses Vite for fast development and optimized builds. After changing environment variables, restart the dev server.

## Production Deployment

### Environment Variables

The following environment variables are required for production:

| Variable            | Description                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DATABASE_LOCATION` | Path to the directory where the database volume is persisted. **Do not include the database filename** (e.g., `/path/to/data` not `/path/to/data/league.db`) |

### Docker Deployment

Use the provided Docker Compose files for containerized deployment:

- **Development:** `docker-compose.yml`
- **Production:** `docker-compose-prod.yml`

```bash
# For production
docker-compose -f docker-compose-prod.yml up -d
```

## Project Structure

```
GolfScoring/
├── backend/              # Python Flask backend
│   ├── server.py        # Main server file
│   ├── db.py            # Database connection
│   ├── Entities/        # Entity models
│   │   ├── Course.py
│   │   ├── Division.py
│   │   ├── Hole.py
│   │   ├── Player.py
│   │   ├── Team.py
│   │   └── TeamMember.py
│   ├── routes/          # API route blueprints
│   │   ├── courses.py
│   │   ├── divisions.py
│   │   ├── players.py
│   │   └── teams.py
│   ├── tests/           # Backend unit tests
│   │   ├── conftest.py  # Test fixtures
│   │   ├── test_entities.py
│   │   └── test_routes_*.py
│   └── data/            # SQLite database location
├── client-app/          # React frontend
│   ├── src/
│   │   ├── Components/  # React components
│   │   ├── Actions/     # Redux actions
│   │   ├── Store/       # Redux store
│   │   └── DataServices/# API services
│   └── public/          # Static assets
└── Postman/             # API collection for testing
```

---

**License:** MIT

**Contributors:** Feel free to contribute to this learning project!
