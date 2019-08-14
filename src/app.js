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
            offers:[]
        }
    }
    componentDidMount(){
        fetch('/offres/list', {

        }).then(res => {
            res.json().then(res => {
                this.setState({
                    offers: res
                })
            })
        })
    }

    render()
    {
        const html = this.state.offers.map((offer) => {
            return (
                <div className="card mb-2" key={offer.id}>
                <div className="card-body">
                    <div className="card-title">{ offer.name }</div>
                    Depuis le <small className="text-muted">{ offer.date_posted }</small>&nbsp;&nbsp;&nbsp;
                    <strong>{ offer.enterprise }</strong>
                    <p className="card-text">{ offer.description }</p>
                    <a href="#" className="btn btn-link">Postuler directement</a>
                </div>
            </div>
            )
        })
        return (
            <div>
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
            name: '',
            enterprise: '',
            description: '',
            className: 'alert alert-success alert-dismissible fade show d-none',
            infoMessage: ''
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

    handleEnterprise = (e) => {
        this.setState({
            enterprise: e.target.value
        })
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let replace = `
        <div class="${this.state.className}" role="alert">${this.state.infoMessage}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        let alertElement = $('#alert')
        alertElement.html(replace)
        fetch('/offres/create', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                name: this.state.name,
                enterprise: this.state.enterprise,
                description: this.state.description,
            }),
        }).then(res => {
            if (res.ok){
                res.json().then(res => {
                    this.setState({
                        infoMessage: 'Votre Offre a bien été ajouter',
                        className: 'alert alert-success alert-dismissible fade show'
                    })
                    console.log(res)
                })
            }else{
                this.setState({
                    infoMessage: 'Oups! Désolé impossible d\'ajouter l\' offre',
                    className: 'alert alert-danger alert-dismissible fade show'
                })
            }
        })
        this.state.description = ''
        this.state.name = '',
        this.state.enterprise = ''
        
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <h4 className="card-header">Ajouter Une Nouvelle Offer</h4>
                            <div className="card-body">
                                <div id="alert"></div>
                                <form>
                                <div className="form-group">
                                    <label form="name" className="control-label">Le nom</label>
                                    <input type="text" name="name" id="name" value={this.state.name} className="form-control" onChange={this.handleName}/> 
                                </div>
                                <div className="form-group">
                                    <label form="enterprise" className="control-label">Votre entreprise</label>
                                    <input type="text" name="enterprise" id="name" value={this.state.enterprise} className="form-control" onChange={this.handleEnterprise}/> 
                                </div>
                                <div className="form-group">
                                    <label from="description" className="control-label">La description</label>
                                    <textarea onChange={this.handleDescription} name="desciption" id="desciption" className="form-control" value={this.state.description}></textarea>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-outline-success" onSubmit={this.handleSubmit} onClick={this.handleSubmit}>Créer l'offre</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                    he application context is a good place to store common data during a request or CLI command. Flask provides the g object for this purpose. It is a simple namespace object that has the same lifetime as an application context.
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
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
