from flask import Blueprint, render_template, session, redirect, jsonify, abort

main = Blueprint('main', __name__)

from field_job_search.models import User, Accepted, JobSeeker

@main.route('/', defaults={'u_path': ''})
@main.route('/<path:u_path>')
def home(u_path):
    user_id = session.get('user_id')
    if u_path == 'profile' and user_id:
        user = User.query.get(user_id)
        if not user_id or user.is_enterprise_account():
            return redirect('/')
    return render_template('home.html')

@main.route('/notify')
def notify():
    if not session.get('user_id'):
        abort(403)
    js = JobSeeker.query.filter_by(user=User.query.get(session.get('user_id'))).first()
    count = None
    if js:
        count = Accepted.query.filter_by(jobseeker=js).count()
    return jsonify(count)
    
@main.route('/notifications/all')
def notifications():
    if not session.get('user_id'):
        abort(403)
    js = JobSeeker.query.filter_by(user=User.query.get(session.get('user_id'))).first()
    accepted = Accepted.toArrayByJs(js)
    return jsonify({'offers': accepted, 'jobseeker': js.toJson()})