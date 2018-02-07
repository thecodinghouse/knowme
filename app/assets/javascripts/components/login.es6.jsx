class Login extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {user: {email: '', password: ''}, errors: {}};
    };

    componentDidMount() {
        console.log(window.SE);
    }

    handleLogin() {
        var that = this;
        $.ajax({
            method: 'POST',
            data: that.state.user,
            url: '/api/v1/login',
            success: function (res) {
                localStorage.setItem("auth_token", res.auth_token)
                window.location.href = res.detail_page
            },
            error: function (res) {
                that.setState({errors: res.responseJSON.errors})
            }
        });
    }

    handleEmailChange(e) {
        var user = this.state.user;
        user.email = e.target.value;
        this.setState({user: user});
    }

    handlePasswordChange(e) {
        var user = this.state.user;
        user.password = e.target.value;
        this.setState({user: user});
    }

    render() {
        // this.handleStackInit();
        let alert = null;
        if (Object.keys(this.state.errors).length === 0) {
            alert = '';
        } else {
            alert = <div className="alert alert-danger text-capitalize"
                         role="alert">{this.state.errors.user_authentication}</div>;
        }
        return (


            <section className="bg-grey">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-md-6 col-lg-6 signup-cont text-center">

                            <h4>Login</h4>

                            <div className="margin-tb30">
                                {alert}
                                <div className="form-group ">
                                    <input type="email" className="form-control input-type-1"
                                           onChange={this.handleEmailChange.bind(this)}
                                           id="exampleInputEmail1" aria-describedby="emailHelp"
                                           placeholder="Enter email"/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email
                                        with anyone else.
                                    </small>

                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control input-type-1"
                                           onChange={this.handlePasswordChange.bind(this)}
                                           id="exampleInputEmail1" aria-describedby="emailHelp"
                                           placeholder="Enter Password"/>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="form-control submit-type-1" value="Login"
                                           onClick={this.handleLogin.bind(this)}/>
                                </div>

                                <p>OR</p>

                                <div className="form-group">
                                    <a href="/auth/facebook" className="form-control login-fb">
                                        <span className="fab fa-facebook-f"></span>
                                        Sign in with Facebook</a>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}