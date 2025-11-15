"""Unit tests for course routes."""
import json
import pytest
from unittest.mock import patch, MagicMock


class TestCourseRoutes:
    """Test cases for course API endpoints."""
    
    @patch('db.db.get_connection')
    def test_create_course(self, mock_get_conn, client, sample_course_data):
        """Test creating a new course."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.lastrowid = 1
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/course/-1',
                               data=json.dumps(sample_course_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        assert 'Access-Control-Allow-Origin' in response.headers
    
    @patch('db.db.get_connection')
    def test_get_course_existing(self, mock_get_conn, client):
        """Test retrieving an existing course."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_course_result = MagicMock()
        mock_course_result.fetchone.return_value = (1, 'Pine Valley', 'Blue')
        
        mock_holes_result = MagicMock()
        mock_holes_result.fetchall.return_value = [
            (1, 1, 10),
            (2, 2, 12),
            (3, 3, 8)
        ]
        
        # Configure execute to return different results for different queries
        mock_conn.execute.side_effect = [mock_course_result, mock_holes_result]
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/course/1')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert data['id'] == 1
        assert data['name'] == 'Pine Valley'
        assert data['tee'] == 'Blue'
        assert len(data['holes']) == 3
    
    @patch('db.db.get_connection')
    def test_get_course_not_found(self, mock_get_conn, client):
        """Test retrieving a non-existent course."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.fetchone.return_value = None
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/course/999')
        
        assert response.status_code == 204
    
    @patch('db.db.get_connection')
    def test_update_course(self, mock_get_conn, client, sample_course_data):
        """Test updating an existing course."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.post('/course/1',
                               data=json.dumps(sample_course_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        # Check that execute was called multiple times (update course + delete holes + insert holes)
        assert mock_conn.execute.call_count >= 3
    
    @patch('db.db.get_connection')
    def test_delete_course(self, mock_get_conn, client):
        """Test deleting a course."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_get_conn.return_value = mock_conn
        
        response = client.delete('/course/1')
        
        assert response.status_code == 200
        assert b'Success' in response.data
        # Should delete from course table and hole table
        assert mock_conn.execute.call_count == 2
    
    @patch('db.db.get_connection')
    def test_get_all_courses(self, mock_get_conn, client):
        """Test retrieving all courses."""
        # Mock database behavior
        mock_conn = MagicMock()
        
        # Mock courses data
        courses_data = [
            (1, 'Pine Valley', 'Blue'),
            (2, 'Augusta National', 'Championship')
        ]
        
        # Mock holes for each course
        course1_holes = [(1, 1, 10), (2, 2, 12)]
        course2_holes = [(3, 1, 8), (4, 2, 14)]
        
        # Configure execute to return different results for different queries
        mock_conn.execute.side_effect = [
            courses_data,
            course1_holes,
            course2_holes
        ]
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllCourses')
        
        assert response.status_code == 200
        assert 'Access-Control-Allow-Origin' in response.headers
        
        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]['name'] == 'Pine Valley'
        assert data[1]['name'] == 'Augusta National'
        assert len(data[0]['holes']) == 2
        assert len(data[1]['holes']) == 2
    
    @patch('db.db.get_connection')
    def test_get_all_courses_empty(self, mock_get_conn, client):
        """Test retrieving all courses when none exist."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_conn.execute.return_value = None
        mock_get_conn.return_value = mock_conn
        
        response = client.get('/getAllCourses')
        
        assert response.status_code == 204
    
    @patch('db.db.get_connection')
    def test_create_course_with_18_holes(self, mock_get_conn, client):
        """Test creating a course with all 18 holes."""
        # Mock database behavior
        mock_conn = MagicMock()
        mock_result = MagicMock()
        mock_result.lastrowid = 1
        mock_conn.execute.return_value = mock_result
        mock_get_conn.return_value = mock_conn
        
        # Create course data with 18 holes
        course_data = {
            'course': {
                'name': 'Championship Course',
                'tee': 'Championship',
                'holes': [
                    {'number': i, 'handicapIndex': (i % 18) + 1}
                    for i in range(1, 19)
                ]
            }
        }
        
        response = client.post('/course/-1',
                               data=json.dumps(course_data),
                               content_type='application/json')
        
        assert response.status_code == 200
        assert response.data.decode() == '1'
        # 1 insert for course + 18 inserts for holes
        assert mock_conn.execute.call_count == 19
