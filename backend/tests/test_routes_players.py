"""Unit tests for player routes."""
import json
import pytest
from unittest.mock import patch, MagicMock


class TestPlayerRoutes:
    """Test cases for player API endpoints."""
    
    @patch('db.db.get_connection')
    def test_create_player(self, mock_get_conn, client, sample_player_data):
        """Test creating a new player."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.lastrowid = 1
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/player/-1', 
                               data=json.dumps(sample_player_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        assert 'Access-Control-Allow-Origin' in response.headers
    
    @patch('db.db.get_connection')
    def test_get_player_existing(self, mock_get_conn, client):
        """Test retrieving an existing player."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.fetchone.return_value = (
            1, 'John', 'Doe', '12345', 10.5, 5, 6, 'Blue', 1, '2023-01-01'
        )
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/player/1')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert data['id'] == 1
        assert data['firstName'] == 'John'
        assert data['lastName'] == 'Doe'
    
    @patch('db.db.get_connection')
    def test_get_player_not_found(self, mock_get_conn, client):
        """Test retrieving a non-existent player."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.fetchone.return_value = None
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/player/999')
        
        assert response.status_code == 204
    
    @patch('db.db.get_connection')
    def test_update_player(self, mock_get_conn, client, sample_player_data):
        """Test updating an existing player."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/player/1',
                               data=json.dumps(sample_player_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        mock_conn.execute.assert_called()
    
    @patch('db.db.get_connection')
    def test_delete_player(self, mock_get_conn, client):
        """Test deleting a player."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.delete('/player/1')
        
        assert response.status_code == 200
        assert b'Success' in response.data
        mock_conn.execute.assert_called_once()
    
    @patch('db.db.get_connection')
    def test_get_all_players(self, mock_get_conn, client):
        """Test retrieving all players."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_conn.execute.return_value = [
            (1, 'John', 'Doe', '12345', 10.5, 5, 6, 'Blue', 1, '2023-01-01'),
            (2, 'Jane', 'Smith', '67890', 15.2, 7, 8, 'White', 1, '2023-01-02')
        ]
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllPlayers')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]['firstName'] == 'John'
        assert data[1]['firstName'] == 'Jane'
    
    @patch('db.db.get_connection')
    def test_get_all_players_empty(self, mock_get_conn, client):
        """Test retrieving all players when none exist."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_conn.execute.return_value = None
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllPlayers')
        
        assert response.status_code == 204
