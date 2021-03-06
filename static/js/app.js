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
                "Trouve emploi"
            ),
            React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    "Trouve emploi"
                ),
                " est un systeme professionnel qui vous permet de trouvez rapidement et simplement votre travail avec une interface intuitive et simple. Nous vous listons toutes les offres post\xE9 par des grandes et petites enterprises afin que vous faciez votre choix."
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
        _this.handleSeach = _this.handleSeach.bind(_this);
        return _this;
    }

    _createClass(Offers, [{
        key: "apply",
        value: function apply(e, offer_id) {
            var _this2 = this;

            console.log(offer_id);
            e.preventDefault();
            fetch('/offres/' + offer_id + '/postul').then(function (res) {
                if (res.ok) {
                    res.json().then(function (offer) {
                        current_offer = _this2.state.offers.filter(function (offer) {
                            return offer.id != offer_id;
                        });
                        _this2.setState(function (state) {
                            return {
                                offers: [offer].concat(_toConsumableArray(current_offer))
                            };
                        });
                    });
                }
            });
        }
    }, {
        key: "fetchOffers",
        value: function fetchOffers(url) {
            var _this3 = this;

            fetch(url, {}).then(function (res) {
                res.json().then(function (res) {
                    _this3.setState({
                        offers: res.offers
                    });
                });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetchOffers('/offres/list');
        }
    }, {
        key: "handleSeach",
        value: function handleSeach(e) {
            e.preventDefault();
            var q = e.target.value;
            if (!q) {
                this.fetchOffers('/offres/list');
            }
            if (q.length > 4) {
                this.fetchOffers('/offres/list?q=' + q);
            }
        }
    }, {
        key: "addToFavories",
        value: function addToFavories(e, offer_id) {
            e.preventDefault();
            fetch('/offres/' + offer_id + '/favories').then(function (res) {
                res.json().then(function (res) {});
            });
            $(e.target).hide();
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var html = this.state.offers.map(function (offer) {
                var mark = React.createElement(
                    "a",
                    { href: "", className: "ml-auto btn btn-outline-success", onClick: function onClick(e) {
                            return _this4.addToFavories(e, offer.id);
                        } },
                    "Ajouter cette offer aux favoris",
                    React.createElement("i", { className: "fa fa-star" })
                );
                var link = offer.ollow ? React.createElement(
                    "a",
                    { onClick: function onClick(e) {
                            return _this4.apply(e, offer.id);
                        }, href: '/offers/' + offer.id + '/postuler',
                        className: "btn btn-outline-success" },
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
                        React.createElement(
                            "div",
                            { className: "d-flex" },
                            link,
                            mark
                        )
                    )
                );
            });
            var style = {
                width: "80%",
                paddding: "50px"
            };
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "jumbotron", onSubmit: function onSubmit(e) {
                            return e.preventDefault();
                        } },
                    React.createElement(
                        "form",
                        { className: "form-inline" },
                        React.createElement("input", { className: "form-control py-2", onInput: this.handleSeach, style: style, type: "search", placeholder: "M\xE9tier, Mots cles", "aria-label": "Search" }),
                        React.createElement(
                            "button",
                            { className: "btn btn-outline-success my-3 px-5", type: "submit" },
                            React.createElement("i", { className: "fas fa-search" })
                        )
                    )
                ),
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

        var _this5 = _possibleConstructorReturn(this, (Enterprise.__proto__ || Object.getPrototypeOf(Enterprise)).call(this, propos));

        _this5.handleName = function (e) {
            _this5.setState({
                name: e.target.value
            });
        };

        _this5.handleDescription = function (e) {
            _this5.setState({
                description: e.target.value
            });
        };

        _this5.handleSubmit = function (e) {
            e.preventDefault();
            fetch('/offres/create', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: _this5.state.name,
                    description: _this5.state.description
                })
            }).then(function (res) {
                return res.json();
            }).then(function (offer) {
                _this5.setState(function (state) {
                    return {
                        offers: [offer].concat(_toConsumableArray(state.offers)),
                        name: '',
                        description: ''
                    };
                });
            });
        };

        _this5.state = {
            id: 0,
            name: '',
            description: '',
            offers: [],
            alertMessage: ''

        };

        return _this5;
    }

    _createClass(Enterprise, [{
        key: "handleEdit",
        value: function handleEdit() {
            var _this6 = this;

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
                        _this6.setState(function (state) {
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
            var _this7 = this;

            fetch('/offres/' + offer.id + '/delete', {}).then(function (res) {
                if (res.ok) {
                    res.json().then(function (res) {
                        _this7.setState(function (state) {
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
            $('#modal-edit').modal();
        }
    }, {
        key: "handleModalTd",
        value: function handleModalTd(id) {
            $('#modal-td' + id).modal();
        }
    }, {
        key: "handleAccept",
        value: function handleAccept(e, offer_id, jb_id) {
            e.preventDefault();
            fetch('/offres/' + offer_id + '/accept/' + jb_id).then(function (res) {
                return res.json();
            }).then(function (res) {
                return console.log(res);
            });
            $(e.target).hide();
            $(e.target).next().show();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this8 = this;

            fetch('/offres/enterprise').then(function (res) {
                res.json().then(function (res) {
                    console.log(res[0].jobseekers);
                    _this8.setState({
                        offers: res
                    });
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this9 = this;

            var list_body = this.state.offers.map(function (offer) {
                return React.createElement(
                    "tr",
                    { key: offer.id },
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
                                    return _this9.showModal(offer);
                                }, className: "btn btn-warning btn-sm" },
                            "modifier"
                        ),
                        " \xA0",
                        React.createElement(
                            "button",
                            { onClick: function onClick() {
                                    return _this9.handleDelete(offer);
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
                            return _this9.setState({ alertMessage: '' });
                        }, type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close" },
                    React.createElement(
                        "span",
                        { "aria-hidden": "true" },
                        "\xD7"
                    )
                )
            );
            var alertMessage = this.state.alertMessage ? alert : '';
            var apply = this.state.offers.map(function (offer) {
                var jbs = offer.jobseekers.map(function (jb) {
                    var markUp = function markUp() {
                        return { __html: jb.cv };
                    };
                    var acceptBtn = !jb.apply ? React.createElement(
                        "button",
                        { className: "btn btn-outline-success btn-sm ml-auto",
                            onClick: function onClick(e) {
                                return _this9.handleAccept(e, offer.id, jb.id);
                            } },
                        "accepter la demande"
                    ) : React.createElement(
                        "button",
                        { className: "btn btn-outline-success ml-auto", disabled: true },
                        "d\xE9j\xE0 accepter"
                    );
                    var style = { display: 'none' };
                    return React.createElement(
                        "div",
                        { className: "media mb-3 border-bottom", key: jb.id },
                        React.createElement(
                            "div",
                            { className: "media-body" },
                            React.createElement(
                                "h5",
                                { className: "mt-0" },
                                jb.first_name + ' ' + jb.last_name
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "CV:"
                            ),
                            React.createElement("div", { dangerouslySetInnerHTML: markUp() }),
                            React.createElement(
                                "div",
                                { className: "d-flex my-3" },
                                acceptBtn,
                                React.createElement(
                                    "button",
                                    { className: "btn btn-outline-success ml-auto", disabled: true, style: style },
                                    "d\xE9j\xE0 accepter"
                                )
                            )
                        )
                    );
                });
                return React.createElement(
                    "div",
                    { key: offer.id, className: "card mb-2" },
                    React.createElement(
                        "div",
                        { className: "card-header" },
                        React.createElement(
                            "strong",
                            null,
                            offer.name
                        ),
                        " \xA0 ",
                        React.createElement(
                            "small",
                            { className: "badge badge-info" },
                            offer.apply
                        ),
                        " demandeur(s) d'emploi"
                    ),
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        jbs
                    ),
                    React.createElement(
                        "div",
                        { className: "card-footer d-flex" },
                        React.createElement(
                            "span",
                            { className: "mr-auto" },
                            "Cr\xE9er depuis ",
                            offer.date_posted,
                            " \xA0",
                            React.createElement("i", { className: "far fa-clock" })
                        ),
                        React.createElement(
                            "span",
                            null,
                            offer.enterprise
                        )
                    )
                );
            });
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-12" },
                        React.createElement(
                            "div",
                            { className: "col-md-12 my-5" },
                            React.createElement(
                                "h3",
                                null,
                                "G\xE9stion des demandeur d'emploi"
                            ),
                            apply
                        ),
                        React.createElement(
                            "h3",
                            { className: "text-center" },
                            "G\xE9stion des offres"
                        ),
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
                        { className: "col-md-12" },
                        React.createElement(
                            "div",
                            { className: "card" },
                            React.createElement(
                                "h4",
                                { className: "card-header text-center" },
                                "Ajouter une nouvelle offre"
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
                    { className: "modal", id: "modal-edit", tabIndex: "-1", role: "dialog" },
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

        var _this10 = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

        _this10.state = {
            first_name: '',
            last_name: '',
            cv: '',
            user: {},
            profile: {}

        };
        _this10.handleFirstName = _this10.handleFirstName.bind(_this10);
        _this10.handleLastName = _this10.handleLastName.bind(_this10);
        _this10.handleCv = _this10.handleCv.bind(_this10);
        _this10.handleSubmit = _this10.handleSubmit.bind(_this10);

        return _this10;
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
                cv: e.target.value
            });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(e) {
            var _this11 = this;

            e.preventDefault();
            var formData = new FormData();
            formData.append('cv', this.state.cv);
            formData.append('first_name', this.state.first_name);
            formData.append('last_name', this.state.last_name);
            fetch('/profile/update', {
                method: 'POST',
                body: formData
            }).then(function (res) {
                if (res.ok) {
                    res.json().then(function (res) {
                        _this11.loadProfile();
                    });
                } else {}
            });
            this.setState({
                first_name: '',
                last_name: '',
                cv: '',
                profile: {}
            });
        }
    }, {
        key: "loadProfile",
        value: function loadProfile() {
            var _this12 = this;

            fetch('/profile/info').then(function (res) {
                res.json().then(function (res) {

                    _this12.setState({
                        user: res.user,
                        profile: res.profile,
                        first_name: res.profile.first_name,
                        last_name: res.profile.last_name,
                        cv: res.profile.cv
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
                return { __html: content.cv };
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
                        React.createElement(
                            "h4",
                            { className: "border-bottom" },
                            "CV"
                        ),
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
                                            "label",
                                            { className: "control-label" },
                                            "Votre CV (HTML)"
                                        ),
                                        React.createElement("textarea", { onChange: this.handleCv, className: "form-control", value: this.state.cv })
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

var Favorite = function (_React$Component4) {
    _inherits(Favorite, _React$Component4);

    function Favorite(props) {
        _classCallCheck(this, Favorite);

        var _this13 = _possibleConstructorReturn(this, (Favorite.__proto__ || Object.getPrototypeOf(Favorite)).call(this, props));

        _this13.state = {
            offers: []
        };
        return _this13;
    }

    _createClass(Favorite, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this14 = this;

            fetch('/offres/favories').then(function (res) {
                res.json().then(function (res) {
                    return _this14.setState({
                        offers: res
                    });
                });
            });
        }
    }, {
        key: "removeToFavories",
        value: function removeToFavories(e, offer_id) {
            e.preventDefault();
            fetch('/offres/' + offer_id + '/favories/delete');
            e.target.closest('.card').remove();
        }
    }, {
        key: "render",
        value: function render() {
            var _this15 = this;

            var html = this.state.offers.map(function (offer) {
                var mark = React.createElement(
                    "a",
                    { href: "", className: "ml-auto btn btn-outline-success", onClick: function onClick(e) {
                            return _this15.removeToFavories(e, offer.id);
                        } },
                    "Retir\xE9 cette offer aux favoris ",
                    React.createElement("i", { className: "fas fa-star x5" })
                );
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
                            "div",
                            { className: "d-flex" },
                            mark
                        )
                    )
                );
            });
            if (this.state.offers.length) {

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "Vos offres favoris"
                    ),
                    html
                );
            } else {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "Vous n'avez pas des offres favoris pour le moment"
                    )
                );
            }
        }
    }]);

    return Favorite;
}(React.Component);

var Notification = function (_React$Component5) {
    _inherits(Notification, _React$Component5);

    function Notification(props) {
        _classCallCheck(this, Notification);

        var _this16 = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

        _this16.state = {
            jobseeker: {},
            offers: []
        };
        return _this16;
    }

    _createClass(Notification, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this17 = this;

            fetch('/notifications/all').then(function (res) {
                return res.json();
            }).then(function (notifications) {
                console.log(notifications);
                _this17.setState({
                    offers: notifications.offers,
                    jobseeker: notifications.jobseeker
                });
            });
        }
    }, {
        key: "markAsRead",
        value: function markAsRead(e, offer_id) {
            console.log(offer_id);
            fetch('/notifications/' + offer_id + '/mark').then(function (res) {
                return res.json();
            }).then(function (res) {
                location.reload();
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this18 = this;

            if (!this.state.offers.length) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h5",
                        null,
                        "Vous avez aucune notifications pour le moment"
                    )
                );
            }
            var content = this.state.offers.map(function (offer) {
                return React.createElement(
                    "div",
                    { key: offer.id, className: "card" },
                    React.createElement(
                        "div",
                        { className: "card-body" },
                        React.createElement(
                            "p",
                            null,
                            "L'Entreprise - ",
                            React.createElement(
                                "u",
                                null,
                                offer.enterprise
                            ),
                            " a accepter votre demande d'emploi sur l'offre:"
                        ),
                        React.createElement(
                            "h5",
                            null,
                            offer.name
                        ),
                        React.createElement(
                            "p",
                            null,
                            offer.description
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-outline-info", onClick: function onClick(e) {
                                    return _this18.markAsRead(e, offer.id);
                                } },
                            "Marquer comme lu"
                        )
                    )
                );
            });
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "media" },
                    React.createElement(
                        "div",
                        { className: "media-body" },
                        React.createElement(
                            "h3",
                            { className: "mt-0" },
                            "F\xE9licitations ",
                            this.state.jobseeker.first_name + ' ' + this.state.jobseeker.last_name
                        ),
                        content
                    )
                )
            );
        }
    }]);

    return Notification;
}(React.Component);

var App = function App() {
    fetch('/notify').then(function (res) {
        return res.json();
    }).then(function (count) {
        if (count) {
            var notifyElement = $('.notify');
            notifyElement.append('<i class="notify-icon badge badge-warning">' + count + '</i>');
        }
    });

    return React.createElement(
        BrowserRouter,
        null,
        React.createElement(
            Switch,
            null,
            React.createElement(Route, { path: "/", exact: true, component: Home }),
            React.createElement(Route, { path: "/offres", exact: true, component: Offers }),
            React.createElement(Route, { path: "/entreprise", exact: true, component: Enterprise }),
            React.createElement(Route, { path: "/profile", exact: true, component: Profile }),
            React.createElement(Route, { path: "/offres/favoris", exact: true, component: Favorite }),
            React.createElement(Route, { path: "/notifications", exact: true, component: Notification })
        )
    );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));