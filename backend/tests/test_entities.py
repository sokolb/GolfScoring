"""Unit tests for entity classes."""
import json
import pytest
from Entities.Player import Player
from Entities.Division import Division
from Entities.Team import Team
from Entities.TeamMember import TeamMember
from Entities.Course import Course
from Entities.Hole import Hole


class TestPlayer:
    """Test cases for Player entity."""
    
    def test_player_initialization(self):
        """Test Player object initialization."""
        player = Player(
            1, 'John', 'Doe', '12345', 10.5, 
            5, 6, 'Blue', 1, '2023-01-01'
        )
        
        assert player.id == 1
        assert player.firstName == 'John'
        assert player.lastName == 'Doe'
        assert player.GHIN == '12345'
        assert player.handicap == 10.5
        assert player.frontNine == 5
        assert player.backNine == 6
        assert player.teePreference == 'Blue'
        assert player.autoUpdateGHIN == 1
        assert player.handicap_updated_date == '2023-01-01'
    
    def test_player_to_json(self):
        """Test Player toJSON method."""
        player = Player(
            1, 'John', 'Doe', '12345', 10.5, 
            5, 6, 'Blue', 1, '2023-01-01'
        )
        
        json_str = player.toJSON()
        assert isinstance(json_str, str)
        
        # Parse JSON and verify content
        data = json.loads(json_str)
        assert data['id'] == 1
        assert data['firstName'] == 'John'
        assert data['lastName'] == 'Doe'
        assert data['GHIN'] == '12345'


class TestDivision:
    """Test cases for Division entity."""
    
    def test_division_initialization(self):
        """Test Division object initialization."""
        division = Division(1, 'A Division')
        
        assert division.id == 1
        assert division.name == 'A Division'
    
    def test_division_to_json(self):
        """Test Division toJSON method."""
        division = Division(1, 'A Division')
        
        json_str = division.toJSON()
        assert isinstance(json_str, str)
        
        # Parse JSON and verify content
        data = json.loads(json_str)
        assert data['id'] == 1
        assert data['name'] == 'A Division'


class TestTeamMember:
    """Test cases for TeamMember entity."""
    
    def test_team_member_initialization(self):
        """Test TeamMember object initialization."""
        team_member = TeamMember(1, 1)
        
        assert team_member.playerId == 1
        assert team_member.APlayer == 1
    
    def test_team_member_a_player(self):
        """Test TeamMember with A player designation."""
        team_member = TeamMember(5, 1)
        
        assert team_member.playerId == 5
        assert team_member.APlayer == 1
    
    def test_team_member_b_player(self):
        """Test TeamMember with B player designation."""
        team_member = TeamMember(5, 0)
        
        assert team_member.playerId == 5
        assert team_member.APlayer == 0


class TestTeam:
    """Test cases for Team entity."""
    
    def test_team_initialization(self):
        """Test Team object initialization."""
        team_members = [TeamMember(1, 1), TeamMember(2, 0)]
        team = Team(1, 5, team_members, 1, 0)
        
        assert team.id == 1
        assert team.teamNumber == 5
        assert team.divisionId == 1
        assert team.forceAB == 0
        assert len(team.teamMembers) == 2
    
    def test_team_to_json(self):
        """Test Team toJSON method."""
        team_members = [TeamMember(1, 1), TeamMember(2, 0)]
        team = Team(1, 5, team_members, 1, 0)
        
        json_str = team.toJSON()
        assert isinstance(json_str, str)
        
        # Parse JSON and verify content
        data = json.loads(json_str)
        assert data['id'] == 1
        assert data['teamNumber'] == 5
        assert data['divisionId'] == 1
        assert len(data['teamMembers']) == 2


class TestHole:
    """Test cases for Hole entity."""
    
    def test_hole_initialization(self):
        """Test Hole object initialization."""
        hole = Hole(1, 1, 10)
        
        assert hole.id == 1
        assert hole.number == 1
        assert hole.handicapIndex == 10
    
    def test_hole_different_handicap_indexes(self):
        """Test Hole with various handicap indexes."""
        holes = [
            Hole(1, 1, 10),
            Hole(2, 2, 12),
            Hole(3, 3, 8)
        ]
        
        assert holes[0].handicapIndex == 10
        assert holes[1].handicapIndex == 12
        assert holes[2].handicapIndex == 8


class TestCourse:
    """Test cases for Course entity."""
    
    def test_course_initialization(self):
        """Test Course object initialization."""
        holes = [
            Hole(1, 1, 10),
            Hole(2, 2, 12),
            Hole(3, 3, 8)
        ]
        course = Course(1, 'Pine Valley', 'Blue', holes)
        
        assert course.id == 1
        assert course.name == 'Pine Valley'
        assert course.tee == 'Blue'
        assert len(course.holes) == 3
    
    def test_course_to_json(self):
        """Test Course toJSON method."""
        holes = [
            Hole(1, 1, 10),
            Hole(2, 2, 12)
        ]
        course = Course(1, 'Pine Valley', 'Blue', holes)
        
        json_str = course.toJSON()
        assert isinstance(json_str, str)
        
        # Parse JSON and verify content
        data = json.loads(json_str)
        assert data['id'] == 1
        assert data['name'] == 'Pine Valley'
        assert data['tee'] == 'Blue'
        assert len(data['holes']) == 2
    
    def test_course_with_18_holes(self):
        """Test Course with full 18 holes."""
        holes = [Hole(i, i, (i % 18) + 1) for i in range(1, 19)]
        course = Course(1, 'Championship Course', 'Championship', holes)
        
        assert len(course.holes) == 18
        assert course.holes[0].number == 1
        assert course.holes[17].number == 18
