class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = {
            user: props.user,
            profile: props.profile,
            view: props.view
        };
    };

    componentDidMount(){
        $(document).ajaxComplete(function() {
            $('textarea').each(function(){
                $(this).css('height',this.scrollHeight);
            });
            
        });

        $(document).on('change keyup','textarea',function(){
            $('textarea').css('height',this.scrollHeight);
        });
    }

    render() { 
        return (
            <section id="wrapper" className={this.state.view}>
                <div className="container">
                    <UserProfile profile={this.state.profile} user={this.state.user}/>
                    <Education user_id={this.state.user.id}/>
                    <Work user_id={this.state.user.id}/>
                    <Skill user_id={this.state.user.id}/>
                    <Achievement user_id={this.state.user.id}/>
                    <Project user_id={this.state.user.id}/>
                    <GithubRepo user_id={this.state.user.id}/>
                    <StackExchangeRepo user_id={this.state.user.id}/>
                </div>
            </section>
        )
    }
}