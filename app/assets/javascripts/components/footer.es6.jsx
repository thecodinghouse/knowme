class Footer extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = { user_id: props.user_id,
            providers:props.providers,
        };
    };

    handleChangeGithub(key, e) {
            if(github === false){
             console.log('success till here');
             window.location = "/auth/github";
            }
            if(github === true){
                alert('Already Connected!');
            }
    }
    handleChangeFacebook(key, e) {
        if(facebook === false){
            console.log('success till here');
            window.location = "/auth/facebook";
        }
        if(facebook === true){
            alert('Already Connected!');
        }

    }
    handleChangeStackOverflow(key, e) {
        if(stack === false){
            console.log('success till here');
            window.location = "/auth/stackexchange";
        }
        if(stack === true){
            alert('Already Connected!');
        }
    }

    setList(facebook,github,stackExchange,) {
        return (
            <div className="footer-list">
                <ul>

                <li key={1}><span className="fab fa-github"></span >
                    <input key={1} type= "checkbox" checked={github} onChange={(evt)=>this.handleChangeGithub("github", evt)}/></li>
                <li key={2}><span className="fab fa-stack-overflow"></span>
                    <input key={2} type= "checkbox" checked={stackExchange} onChange={(evt)=>this.handleChangeStackOverflow("stack", evt)}/></li>
                <li key={3}><span className="fab fa-facebook-f"></span>
                    <input key={3} type= "checkbox" checked={facebook} onChange={(evt)=>this.handleChangeFacebook("facebook", evt)}></input></li>
                </ul>
            </div>
        )
    };

    render() {
        return (
            <div className="row">
                <h4 className="heading-h4">Connected with:</h4>
                {stack =false}
                {facebook = false}
                {github=false}
                {this.state.providers.map((item) => {
                    switch (item){
                        case 'stackexchange':
                            stack=true;
                            break
                        case 'github':
                            github=true;
                            break
                        case 'facebook':
                            facebook=true;
                            break
                    }
                })}
                {this.setList(facebook,github,stack)}
            </div>
        )
    }
}