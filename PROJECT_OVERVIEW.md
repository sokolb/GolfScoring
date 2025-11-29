# Golf Scoring Application - Comprehensive Project Overview

## 📋 Quick Reference

**Purpose**: Golf match play league management system  
**Architecture**: Full-stack web application with React frontend and Python Flask backend  
**Database**: SQLite with SQLAlchemy ORM  
**Deployment**: Docker containerized microservices  
**Current Version**: Client v3.0.2

---

## 🎯 Application Purpose

This application manages golf match play leagues, providing comprehensive tools for:

- **Player Management**: Track golfers with GHIN integration for automatic handicap updates
- **Team Organization**: Create and manage teams with A/B player designations
- **Division Management**: Organize teams into competitive divisions
- **Match Scheduling**: Plan and track match play events
- **Scorecard Management**: Record and calculate scores with hole-by-hole handicapping
- **Course Management**: Configure courses with hole handicap indexes

**Project Context**: Also serves as a learning project for React and Python development.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Client Layer                      │
│  React 18 + Redux + Vite (Port: varies by env)     │
│  - Component-based UI                                │
│  - Redux state management                            │
│  - Axios for API calls                               │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP/REST API
┌──────────────────▼──────────────────────────────────┐
│                   Backend Layer                      │
│     Python Flask REST API (Port 8082)               │
│  - Blueprint-based routing                           │
│  - SQLAlchemy ORM                                    │
│  - CORS enabled                                      │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                  Database Layer                      │
│              SQLite (league.db)                      │
│  - File-based database                               │
│  - Volume-mounted in production                      │
└─────────────────────────────────────────────────────┘
```

---

## 🖥️ Backend Architecture

### Tech Stack

- **Framework**: Flask (Python)
- **ORM**: SQLAlchemy
- **CORS**: Flask-CORS
- **Testing**: pytest with pytest-cov
- **Server**: Runs on 0.0.0.0:8082 in debug mode

### Project Structure

```
backend/
├── server.py              # Flask app entry point, blueprint registration
├── db.py                  # Database connection and configuration
├── models.py              # SQLAlchemy ORM models
├── requirements.txt       # Python dependencies
├── pytest.ini             # pytest configuration
├── Dockerfile             # Backend container definition
├── Entities/              # Entity business logic classes
│   ├── Course.py
│   ├── Division.py
│   ├── Hole.py
│   ├── Player.py
│   ├── Team.py
│   └── TeamMember.py
├── routes/                # API route blueprints
│   ├── courses.py         # Course CRUD endpoints
│   ├── divisions.py       # Division CRUD endpoints
│   ├── players.py         # Player CRUD + GHIN integration
│   └── teams.py           # Team CRUD endpoints
├── tests/                 # Comprehensive test suite
│   ├── conftest.py        # pytest fixtures
│   ├── test_entities.py
│   ├── test_routes_courses.py
│   ├── test_routes_divisions.py
│   ├── test_routes_players.py
│   └── test_routes_teams.py
└── data/                  # SQLite database location
    └── league.db          # Main database file
```

### Database Models

**Player Model** (`models.py`)

- Fields: id, GHIN, firstName, lastName, handicap, frontNine, backNine, teePreference, autoUpdateGHIN, handicap_updated_date
- GHIN integration for automatic handicap updates
- Supports 9-hole handicaps (front/back)

**Team Model** (`models.py`)

- Fields: id, teamNumber, divisionId, forceAB
- One-to-many relationship with TeamMember
- Cascade delete for team members

**TeamMember Model** (`models.py`)

- Fields: id, team_id, player_id, APlayer
- Junction table for Team-Player many-to-many
- APlayer boolean designates A-team vs B-team players

**Course Model** (`models.py`)

- Fields: id, name, tee
- One-to-many relationship with Hole
- Cascade delete for holes

**Hole Model** (`models.py`)

- Fields: id, number, handicapIndex, course_id
- Belongs to a Course
- Handicap index for stroke allocation

**Division Model** (`models.py`)

- Fields: id, name
- Simple division categorization for teams

### API Patterns

**All models implement `to_dict()` method** for JSON serialization:

```python
def to_dict(self):
    """Convert model instance to dictionary."""
    return {
        'id': self.id,
        'field': self.field,
        # ... all fields
    }
```

**Blueprint Registration** (`server.py`):

```python
from routes import players_bp, teams_bp, courses_bp, divisions_bp
app.register_blueprint(players_bp)
app.register_blueprint(teams_bp)
app.register_blueprint(courses_bp)
app.register_blueprint(divisions_bp)
```

**Route Naming Convention**:

- GET `/api/resource` - List all
- GET `/api/resource/<id>` - Get one
- POST `/api/resource` - Create
- PUT `/api/resource/<id>` - Update
- DELETE `/api/resource/<id>` - Delete

---

## 🎨 Frontend Architecture

### Tech Stack

- **Framework**: React 18.2.0
- **State Management**: Redux 4.2.1 with Redux Thunk 2.4.2
- **Build Tool**: Vite 5.0.8 (migrated from Create React App)
- **HTTP Client**: Axios 1.6.0
- **Testing**: Vitest 1.0.4 + React Testing Library 14.1.2
- **Test UI**: @vitest/ui for interactive test running

### Project Structure

```
client-app/
├── index.html             # Vite entry point
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
├── Dockerfile             # Frontend container definition
├── .env.development       # Development environment config
├── .prettierrc            # Code formatting rules
├── public/                # Static assets
│   ├── index.html         # Legacy CRA index (reference)
│   ├── favicon.ico
│   ├── Players_Testing.json    # Test data
│   └── Teams_Testing.json      # Test data
└── src/
    ├── index.js           # React app entry
    ├── index.css          # Global styles
    ├── Root.js            # Redux Provider wrapper
    ├── setupTests.js      # Test configuration
    ├── config.js          # API base URL configuration
    ├── Components/        # React components
    │   ├── App/
    │   │   ├── App.js     # Main app container
    │   │   ├── App.css
    │   │   └── App.test.js
    │   ├── NavBar/        # Navigation component
    │   ├── Login/         # Login page
    │   └── Pages/         # Main application pages
    │       ├── Players.js         # Player list/management
    │       ├── Player.js          # Individual player view
    │       ├── Teams.js           # Team list/management
    │       ├── Team.js            # Individual team view
    │       ├── Matches.js         # Match scheduling
    │       ├── Divisions.js       # Division management
    │       ├── Division.js        # Individual division view
    │       ├── Scorecard.js       # Match scorecard
    │       ├── PlayerScorecard.js # Player-specific scorecard
    │       ├── HoleHandicaps.js   # Hole handicap configuration
    │       └── TeamTotals.js      # Team scoring totals
    ├── Actions/           # Redux actions
    │   ├── ActionTypes.js # Action type constants
    │   ├── GolfActions.js # Action creators
    │   └── GolfActions.test.js
    ├── Store/             # Redux store configuration
    │   ├── configureStore.js  # Store setup
    │   ├── InitialState.js    # Default state
    │   ├── rootReducer.js     # Combine reducers
    │   ├── golfReducer.js     # Main reducer
    │   └── golfReducer.test.js
    ├── DataServices/      # API service layer
    │   ├── AppData.js     # Main API client
    │   ├── AppData.test.js
    │   ├── GhinDataService.js      # GHIN API integration
    │   └── GhinDataService.test.js
    └── Commons/           # Shared utilities
        └── commonMethods.js
```

### Redux State Management

**State Structure** (`InitialState.js`):

```javascript
{
  golf: {
    currentPage: 'Login',    // Navigation state
    loggedInUser: undefined, // User session
    players: [],             // Player list
    teams: [],               // Team list
    divisions: [],           // Division list
    courses: [],             // Course list
    // ... additional state for matches, scorecards, etc.
  }
}
```

**Action Pattern**:

```javascript
// Action Types (ActionTypes.js)
export const LOAD_PLAYERS = 'LOAD_PLAYERS';

// Action Creator (GolfActions.js)
export function loadPlayers() {
  return function(dispatch) {
    return AppData.getPlayers().then(players => {
      dispatch(loadPlayersSuccess(players));
    });
  };
}

// Reducer (golfReducer.js)
case actionTypes.LOAD_PLAYERS_SUCCESS:
  return { ...state, players: action.players };
```

### Component Patterns

**Connected Component Pattern**:

```javascript
import { connect } from "react-redux";

export class ComponentName extends Component {
  render() {
    /* ... */
  }
}

const mapStateToProps = (state) => ({
  golf: state.golf,
});

const actionCreators = {
  // action creators here
};

export default connect(mapStateToProps, actionCreators)(ComponentName);
```

**Page Navigation** (via Redux state):

```javascript
// App.js shows pages based on currentPage state
{
  this.props.golf.currentPage === "Players" && <Players />;
}
{
  this.props.golf.currentPage === "Teams" && <Teams />;
}
// etc.
```

### API Service Layer

**AppData.js** - Main API client with methods like:

- `getPlayers()`, `getPlayer(id)`, `savePlayer(player)`, `deletePlayer(id)`
- `getTeams()`, `getTeam(id)`, `saveTeam(team)`, `deleteTeam(id)`
- `getCourses()`, `getDivisions()`
- Axios-based with baseURL configured in `config.js`

**GhinDataService.js** - GHIN (Golf Handicap Information Network) integration:

- Fetches real-time handicap data for players
- Updates player handicap information automatically

---

## 🔑 Key Features & Business Logic

### 1. Player Management

- Store golfer information including GHIN number
- Automatic handicap updates from GHIN system
- Support for 9-hole handicaps (front/back nine)
- Tee preference tracking
- Toggle for auto-update of GHIN data

### 2. Team Organization

- Teams identified by team number
- Multiple players per team via TeamMember junction
- A/B player designation for match play pairing
- forceAB flag to override default A/B assignment
- Division assignment for league organization

### 3. Match Play

- Schedule matches between teams
- Track match results
- Scorecard entry with hole-by-hole scoring
- Handicap stroke allocation by hole

### 4. Course Management

- Multiple courses with different tees
- 18 holes per course
- Handicap index per hole for stroke allocation
- Course-specific handicapping

### 5. Division Management

- Organize teams into competitive divisions
- Simple division structure for league play

---

## 🛠️ Development Conventions

### Backend Conventions

- **Naming**: snake_case for variables, functions, and database columns
- **Models**: All models inherit from SQLAlchemy `Base`
- **Serialization**: Every model has `to_dict()` method
- **Blueprints**: Routes organized by resource type
- **Testing**: Comprehensive pytest suite with fixtures in `conftest.py`
- **Error Handling**: Use Flask error handlers (implement as needed)

### Frontend Conventions

- **Naming**: camelCase for variables and functions
- **Components**: Class components with Redux connect HOC
- **File Structure**: Component test files alongside component files (e.g., `App.js` + `App.test.js`)
- **Exports**: Named export for testable class, default export for connected component
- **PropTypes**: Use prop-types for component prop validation
- **Testing**: Vitest with React Testing Library, colocated test files

### Code Style

- **Frontend**: Prettier configured (`.prettierrc`)
- **Backend**: Follow PEP 8 Python style guide
- **Imports**: Group by standard library, third-party, local
- **Comments**: Document complex business logic, not obvious code

---

## 🐳 Deployment & DevOps

### Docker Setup

**Development** (`docker-compose.yml`):

- Backend container (Python Flask)
- Frontend container (Vite dev server)
- Hot-reload enabled for development

**Production** (`docker-compose-prod.yml`):

- Backend container (Python Flask)
- Frontend container (built static files)
- Volume mounting for database persistence

### Environment Variables

**Required for Production**:

- `DATABASE_LOCATION`: Path to directory (not file) for SQLite database
  - Example: `/path/to/data` (NOT `/path/to/data/league.db`)
  - Volume mounted in production

**Frontend** (`.env.development`):

- `VITE_API_URL`: Backend API base URL (used in `config.js`)

### Running the Application

**Backend**:

```bash
cd backend
pip3 install -r requirements.txt
python3 server.py  # Runs on port 8082
```

**Frontend**:

```bash
cd client-app
npm install
npm start  # Vite dev server
```

**Docker** (Development):

```bash
docker-compose up
```

**Docker** (Production):

```bash
docker-compose -f docker-compose-prod.yml up -d
```

---

## 🧪 Testing Strategy

### Backend Testing

- **Framework**: pytest with pytest-cov
- **Location**: `backend/tests/`
- **Fixtures**: Defined in `conftest.py`
- **Coverage**: Comprehensive test coverage for entities and routes

**Run Tests**:

```bash
cd backend
pytest                          # Run all tests
pytest -v                       # Verbose output
pytest tests/test_entities.py   # Specific file
pytest --cov=. --cov-report=html  # With coverage report
pytest -k "test_player"         # Pattern matching
```

### Frontend Testing

- **Framework**: Vitest + React Testing Library
- **Location**: Colocated with components (e.g., `App.test.js`)
- **Configuration**: `setupTests.js` for global test setup
- **UI**: Interactive test UI available with `npm run test:ui`

**Run Tests**:

```bash
cd client-app
npm test        # Interactive mode
npm run test:ui # Visual test UI
npm run test:run  # CI mode (run once)
```

---

## 📦 Dependencies Summary

### Backend

- Flask: Web framework
- Flask-CORS: Cross-origin resource sharing
- SQLAlchemy: ORM
- pytest: Testing framework
- pytest-cov: Coverage reporting

### Frontend

- react: UI library
- react-redux: Redux bindings
- redux: State management
- redux-thunk: Async action middleware
- axios: HTTP client
- vite: Build tool
- vitest: Test framework
- @testing-library/react: Component testing
- uuid: Unique ID generation

---

## 📊 Database Schema

```
┌─────────────┐
│   Player    │
├─────────────┤
│ id (PK)     │
│ GHIN        │
│ firstName   │
│ lastName    │
│ handicap    │
│ frontNine   │
│ backNine    │
│ ...         │
└─────────────┘
       △
       │
       │
┌─────────────┐      ┌─────────────┐
│    Team     │──────│ TeamMember  │
├─────────────┤      ├─────────────┤
│ id (PK)     │      │ id (PK)     │
│ teamNumber  │◄─────│ team_id(FK) │
│ divisionId  │      │ player_id(FK)│
│ forceAB     │      │ APlayer     │
└─────────────┘      └─────────────┘
       │
       │
       ▽
┌─────────────┐
│  Division   │
├─────────────┤
│ id (PK)     │
│ name        │
└─────────────┘

┌─────────────┐
│   Course    │
├─────────────┤
│ id (PK)     │
│ name        │
│ tee         │
└─────────────┘
       △
       │
       │
┌─────────────┐
│    Hole     │
├─────────────┤
│ id (PK)     │
│ number      │
│ handicapIndex│
│ course_id(FK)│
└─────────────┘
```

---

## 🚀 Common Development Tasks

### Adding a New Entity/Model

1. **Backend**:

   - Add model class to `backend/models.py`
   - Create Entity class in `backend/Entities/`
   - Create route blueprint in `backend/routes/`
   - Register blueprint in `backend/server.py`
   - Add tests in `backend/tests/`

2. **Frontend**:
   - Add action types to `Actions/ActionTypes.js`
   - Create action creators in `Actions/GolfActions.js`
   - Add reducer cases to `Store/golfReducer.js`
   - Create API methods in `DataServices/AppData.js`
   - Create page component in `Components/Pages/`
   - Add navigation in `Components/App/App.js`

### Adding a New API Endpoint

1. Add route function to appropriate blueprint in `backend/routes/`
2. Add corresponding API method in `client-app/src/DataServices/AppData.js`
3. Create Redux action in `client-app/src/Actions/GolfActions.js`
4. Update reducer in `client-app/src/Store/golfReducer.js`
5. Add tests for both backend route and frontend components

### Running in Different Modes

**Development** (with hot reload):

```bash
# Terminal 1 - Backend
cd backend && python3 server.py

# Terminal 2 - Frontend
cd client-app && npm start
```

**Production** (Docker):

```bash
docker-compose -f docker-compose-prod.yml up -d
```

---

## 🎯 Project-Specific Patterns to Follow

### When Working with Redux State

- Always use action creators, never dispatch plain objects directly
- Use Redux Thunk for async operations (API calls)
- Keep state normalized (arrays of objects with IDs)
- Use `mapStateToProps` to access state, `actionCreators` object for actions

### When Creating Components

- Export both named class (for testing) and default connected component
- Put test file next to component file
- Use class components (existing pattern in codebase)
- Connect to Redux even for simple components

### When Writing Backend Routes

- Follow RESTful conventions
- Return JSON with appropriate HTTP status codes
- Use SQLAlchemy sessions properly (commit, rollback)
- Add comprehensive error handling
- Write tests in `backend/tests/`

### When Working with Database

- Never directly modify the database schema manually
- Use SQLAlchemy models only
- Implement migrations if needed (not currently in place)
- Use `to_dict()` for all model serialization

---

## 📝 Important Notes

1. **Database Location**: The `DATABASE_LOCATION` environment variable should point to a directory, not the database file itself. The application creates `league.db` automatically.

2. **GHIN Integration**: Players can have their handicaps automatically updated from the GHIN system if `autoUpdateGHIN` is enabled.

3. **Team A/B Players**: Teams use an A/B designation for players in match play. The `forceAB` flag can override automatic assignments.

4. **Vite Migration**: Project was migrated from Create React App to Vite. Some legacy files remain in `public/` for reference.

5. **Test Data**: Sample test data files exist in `client-app/public/` for development testing.

6. **Port Configuration**: Backend runs on port 8082. Frontend port varies by environment (Vite default is 5173 in dev).

---

## 🔍 When to Use This Document

**Cline should reference this document when**:

- Starting work on a new feature
- Understanding project architecture
- Writing code that needs to follow established patterns
- Adding new API endpoints or database models
- Setting up the development environment
- Understanding the relationship between frontend and backend
- Making changes that affect multiple parts of the system

**This document provides**:

- Instant context about the codebase structure
- Established patterns to follow
- Common tasks and how to accomplish them
- Architecture decisions and their rationale
- Testing strategies and conventions

---

## 📚 Additional Resources

- **Postman Collection**: `Postman/Golf Scoring Backend.postman_collection.json`
- **Migration Notes**: `client-app/MIGRATION_SUMMARY.md` (CRA to Vite)
- **Git Repository**: git@github.com:sokolb/GolfScoring.git

---

**Last Updated**: November 29, 2025  
**Maintained By**: Project development team  
**Purpose**: Provide comprehensive context for AI-assisted development with Cline
