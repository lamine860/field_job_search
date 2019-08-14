from field_job_search import app, db
from field_job_search.models import User


if __name__ == '__main__':
    db.create_all()
    db.session.commit()
    app.run(debug=True)