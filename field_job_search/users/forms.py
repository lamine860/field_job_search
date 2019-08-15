from wtforms import Form, StringField, validators, SubmitField, PasswordField, SelectField

from field_job_search.models import AccountType


class RegistrationForm(Form):
    username = StringField('Pseudo', [validators.Length(min=4, max=20), validators.DataRequired()])
    enterprise_name = StringField('le non de votre entreprise')
    email = StringField('Adresse Email', [validators.Email()])
    account_type = SelectField('Type de compte', [validators.DataRequired()], 
    choices=[(AccountType.demandeur.value, 'demandeur d\'emploi'), (AccountType.entreprises.value, AccountType.entreprises.value)])
    password = PasswordField('Mot de Passe', [validators.DataRequired(), validators.EqualTo('password_confirm')])
    password_confirm = PasswordField('Confirmez le mot de passe')
    submit = SubmitField('Soumettre')


class LoginForm(Form):
    email = StringField('Adresse Email', [validators.Email()])
    password = PasswordField('Mot de Passe', [validators.DataRequired()])
    submit = SubmitField('Soumettre')