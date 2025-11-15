"""SQLAlchemy ORM models for the golf scoring application."""
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()


class Player(Base):
    """Player model."""
    __tablename__ = 'player'
    
    id = Column(Integer, primary_key=True)
    GHIN = Column(Integer, nullable=False)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    handicap = Column(Float)
    frontNine = Column(Float)
    backNine = Column(Float)
    teePreference = Column(String)
    autoUpdateGHIN = Column(Boolean, default=True)
    handicap_updated_date = Column(DateTime, default=None)
    
    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            'id': self.id,
            'GHIN': self.GHIN,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'handicap': self.handicap,
            'frontNine': self.frontNine,
            'backNine': self.backNine,
            'teePreference': self.teePreference,
            'autoUpdateGHIN': self.autoUpdateGHIN,
            'handicap_updated_date': self.handicap_updated_date.isoformat() if self.handicap_updated_date else None
        }


class Team(Base):
    """Team model."""
    __tablename__ = 'team'
    
    id = Column(Integer, primary_key=True)
    teamNumber = Column(Integer, nullable=False)
    divisionId = Column(Integer, default=-1)
    forceAB = Column(Boolean, default=False)
    
    members = relationship('TeamMember', back_populates='team', cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            'id': self.id,
            'teamNumber': self.teamNumber,
            'divisionId': self.divisionId,
            'forceAB': self.forceAB,
            'teamMembers': [member.to_dict() for member in self.members]
        }


class TeamMember(Base):
    """TeamMember model."""
    __tablename__ = 'team_member'
    
    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, ForeignKey('team.id'), nullable=False)
    player_id = Column(Integer, ForeignKey('player.id'), nullable=False)
    APlayer = Column(Boolean, default=False)
    
    team = relationship('Team', back_populates='members')
    player = relationship('Player')
    
    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            'playerId': self.player_id,
            'APlayer': self.APlayer
        }


class Course(Base):
    """Course model."""
    __tablename__ = 'course'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    tee = Column(String)
    
    holes = relationship('Hole', back_populates='course', cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'tee': self.tee,
            'holes': [hole.to_dict() for hole in self.holes]
        }


class Hole(Base):
    """Hole model."""
    __tablename__ = 'hole'
    
    id = Column(Integer, primary_key=True)
    number = Column(Integer, nullable=False)
    handicapIndex = Column(Integer)
    course_id = Column(Integer, ForeignKey('course.id'), nullable=False)
    
    course = relationship('Course', back_populates='holes')
    
    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            'id': self.id,
            'number': self.number,
            'handicapIndex': self.handicapIndex,
            'course_id': self.course_id
        }


class Division(Base):
    """Division model."""
    __tablename__ = 'division'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    
    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            'id': self.id,
            'name': self.name
        }
