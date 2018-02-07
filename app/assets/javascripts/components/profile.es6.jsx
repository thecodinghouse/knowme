class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = {
            user: props.user,
            profile: props.profile
        };
    };

    render() { 
        return (
            <section id="wrapper">
                <div className="container">
                    <UserProfile profile={this.state.profile} user={this.state.user}/>
                    <Education user_id={this.state.user.id}/>
                    <Work user_id={this.state.user.id}/>
                    <Skill user_id={this.state.user.id}/>
                    <Achievement user_id={this.state.user.id}/>
                    <Project user_id={this.state.user.id}/>
                </div>
            </section>
        )
    }
}