import json
from flask import Blueprint, render_template, session, url_for, redirect, flash, jsonify, abort, request
from field_job_search.models import User, Enterprise, Offer
from field_job_search import db
offers = Blueprint('offers', __name__, url_prefix='/offres')




@offers.route('list')
def offers_list():
    result = []
    for offer in Offer.query.all():
        result.append(offer.toJson())
    return jsonify(result)


@offers.route('/create', methods=['POST'])
def create():
    if not session.get('user_id'):
        abort(403)
    else:
       offer=  Offer(name=request.json.get('name'), description=request.json.get('description'))
       entp =  Enterprise(name=request.json.get('enterprise'), user_id=session.get('user_id'))
       entp.offers.append(offer)
       db.session.add(offer)
       db.session.add(entp)
       db.session.commit()
    return jsonify('ok')