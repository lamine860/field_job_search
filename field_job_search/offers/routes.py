import json
from flask import Blueprint, render_template, session, url_for, redirect, flash, jsonify, abort, request
from field_job_search.models import User, Enterprise, Offer
from field_job_search import db
offers = Blueprint('offers', __name__, url_prefix='/offres')




@offers.route('list')
def offers_list():
    result = []
    for offer in Offer.query.order_by(Offer.date_posted.desc()):
        result.append(offer.toJson())
    if(session.get('user_id')):
        user = User.query.get(session.get('user_id'))
        ollowed = user.is_jobseeker_account() and user.has_complete_profile()
    else:
        ollowed = False     
    return jsonify({'offers': result, 'ollowed': ollowed})

@offers.route('/enterprise')
def offers_by_enterprise():
    result = []
    for offer in Enterprise.query.filter_by(user=User.query.get(session.get('user_id'))).first().offers:
        result.append(offer.toJson())
    return jsonify(result)


@offers.route('/create', methods=['POST'])
def create():
    if not session.get('user_id'):
        abort(403)
    else:
        if len(request.json.get('name')) > 2 and len(request.json.get('description')) > 2:
            offer=  Offer(name=request.json.get('name'), description=request.json.get('description'))
            entp =  Enterprise.query.filter_by(user=User.query.get(session.get('user_id'))).first()
            entp.offers.append(offer)
            db.session.add(offer)
            db.session.commit()
            return jsonify({'offers': offer.toJson()})
    return jsonify({'error': 'Donne invalid'}), 422    


@offers.route('/<id>/edit', methods=['POST'])
def edit_offer(id):
    if not session.get('user_id'):
        abort(403)
    else:
        if len(request.json.get('name')) > 2 and len(request.json.get('description')) > 2:
            offer =  Offer.query.get(id)
            offer.name = request.json.get('name')
            offer.description = request.json.get('description')
            db.session.commit()
            return jsonify(offer.toJson())
    return jsonify({'error': 'Donne invalid'}), 422    

@offers.route('/<id>/delete')
def delete_offer(id):
    if not session.get('user_id'):
        abort(403)
    else:
        offer = Offer.query.get(id)
        db.session.delete(offer)
        db.session.commit()
        return jsonify(id)
    return jsonify({'error': 'Donne invalid'}), 422   

@offers.route('/<id>/postul')
def apply_for(id):
    if not session.get('user_id'):
        abort(403)
    offer = Offer.query.get(id)

    return jsonify(2)