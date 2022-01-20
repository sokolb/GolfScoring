
from flask import Flask

app = Flask(__name__)

@app.route("/helloWorld")
def helloWorld():
    return "helloWorld Success"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8082, debug=True)