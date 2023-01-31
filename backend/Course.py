import json

class Course:
    def __init__(self, id, name, tee, holes):
        self.id = id
        self.name = name
        self.tee = tee
        self.holes = holes

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, indent=4)