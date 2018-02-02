class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = { user: props.user};
    };

    render() { 
        return (
            <div>
                <Education user_id={this.state.user.id}/>
                <Work user_id={this.state.user.id}/>
                <Skill user_id={this.state.user.id}/>
                <Achievement user_id={this.state.user.id}/>
                <Project user_id={this.state.user.id}/>
            </div>
        )
    }
}