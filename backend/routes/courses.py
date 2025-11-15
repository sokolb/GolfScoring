"""Course routes blueprint."""
from flask import Blueprint, request, Response
from Entities.Course import Course
from Entities.Hole import Hole
import json

courses_bp = Blueprint('courses', __name__)


@courses_bp.route('/course/<course_id>', methods=['GET', 'POST', 'DELETE'])
def course(course_id):
    """Handle course CRUD operations."""
    from db import db
    con = db.get_connection()
    
    if request.method == 'GET':
        result = con.execute(
            "SELECT id, name, tee FROM course WHERE id = ?",
            (course_id,)
        )
        courseData = result.fetchone()
        if courseData is None:
            retval = Response(
                response="Course not found with id " + course_id,
                status=204,
                mimetype="application/text"
            )
        else:
            holes = []
            holesResult = con.execute(
                "SELECT id, number, handicapIndex FROM hole WHERE course_id = ?",
                (course_id,)
            )
            holesData = holesResult.fetchall()
            for row in holesData:
                holes.append(Hole(row[0], row[1], row[2]))
            course = Course(courseData[0], courseData[1], courseData[2], holes)
            retval = Response(
                response=course.toJSON(),
                status=200,
                mimetype="application/text"
            )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'POST':
        data = request.get_json()['course']
        data_tuple = (data['name'], data['tee'])
        if course_id == "-1":
            sql = "INSERT INTO course(name, tee) VALUES (?, ?)"
            result = con.execute(sql, data_tuple)
            course_id = str(result.lastrowid)
        else:
            sql = '''UPDATE course SET name = ?, 
                tee = ?
                WHERE id = ?'''
            con.execute(sql, data_tuple + (course_id,))
            sql = "DELETE from hole WHERE course_id = ?"
            con.execute(sql, (course_id,))
        
        for hole in data['holes']:
            sql = "INSERT INTO hole(number, handicapIndex, course_id) VALUES (?,?,?)"
            con.execute(sql, (hole["number"], hole["handicapIndex"], course_id))
        
        retval = Response(
            response=course_id,
            status=200,
            mimetype="application/text"
        )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'DELETE':
        con.execute("DELETE FROM course WHERE id = ?", (course_id,))
        con.execute("DELETE FROM hole WHERE course_id = ?", (course_id,))
        retval = Response(
            response="Success",
            status=200,
            mimetype="application/text"
        )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    else:
        retval = Response(
            response="Backend Server Error",
            status=500,
            mimetype="application/text"
        )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval


@courses_bp.route("/getAllCourses")
def get_all_courses():
    """Get all courses."""
    from db import db
    con = db.get_connection()
    courseList = []
    courseData = con.execute("SELECT id, name, tee FROM course")
    if courseData is None:
        retval = Response(
            response="No courses found",
            status=204,
            mimetype="application/text"
        )
    else:
        for course in courseData:
            holes = []
            holeData = con.execute(
                "SELECT id, number, handicapIndex FROM hole WHERE course_id = ?",
                (course[0],)
            )
            for hole in holeData:
                holes.append(Hole(hole[0], hole[1], hole[2]))
            course = Course(course[0], course[1], course[2], holes)
            courseList.append(course)
        retval = Response(
            response=json.dumps(
                courseList,
                default=lambda o: o.__dict__,
                sort_keys=True,
                indent=4
            ),
            status=200,
            mimetype="application/json"
        )
    retval.headers.add('Access-Control-Allow-Origin', '*')
    con.close()
    return retval
