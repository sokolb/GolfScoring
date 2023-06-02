import json

class Division:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)