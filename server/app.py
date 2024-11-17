from flask import Flask

from flask_sqlalchemy import SQLAlchemy

# TODO how is this working without cors and what is cors?

from flask_jwt_extended import JWTManager

app = Flask(__name__)

# Setup the flask-jwt-extended extension
app.config["JWT_SECRET_KEY"] = "l-jake-w-mike-tyson"
jwt = JWTManager(app)

# Setup the database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)