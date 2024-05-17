import json

class TeamMember:
    def __init__(self, playerId, APlayer):
        self.playerId = playerId
        self.APlayer = APlayer

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)