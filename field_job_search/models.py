import enum
import datetime
from flask import session
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
        return self.job_seeker      

    def __repr__(self):
        return f'User {self.id} -- {self.username}'
        
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



class Offer(db.Model):
    __tablename__ = 'offers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    date_posted = db.Column(db.Date(), nullable=False, default=datetime.date.today())
    enterprise_id = db.Column(db.Integer, db.ForeignKey('enterprises.id'))
    enterprise = db.relationship('Enterprise', back_populates='offers')

    def __repr__(self):
        return f'Offer {self.id} -- {self.name}'

    
    def toJson(self):
        return {
    'id': self.id, 'name': self.name, 
    'description': self.description,
    'date_posted': self.date_posted.strftime('%d/%m/%Y'),
    'enterprise': self.enterprise.name
     }




class JobSeeker(db.Model):
    __tablename__ = 'job_seekers'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False, unique=True)
    last_name = db.Column(db.String(20), nullable=False, unique=True)
    cv = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('jobseeker', uselist=False))
    def __repr__(self):
        return f'Job Seeker {self.id} -- {self.first_name} {self.last_name}'





