class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = { user: props.user};
    };

    render() { 
        return (
            <div>
                <EducationalDetail user_id={this.state.user.id}/>
                <ExperienceDetail user_id={this.state.user.id}/>
            </div>
        )
    }
}