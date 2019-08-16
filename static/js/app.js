var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            offers: [],
            ollowed: false
        };
        return _this;
    }

    _createClass(Offers, [{
        key: "apply",
        value: function apply(e, offer_id) {
            e.preventDefault();
            fetch('/offres/' + offer_id + '/postul').then(function (res) {
                console.log(res.ok);
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch('/offres/list', {}).then(function (res) {
                res.json().then(function (res) {
                    _this2.setState({
                        offers: res.offers,
                        ollowed: res.ollowed
                    });
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var html = this.state.offers.map(function (offer) {
                var link = _this3.state.ollowed ? React.createElement(
                    "a",
                    { onClick: function onClick(e) {
                            return _this3.apply(e, offer.id);
                        }, href: '/offers/' + offer.id + '/postuler', className: "btn btn-link" },
                    "Postuler directement"
                ) : '';
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
                        link
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

        var _this4 = _possibleConstructorReturn(this, (Enterprise.__proto__ || Object.getPrototypeOf(Enterprise)).call(this, propos));

        _this4.handleName = function (e) {
            _this4.setState({
                name: e.target.value
            });
        };

        _this4.handleDescription = function (e) {
            _this4.setState({
                description: e.target.value
            });
        };

        _this4.handleSubmit = function (e) {
            e.preventDefault();
            fetch('/offres/create', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    name: _this4.state.name,
                    description: _this4.state.description
                })
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (offer) {
                        _this4.setState(function (satate) {
                            return {
                                alertMessage: 'L\'offre a bien été ajouter',
                                offers: [offer].concat(_toConsumableArray(_this4.state.offers))
                            };
                        });
                    });
                } else {
                    _this4.setState({
                        alertMessage: 'Oups! Il se peut que vous n\'avez pas bien remplie les champs.'
                    });
                }
            });
            _this4.state.description = '';
            _this4.state.name = '';
        };

        _this4.state = {
            id: 0,
            name: '',
            description: '',
            offers: [],
            alertMessage: ''

        };

        return _this4;
    }

    _createClass(Enterprise, [{
        key: "handleEdit",
        value: function handleEdit() {
            var _this5 = this;

            fetch('/offres/' + this.state.id + '/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.id,
                    name: this.state.name,
                    description: this.state.description
                })
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (offer) {
                        _this5.setState(function (state) {
                            var filtred = state.offers.filter(function (f) {
                                return f.id != offer.id;
                            });
                            return { offers: [offer].concat(_toConsumableArray(filtred)) };
                        });
                    });
                }
            });
            this.setState({
                id: 0,
                name: '',
                description: ''
            });
            $('.modal').modal('hide');
            $('#form-create').show();
        }
    }, {
        key: "handleDelete",
        value: function handleDelete(offer) {
            var _this6 = this;

            fetch('/offres/' + offer.id + '/delete', {}).then(function (res) {
                if (res.ok) {
                    res.json().then(function (res) {
                        _this6.setState(function (state) {
                            return {
                                offers: state.offers.filter(function (f) {
                                    return f != offer;
                                })
                            };
                        });
                    });
                }
            });
        }
    }, {
        key: "showModal",
        value: function showModal(offer) {
            this.setState({
                id: offer.id,
                name: offer.name,
                description: offer.description
            });
            $('.modal').modal();
            $('#form-create').hide();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this7 = this;

            fetch('/offres/enterprise').then(function (res) {
                res.json().then(function (res) {
                    _this7.setState({
                        offers: res
                    });
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            var list_body = this.state.offers.map(function (offer) {
                return React.createElement(
                    "tr",
                    { key: offer.id, "data-id": offer.id },
                    React.createElement(
                        "td",
                        null,
                        "#",
                        offer.id
                    ),
                    React.createElement(
                        "td",
                        null,
                        offer.name
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    return _this8.showModal(offer);
                                }, className: "btn btn-warning btn-sm" },
                            "modifier"
                        ),
                        " \xA0",
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    return _this8.handleDelete(offer);
                                }, className: "btn btn-danger btn-sm" },
                            "suprimer"
                        )
                    )
                );
            });
            var alert = React.createElement(
                "div",
                { className: "alert alert-warning alert-dismissible fade show", role: "alert" },
                this.state.alertMessage,
                React.createElement(
                    "button",
                    { onClick: function onClick() {
                            return _this8.setState({ alertMessage: '' });
                        }, type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close" },
                    React.createElement(
                        "span",
                        { "aria-hidden": "true" },
                        "\xD7"
                    )
                )
            );
            var alertMessage = this.state.alertMessage ? alert : '';
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
                            "table",
                            { className: "table table-striped" },
                            React.createElement(
                                "thead",
                                null,
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        null,
                                        "#Identifient"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Nom"
                                    ),
                                    React.createElement(
                                        "th",
                                        null,
                                        "Action"
                                    )
                                )
                            ),
                            React.createElement(
                                "tbody",
                                null,
                                list_body
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-4" },
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
                                alertMessage,
                                React.createElement(
                                    "form",
                                    { id: "form-create" },
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
                                            { className: "btn btn-outline-success", onClick: this.handleSubmit },
                                            "Cr\xE9er l'offre"
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "modal", tabIndex: "-1", role: "dialog" },
                    React.createElement(
                        "div",
                        { className: "modal-dialog", role: "document" },
                        React.createElement(
                            "div",
                            { className: "modal-content" },
                            React.createElement(
                                "div",
                                { className: "modal-header" },
                                React.createElement(
                                    "h5",
                                    { className: "modal-title" },
                                    "modifier l'offer"
                                ),
                                React.createElement(
                                    "button",
                                    { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                                    React.createElement(
                                        "span",
                                        { "aria-hidden": "true" },
                                        "\xD7"
                                    )
                                )
                            ),
                            React.createElement(
                                "form",
                                null,
                                React.createElement(
                                    "div",
                                    { className: "modal-body" },
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
                                            { from: "description", className: "control-label" },
                                            "La description"
                                        ),
                                        React.createElement("textarea", { onChange: this.handleDescription, name: "desciption", id: "desciption", className: "form-control", value: this.state.description })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "modal-footer" },
                                    React.createElement(
                                        "button",
                                        { type: "button", className: "btn btn-outline-success", onClick: this.handleEdit.bind(this) },
                                        "Modifier"
                                    ),
                                    React.createElement(
                                        "button",
                                        { type: "button", className: "btn btn-outline-secondary", "data-dismiss": "modal" },
                                        "Annuler"
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Enterprise;
}(React.Component);

var Profile = function (_React$Component3) {
    _inherits(Profile, _React$Component3);

    function Profile(props) {
        _classCallCheck(this, Profile);

        var _this9 = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

        _this9.state = {
            first_name: '',
            last_name: '',
            cv_file: '',
            user: {},
            profile: {}

        };
        _this9.handleFirstName = _this9.handleFirstName.bind(_this9);
        _this9.handleLastName = _this9.handleLastName.bind(_this9);
        _this9.handleCv = _this9.handleCv.bind(_this9);
        _this9.handleSubmit = _this9.handleSubmit.bind(_this9);

        return _this9;
    }

    _createClass(Profile, [{
        key: "handleFirstName",
        value: function handleFirstName(e) {
            this.setState({
                first_name: e.target.value
            });
        }
    }, {
        key: "handleLastName",
        value: function handleLastName(e) {
            this.setState({
                last_name: e.target.value
            });
        }
    }, {
        key: "handleCv",
        value: function handleCv(e) {
            this.setState({
                cv_file: e.target.files[0]
            });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(e) {
            var _this10 = this;

            e.preventDefault();
            var formData = new FormData();
            formData.append('cv', this.state.cv_file);
            formData.append('first_name', this.state.first_name);
            formData.append('last_name', this.state.last_name);
            fetch('/profile/update', {
                method: 'POST',
                body: formData
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (res) {
                        _this10.loadProfile();
                    });
                } else {
                    console.log(res);
                }
            });
            this.setState({
                first_name: '',
                last_name: '',
                cv_file: '',
                profile: {}
            });
        }
    }, {
        key: "loadProfile",
        value: function loadProfile() {
            var _this11 = this;

            fetch('/profile/info').then(function (res) {
                res.json().then(function (res) {

                    _this11.setState({
                        user: res.user,
                        profile: res.profile,
                        first_name: res.profile.first_name,
                        last_name: res.profile.last_name
                    });
                });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadProfile();
        }
    }, {
        key: "render",
        value: function render() {
            var content = this.state.profile || {};
            var createMarkup = function createMarkup() {
                return { __html: content.cv_content };
            };
            var userInfo = React.createElement(
                "div",
                { className: "content-section mt-3" },
                React.createElement(
                    "div",
                    { className: "media" },
                    React.createElement(
                        "div",
                        { className: "media-body" },
                        React.createElement(
                            "h5",
                            { className: "mt-0" },
                            this.state.user.email
                        ),
                        React.createElement(
                            "span",
                            { className: "text-small" },
                            this.state.user.username
                        ),
                        React.createElement("div", { className: "border-bottom" }),
                        React.createElement(
                            "div",
                            null,
                            this.state.profile.first_name,
                            " ",
                            this.state.profile.last_name
                        )
                    )
                )
            );
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-8" },
                        React.createElement("div", { dangerouslySetInnerHTML: createMarkup() })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(
                            "div",
                            { className: "card card-light" },
                            React.createElement(
                                "h4",
                                { className: "card-header" },
                                "Completer votre profile"
                            ),
                            React.createElement(
                                "div",
                                { className: "card-body" },
                                React.createElement(
                                    "form",
                                    { encType: "multipart/form-data" },
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "label",
                                            { className: "control-label" },
                                            "Pr\xE9nom"
                                        ),
                                        React.createElement("input", { onChange: this.handleFirstName, type: "text", id: "first_name", value: this.state.first_name, className: "form-control" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "label",
                                            { className: "control-label" },
                                            "Nom de famille"
                                        ),
                                        React.createElement("input", { onChange: this.handleLastName, type: "text", id: "last_name", value: this.state.last_name, className: "form-control" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "div",
                                            { className: "custom-file " },
                                            React.createElement("input", { onChange: this.handleCv, type: "file", className: "custom-file-input", id: "customFile" }),
                                            React.createElement(
                                                "label",
                                                { className: "custom-file-label", htmlFor: "customFile" },
                                                "Choose file"
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "button",
                                            { onClick: this.handleSubmit, className: "btn btn-outline-success" },
                                            "je completer mon profile"
                                        )
                                    )
                                )
                            )
                        ),
                        userInfo
                    )
                )
            );
        }
    }]);

    return Profile;
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
            React.createElement(Route, { path: "/entreprise", exact: true, component: Enterprise }),
            React.createElement(Route, { path: "/profile", exact: true, component: Profile })
        )
    );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));