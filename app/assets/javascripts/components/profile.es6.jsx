class Profile extends React.Component{ 

    constructor(props, context) {
        super(props, context);
    
        this.state = {
            user_id: props.user_id,
            isEditMode: props.isEditMode,
            defaultPic: props.defaultPic
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
        let view = "public_view"
        if(this.state.isEditMode){
            view = ""
        }
        return (
            <section id="wrapper" className={view}>
                <div className="container">
                    <UserProfile user_id={this.state.user_id} defaultPic={this.state.defaultPic} isEditMode={this.state.isEditMode}/>
                    <Education user_id={this.state.user_id} isEditMode={this.state.isEditMode}/>
                    <Work user_id={this.state.user_id} isEditMode={this.state.isEditMode}/>
                    <Skill user_id={this.state.user_id} isEditMode={this.state.isEditMode}/>
                    <Achievement user_id={this.state.user_id} isEditMode={this.state.isEditMode}/>
                    <Project user_id={this.state.user_id} isEditMode={this.state.isEditMode}/>
                    <GithubRepo user_id={this.state.user_id}/>
                    <StackExchangeRepo user_id={this.state.user_id}/>
                </div>
            </section>
        )
    }
}