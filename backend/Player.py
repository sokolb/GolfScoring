import json

class Player:
    def __init__(self, id, firstName, lastName, GHIN, handicap):
        self.id = id
        self.firstName = firstName
        self.lastName = lastName
        self.GHIN = GHIN
        self.handicap = handicap

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)