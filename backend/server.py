"""Flask application entry point."""
from flask import Flask
from flask_cors import CORS
from db import db
from routes import players_bp, teams_bp, courses_bp, divisions_bp

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(players_bp)
app.register_blueprint(teams_bp)
app.register_blueprint(courses_bp)
app.register_blueprint(divisions_bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082, debug=True)
