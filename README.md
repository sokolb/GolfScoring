# GolfScoring

This is a program used for our golf match play league. It is also a learning project for React and Python. The DB is very light weight, SQLite.

## Production Settings

Required ENV variables:
DATABASE_LOCATION=location on local machine where DB volume is persisted. NOTE: this is the PATH to the database location, do not include the db file itself in this env variable.

## To start backend

If you don't set the DATABASE_LOCATION, then you can create the folder 'GolfScoring/backend/data'. On start, it will create an empty league.db for you.

Version for development: Python 3.11.6

Run these from the 'GolfScoring/backend' directory

pip3 install -r requirements.txt

python3 server.py

## To start client

Version for development: Node 16.20.2
Run these from the 'GolfScoring/client-app' directory

npm install

npm start

To run tests: npm test

Install prettier to help with formatting
