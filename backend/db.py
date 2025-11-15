"""Database initialization and connection management."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.pool import QueuePool
from models import Base


class Database:
    """Handles database connection and ORM session management."""
    
    def __init__(self):
        self.engine = create_engine(
            'sqlite:///data/league.db?check_same_thread=False',
            poolclass=QueuePool,
            pool_size=20,
            max_overflow=100,
            pool_timeout=30
        )
        
        # Create session factory
        self.Session = scoped_session(sessionmaker(bind=self.engine))
        
        # Create all tables
        Base.metadata.create_all(self.engine)
        
        # Apply any additional migrations
        self._apply_migrations()
    
    def _apply_migrations(self):
        """Apply database schema migrations if needed."""
        # Note: With SQLAlchemy ORM, schema changes should be handled
        # by updating the models and using Alembic for migrations.
        # This method is kept for backward compatibility but ideally
        # you should set up Alembic for proper migration management.
        pass
    
    def get_session(self):
        """Get a database session."""
        return self.Session()
    
    def get_connection(self):
        """Get a raw database connection (for backward compatibility)."""
        return self.engine.connect()


# Global database instance
db = Database()
