var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouterDOM = ReactRouterDOM,
    BrowserRouter = _ReactRouterDOM.BrowserRouter,
    Route = _ReactRouterDOM.Route,
    Switch = _ReactRouterDOM.Switch,
    Link = _ReactRouterDOM.Link;


var Home = function Home() {
    var style = { backgroundColor: 'white' };
    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "jumbotron text-center", style: style },
            React.createElement(
                "h3",
                null,
                "Trouvez votre futur emploi parmi les 50 offres d'emploi disponibles"
            ),
            React.createElement(
                "p",
                null,
                "\xC9tudiant, d\xE9butant ou professionnel exp\xE9riment\xE9 ",
                React.createElement(
                    "strong",
                    null,
                    "Field Job Search"
                ),
                " vous offre une exp\xE9rience sur mesure dans votre recherche d\u2019emploi"
            ),
            React.createElement(
                "a",
                { href: "/offres", className: "btn btn btn-outline-success" },
                "Je d\xE9marre ma rechereche"
            )
        ),
        React.createElement(
            "div",
            { className: "content-section" },
            React.createElement(
                "h1",
                { className: "text-center" },
                "Une pr\xE9sentation du systeme"
            ),
            React.createElement(
                "p",
                null,
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non perspiciatis sequi odio animi veniam aliquam, cumque omnis deleniti et tenetur voluptatem quos in, quidem, illo porro maiores iusto amet itaque?"
            )
        )
    );
};

var Offers = function (_React$Component) {
    _inherits(Offers, _React$Component);

    function Offers(props) {
        _classCallCheck(this, Offers);

        var _this = _possibleConstructorReturn(this, (Offers.__proto__ || Object.getPrototypeOf(Offers)).call(this, props));

        _this.state = {
            offers: []
        };
        return _this;
    }

    _createClass(Offers, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch('/offres/list', {}).then(function (res) {
                res.json().then(function (res) {
                    _this2.setState({
                        offers: res
                    });
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var html = this.state.offers.map(function (offer) {
                return React.createElement(
                    "div",
                    { className: "card mb-2", key: offer.id },
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "div",
                            { className: "card-title" },
                            offer.name
                        ),
                        "Depuis le ",
                        React.createElement(
                            "small",
                            { className: "text-muted" },
                            offer.date_posted
                        ),
                        "\xA0\xA0\xA0",
                        React.createElement(
                            "strong",
                            null,
                            offer.enterprise
                        ),
                        React.createElement(
                            "p",
                            { className: "card-text" },
                            offer.description
                        ),
                        React.createElement(
                            "a",
                            { href: "#", className: "btn btn-link" },
                            "Postuler directement"
                        )
                    )
                );
            });
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    { className: "text-muted" },
                    this.state.offers.length,
                    " offres corespondent \xE0 votre recherche"
                ),
                html
            );
        }
    }]);

    return Offers;
}(React.Component);

var Enterprise = function (_React$Component2) {
    _inherits(Enterprise, _React$Component2);

    function Enterprise(propos) {
        _classCallCheck(this, Enterprise);

        var _this3 = _possibleConstructorReturn(this, (Enterprise.__proto__ || Object.getPrototypeOf(Enterprise)).call(this, propos));

        _this3.handleName = function (e) {
            _this3.setState({
                name: e.target.value
            });
        };

        _this3.handleDescription = function (e) {
            _this3.setState({
                description: e.target.value
            });
        };

        _this3.handleEnterprise = function (e) {
            _this3.setState({
                enterprise: e.target.value
            });
        };

        _this3.handleSubmit = function (e) {
            e.preventDefault();
            var replace = "\n        <div class=\"" + _this3.state.className + "\" role=\"alert\">" + _this3.state.infoMessage + "\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n        </div>\n        ";
            var alertElement = $('#alert');
            alertElement.html(replace);
            fetch('/offres/create', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    name: _this3.state.name,
                    enterprise: _this3.state.enterprise,
                    description: _this3.state.description
                })
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (res) {
                        _this3.setState({
                            infoMessage: 'Votre Offre a bien été ajouter',
                            className: 'alert alert-success alert-dismissible fade show'
                        });
                        console.log(res);
                    });
                } else {
                    _this3.setState({
                        infoMessage: 'Oups! Désolé impossible d\'ajouter l\' offre',
                        className: 'alert alert-danger alert-dismissible fade show'
                    });
                }
            });
            _this3.state.description = '';
            _this3.state.name = '', _this3.state.enterprise = '';
        };

        _this3.state = {
            name: '',
            enterprise: '',
            description: '',
            className: 'alert alert-success alert-dismissible fade show d-none',
            infoMessage: ''
        };

        return _this3;
    }

    _createClass(Enterprise, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-8" },
                        React.createElement(
                            "div",
                            { className: "card" },
                            React.createElement(
                                "h4",
                                { className: "card-header" },
                                "Ajouter Une Nouvelle Offer"
                            ),
                            React.createElement(
                                "div",
                                { className: "card-body" },
                                React.createElement("div", { id: "alert" }),
                                React.createElement(
                                    "form",
                                    null,
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "label",
                                            { form: "name", className: "control-label" },
                                            "Le nom"
                                        ),
                                        React.createElement("input", { type: "text", name: "name", id: "name", value: this.state.name, className: "form-control", onChange: this.handleName })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "label",
                                            { form: "enterprise", className: "control-label" },
                                            "Votre entreprise"
                                        ),
                                        React.createElement("input", { type: "text", name: "enterprise", id: "name", value: this.state.enterprise, className: "form-control", onChange: this.handleEnterprise })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "label",
                                            { from: "description", className: "control-label" },
                                            "La description"
                                        ),
                                        React.createElement("textarea", { onChange: this.handleDescription, name: "desciption", id: "desciption", className: "form-control", value: this.state.description })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "button",
                                            { className: "btn btn-outline-success", onSubmit: this.handleSubmit, onClick: this.handleSubmit },
                                            "Cr\xE9er l'offre"
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-4" },
                        "he application context is a good place to store common data during a request or CLI command. Flask provides the g object for this purpose. It is a simple namespace object that has the same lifetime as an application context."
                    )
                )
            );
        }
    }]);

    return Enterprise;
}(React.Component);

var App = function App() {
    return React.createElement(
        BrowserRouter,
        null,
        React.createElement(
            Switch,
            null,
            React.createElement(Route, { path: "/", exact: true, component: Home }),
            React.createElement(Route, { path: "/offres", exact: true, component: Offers }),
            React.createElement(Route, { path: "/entreprise", exact: true, component: Enterprise })
        )
    );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));