class SignUp extends React.Component{ 
    render() { 
        return ( 
            <div class="row mt-5 justify-content-center"> 
                <form class="border border-secondary" action="/users/" method="post">
                    <div class="m-5">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="enter email" name="user[email]"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" placeholder="password" name="user[password]"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Confirm Password</label>
                        <input type="password" class="form-control" placeholder="confirm password" name="user[password_confirmation]"/>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </form>
            </div> 
        ) 
    } 
}