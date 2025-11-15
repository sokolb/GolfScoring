"""Routes package initialization."""
from .players import players_bp
from .teams import teams_bp
from .courses import courses_bp
from .divisions import divisions_bp

__all__ = ['players_bp', 'teams_bp', 'courses_bp', 'divisions_bp']
