from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
from Player import Player
from Team import Team
from TeamMember import TeamMember
from Course import Course
from Hole import Hole
from Division import Division
import json
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool
from datetime import datetime

app = Flask(__name__)
CORS(app)

engine = create_engine('sqlite:///data/league.db?check_same_thread=False', poolclass=QueuePool, pool_size=20, max_overflow=100, pool_timeout=30)
con = engine.connect()

# con.execute("drop table player")
# con.execute("drop table team")
# con.execute("drop table team_member")
# con.execute("drop table course")
# con.execute("drop table hole")
# con.execute("drop table division")

con.execute('''CREATE TABLE if not exists player
            (id INTEGER PRIMARY KEY, GHIN INTEGER, firstName TEXT, 
            lastName TEXT, handicap REAL, frontNine REAL, backNine REAL, 
            teePreference TEXT)''')
con.execute('''CREATE TABLE if not exists team
            (id INTEGER PRIMARY KEY, teamNumber INTEGER)''')
con.execute('''CREATE TABLE if not exists team_member
            (id INTEGER PRIMARY KEY, team_id INTEGER, player_id INTEGER)''')
con.execute('''CREATE TABLE if not exists course
            (id INTEGER PRIMARY KEY, name TEXT, tee TEXT)''')
con.execute('''CREATE TABLE if not exists hole
            (id INTEGER PRIMARY KEY, number INTEGER, handicapIndex INTEGER, 
            course_id INTEGER)''')

try:
    con.execute('''ALTER TABLE player
            ADD COLUMN autoUpdateGHIN BOOLEAN DEFAULT 1''')
except Exception as e:
    print("autoUpdateGHIN already exists")

con.execute('''CREATE TABLE if not exists division
            (id INTEGER PRIMARY KEY, name TEXT)''')

try:
    con.execute('''ALTER TABLE team
            ADD COLUMN divisionId INTEGER DEFAULT -1''')
except Exception as e:
    print("divisionId already exists")

try:
    con.execute('''ALTER TABLE team
            ADD COLUMN forceAB BOOLEAN DEFAULT 0''')
except Exception as e:
    print("forceAB already exists")

try:
    con.execute('''ALTER TABLE team_member
            ADD COLUMN APlayer BOOLEAN DEFAULT 0''')
except Exception as e:
    print("APlayer already exists")

try:
    con.execute('''ALTER TABLE player
            ADD COLUMN handicap_updated_date DATETIME DEFAULT null''')
except Exception as e:
    print("handicap_updated_date already exists")

con.close()


@app.route('/player/<player_id>', methods = ['GET', 'POST', 'DELETE'])
def player(player_id):
    con = engine.connect()
    if request.method == 'GET':
        result = con.execute("SELECT id, firstName, lastName, GHIN, handicap, frontNine, backNine, teePreference, autoUpdateGHIN, handicap_updated_date FROM player WHERE id = ?", (player_id,))
        data = result.fetchone()
        if data is None:
            retval = Response(response="Player not found with id " + player_id, status=204, mimetype="application/text")
        else:
            player = Player(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9])
            retval = Response(response=player.toJSON(), status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    if request.method == 'POST':
        data = request.get_json()['player']
        data_tuple = (data['GHIN'], data['firstName'], data['lastName'], data['handicap'], data['frontNine'], data['backNine'], data['teePreference'], data['autoUpdateGHIN'], datetime.now())
        if player_id == "-1":
            sql = "INSERT INTO player(GHIN, firstName, lastName, handicap, frontNine, backNine, teePreference, autoUpdateGHIN, handicap_updated_date) VALUES (?,?,?,?,?,?,?,?,?)"
            result = con.execute(sql, data_tuple)
            player_id = str(result.lastrowid)
        else:
            sql = '''UPDATE player SET GHIN = ?, firstName = ?, 
                lastName = ?, handicap = ?, frontNine = ?, backNine = ?, 
                teePreference = ?, autoUpdateGHIN = ?, handicap_updated_date = ? 
                WHERE id = ?'''
            con.execute(sql, data_tuple + (player_id,))
        
        retval = Response(response=player_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    if request.method == 'DELETE':
        con.execute("DELETE FROM player WHERE id = ?", (player_id,))
        
        retval = Response(response="Success", status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    else:
        retval = Response(response="Backend Server Error", status=500, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

@app.route("/getAllPlayers")
def getAllPlayers():
    conn = engine.connect()
    playersList = []
    data = conn.execute("SELECT id, firstName, lastName, GHIN, handicap, frontNine, backNine, teePreference, autoUpdateGHIN, handicap_updated_date FROM player")
    if data is None:
        retval = Response(response="no players found", status=204, mimetype="application/text")
    else:
        for playerData in data:
            player = Player(playerData[0], playerData[1], playerData[2], playerData[3], playerData[4], playerData[5], playerData[6], playerData[7], playerData[8], playerData[9])
            playersList.append(player)
        retval = Response(response=json.dumps(playersList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    conn.close()
    return retval

@app.route('/team/<team_id>', methods = ['GET', 'POST', 'DELETE'])
def team(team_id):
    con = engine.connect()
    if request.method == 'GET':
        teamData = con.execute("SELECT id, teamNumber, divisionId, forceAB FROM team WHERE id = ?", (team_id,))
        teamRow = teamData.fetchone()
        if teamData is None:
            retval = Response(response="Team not found with id " + team_id, status=204, mimetype="application/text")
        else:
            teamMembers = []
            teamMemberData = con.execute("SELECT player_id, APlayer FROM team_member WHERE team_id = ?", (team_id,))
            for row in teamMemberData:
                teamMember = TeamMember(row[0], row[1])
                teamMembers.append(teamMember)
            team = Team(teamRow[0], teamRow[1], teamMembers, teamRow[2], teamRow[3])
            retval = Response(response=team.toJSON(), status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    if request.method == 'POST':
        data = request.get_json()['team']
        if team_id == "-1":
            sql = "INSERT INTO team(teamNumber, divisionId, forceAB) VALUES (?,?,?)"
            result = con.execute(sql, (data['teamNumber'], data['divisionId'], data['forceAB']))
            team_id = str(result.lastrowid)

        else:
            sql = "UPDATE team SET teamNumber = ?, divisionId = ?, forceAB = ? WHERE id = ?"
            con.execute(sql, (data['teamNumber'], data['divisionId'], data['forceAB'], team_id))
            sql = "DELETE from team_member WHERE team_id = ?"
            con.execute(sql, (team_id,))
             
        for player in data['teamMembers']:
            print("Player data: " + json.dumps(player))
            playerId = player['playerId']
            APlayer = player['APlayer']
            sql = "INSERT INTO team_member(team_id, player_id, APlayer) VALUES (?,?,?)"
            con.execute(sql, (team_id, playerId, APlayer))

        retval = Response(response=team_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    if request.method == 'DELETE':
        con.execute("DELETE FROM team WHERE id = ?", (team_id,))
        con.execute("DELETE FROM team_member WHERE team_id = ?", (team_id,))
        retval = Response(response="Success", status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    else:
        retval = Response(response="Backend Server Error", status=500, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

@app.route("/getAllTeams")
def getAllTeams():
    con = engine.connect()
    teamsList = []
    teamsData = con.execute("SELECT id, teamNumber, divisionId, forceAB FROM team")
    if teamsData is None:
        retval = Response(response="no teams found", status=204, mimetype="application/text")
    else:
        for team in teamsData:
            teamMembers = []
            teamMembersData = con.execute("SELECT player_id, APlayer FROM team_member WHERE team_id = ?", (team[0],))
            for row in teamMembersData:
                teamMember = TeamMember(row[0], row[1])
                teamMembers.append(teamMember)
            team = Team(team[0], team[1], teamMembers, team[2], team[3])
            teamsList.append(team)
        retval = Response(response=json.dumps(teamsList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    con.close()
    return retval

@app.route('/course/<course_id>', methods = ['GET', 'POST', 'DELETE'])
def course(course_id):
    con = engine.connect()
    if request.method == 'GET':
        result = con.execute("SELECT id, name, tee FROM course WHERE id = ?", (course_id,))
        courseData = result.fetchone()
        if courseData is None:
            retval = Response(response="Course not found with id " + course_id, status=204, mimetype="application/text")
        else:
            holes =[]
            holesResult = con.execute("SELECT id, number, handicapIndex FROM hole WHERE course_id = ?", (course_id,))
            holesData = holesResult.fetchall()
            for row in holesData:
                holes.append(Hole(row[0], row[1], row[2]))
            course = Course(courseData[0], courseData[1], courseData[2], holes)
            retval = Response(response=course.toJSON(), status=200, mimetype="application/text")
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
            
        retval = Response(response=course_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    if request.method == 'DELETE':
        con.execute("DELETE FROM course WHERE id = ?", (course_id,))
        con.execute("DELETE FROM hole WHERE course_id = ?", (course_id,))
        
        retval = Response(response="Success", status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    else:
        retval = Response(response="Backend Server Error", status=500, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

@app.route("/getAllCourses")
def getAllCourses():
    con = engine.connect()
    courseList = []
    courseData = con.execute("SELECT id, name, tee FROM course")
    if courseData is None:
        retval = Response(response="No courses found", status=204, mimetype="application/text")
    else:
        for course in courseData:
            holes = []
            holeData = con.execute("SELECT id, number, handicapIndex FROM hole WHERE course_id = ?", (course[0],))
            for hole in holeData:
                holes.append(Hole(hole[0], hole[1], hole[2]))
            course = Course(course[0], course[1], course[2], holes)
            courseList.append(course)
        retval = Response(response=json.dumps(courseList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    con.close()
    return retval

@app.route('/division/<division_id>', methods = ['GET', 'POST', 'DELETE'])
def division(division_id):
    con = engine.connect()
    if request.method == 'GET':
        result = con.execute("SELECT id, name FROM division WHERE id = ?", (division_id,))
        data = result.fetchone()
        if data is None:
            retval = Response(response="Division not found with id " + division_id, status=204, mimetype="application/text")
        else:
            division = Division(data[0], data[1])
            retval = Response(response=division.toJSON(), status=200, mimetype="application/text")
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
        
        retval = Response(response=division_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    if request.method == 'DELETE':
        con.execute("DELETE FROM division WHERE id = ?", (division_id,))
        
        retval = Response(response="Success", status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

    else:
        retval = Response(response="Backend Server Error", status=500, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval

@app.route("/getAllDivisions")
def getAllDivisions():
    conn = engine.connect()
    divisionList = []
    data = conn.execute("SELECT id, name FROM division")
    if data is None:
        retval = Response(response="no divisions found", status=204, mimetype="application/text")
    else:
        for divisionData in data:
            division = Division(divisionData[0], divisionData[1])
            divisionList.append(division)
        retval = Response(response=json.dumps(divisionList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    conn.close()
    return retval

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082, debug=True)
