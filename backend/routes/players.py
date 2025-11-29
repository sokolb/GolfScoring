"""Player routes blueprint."""
from flask import Blueprint, request, Response
from models import Player
from datetime import datetime
import json

players_bp = Blueprint('players', __name__)


@players_bp.route('/player/<player_id>', methods=['GET', 'POST', 'DELETE'])
def player(player_id):
    """Handle player CRUD operations."""
    from db import db
    session = db.get_session()
    
    try:
        if request.method == 'GET':
            player_obj = session.query(Player).filter_by(id=player_id).first()
            
            if player_obj is None:
                retval = Response(
                    response=f"Player not found with id {player_id}",
                    status=204,
                    mimetype="application/text"
                )
            else:
                retval = Response(
                    response=json.dumps(player_obj.to_dict()),
                    status=200,
                    mimetype="application/json"
                )
            retval.headers.add('Access-Control-Allow-Origin', '*')
            return retval
        
        if request.method == 'POST':
            data = request.get_json()['player']
            
            if player_id == "-1":
                # Create new player
                player_obj = Player(
                    GHIN=data['GHIN'],
                    firstName=data['firstName'],
                    lastName=data['lastName'],
                    handicap=data['handicap'],
                    frontNine=data['frontNine'],
                    backNine=data['backNine'],
                    teePreference=data['teePreference'],
                    autoUpdateGHIN=data['autoUpdateGHIN'],
                    handicap_updated_date=datetime.now()
                )
                session.add(player_obj)
                session.commit()
                player_id = str(player_obj.id)
            else:
                # Update existing player
                player_obj = session.query(Player).filter_by(id=player_id).first()
                if player_obj:
                    player_obj.GHIN = data['GHIN']
                    player_obj.firstName = data['firstName']
                    player_obj.lastName = data['lastName']
                    player_obj.handicap = data['handicap']
                    player_obj.frontNine = data['frontNine']
                    player_obj.backNine = data['backNine']
                    player_obj.teePreference = data['teePreference']
                    player_obj.autoUpdateGHIN = data['autoUpdateGHIN']
                    player_obj.handicap_updated_date = datetime.now()
                    session.commit()
            
            retval = Response(
                response=player_id,
                status=200,
                mimetype="application/text"
            )
            retval.headers.add('Access-Control-Allow-Origin', '*')
            return retval
        
        if request.method == 'DELETE':
            from models import TeamMember, Team
            
            # Check if player is assigned to any teams
            team_members = session.query(TeamMember).filter_by(player_id=player_id).all()
            
            if team_members:
                # Get team numbers for all teams this player is on
                team_numbers = []
                for tm in team_members:
                    team = session.query(Team).filter_by(id=tm.team_id).first()
                    if team:
                        team_numbers.append(team.teamNumber)
                
                # Get player info for the error message
                player_obj = session.query(Player).filter_by(id=player_id).first()
                
                error_message = {
                    'error': f"Cannot delete player {player_obj.firstName} {player_obj.lastName} because they are assigned to team(s): {', '.join(map(str, team_numbers))}"
                }
                
                retval = Response(
                    response=json.dumps(error_message),
                    status=400,
                    mimetype="application/json"
                )
                retval.headers.add('Access-Control-Allow-Origin', '*')
                return retval
            
            # If not assigned to any team, proceed with deletion
            player_obj = session.query(Player).filter_by(id=player_id).first()
            if player_obj:
                session.delete(player_obj)
                session.commit()
            
            retval = Response(
                response="Success",
                status=200,
                mimetype="application/text"
            )
            retval.headers.add('Access-Control-Allow-Origin', '*')
            return retval
        
        else:
            retval = Response(
                response="Backend Server Error",
                status=500,
                mimetype="application/text"
            )
            retval.headers.add('Access-Control-Allow-Origin', '*')
            return retval
    
    finally:
        session.close()


@players_bp.route("/getAllPlayers")
def get_all_players():
    """Get all players."""
    from db import db
    session = db.get_session()
    
    try:
        players = session.query(Player).all()
        
        if not players:
            retval = Response(
                response="no players found",
                status=204,
                mimetype="application/text"
            )
        else:
            players_list = [player.to_dict() for player in players]
            retval = Response(
                response=json.dumps(players_list, indent=4),
                status=200,
                mimetype="application/json"
            )
        
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval
    
    finally:
        session.close()
