"""Team routes blueprint."""
from flask import Blueprint, request, Response
from Entities.Team import Team
from Entities.TeamMember import TeamMember
import json

teams_bp = Blueprint('teams', __name__)


@teams_bp.route('/team/<team_id>', methods=['GET', 'POST', 'DELETE'])
def team(team_id):
    """Handle team CRUD operations."""
    from db import db
    con = db.get_connection()
    
    if request.method == 'GET':
        teamData = con.execute(
            "SELECT id, teamNumber, divisionId, forceAB FROM team WHERE id = ?",
            (team_id,)
        )
        teamRow = teamData.fetchone()
        if teamRow is None:
            retval = Response(
                response="Team not found with id " + team_id,
                status=204,
                mimetype="application/text"
            )
        else:
            teamMembers = []
            teamMemberData = con.execute(
                "SELECT player_id, APlayer FROM team_member WHERE team_id = ?",
                (team_id,)
            )
            for row in teamMemberData:
                teamMember = TeamMember(row[0], row[1])
                teamMembers.append(teamMember)
            team = Team(teamRow[0], teamRow[1], teamMembers, teamRow[2], teamRow[3])
            retval = Response(
                response=team.toJSON(),
                status=200,
                mimetype="application/text"
            )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'POST':
        data = request.get_json()['team']
        if team_id == "-1":
            sql = "INSERT INTO team(teamNumber, divisionId, forceAB) VALUES (?,?,?)"
            result = con.execute(
                sql,
                (data['teamNumber'], data['divisionId'], data['forceAB'])
            )
            team_id = str(result.lastrowid)
        else:
            sql = "UPDATE team SET teamNumber = ?, divisionId = ?, forceAB = ? WHERE id = ?"
            con.execute(
                sql,
                (data['teamNumber'], data['divisionId'], data['forceAB'], team_id)
            )
            sql = "DELETE from team_member WHERE team_id = ?"
            con.execute(sql, (team_id,))
        
        for player in data['teamMembers']:
            print("Player data: " + json.dumps(player))
            playerId = player['playerId']
            APlayer = player['APlayer']
            sql = "INSERT INTO team_member(team_id, player_id, APlayer) VALUES (?,?,?)"
            con.execute(sql, (team_id, playerId, APlayer))
        
        retval = Response(
            response=team_id,
            status=200,
            mimetype="application/text"
        )
        retval.headers.add('Access-Control-Allow-Origin', '*')
        con.close()
        return retval
    
    if request.method == 'DELETE':
        con.execute("DELETE FROM team WHERE id = ?", (team_id,))
        con.execute("DELETE FROM team_member WHERE team_id = ?", (team_id,))
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


@teams_bp.route("/getAllTeams")
def get_all_teams():
    """Get all teams."""
    from db import db
    con = db.get_connection()
    teamsList = []
    teamsData = con.execute("SELECT id, teamNumber, divisionId, forceAB FROM team")
    if teamsData is None:
        retval = Response(
            response="no teams found",
            status=204,
            mimetype="application/text"
        )
    else:
        for team in teamsData:
            teamMembers = []
            teamMembersData = con.execute(
                "SELECT player_id, APlayer FROM team_member WHERE team_id = ?",
                (team[0],)
            )
            for row in teamMembersData:
                teamMember = TeamMember(row[0], row[1])
                teamMembers.append(teamMember)
            team = Team(team[0], team[1], teamMembers, team[2], team[3])
            teamsList.append(team)
        retval = Response(
            response=json.dumps(
                teamsList,
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
