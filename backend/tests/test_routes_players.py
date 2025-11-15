"""Unit tests for player routes."""
import json
import pytest
from unittest.mock import patch, MagicMock
from datetime import datetime


class TestPlayerRoutes:
    """Test cases for player API endpoints."""
    
    @patch('routes.players.Player')
    @patch('db.db.get_session')
    def test_create_player(self, mock_get_session, mock_player_class, client, sample_player_data):
        """Test creating a new player."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock the player instance that gets created
        mock_player_instance = MagicMock()
        mock_player_instance.id = 1
        mock_player_class.return_value = mock_player_instance
        
        response = client.post('/player/-1', 
                               data=json.dumps(sample_player_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        assert 'Access-Control-Allow-Origin' in response.headers
        mock_session.add.assert_called_once_with(mock_player_instance)
        mock_session.commit.assert_called_once()
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_player_existing(self, mock_get_session, client):
        """Test retrieving an existing player."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock the player object
        mock_player = MagicMock()
        mock_player.to_dict.return_value = {
            'id': 1,
            'firstName': 'John',
            'lastName': 'Doe',
            'GHIN': 12345,
            'handicap': 10.5,
            'frontNine': 5.0,
            'backNine': 6.0,
            'teePreference': 'Blue',
            'autoUpdateGHIN': True,
            'handicap_updated_date': '2023-01-01T00:00:00'
        }
        
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = mock_player
        mock_session.query.return_value = mock_query
        
        response = client.get('/player/1')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert data['id'] == 1
        assert data['firstName'] == 'John'
        assert data['lastName'] == 'Doe'
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_player_not_found(self, mock_get_session, client):
        """Test retrieving a non-existent player."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = None
        mock_session.query.return_value = mock_query
        
        response = client.get('/player/999')
        
        assert response.status_code == 204
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_update_player(self, mock_get_session, client, sample_player_data):
        """Test updating an existing player."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock existing player
        mock_player = MagicMock()
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = mock_player
        mock_session.query.return_value = mock_query
        
        response = client.post('/player/1',
                               data=json.dumps(sample_player_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        mock_session.commit.assert_called_once()
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_delete_player(self, mock_get_session, client):
        """Test deleting a player."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock existing player
        mock_player = MagicMock()
        mock_query = MagicMock()
        mock_query.filter_by.return_value.first.return_value = mock_player
        mock_session.query.return_value = mock_query
        
        response = client.delete('/player/1')
        
        assert response.status_code == 200
        assert b'Success' in response.data
        mock_session.delete.assert_called_once_with(mock_player)
        mock_session.commit.assert_called_once()
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_all_players(self, mock_get_session, client):
        """Test retrieving all players."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        # Mock player objects
        mock_player1 = MagicMock()
        mock_player1.to_dict.return_value = {
            'id': 1,
            'firstName': 'John',
            'lastName': 'Doe',
            'GHIN': 12345,
            'handicap': 10.5,
            'frontNine': 5.0,
            'backNine': 6.0,
            'teePreference': 'Blue',
            'autoUpdateGHIN': True,
            'handicap_updated_date': '2023-01-01T00:00:00'
        }
        
        mock_player2 = MagicMock()
        mock_player2.to_dict.return_value = {
            'id': 2,
            'firstName': 'Jane',
            'lastName': 'Smith',
            'GHIN': 67890,
            'handicap': 15.2,
            'frontNine': 7.0,
            'backNine': 8.0,
            'teePreference': 'White',
            'autoUpdateGHIN': True,
            'handicap_updated_date': '2023-01-02T00:00:00'
        }
        
        mock_query = MagicMock()
        mock_query.all.return_value = [mock_player1, mock_player2]
        mock_session.query.return_value = mock_query
        
        response = client.get('/getAllPlayers')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]['firstName'] == 'John'
        assert data[1]['firstName'] == 'Jane'
        mock_session.close.assert_called_once()
    
    @patch('db.db.get_session')
    def test_get_all_players_empty(self, mock_get_session, client):
        """Test retrieving all players when none exist."""
        # Mock database session and ORM behavior
        mock_session = MagicMock()
        mock_get_session.return_value = mock_session
        
        mock_query = MagicMock()
        mock_query.all.return_value = []
        mock_session.query.return_value = mock_query
        
        response = client.get('/getAllPlayers')
        
        assert response.status_code == 204
        mock_session.close.assert_called_once()
