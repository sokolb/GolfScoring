import json

class Player:
    def __init__(self, id, firstName, lastName, GHIN, handicap, frontNine, backNine):
        self.id = id
        self.firstName = firstName
        self.lastName = lastName
        self.GHIN = GHIN
        self.handicap = handicap
        self.frontNine = frontNine
        self.backNine = backNine

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)