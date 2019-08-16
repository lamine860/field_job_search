from flask import Blueprint, render_template, session, redirect

main = Blueprint('main', __name__)

from field_job_search.models import User

@main.route('/', defaults={'u_path': ''})
@main.route('/<path:u_path>')
def home(u_path):
    user_id = session.get('user_id')
    if u_path == 'profile' and user_id:
        user = User.query.get(user_id)
        if not user_id or user.is_enterprise_account():
            return redirect('/')
    return render_template('home.html')

