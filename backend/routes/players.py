"""Player routes blueprint."""
from flask import Blueprint, request, Response
from Player import Player
from datetime import datetime
import json

players_bp = Blueprint('players', __name__)


@players_bp.route('/player/<player_id>', methods=['GET', 'POST', 'DELETE'])
def player(player_id):
    """Handle player CRUD operations."""
    from db import db
    con = db.get_connection()
    
    if request.method == 'GET':
        result = con.execute(
            "SELECT id, firstName, lastName, GHIN, handicap, frontNine, backNine, teePreference, autoUpdateGHIN, handicap_updated_date FROM player WHERE id = ?",
            (player_id,)
        )
        data = result.fetchone()
        if data is None:
            retval = Response(
                response="Player not found with id " + player_id,
                status=204,
                mimetype="application/text"
            )
        else:
            player = Player(
                data[0], data[1], data[2], data[3], data[4],
                data[5], data[6], data[7], data[8], data[9]
            )
            retval = Response(
                response=player.toJSON(),
                status=200,
                mimetype="application/text"
            )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'POST':
        data = request.get_json()['player']
        data_tuple = (
            data['GHIN'], data['firstName'], data['lastName'],
            data['handicap'], data['frontNine'], data['backNine'],
            data['teePreference'], data['autoUpdateGHIN'], datetime.now()
        )
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
        
        retval = Response(
            response=player_id,
            status=200,
            mimetype="application/text"
        )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'DELETE':
        con.execute("DELETE FROM player WHERE id = ?", (player_id,))
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


@players_bp.route("/getAllPlayers")
def get_all_players():
    """Get all players."""
    from db import db
    conn = db.get_connection()
    playersList = []
    data = conn.execute(
        "SELECT id, firstName, lastName, GHIN, handicap, frontNine, backNine, teePreference, autoUpdateGHIN, handicap_updated_date FROM player"
    )
    if data is None:
        retval = Response(
            response="no players found",
            status=204,
            mimetype="application/text"
        )
    else:
        for playerData in data:
            player = Player(
                playerData[0], playerData[1], playerData[2], playerData[3],
                playerData[4], playerData[5], playerData[6], playerData[7],
                playerData[8], playerData[9]
            )
            playersList.append(player)
        retval = Response(
            response=json.dumps(
                playersList,
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
