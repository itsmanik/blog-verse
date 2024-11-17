from app import app, db
from flask import jsonify, request
from models import Users, Blogs
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data["name"]
    username = data["username"]
    password = data["password"]
    hashed_password = generate_password_hash(password)
    new_user = Users(name=name, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    user = Users.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid username or password"}), 401
    access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(hours=1))
    return jsonify({"access_token": access_token})

@app.route("/api/blogs", methods=["POST"])
@jwt_required()
def create_blog():
    curr_user_id = get_jwt_identity()
    data = request.get_json()
    title = data["title"]
    body = data["body"]
    new_post = Blogs(title=title, body=body, author_id=curr_user_id)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Blog post added successfully"}), 201

@app.route("/api/blogs", methods=["GET"])
def blogs():
    blogs = Blogs.query.all()
    result = []
    print(type(blogs[0]))
    for blog in blogs:
        result.append(blog.to_json())
    return jsonify(result), 200


@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    curr_user_id = get_jwt_identity()
    curr_user = Users.query.get(curr_user_id)
    if not curr_user:
        return jsonify({"message": "User not found"})
    
    return jsonify({"message": f"This is protected route my nigga, {curr_user.name}"})

@app.route("/", methods=["GET"])
def hello_route():
    return "Hello world"