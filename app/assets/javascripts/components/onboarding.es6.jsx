class Github extends React.Component{ 

    constructor(props, context) {
        super(props, context);
        this.state = { next_page: props.page};
    };


    render() { 
        return ( 
            <div className="row mt-5 justify-content-center"> 
                <div className="border border-secondary">
                    <div className="m-5">
                        <p>Connect you github account to fetch your Contibutions</p>

                        <a href="/auth/github" className="btn btn-dark btn-block" >Sign In with Github</a>
                        <div className="row mt-5 justify-content-center">
                            <a href={this.state.next_page}>Skip</a>
                        </div>
                    </div>
                </div>
            </div> 
        ) 
    } 
}

class StackExchange extends React.Component{ 

    constructor(props, context) {
        super(props, context);
        this.state = { next_page: props.page};
    };


    render() { 
        return ( 
            <div className="row mt-5 justify-content-center"> 
                <div className="border border-secondary">
                    <div className="m-5">
                        <p>Connect you stackoverflow account to fetch your Repotations</p>
                        
                        <a href="/auth/stackexchange" className="btn btn-warning btn-block" >Sign In with StackExchange</a>
                        <div className="row mt-5 justify-content-center">
                            <a href={this.state.next_page}>Skip</a>
                        </div>
                    </div>
                </div>
            </div> 
        ) 
    } 
}