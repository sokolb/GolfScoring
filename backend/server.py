from flask import Flask
import sqlite3
from sqlalchemy import Column, Integer, Unicode, UnicodeText, String
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import json

app = Flask(__name__)

con = sqlite3.connect('league.db')
cur = con.cursor()

cur.execute('''CREATE TABLE if not exists player
            (id text, GHIN integer, firstName text, 
            lastName text, handicap real)''')
cur.execute('''CREATE TABLE if not exists team
            (id text, teamNumber text)''')
cur.execute('''CREATE TABLE if not exists team_members
            (id text, team_id text, player_id text)''')           
con.commit()
con.close()


engine = create_engine('sqlite:///league.db', echo=True)
Base = declarative_base(bind=engine)

class Player(Base):
    __tablename__ = 'player'
    id = Column(String(40), primary_key=True)
    ghin = Column(String(40))
    firstName = Column(String(40))
    lastName = Column(String(40))
    handicap = Column(String(40))

    def __init__(self, id, ghin, firstName, lastName, handicap):
        self.id = id
        self.ghin = ghin
        self.firstName = firstName
        self.lastName = lastName
        self.handicap = handicap

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

Base.metadata.create_all()

Session = sessionmaker(bind=engine)
s = Session()

@app.route("/helloWorld")
def helloWorld():
    p = Player('idhere', '9999', 'tom', 'smith', '11')
    s.add_all([p])
    s.commit()

    return p.toJSON()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082, debug=True)
