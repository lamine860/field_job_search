from wtforms import Form, StringField, validators, SubmitField, PasswordField, SelectField, ValidationError

from field_job_search.models import AccountType
from field_job_search.models import User, Enterprise


class RegistrationForm(Form):
    username = StringField('Pseudo', [validators.Length(min=4, max=20), validators.DataRequired()])
    enterprise_name = StringField('le non de votre entreprise')
    email = StringField('Adresse Email', [validators.Email()])
    account_type = SelectField('Type de compte', [validators.DataRequired()], 
    choices=[(AccountType.demandeur.value, 'demandeur d\'emploi'), (AccountType.entreprises.value, AccountType.entreprises.value)])
    password = PasswordField('Mot de Passe', [validators.DataRequired(), validators.EqualTo('password_confirm')])
    password_confirm = PasswordField('Confirmez le mot de passe')
    submit = SubmitField('Soumettre')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('Ce pseudo est déjà pris s\'il vous plait essayé un autre.')

    def validate_email(self, email):
            user = User.query.filter_by(email=email.data).first()
            if user:
                raise ValidationError('Cet email est déjà pris s\'il vous plait essayé un autre.')

    def validate_enterprise_name(self, enterprise_name):
            ent = Enterprise.query.filter_by(name=enterprise_name.data).first()
            if ent:
                raise ValidationError('Ce nom d\'entreprise  est déjà utiliser s\'il vous plait essayé une autre.')




class LoginForm(Form):
    email = StringField('Adresse Email', [validators.Email()])
    password = PasswordField('Mot de Passe', [validators.DataRequired()])
    submit = SubmitField('Soumettre')