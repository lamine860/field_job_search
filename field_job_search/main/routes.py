from flask import Blueprint, render_template, session

main = Blueprint('main', __name__)

@main.route('/', defaults={'u_path': ''})
@main.route('/<path:u_path>')
def home(u_path):
    return render_template('home.html')

