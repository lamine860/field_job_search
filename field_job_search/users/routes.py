from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, session, g
from flask_jwt_extended import (create_access_token, get_jwt_identity, jwt_required)

from .forms import RegistrationForm, LoginForm
from field_job_search.models import User
from field_job_search import db, bcrypt
users = Blueprint('users', __name__)




@users.route('/inscription', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf8')
        user = User(username=form.username.data, email=form.email.data,
         account_type=form.account_type.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Votre compte a bien été crée!', 'success')
        return redirect(url_for('users.login'))
    return render_template('users/register.html', title='Inscription', form=form)

@users.route('/connexion', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            session['user_id'] = user.id
            return redirect('/')
        else:
            flash('Adresse Email ou mot de passe incorrect', 'danger')

    return render_template('users/login.html', title='Connexion', form=form)

@users.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main.home'))


# @users.route('/auth', methods=['GET', 'POST'])
# def access_token():
#     if not request.is_json:
#         return jsonify({"msg": "Missing JSON in request"}), 400

#     email = request.json.get('email', None)
#     password = request.json.get('password', None)

#     if not email:
#         return jsonify({"msg": "Missing email parameter"}), 400

#     if not password:
#         return jsonify({"msg": "Missing password parameter"}), 400

#     user = User.query.filter_by(email=email).first()
#     if not user or  not bcrypt.check_password_hash(user.password, password):
#         return jsonify({"msg": "Bad email or password"}), 401

#     access_token = create_access_token(identity=user.username), 200    
#     return jsonify({'access_token':access_token})


# @users.route('/protected', methods=['GET'])
# @jwt_required
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200