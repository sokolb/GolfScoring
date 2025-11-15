"""Division routes blueprint."""
from flask import Blueprint, request, Response
from Entities.Division import Division
import json

divisions_bp = Blueprint('divisions', __name__)


@divisions_bp.route('/division/<division_id>', methods=['GET', 'POST', 'DELETE'])
def division(division_id):
    """Handle division CRUD operations."""
    from db import db
    con = db.get_connection()
    
    if request.method == 'GET':
        result = con.execute(
            "SELECT id, name FROM division WHERE id = ?",
            (division_id,)
        )
        data = result.fetchone()
        if data is None:
            retval = Response(
                response="Division not found with id " + division_id,
                status=204,
                mimetype="application/text"
            )
        else:
            division = Division(data[0], data[1])
            retval = Response(
                response=division.toJSON(),
                status=200,
                mimetype="application/text"
            )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'POST':
        data = request.get_json()['division']
        data_tuple = (data['name'],)
        if division_id == "-1":
            sql = "INSERT INTO division(name) VALUES (?)"
            result = con.execute(sql, data_tuple)
            division_id = str(result.lastrowid)
        else:
            sql = '''UPDATE division SET name = ?
                WHERE id = ?'''
            con.execute(sql, data_tuple + (division_id,))
        
        retval = Response(
            response=division_id,
            status=200,
            mimetype="application/text"
        )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'DELETE':
        con.execute("DELETE FROM division WHERE id = ?", (division_id,))
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


@divisions_bp.route("/getAllDivisions")
def get_all_divisions():
    """Get all divisions."""
    from db import db
    conn = db.get_connection()
    divisionList = []
    data = conn.execute("SELECT id, name FROM division")
    if data is None:
        retval = Response(
            response="no divisions found",
            status=204,
            mimetype="application/text"
        )
    else:
        for divisionData in data:
            division = Division(divisionData[0], divisionData[1])
            divisionList.append(division)
        retval = Response(
            response=json.dumps(
                divisionList,
                default=lambda o: o.__dict__,
                sort_keys=True,
                indent=4
            ),
            status=200,
            mimetype="application/json"
        )
    retval.headers.add('Access-Control-Allow-Origin', '*')
    conn.close()
    return retval
