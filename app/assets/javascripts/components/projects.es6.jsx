class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            user_id: props.user_id
        };
        this.typingTimer;
    };

    componentDidMount() {
        var that = this;
        $.ajax({
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/projects/?id=' + this.state.user_id,
            success: function (result) {
                console.log(result);
                that.setState({
                    projects: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        let projects = this.state.projects;
        projects[i][key] = e.target.value;
        this.setState({projects: projects});
        this.handleSave(projects);
    }

    handleSave(data) {
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        this.typingTimer = setTimeout(() => {
            this.doneTyping(data)
        }, 5000);
    }

    doneTyping(data){
        console.log(data)
        $.ajax({
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {projects: data},
            url: '/api/v1/project_update',
            success: function (result) {
                console.log(result);
            }
        });
    }

    render() {
        return (
            <div className="row card mt-5">
                <div className="card-header">
                    Projects
                </div>
                <div className="card-body">
                    {this.state.projects.map((item,i) => (
                        <div className="mt-2" key={i}>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.title}
                                        onChange={(evt)=>this.handleChangeInput(i, "title", evt)}/>

                                </div>
                                <div className="col form-group">
                                    <label>Team Size</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.team_size}
                                        onChange={(evt)=>this.handleChangeInput(i, "team_size", evt)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Description</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.description}
                                        onChange={(evt)=>this.handleChangeInput(i, "description", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Project Url</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.project_url}
                                        onChange={(evt)=>this.handleChangeInput(i, "project_url", evt)}/>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
}