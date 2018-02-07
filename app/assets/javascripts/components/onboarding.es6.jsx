class Github extends React.Component{ 

    constructor(props, context) {
        super(props, context);
        this.state = { next_page: props.page};
    };


    render() { 
        return (
            <section className="bg-grey">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-md-6 col-lg-6 signup-cont text-center">

                            <h5>Connect your github account to fetch your Contibutions</h5>

                            <div className="margin-tb30">

                                <button className="btn btn-secondary">
                                    <span className="fab fa-github"></span>
                                    <a href="/auth/github" className="btn btn-dark btn-block" >Connect your Github</a>
                                </button>


                                <a href={this.state.next_page} className="skip-btn">Skip</a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
            <section className="bg-grey">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col col-md-6 col-lg-6 signup-cont text-center">

                            <h5>Connect your stackoverflow account to fetch your Repotations</h5>

                            <div className="margin-tb30">

                                <button className="btn btn-secondary">
                                    <span className="fab fa-stack-overflow"></span>
                                    <a href="/auth/stackexchange" className="btn btn-dark btn-block" >
                                        Connect with StackOverflow</a>
                                </button>


                                <a href={this.state.next_page} className="skip-btn">Skip</a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ) 
    } 
}