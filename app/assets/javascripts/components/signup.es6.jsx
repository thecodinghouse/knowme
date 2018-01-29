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
        let alert = null;
        if (Object.keys(this.state.errors).length === 0){
            alert = '';
        } else {
            alert = <div className="alert alert-danger text-capitalize" role="alert">{this.state.errors.user_authentication}</div>;
        }

        return ( 
            <div className="row mt-5 justify-content-center"> 
                <div className="border border-secondary">
                    <div className="m-5">
                    {alert}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="enter email" onChange={this.handleEmailChange.bind(this)} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="password" onChange={this.handlePasswordChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                        <input type="password" className="form-control" placeholder="confirm password" onChange={this.handleConfirmPasswordChange.bind(this)}  />
                    </div>
                    
                    <button onClick={this.handleSignUp.bind(this)}  className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
            </div> 
        ) 
    } 
}