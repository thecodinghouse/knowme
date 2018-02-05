class Login extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = {user:{ email: '', password: ''}, errors:{}};
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
          success: function(res) {
            localStorage.setItem("auth_token", res.auth_token)
            window.location.href =  res.detail_page
          },
          error: function(res) {  
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
                            <input type="email" onChange={this.handleEmailChange.bind(this)} className="form-control" aria-describedby="emailHelp" placeholder="enter email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" onChange={this.handlePasswordChange.bind(this)} className="form-control" placeholder="password"/>
                        </div>
                        
                        <button onClick={this.handleLogin.bind(this)} className="btn btn-primary btn-block">Log In</button>
                        {/* <a href="/auth/github" className="btn btn-dark btn-block" >Sign In with Github</a> */}
                        <a href="/auth/facebook" className="btn btn-primary btn-block" >Sign In with Facebook</a>
                        {/* <a href="/auth/stackexchange" className="btn btn-warning btn-block" >Sign In with StackExchange</a> */}
                        {/* <button disabled id="stackLogin" className="btn btn-warning btn-block">Sign In with StackExchange</button> */}
                    </div>
                </div>
            </div> 
        ) 
    } 
}