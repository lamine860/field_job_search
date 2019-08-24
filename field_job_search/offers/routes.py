import json
from flask import Blueprint, render_template, session, url_for, redirect, flash, jsonify, abort, request
from field_job_search.models import User, Enterprise, Offer, JobSeeker, Favorite, Accepted
from field_job_search import db
offers = Blueprint('offers', __name__, url_prefix='/offres')



@offers.route('list')
def offers_list():
    result = []
    query = request.args.get('q')
    if query:
        query = f'{query}%'
        for offer in Offer.query.filter(Offer.name.like(query)):
            result.append(offer.toJson())
    else:
        for offer in Offer.query.order_by(Offer.date_posted.desc()):
            result.append(offer.toJson())
    return jsonify({'offers': result })

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
            return jsonify(offer.toJson())
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
    user = User.query.get(session.get('user_id'))
    jobseeker = user.jobseeker
    if offer and jobseeker not in offer.jobseekers:
        offer.jobseekers.append(jobseeker)
        db.session.commit()
        return jsonify(offer.toJson())
    else:
        return jsonify({'success': False})
    return  abort(403)



@offers.route('/accept')
def accept_offer():
    if not session.get('user_id'):
        abort(403)
    offer = Offer.query.get(request.args.get('offer_id'))
    js = Jobseeker = JobSeeker.query.get(request.args.get('jobseeker_id'))
    if offer and Jobseeker:
        return jsonify({
            'success': True
        })
    return  abort(403)



@offers.route('/<offer_id>/favories')
def add_to_favories(offer_id):
    if not session.get('user_id'):
        abort(403)
    offer = Offer.query.get(offer_id)
    jb = JobSeeker.query.filter_by(user=User.query.get(session.get('user_id'))).first()
    if not Favorite.query.filter_by(jobseeker=jb, offer=offer).first():
        favorite = Favorite()
        favorite.offer_id = offer.id
        jb.favories.append(favorite)
        db.session.add(favorite)
        db.session.commit()
        return jsonify({'success': True})
    return jsonify({'success': False})


    
@offers.route('/favories')
def favories():
    if not session.get('user_id'):
        abort(403)
    jbs = JobSeeker.query.filter_by(user=User.query.get(session.get('user_id'))).first()
    offers = []
    for f in jbs.favories:
        offers.append(f.offer.toJson())
    return jsonify(offers)

        
@offers.route('/<offer_id>/favories/delete')
def delete_favories(offer_id):
    if not session.get('user_id'):
        abort(403)
    offer = Offer.query.get(offer_id)
    favorite = Favorite.query.filter_by(offer=offer).first()
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'success': True})



@offers.route('/<offer_id>/accept/<jobseeker_id>')
def offer_accept(offer_id, jobseeker_id):
    if not session.get('user_id'):
        abort(403)
    offer = Offer.query.get(offer_id)
    jbs = JobSeeker.query.get(jobseeker_id)
    if not Accepted.query.filter_by(offer=offer, jobseeker=jbs).first():
        acc = Accepted(offer=offer, jobseeker=jbs)
        db.session.add(acc)
        db.session.commit()
        return jsonify('success')
    return jsonify('failure')

