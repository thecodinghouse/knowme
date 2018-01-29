class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = { user: props.user};
    };

    render() { 
        return (
            <div className="row">
                <h2>Welcome {this.state.user.email}</h2>      
                
            </div>
        )
    }
}