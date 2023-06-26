"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login_user():
    data = json.loads(request.data)
    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    if bcrypt.checkpw(data["password"].encode('utf-8'), user.password.encode('utf-8')):
        access_token = create_access_token(identity=user.id)
        return jsonify({"status": "ok", "token": access_token, "user": user.email}), 200
    else:
        return jsonify({"status": "error"}), 404

@api.route('/signup', methods=['POST'])
def signup_login():
    data = json.loads(request.data)

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), salt)

    decoded_password = hashed_password.decode('utf-8')

    user = User(email=data["email"], password=decoded_password)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)

    return jsonify({"status": "ok", "token": access_token, "user_id": user.id}), 200