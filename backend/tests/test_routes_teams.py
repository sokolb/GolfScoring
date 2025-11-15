"""Unit tests for team routes."""
import json
import pytest
from unittest.mock import patch, MagicMock


class TestTeamRoutes:
    """Test cases for team API endpoints."""
    
    @patch('routes.teams.TeamMember')
    @patch('routes.teams.Team')
    @patch('db.db.get_session')
    def test_create_team(self, mock_get_session, mock_team_class, mock_team_member_class, client, sample_team_data):
        """Test creating a new team."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock the team instance that gets created
        mock_team_instance = MagicMock()
        mock_team_instance.id = 1
        mock_team_class.return_value = mock_team_instance
        
        response = client.post('/team/-1',
                               data=json.dumps(sample_team_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        assert 'Access-Control-Allow-Origin' in response.headers
        mock_session.add.assert_called()
        mock_session.commit.assert_called_once()
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_team_existing(self, mock_get_session, client):
        """Test retrieving an existing team."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock team members
        mock_member1 = MagicMock()
        mock_member1.to_dict.return_value = {'playerId': 1, 'APlayer': True}
        
        mock_member2 = MagicMock()
        mock_member2.to_dict.return_value = {'playerId': 2, 'APlayer': False}
        
        # Mock the team object
        mock_team = MagicMock()
        mock_team.to_dict.return_value = {
            'id': 1,
            'teamNumber': 5,
            'divisionId': 1,
            'forceAB': False,
            'teamMembers': [
                {'playerId': 1, 'APlayer': True},
                {'playerId': 2, 'APlayer': False}
            ]
        }
        
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = mock_team
        mock_session.query.return_value = mock_query
        
        response = client.get('/team/1')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert data['id'] == 1
        assert data['teamNumber'] == 5
        assert data['divisionId'] == 1
        assert len(data['teamMembers']) == 2
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_team_not_found(self, mock_get_session, client):
        """Test retrieving a non-existent team."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = None
        mock_session.query.return_value = mock_query
        
        response = client.get('/team/999')
        
        assert response.status_code == 204
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_update_team(self, mock_get_session, client, sample_team_data):
        """Test updating an existing team."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock existing team
        mock_team = MagicMock()
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = mock_team
        mock_session.query.return_value = mock_query
        
        response = client.post('/team/1',
                               data=json.dumps(sample_team_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        # Should commit changes
        mock_session.commit.assert_called_once()
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_delete_team(self, mock_get_session, client):
        """Test deleting a team."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock existing team
        mock_team = MagicMock()
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = mock_team
        mock_session.query.return_value = mock_query
        
        response = client.delete('/team/1')
        
        assert response.status_code == 200
        assert b'Success' in response.data
        # Should delete team (cascade will delete members automatically)
        mock_session.delete.assert_called_once_with(mock_team)
        mock_session.commit.assert_called_once()
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_all_teams(self, mock_get_session, client):
        """Test retrieving all teams."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock team objects
        mock_team1 = MagicMock()
        mock_team1.to_dict.return_value = {
            'id': 1,
            'teamNumber': 1,
            'divisionId': 1,
            'forceAB': False,
            'teamMembers': [
                {'playerId': 1, 'APlayer': True},
                {'playerId': 2, 'APlayer': False}
            ]
        }
        
        mock_team2 = MagicMock()
        mock_team2.to_dict.return_value = {
            'id': 2,
            'teamNumber': 2,
            'divisionId': 1,
            'forceAB': True,
            'teamMembers': [
                {'playerId': 3, 'APlayer': True},
                {'playerId': 4, 'APlayer': False}
            ]
        }
        
        mock_query = MagicMock()
        mock_query.all.return_value = [mock_team1, mock_team2]
        mock_session.query.return_value = mock_query
        
        response = client.get('/getAllTeams')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]['teamNumber'] == 1
        assert data[1]['teamNumber'] == 2
        assert len(data[0]['teamMembers']) == 2
        assert len(data[1]['teamMembers']) == 2
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_all_teams_empty(self, mock_get_session, client):
        """Test retrieving all teams when none exist."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        mock_query = MagicMock()
        mock_query.all.return_value = []
        mock_session.query.return_value = mock_query
        
        response = client.get('/getAllTeams')
        
        assert response.status_code == 204
        mock_session.close.assert_called_once()
    
    @patch('routes.teams.TeamMember')
    @patch('routes.teams.Team')
    @patch('db.db.get_session')
    def test_create_team_with_force_ab(self, mock_get_session, mock_team_class, mock_team_member_class, client):
        """Test creating a team with forceAB enabled."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock the team instance that gets created
        mock_team_instance = MagicMock()
        mock_team_instance.id = 1
        mock_team_class.return_value = mock_team_instance
        
        team_data = {
            'team': {
                'teamNumber': 1,
                'divisionId': 1,
                'forceAB': 1,
                'teamMembers': [
                    {'playerId': 1, 'APlayer': 1},
                    {'playerId': 2, 'APlayer': 0}
                ]
            }
        }
        
        response = client.post('/team/-1',
                               data=json.dumps(team_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        mock_session.add.assert_called()
        mock_session.commit.assert_called_once()
        mock_session.close.assert_called_once()
