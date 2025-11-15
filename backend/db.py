"""Database initialization and connection management."""
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool


class Database:
    """Handles database connection and initialization."""
    
    def __init__(self):
        self.engine = create_engine(
            'sqlite:///data/league.db?check_same_thread=False',
            poolclass=QueuePool,
            pool_size=20,
            max_overflow=100,
            pool_timeout=30
        )
        self._initialize_tables()
    
    def _initialize_tables(self):
        """Create tables and apply schema migrations."""
        con = self.engine.connect()
        
        # Create tables if they don't exist
        con.execute('''CREATE TABLE if not exists player
                    (id INTEGER PRIMARY KEY, GHIN INTEGER, firstName TEXT, 
                    lastName TEXT, handicap REAL, frontNine REAL, backNine REAL, 
                    teePreference TEXT)''')
        
        con.execute('''CREATE TABLE if not exists team
                    (id INTEGER PRIMARY KEY, teamNumber INTEGER)''')
        
        con.execute('''CREATE TABLE if not exists team_member
                    (id INTEGER PRIMARY KEY, team_id INTEGER, player_id INTEGER)''')
        
        con.execute('''CREATE TABLE if not exists course
                    (id INTEGER PRIMARY KEY, name TEXT, tee TEXT)''')
        
        con.execute('''CREATE TABLE if not exists hole
                    (id INTEGER PRIMARY KEY, number INTEGER, handicapIndex INTEGER, 
                    course_id INTEGER)''')
        
        con.execute('''CREATE TABLE if not exists division
                    (id INTEGER PRIMARY KEY, name TEXT)''')
        
        # Apply schema migrations
        self._apply_migrations(con)
        
        con.close()
    
    def _apply_migrations(self, con):
        """Apply database schema migrations."""
        migrations = [
            {
                'name': 'autoUpdateGHIN',
                'sql': '''ALTER TABLE player
                        ADD COLUMN autoUpdateGHIN BOOLEAN DEFAULT 1'''
            },
            {
                'name': 'divisionId',
                'sql': '''ALTER TABLE team
                        ADD COLUMN divisionId INTEGER DEFAULT -1'''
            },
            {
                'name': 'forceAB',
                'sql': '''ALTER TABLE team
                        ADD COLUMN forceAB BOOLEAN DEFAULT 0'''
            },
            {
                'name': 'APlayer',
                'sql': '''ALTER TABLE team_member
                        ADD COLUMN APlayer BOOLEAN DEFAULT 0'''
            },
            {
                'name': 'handicap_updated_date',
                'sql': '''ALTER TABLE player
                        ADD COLUMN handicap_updated_date DATETIME DEFAULT null'''
            }
        ]
        
        for migration in migrations:
            try:
                con.execute(migration['sql'])
            except Exception as e:
                print(f"{migration['name']} already exists")
    
    def get_connection(self):
        """Get a database connection."""
        return self.engine.connect()


# Global database instance
db = Database()
