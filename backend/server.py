from flask import Flask
from flask import request
from flask import Response
import sqlite3
from Player import Player

app = Flask(__name__)

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
    p = Player("brian", 'sok', 11242, 10.3)
    return p.toJSON()

@app.route('/player/<player_id>', methods = ['GET', 'POST', 'DELETE'])
def player(player_id):
    if request.method == 'GET':
        cur.execute("SELECT * FROM player WHERE id = " + player_id)
        data = cur.fetchone()
        if data is None:
            retval = Response(response="not found with that id", status=200, mimetype="application/text")
        else:
            player = Player(data[0], data[1], data[2], data[3], data[4])
            retval = Response(response=player.toJSON(), status=200, mimetype="application/text")
        return retval

    if request.method == 'POST':
        data = request.json
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
        return Response(response=player_id, status=200, mimetype="application/text")

    if request.method == 'DELETE':
        cur.execute("DELETE FROM player WHERE id = " + player_id)
        con.commit()
        return Response(response="Success", status=200, mimetype="application/text")

    else:
        return Response(response="Backend Server Error", status=500, mimetype="application/text")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082, debug=True)
