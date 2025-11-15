"""Unit tests for team routes."""
import json
import pytest
from unittest.mock import patch, MagicMock


class TestTeamRoutes:
    """Test cases for team API endpoints."""
    
    @patch('db.db.get_connection')
    def test_create_team(self, mock_get_conn, client, sample_team_data):
        """Test creating a new team."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.lastrowid = 1
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/team/-1',
                               data=json.dumps(sample_team_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        assert 'Access-Control-Allow-Origin' in response.headers
    
    @patch('db.db.get_connection')
    def test_get_team_existing(self, mock_get_conn, client):
        """Test retrieving an existing team."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_team_result = MagicMock()
        mock_team_result.fetchone.return_value = (1, 5, 1, 0)
        
        mock_members_result = [
            (1, 1),
            (2, 0)
        ]
        
        # Configure execute to return different results for different queries
        mock_conn.execute.side_effect = [mock_team_result, mock_members_result]
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/team/1')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert data['id'] == 1
        assert data['teamNumber'] == 5
        assert data['divisionId'] == 1
        assert len(data['teamMembers']) == 2
    
    @patch('db.db.get_connection')
    def test_get_team_not_found(self, mock_get_conn, client):
        """Test retrieving a non-existent team."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.fetchone.return_value = None
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/team/999')
        
        assert response.status_code == 204
    
    @patch('db.db.get_connection')
    def test_update_team(self, mock_get_conn, client, sample_team_data):
        """Test updating an existing team."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/team/1',
                               data=json.dumps(sample_team_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        # Check that execute was called multiple times (update team + delete members + insert members)
        assert mock_conn.execute.call_count >= 3
    
    @patch('db.db.get_connection')
    def test_delete_team(self, mock_get_conn, client):
        """Test deleting a team."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.delete('/team/1')
        
        assert response.status_code == 200
        assert b'Success' in response.data
        # Should delete from team table and team_member table
        assert mock_conn.execute.call_count == 2
    
    @patch('db.db.get_connection')
    def test_get_all_teams(self, mock_get_conn, client):
        """Test retrieving all teams."""
        # Mock database behavior
        mock_conn = MagicMock()
        
        # Mock teams data
        teams_data = [
            (1, 1, 1, 0),
            (2, 2, 1, 1)
        ]
        
        # Mock team members for each team
        team1_members = [(1, 1), (2, 0)]
        team2_members = [(3, 1), (4, 0)]
        
        # Configure execute to return different results for different queries
        mock_conn.execute.side_effect = [
            teams_data,
            team1_members,
            team2_members
        ]
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllTeams')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]['teamNumber'] == 1
        assert data[1]['teamNumber'] == 2
        assert len(data[0]['teamMembers']) == 2
        assert len(data[1]['teamMembers']) == 2
    
    @patch('db.db.get_connection')
    def test_get_all_teams_empty(self, mock_get_conn, client):
        """Test retrieving all teams when none exist."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_conn.execute.return_value = None
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllTeams')
        
        assert response.status_code == 204
    
    @patch('db.db.get_connection')
    def test_create_team_with_force_ab(self, mock_get_conn, client):
        """Test creating a team with forceAB enabled."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.lastrowid = 1
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
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
