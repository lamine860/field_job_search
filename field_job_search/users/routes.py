import os
import secrets
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, session, g, abort
#from flask_jwt_extended import (create_access_token, get_jwt_identity, jwt_required)
from field_job_search import app
from .forms import RegistrationForm, LoginForm
from field_job_search.models import User, Enterprise, JobSeeker
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
        if form.account_type.data == 'entreprises':
            enterprise = Enterprise(name=form.enterprise_name.data)
            enterprise.user = user
            db.session.add(enterprise)


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

@users.route('/profile/update', methods=['POST'])
def update_profile():
    if  session.get('user_id'):
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        cv = request.form.get('cv')
        if len(first_name) < 2 or len(last_name) < 2:
            return jsonify({'error': 'Errorr'}), 422
        user = User.query.get(session.get('user_id'))
        if user.jobseeker:
            jobseeker = JobSeeker.query.filter_by(user=user).first()
            jobseeker.first_name = first_name
            jobseeker.last_name = last_name,
            jobseeker.cv = cv
        else:
            jobseeker = JobSeeker(first_name=first_name, last_name=last_name, cv=cv)
            jobseeker.user = user
            db.session.add(jobseeker)
        db.session.commit()
        return jsonify(jobseeker.toJson())
    return jsonify({'error': 'Errorr'}), 403 


@users.route('/profile/info')
def profile():
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
        if  user.jobseeker is not None:
            jobseeker = user.jobseeker.toJson()
        else:
            jobseeker = {}
        return jsonify({'user': user.toJson(), 'profile': jobseeker})
    return jsonify({'error': 'Errorr'}), 403      

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