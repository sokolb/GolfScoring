from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
import sqlite3
from Player import Player
import json

app = Flask(__name__)
CORS(app)

con = sqlite3.connect('league.db', check_same_thread=False)
cur = con.cursor()

cur.execute('''CREATE TABLE if not exists player
            (id INTEGER PRIMARY KEY, GHIN INTEGER, firstName TEXT, 
            lastName TEXT, handicap REAL)''')
cur.execute('''CREATE TABLE if not exists team
            (id INTEGER PRIMARY KEY, teamNumber TEXT)''')
cur.execute('''CREATE TABLE if not exists team_members
            (id INTEGER PRIMARY KEY, team_id TEXT, player_id TEXT)''')           
con.commit()

@app.route("/helloWorld")
def helloWorld():
    return "hello world!"

@app.route('/player/<player_id>', methods = ['GET', 'POST', 'DELETE'])
def player(player_id):
    if request.method == 'GET':
        cur.execute("SELECT id, firstName, lastName, GHIN, handicap FROM player WHERE id = " + player_id)
        data = cur.fetchone()
        if data is None:
            retval = Response(response="not found with that id", status=200, mimetype="application/text")
        else:
            player = Player(data[0], data[1], data[2], data[3], data[4])
            retval = Response(response=player.toJSON(), status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'POST':
        data = request.json['player']
        data_tuple = (data['GHIN'], data['firstName'], data['lastName'], data['handicap'])
        if player_id == "-1":
            sql = "INSERT INTO player(GHIN, firstName, lastName, handicap) VALUES (?,?,?,?)"
            cur.execute(sql, data_tuple)
            player_id = str(cur.lastrowid)
        else:
            sql = '''UPDATE player SET GHIN = ?, firstName = ?, 
                lastName = ?, handicap = ? WHERE id = ''' + player_id
            cur.execute(sql, data_tuple)
        con.commit()
        retval = Response(response=player_id, status=200, mimetype="application/text")
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval

    if request.method == 'DELETE':
        cur.execute("DELETE FROM player WHERE id = " + player_id)
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
    cur.execute("SELECT id, firstName, lastName, GHIN, handicap FROM player")
    data = cur.fetchall()
    if data is None:
        retval = Response(response="no players found", status=200, mimetype="application/text")
    else:
        for playerData in data:
            player = Player(playerData[0], playerData[1], playerData[2], playerData[3], playerData[4])
            playersList.append(player)
        retval = Response(response=json.dumps(playersList, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4), status=200, mimetype="application/json")
    retval.headers.add('Access-Control-Allow-Origin', '*')
    return retval

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082, debug=True)
