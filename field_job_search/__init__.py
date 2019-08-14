from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager


app = Flask('__main__')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/field_job_search'
app.config['SECRET_KEY'] = '200d98ff844e1b2d363b4c15185544d266cbea8fa2d1fbed0db119e6aa1ff61a'
app.config['MAIL_SERVER'] = 'localhost'
app.config['MAIL_PORT'] = 1025
app.config['MAIL_DEFAULT_SENDER'] = 'geek4020m@gmail.com'
app.config['JWT_SECRET_KEY'] = app.config['SECRET_KEY']


db = SQLAlchemy(app)
mail = Mail(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

 

from field_job_search.main.routes import main
from field_job_search.users.routes import users
from field_job_search.offers.routes import offers

app.register_blueprint(main)
app.register_blueprint(users)
app.register_blueprint(offers)

from field_job_search.models import User

@app.context_processor
def get_current_user():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
    else:
        class Anonymos(User):
            def is_authenticated(self):
                return False

        user = Anonymos()
    return dict(current_user=user)        