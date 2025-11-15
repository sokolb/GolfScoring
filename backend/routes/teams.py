"""Team routes blueprint."""
from flask import Blueprint, request, Response
from models import Team, TeamMember
import json

teams_bp = Blueprint('teams', __name__)


@teams_bp.route('/team/<team_id>', methods=['GET', 'POST', 'DELETE'])
def team(team_id):
    """Handle team CRUD operations."""
    from db import db
    session = db.get_session()
    
    try:
        if request.method == 'GET':
            team_obj = session.query(Team).filter_by(id=team_id).first()
            
            if team_obj is None:
                retval = Response(
                    response=f"Team not found with id {team_id}",
                    status=204,
                    mimetype="application/text"
                )
            else:
                retval = Response(
                    response=json.dumps(team_obj.to_dict()),
                    status=200,
                    mimetype="application/json"
                )
            retval.headers.add('Access-Control-Allow-Origin', '*')
            return retval
        
        if request.method == 'POST':
            data = request.get_json()['team']
            
            if team_id == "-1":
                # Create new team
                team_obj = Team(
                    teamNumber=data['teamNumber'],
                    divisionId=data['divisionId'],
                    forceAB=data['forceAB']
                )
                session.add(team_obj)
                session.flush()  # Get the team ID before adding members
                
                # Add team members
                for member_data in data['teamMembers']:
                    team_member = TeamMember(
                        team_id=team_obj.id,
                        player_id=member_data['playerId'],
                        APlayer=member_data['APlayer']
                    )
                    session.add(team_member)
                
                session.commit()
                team_id = str(team_obj.id)
            else:
                # Update existing team
                team_obj = session.query(Team).filter_by(id=team_id).first()
                if team_obj:
                    team_obj.teamNumber = data['teamNumber']
                    team_obj.divisionId = data['divisionId']
                    team_obj.forceAB = data['forceAB']
                    
                    # Delete existing team members (cascade will handle this automatically)
                    session.query(TeamMember).filter_by(team_id=team_id).delete()
                    
                    # Add new team members
                    for member_data in data['teamMembers']:
                        team_member = TeamMember(
                            team_id=team_obj.id,
                            player_id=member_data['playerId'],
                            APlayer=member_data['APlayer']
                        )
                        session.add(team_member)
                    
                    session.commit()
            
            retval = Response(
                response=team_id,
                status=200,
                mimetype="application/text"
            )
            retval.headers.add('Access-Control-Allow-Origin', '*')
            return retval
        
        if request.method == 'DELETE':
            team_obj = session.query(Team).filter_by(id=team_id).first()
            if team_obj:
                # Cascade delete will automatically delete team members
                session.delete(team_obj)
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


@teams_bp.route("/getAllTeams")
def get_all_teams():
    """Get all teams."""
    from db import db
    session = db.get_session()
    
    try:
        teams = session.query(Team).all()
        
        if not teams:
            retval = Response(
                response="no teams found",
                status=204,
                mimetype="application/text"
            )
        else:
            teams_list = [team.to_dict() for team in teams]
            retval = Response(
                response=json.dumps(teams_list, indent=4),
                status=200,
                mimetype="application/json"
            )
        
        retval.headers.add('Access-Control-Allow-Origin', '*')
        return retval
    
    finally:
        session.close()
