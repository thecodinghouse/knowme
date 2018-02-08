class GithubRepo extends React.Component{ 

    constructor(props, context) {
        super(props, context);
        this.state = { user_id: props.user_id, gitrepos: []};
    };

    componentDidMount(){
        var that = this;
        $.ajax({
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/users/github?id='+ this.state.user_id,
            success: function (result) {
                that.setState({
                    gitrepos: result,
                });
            }
        });
    }

    render() { 
        return (
            <div className="col-lg-12 border-top-1 work-exp position-relative margin-tb20">

                    <h4 className="heading-h4">Github Popular Repositories </h4>

                    <div className="githubrepo">
                        <ol className="pinned-repos-list mb-4">
                            {this.state.gitrepos.map((item, i) => (
                            <li className="pinned-repo-item p-3 mb-3 border border-gray-dark rounded-1 public fork" key={i}>
                                <span className="pinned-repo-item-content">
                                    <span className="d-block">
                                        <a href={item.svn_url} className="text-bold">
                                            <span className="repo js-repo" title="badges">{item.name}</span>
                                        </a>
                                    </span>
                                    
                                    <p className="text-gray text-small mb-2">Stars:    
                                        <a href={item.stargazers_url}>   {item.stargazers_count}</a>
                                    </p>

                                    <p className="pinned-repo-desc text-gray text-small d-block mt-2 mb-3">{item.description}</p>

                                    <p className="mb-0 f6 text-gray">
                                        <span className="repo-language-color pinned-repo-meta" style={{backgroundColor:'#244776'}}></span>
                                        &nbsp;&nbsp;{item.language}
                                    </p>
                                </span>
                            </li>
                            ))}
                        </ol>
                    </div>

                </div>
        ) 
    } 
}