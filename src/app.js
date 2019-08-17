const {BrowserRouter, Route, Switch, Link} = ReactRouterDOM


const Home = () => {
    let style = { backgroundColor: 'white'}
    return (
        <div>
            <div className="jumbotron text-center" style={style}>
                <h3>Trouvez votre futur emploi parmi les 50 offres d'emploi disponibles</h3>
                <p>
                Étudiant, débutant ou professionnel expérimenté <strong>Field Job Search</strong> vous offre une expérience sur mesure dans votre recherche d’emploi
                </p>
                <a href="/offres" className="btn btn btn-outline-success">Je démarre ma rechereche</a>
            </div>
            <div className="content-section">
                <h1 className="text-center">Une présentation du systeme</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non perspiciatis sequi odio animi veniam aliquam, cumque omnis deleniti et tenetur voluptatem quos in, quidem, illo porro maiores iusto amet itaque?
                </p>
            </div>
        </div>
    )
}
class Offers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            offers:[],
        }
        this.handleSeach = this.handleSeach.bind(this)
    }
    apply(e, offer_id){
        e.preventDefault()
        fetch('/offres/'+ offer_id +'/postul').then(res => {
            if(res.ok){
                res.json().then(offer => {
                    current_offer = this.state.offers.filter(offer => offer.id != offer_id)
                    this.setState(state => {
                        return {
                            offers: [offer, ...current_offer]
                        }
                    })
                })
            }
        })
    }
    fetchOffers(url){
        fetch(url, {

        }).then(res => {
            res.json().then(res => {
                this.setState({
                    offers: res.offers,
                })
            })
        })
    }
    componentDidMount(){
        this.fetchOffers('/offres/list')
    }

    handleSeach(e){
        e.preventDefault()
        let q = e.target.value
        if(!q){
            this.fetchOffers('/offres/list')
        }
        if(q.length > 4){
            this.fetchOffers('/offres/list?q=' + q)
        }

    }

    render()
    {
        const html = this.state.offers.map((offer) => {
            const mark = (<a href="" className="ml-auto btn btn-success">Ajouter à la favorite<i className="fa fa-star"></i></a>)
            const link = offer.ollow ? <a onClick={(e) => this.apply(e, offer.id)} href={ '/offers/' + offer.id + '/postuler'} 
            className="btn btn-success">Postuler directement</a> : ''
            return (
                <div className="card mb-2" key={offer.id}>
                <div className="card-body">
                    <div className="card-title">{ offer.name }</div>
                    Depuis le <small className="text-muted">{ offer.date_posted }</small>&nbsp;&nbsp;&nbsp;
                    <strong>{ offer.enterprise }</strong>
                    <p className="card-text">{ offer.description }</p>
                    <div className="d-flex">
                        {link}
                        {mark}
                    </div>
                </div>
            </div>
            )
        })
        let style = {
            width: "80%",
            paddding: "50px"
        }
        return (
            <div>
                <div className="jumbotron" onSubmit={(e) => e.preventDefault() }>
                    <form className="form-inline">
                        <input className="form-control py-2" onInput={ this.handleSeach } style={style} type="search" placeholder="Métier, Mots cles" aria-label="Search" />
                        <button className="btn btn-outline-success my-3 px-5" type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <h4 className="text-muted">{this.state.offers.length } offres corespondent à votre recherche</h4>
                {html}
            </div>
        )
        
    }
}
class Enterprise extends React.Component {
    constructor(propos){
        super(propos)
        this.state = {
            id: 0,
            name: '',
            description: '',
            offers: [],
            alertMessage: '',

        }
        

    }
    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleDescription = (e) => {
        this.setState({
            description: e.target.value
        })
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('/offres/create', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
            }),
        }).then(res => {
            if (res.ok){
                res.json().then(offer => {
                    this.setState(satate => {
                        return {
                            alertMessage: 'L\'offre a bien été ajouter',
                            offers: [offer, ...this.state.offers],
                        }
                    })
                })
            }else{
                this.setState({
                    alertMessage: 'Oups! Il se peut que vous n\'avez pas bien remplie les champs.'
                })
               
            }
        })
        this.state.description = ''
        this.state.name = ''
        
    }
    handleEdit(){
        fetch('/offres/' + this.state.id + '/edit', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: this.state.id,
                name:this.state.name,
                description: this.state.description
            })
        }).then(res => {
            if(res.ok){
                res.json().then(offer => {
                    this.setState((state) => {
                        let filtred = state.offers.filter(f  => {
                           return  f.id != offer.id
                        })
                       return  {offers: [offer, ...filtred]}
                    })
                })
            }
        })
        this.setState({
            id: 0,
            name: '',
            description: ''
        })
        $('.modal').modal('hide')
        $('#form-create').show()
    }
    handleDelete(offer){
        fetch('/offres/' + offer.id + '/delete', {
        }).then(res => {
            if(res.ok){
                res.json().then(res => {
                    this.setState(state => {
                        return {
                            offers: state.offers.filter(f => f != offer)
                        }
                    })
                })
            }
        })
    }
    showModal(offer){
        this.setState({
            id: offer.id,
            name: offer.name,
            description: offer.description
        })
        $('#modal-edit').modal()
    }
    handleModalTd(id){
        $('#modal-td' + id).modal()
    }
    handleAccept(offer_id, js_id){
        fetch('/offres/accept?offer_id=' +offer_id + '&jobseeker_id=' + js_id).then(res => {
            if(res.ok){
                res.json().then(res => {
                })
            }
        })
    }
    componentDidMount() {
        fetch('/offres/enterprise').then(res => {
            res.json().then( res => {
                this.setState({
                offers: res,
            })})
        })
    }
    render(){
        let list_body = this.state.offers.map((offer) => {
            let jobseekers = ''
            if(offer.jobseekers){
                let jobseekers = offer.jobseekers.map((js )=> {
                    function  createMarkup2(){
                        return {__html: js.cv}
                    }
                    return (
                        <div key={js.id} className="media">
                            <div className="media-body">
                                <h5 className="mt-0">{js.first_name + ' ' + js.last_name}</h5>
                                <p dangerouslySetInnerHTML={ createMarkup2() }></p>
                                <button className="btn btn-outline-success btn-sm" onClick={() => this.handleAccept(offer.id, js.id)}>accepter la demande</button>
                            </div>
                        </div>
                    )
                })
            }
        
            let id = 'modal-td' + offer.id
            return (
                
                <tr key={offer.id}>
                    <td>#{offer.id}</td>
                    <td>{offer.name}</td>
                    <td>{offer.apply} <button onClick={() => this.handleModalTd(offer.id) } className="btn btn-success">cliquer ici</button></td>
                    <td>
                        <button onClick={ () => this.showModal(offer)} className="btn btn-warning btn-sm">modifier</button> &nbsp;
                        <button onClick={() => this.handleDelete(offer)} className="btn btn-danger btn-sm">suprimer</button>

                        <div  className="modal fade" id={id}  tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{offer.name }</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" key={offer.id}>
                                {jobseekers}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>

                    </td>
                </tr>
            )
        })
        let alert = <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        {this.state.alertMessage}
                        <button onClick={() => this.setState({alertMessage: ''})} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
        let alertMessage = this.state.alertMessage ? alert : ''
        
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center">Géstion des offres</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#Identifient</th>
                                    <th>Nom</th>
                                    <th>
                                        voire les demandeurs
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list_body}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <h4 className="card-header text-center">Ajouter une nouvelle offre</h4>
                            <div className="card-body">
                                {
                                   alertMessage
                                }
                                <form id="form-create">
                                <div className="form-group">
                                    <label form="name" className="control-label">Le nom</label>
                                    <input type="text" name="name" id="name" value={this.state.name} className="form-control" onChange={this.handleName}/> 
                                </div>
                                <div className="form-group">
                                    <label from="description" className="control-label">La description</label>
                                    <textarea onChange={this.handleDescription} name="desciption" id="desciption" className="form-control" value={this.state.description}></textarea>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-outline-success" onClick={this.handleSubmit}>Créer l'offre</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="modal-edit" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">modifier l'offer</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label form="name" className="control-label">Le nom</label>
                                    <input type="text" name="name" id="name" value={this.state.name} className="form-control" onChange={this.handleName}/> 
                                </div>
                                <div className="form-group">
                                    <label from="description" className="control-label">La description</label>
                                    <textarea onChange={this.handleDescription} name="desciption" id="desciption" className="form-control" value={this.state.description}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button"  className="btn btn-outline-success" onClick={this.handleEdit.bind(this)}>Modifier</button>
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Annuler</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            cv: '',
            user: {},
            profile:{},

        }
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleCv = this.handleCv.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleFirstName(e){
        this.setState({
            first_name: e.target.value
        })

    }

    handleLastName(e){
        this.setState({
            last_name: e.target.value
        })
    }

    handleCv(e){
        this.setState({
           cv: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        let formData = new FormData()
        formData.append('cv', this.state.cv)
        formData.append('first_name',this.state.first_name)
        formData.append('last_name', this.state.last_name)
        fetch('/profile/update', {
            method: 'POST',
            body:formData
        }).then(res => {
            if(res.ok){
                res.json().then(res => {
                    this.loadProfile()
                })
            }else{
            }
            
        })
        this.setState({
            first_name: '',
            last_name: '',
            cv: '',
            profile: {}
        })

    }
    loadProfile(){
        fetch('/profile/info').then(res => {
            res.json().then(res => {

                this.setState({
                    user:res.user,
                    profile: res.profile,
                    first_name: res.profile.first_name,
                    last_name: res.profile.last_name,
                    cv: res.profile.cv
                })
            })
        })
    }
    componentDidMount(){
        this.loadProfile()
    }
    render(){
        let content = this.state.profile || {}
        let createMarkup = function () { return {__html: content.cv }}
        let userInfo  = (
            <div className="content-section mt-3">
                <div className="media">
                    <div className="media-body">
                        <h5 className="mt-0">{this.state.user.email}</h5>
                        <span className="text-small">{this.state.user.username}</span>
                        <div className="border-bottom"></div>
                            <div>{this.state.profile.first_name } {this.state.profile.last_name}</div>
                        </div>
                </div>
            </div>
        )
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                    <div dangerouslySetInnerHTML={createMarkup() } /> 
                    </div>
                    <div className="col-md-4">
                        <div className="card card-light">
                            <h4 className="card-header">Completer votre profile</h4>
                            <div className="card-body">
                                <form encType="multipart/form-data">
                                    <div className="form-group">
                                        <label className="control-label">Prénom</label>
                                        <input onChange={this.handleFirstName} type="text" id="first_name" value={this.state.first_name} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label  className="control-label">Nom de famille</label>
                                        <input onChange={this.handleLastName} type="text" id="last_name" value={this.state.last_name} className="form-control"/>
                                    </div>
                                    <div className="form-group">

                                        <label  className="control-label">Votre CV (HTML)</label>
                                        <textarea onChange={this.handleCv} className="form-control" value={this.state.cv}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <button onClick={this.handleSubmit} className="btn btn-outline-success">je completer mon profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {userInfo}
                    </div>
                </div>
            </div>
        )
    }
}



const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/offres' exact component={Offers}/>
                <Route path='/entreprise' exact component={Enterprise}/>
                <Route path='/profile' exact component={Profile}/>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
