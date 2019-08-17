from flask import session
import enum
import datetime
from flask import session
import pypandoc
from field_job_search import db

class AccountType(enum.Enum):
    entreprises = 'entreprises'
    demandeur = 'demandeur'

class User(db.Model):
    __tablename__ ='users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    account_type  = db.Column(db.Enum(AccountType), default=AccountType.demandeur)
    password = db.Column(db.String(60), nullable=False, unique=True)
    enterprise = db.relationship('Enterprise', back_populates='user', uselist=False)
    job_seeker = db.relationship('JobSeeker', back_populates='user', uselist=False)



    def is_authenticated(self):
        return self.id == session.get('user_id')
    
    def is_enterprise_account(self):
        if self.is_authenticated():
            return self.account_type.value == 'entreprises'
        else:
            return 


    def is_jobseeker_account(self):
        if self.is_authenticated():
            return self.account_type.value == 'demandeur'
        else:
            return
    def has_complete_profile(self):
        return self.job_seeker != None      

    def __repr__(self):
        return f'User {self.id} -- {self.username}'


    def toJson(self):
        return {'id': self.id, 'username': self.username, 'email': self.email}
        
class Enterprise(db.Model):
    __tablename__ = 'enterprises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='enterprise')
    offers = db.relationship("Offer", back_populates="enterprise")

    def __repr__(self):
        return f'Enterpries {self.id} -- {self.name}'

    def toJson(self):
        offers = []
        for offer in self.offers:
            offers.append(offer.toJson())
        return {'id': self.id, 'name': self.name, 'offers': offers}

offer_job_seeker = db.Table('tags',
    db.Column('offer_id', db.Integer, db.ForeignKey('offers.id'), primary_key=True),
    db.Column('jobseeker_id', db.Integer, db.ForeignKey('job_seekers.id'), primary_key=True)
)


class Offer(db.Model):
    __tablename__ = 'offers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    date_posted = db.Column(db.Date(), nullable=False, default=datetime.date.today())
    enterprise_id = db.Column(db.Integer, db.ForeignKey('enterprises.id'))
    enterprise = db.relationship('Enterprise', back_populates='offers')
    jobseekers = db.relationship('JobSeeker', secondary=offer_job_seeker, lazy='subquery', backref=db.backref('offers', lazy=True))

    def __repr__(self):
        return f'Offer {self.id} -- {self.name}'

    def ollow(self):
        user_id = session.get('user_id')
        if not user_id:
            return False
        Jobseeker = User.query.get(user_id).jobseeker
        if Jobseeker:
            return Jobseeker not in self.jobseekers
        return False    


    def toJson(self):
        jobseekers = self.jobseekers
        if not jobseekers:
            jobseekers = []
        count = len(jobseekers)
        js = []
        for j in jobseekers:
            js.append(j.toJson())
        return {
    'id': self.id, 'name': self.name, 
    'description': self.description,
    'date_posted': self.date_posted.strftime('%d/%m/%Y'),
    'enterprise': self.enterprise.name, 'apply': count, 'ollow': self.ollow(), 'jobseekers': js
     }



class JobSeeker(db.Model):
    __tablename__ = 'job_seekers'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    cv = db.Column(db.Text(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('jobseeker', uselist=False))
    


    def __repr__(self):
        return f'Job Seeker {self.id} -- {self.first_name} {self.last_name}'
        
    def toJson(self):
        content = ''
        if self.cv:
            content = ''
        return { 'id': self.id, 'first_name': self.first_name, 'last_name': self.last_name, 'cv': self.cv, 'cv_content': content}    


