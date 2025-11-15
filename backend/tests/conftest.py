"""Pytest fixtures for Golf Scoring Backend tests."""
import pytest
import sqlite3
import tempfile
import os
from flask import Flask
from flask_cors import CORS


@pytest.fixture
def test_db():
    """Create a temporary test database."""
    db_fd, db_path = tempfile.mkstemp()
    
    # Create connection and initialize schema
    conn = sqlite3.connect(db_path)
    conn.execute('''CREATE TABLE player (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        GHIN TEXT,
        handicap REAL,
        frontNine INTEGER,
        backNine INTEGER,
        teePreference TEXT,
        autoUpdateGHIN INTEGER,
        handicap_updated_date TEXT
    )''')
    
    conn.execute('''CREATE TABLE division (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )''')
    
    conn.execute('''CREATE TABLE team (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teamNumber INTEGER NOT NULL,
        divisionId INTEGER,
        forceAB INTEGER,
        FOREIGN KEY (divisionId) REFERENCES division (id)
    )''')
    
    conn.execute('''CREATE TABLE team_member (
        team_id INTEGER,
        player_id INTEGER,
        APlayer INTEGER,
        FOREIGN KEY (team_id) REFERENCES team (id),
        FOREIGN KEY (player_id) REFERENCES player (id)
    )''')
    
    conn.execute('''CREATE TABLE course (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        tee TEXT
    )''')
    
    conn.execute('''CREATE TABLE hole (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number INTEGER NOT NULL,
        handicapIndex INTEGER,
        course_id INTEGER,
        FOREIGN KEY (course_id) REFERENCES course (id)
    )''')
    
    conn.commit()
    conn.close()
    
    yield db_path
    
    # Cleanup
    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def app(test_db):
    """Create and configure a test Flask application."""
    from routes import players_bp, teams_bp, courses_bp, divisions_bp
    
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['DATABASE'] = test_db
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(players_bp)
    app.register_blueprint(teams_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(divisions_bp)
    
    yield app


@pytest.fixture
def client(app):
    """Create a test client for the Flask application."""
    return app.test_client()


@pytest.fixture
def db_connection(test_db):
    """Create a database connection for direct test data manipulation."""
    conn = sqlite3.connect(test_db)
    yield conn
    conn.close()


@pytest.fixture
def sample_player_data():
    """Sample player data for testing."""
    return {
        'player': {
            'firstName': 'John',
            'lastName': 'Doe',
            'GHIN': '12345',
            'handicap': 10.5,
            'frontNine': 5,
            'backNine': 6,
            'teePreference': 'Blue',
            'autoUpdateGHIN': 1
        }
    }


@pytest.fixture
def sample_division_data():
    """Sample division data for testing."""
    return {
        'division': {
            'name': 'A Division'
        }
    }


@pytest.fixture
def sample_team_data():
    """Sample team data for testing."""
    return {
        'team': {
            'teamNumber': 1,
            'divisionId': 1,
            'forceAB': 0,
            'teamMembers': [
                {'playerId': 1, 'APlayer': 1},
                {'playerId': 2, 'APlayer': 0}
            ]
        }
    }


@pytest.fixture
def sample_course_data():
    """Sample course data for testing."""
    return {
        'course': {
            'name': 'Pine Valley Golf Course',
            'tee': 'Championship',
            'holes': [
                {'number': 1, 'handicapIndex': 10},
                {'number': 2, 'handicapIndex': 12},
                {'number': 3, 'handicapIndex': 8},
                {'number': 4, 'handicapIndex': 2},
                {'number': 5, 'handicapIndex': 16},
                {'number': 6, 'handicapIndex': 6},
                {'number': 7, 'handicapIndex': 14},
                {'number': 8, 'handicapIndex': 4},
                {'number': 9, 'handicapIndex': 18},
                {'number': 10, 'handicapIndex': 9},
                {'number': 11, 'handicapIndex': 11},
                {'number': 12, 'handicapIndex': 7},
                {'number': 13, 'handicapIndex': 1},
                {'number': 14, 'handicapIndex': 15},
                {'number': 15, 'handicapIndex': 5},
                {'number': 16, 'handicapIndex': 13},
                {'number': 17, 'handicapIndex': 3},
                {'number': 18, 'handicapIndex': 17}
            ]
        }
    }
