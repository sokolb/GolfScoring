import json

class Hole:
    def __init__(self, id, number, handicapIndex):
        self.id = id
        self.number = number
        self.handicapIndex = handicapIndex

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)