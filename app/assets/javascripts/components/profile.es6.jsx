class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = { user: props.user};
    };

    render() { 
        return (
            <div className="row">
                <EducationalDetail user_id={this.state.user.id}/>
            </div>
        )
    }
}