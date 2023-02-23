from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
import sqlite3
from Player import Player
from Team import Team
from Course import Course
from Hole import Hole
import json

app = Flask(__name__)
CORS(app)

con = sqlite3.connect('league.db', check_same_thread=False)
cur = con.cursor()

# cur.execute("drop table player")
# cur.execute("drop table team")
# cur.execute("drop table team_member")
# cur.execute("drop table course")
# cur.execute("drop table hole")

cur.execute('''CREATE TABLE if not exists player
            (id INTEGER PRIMARY KEY, GHIN INTEGER, firstName TEXT, 
            lastName TEXT, handicap REAL, frontNine REAL, backNine REAL, 
            teePreference TEXT)''')
cur.execute('''CREATE TABLE if not exists team
            (id INTEGER PRIMARY KEY, teamNumber INTEGER)''')
cur.execute('''CREATE TABLE if not exists team_member
            (id INTEGER PRIMARY KEY, team_id INTEGER, player_id INTEGER)''')
cur.execute('''CREATE TABLE if not exists course
            (id INTEGER PRIMARY KEY, name TEXT, tee TEXT)''')
cur.execute('''CREATE TABLE if not exists hole
            (id INTEGER PRIMARY KEY, number INTEGER, handicapIndex INTEGER, 
            course_id INTEGER)''')
con.commit()

@app.route('/player/<player_id>', methods = ['GET', 'POST', 'DELETE'])
def player(player_id):
    if request.method == 'GET':
        cur.execute("SELECT id, firstName, lastName, GHIN, handicap, frontNine, backNine, teePreference FROM player WHERE id = ?", (player_id,))
        data = cur.fetchone()
        if data is None:
            retval = Response(response="Player not found with id " + player_id, status=204, mimetype="application/text")
        else:
            player = Player(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7])
            retval = Response(response=player.toJSON(), status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'POST':
        data = request.get_json()['player']
        data_tuple = (data['GHIN'], data['firstName'], data['lastName'], data['handicap'], data['frontNine'], data['backNine'], data['teePreference'])
        if player_id == "-1":
            sql = "INSERT INTO player(GHIN, firstName, lastName, handicap, frontNine, backNine, teePreference) VALUES (?,?,?,?,?,?,?)"
            cur.execute(sql, data_tuple)
            player_id = str(cur.lastrowid)
        else:
            sql = '''UPDATE player SET GHIN = ?, firstName = ?, 
                lastName = ?, handicap = ?, frontNine = ?, backNine = ?, 
                teePreference = ? 
                WHERE id = ?'''
            cur.execute(sql, data_tuple + (player_id,))
        con.commit()
        retval = Response(response=player_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'DELETE':
        cur.execute("DELETE FROM player WHERE id = ?", (player_id,))
        con.commit()
        retval = Response(response="Success", status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    else:
        retval = Response(response="Backend Server Error", status=500, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

@app.route("/getAllPlayers")
def getAllPlayers():
    playersList = []
    cur.execute("SELECT id, firstName, lastName, GHIN, handicap, frontNine, backNine, teePreference FROM player")
    data = cur.fetchall()
    if data is None:
        retval = Response(response="no players found", status=204, mimetype="application/text")
    else:
        for playerData in data:
            player = Player(playerData[0], playerData[1], playerData[2], playerData[3], playerData[4], playerData[5], playerData[6], playerData[7])
            playersList.append(player)
        retval = Response(response=json.dumps(playersList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    return retval

@app.route('/team/<team_id>', methods = ['GET', 'POST', 'DELETE'])
def team(team_id):
    if request.method == 'GET':
        cur.execute("SELECT id, teamNumber FROM team WHERE id = ?", (team_id,))
        teamData = cur.fetchone()
        if teamData is None:
            retval = Response(response="Team not found with id " + team_id, status=204, mimetype="application/text")
        else:
            teamMembers = []
            cur.execute("SELECT player_id FROM team_member WHERE team_id = ?", (team_id,))
            teamMemberData = cur.fetchall()
            for row in teamMemberData:
                teamMembers.append(row[0])
            team = Team(teamData[0], teamData[1], teamMembers)
            retval = Response(response=team.toJSON(), status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'POST':
        data = request.get_json()['team']
        if team_id == "-1":
            sql = "INSERT INTO team(teamNumber) VALUES (?)"
            cur.execute(sql, (data['teamNumber'],))
            con.commit()
            team_id = str(cur.lastrowid)

        else:
            sql = "UPDATE team SET teamNumber = ? WHERE id = ?"
            cur.execute(sql, (data['teamNumber'], team_id))
            con.commit()
            sql = "DELETE from team_member WHERE team_id = ?"
            cur.execute(sql, (team_id,))
            con.commit() 

        for player_id in data['teamMemberIds']:
            sql = "INSERT INTO team_member(team_id, player_id) VALUES (?,?)"
            cur.execute(sql, (team_id, player_id))
            con.commit()

        retval = Response(response=team_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'DELETE':
        cur.execute("DELETE FROM team WHERE id = ?", (team_id,))
        cur.execute("DELETE FROM team_member WHERE team_id = ?", (team_id,))
        con.commit()
        retval = Response(response="Success", status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    else:
        retval = Response(response="Backend Server Error", status=500, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

@app.route("/getAllTeams")
def getAllTeams():
    teamsList = []
    cur.execute("SELECT id, teamNumber FROM team")
    teamsData = cur.fetchall()
    if teamsData is None:
        retval = Response(response="no teams found", status=204, mimetype="application/text")
    else:
        for team in teamsData:
            teamMembers = []
            cur.execute("SELECT player_id FROM team_member WHERE team_id = ?", (team[0],))
            teamMembersData = cur.fetchall()
            for teamMember in teamMembersData:
                teamMembers.append(teamMember[0])
            team = Team(team[0], team[1], teamMembers)
            teamsList.append(team)
        retval = Response(response=json.dumps(teamsList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    return retval

@app.route('/course/<course_id>', methods = ['GET', 'POST', 'DELETE'])
def course(course_id):
    if request.method == 'GET':
        cur.execute("SELECT id, name, tee FROM course WHERE id = ?", (course_id,))
        courseData = cur.fetchone()
        if courseData is None:
            retval = Response(response="Course not found with id " + course_id, status=204, mimetype="application/text")
        else:
            holes =[]
            cur.execute("SELECT id, number, handicapIndex FROM hole WHERE course_id = ?", (course_id,))
            holeData = cur.fetchall()
            for row in holeData:
                holes.append(Hole(row[0], row[1], row[2]))
            course = Course(courseData[0], courseData[1], courseData[2], holes)
            retval = Response(response=course.toJSON(), status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'POST':
        data = request.get_json()['course']
        data_tuple = (data['name'], data['tee'])
        if course_id == "-1":
            sql = "INSERT INTO course(name, tee) VALUES (?, ?)"
            cur.execute(sql, data_tuple)
            con.commit()
            course_id = str(cur.lastrowid)

        else:
            sql = '''UPDATE course SET name = ?, 
                tee = ?
                WHERE id = ?'''
            cur.execute(sql, data_tuple + (course_id,))
            con.commit()
            sql = "DELETE from hole WHERE course_id = ?"
            cur.execute(sql, (course_id,))
            con.commit() 

        for hole in data['holes']:
            sql = "INSERT INTO hole(number, handicapIndex, course_id) VALUES (?,?,?)"
            cur.execute(sql, (hole["number"], hole["handicapIndex"], course_id))
            con.commit()

        retval = Response(response=course_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'DELETE':
        cur.execute("DELETE FROM course WHERE id = ?", (course_id,))
        cur.execute("DELETE FROM hole WHERE course_id = ?", (course_id,))
        con.commit()
        retval = Response(response="Success", status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    else:
        retval = Response(response="Backend Server Error", status=500, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

@app.route("/getAllCourses")
def getAllCourses():
    courseList = []
    cur.execute("SELECT id, name, tee FROM course")
    courseData = cur.fetchall()
    if courseData is None:
        retval = Response(response="No courses found", status=204, mimetype="application/text")
    else:
        for course in courseData:
            holes = []
            cur.execute("SELECT id, number, handicapIndex FROM hole WHERE course_id = ?", (course[0],))
            holeData = cur.fetchall()
            for hole in holeData:
                holes.append(Hole(hole[0], hole[1], hole[2]))
            course = Course(course[0], course[1], course[2], holes)
            courseList.append(course)
        retval = Response(response=json.dumps(courseList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    return retval

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082, debug=True)
