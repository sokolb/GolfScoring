import json

class Team:
    def __init__(self, id, teamNumber, teamMemberIds, divisionId, forceAB):
        self.id = id
        self.teamNumber = teamNumber
        self.teamMemberIds = teamMemberIds
        self.divisionId = divisionId
        self.forceAB = forceAB

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)