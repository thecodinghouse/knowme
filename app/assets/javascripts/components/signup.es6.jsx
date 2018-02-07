class SignUp extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = {user:{email: '', password: '', password_confirmation: ''}, errors:{}};
    };

    handleSignUp() {
        var that = this;
        $.ajax({
          method: 'POST',
          data: { user: that.state.user },
          url: '/api/v1/signup',
          success: function(res) {
            localStorage.setItem("auth_token", res.auth_token)
            window.location.href =  res.detail_page
          },
          error: function(res) {
            console.log(res.responseJSON.errors);  
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

    handleConfirmPasswordChange(e) {
        var user = this.state.user;
        user.password_confirmation = e.target.value;
        this.setState({user: user});
    }

    render() { 
        // let alert = null;
        // if (Object.keys(this.state.errors).length === 0){
        //     alert = '';
        // } else {
        //     alert = <div className="alert alert-danger text-capitalize" role="alert">{this.state.errors.user_authentication}</div>;
        // }

        return (
            <section className="bg-grey">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-md-6 col-lg-6 signup-cont text-center">

                            <h4>Sign up</h4>

                            <div className="margin-tb30">
                                <div className="form-group ">
                                    <input type="email" className="form-control input-type-1"
                                            placeholder="Enter email"
                                           onChange={this.handleEmailChange.bind(this)} />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    <span style={{color:'red'}}>{this.state.errors.email}</span>
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control input-type-1"
                                            placeholder="Enter Password"
                                           onChange={this.handlePasswordChange.bind(this)} />
                                    <span style={{color:'red'}}>{this.state.errors.password}</span>
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control input-type-1"
                                           placeholder="Confirm Password" onChange={this.handleConfirmPasswordChange.bind(this)}/>
                                    <span style={{color:'red'}}>{this.state.errors.password_confirmation}</span>
                                </div>

                                <div className="form-group">
                                    <input type="submit" className="form-control submit-type-1"
                                           onClick={this.handleSignUp.bind(this)}
                                           value="Sign up"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}