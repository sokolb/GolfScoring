"""Unit tests for division routes."""
import json
import pytest
from unittest.mock import patch, MagicMock


class TestDivisionRoutes:
    """Test cases for division API endpoints."""
    
    @patch('db.db.get_connection')
    def test_create_division(self, mock_get_conn, client, sample_division_data):
        """Test creating a new division."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.lastrowid = 1
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/division/-1',
                               data=json.dumps(sample_division_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        assert 'Access-Control-Allow-Origin' in response.headers
    
    @patch('db.db.get_connection')
    def test_get_division_existing(self, mock_get_conn, client):
        """Test retrieving an existing division."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.fetchone.return_value = (1, 'A Division')
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/division/1')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert data['id'] == 1
        assert data['name'] == 'A Division'
    
    @patch('db.db.get_connection')
    def test_get_division_not_found(self, mock_get_conn, client):
        """Test retrieving a non-existent division."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.fetchone.return_value = None
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/division/999')
        
        assert response.status_code == 204
    
    @patch('db.db.get_connection')
    def test_update_division(self, mock_get_conn, client, sample_division_data):
        """Test updating an existing division."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/division/1',
                               data=json.dumps(sample_division_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        mock_conn.execute.assert_called()
    
    @patch('db.db.get_connection')
    def test_delete_division(self, mock_get_conn, client):
        """Test deleting a division."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.delete('/division/1')
        
        assert response.status_code == 200
        assert b'Success' in response.data
        mock_conn.execute.assert_called_once()
    
    @patch('db.db.get_connection')
    def test_get_all_divisions(self, mock_get_conn, client):
        """Test retrieving all divisions."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_conn.execute.return_value = [
            (1, 'A Division'),
            (2, 'B Division'),
            (3, 'C Division')
        ]
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllDivisions')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert len(data) == 3
        assert data[0]['name'] == 'A Division'
        assert data[1]['name'] == 'B Division'
        assert data[2]['name'] == 'C Division'
    
    @patch('db.db.get_connection')
    def test_get_all_divisions_empty(self, mock_get_conn, client):
        """Test retrieving all divisions when none exist."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_conn.execute.return_value = None
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllDivisions')
        
        assert response.status_code == 204
