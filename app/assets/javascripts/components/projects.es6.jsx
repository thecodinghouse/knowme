class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            user_id: props.user_id,
            project:{}
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
        }, 3000);
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

    handleCreateFormInput(key, e) {
        let project = this.state.project;
        project[key] = e.target.value;
        this.setState({project: project});
    }

    handleAddProject(){ 
        var that = this  
        $.ajax({
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {project: that.state.project},
            url: '/api/v1/projects',
            success: function (result) {
                console.log(result);
                let projects =  that.state.projects
                projects.push(result)
                that.setState({
                    projects: projects,
                })
                $('#projectModal').modal('hide');
            }
        });
    }


    render() {
        return (
            <div>
            <div className="row card mt-5">
                <div className="card-header">
                    Projects
                    <button type="button" className="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#projectModal" >+ Add Project</button>
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
            <div className="modal fade" id="projectModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Project</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mt-2">
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>Title</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={(evt)=>this.handleCreateFormInput("title", evt)}/>

                                    </div>
                                    <div className="col form-group">
                                        <label>Team Size</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            onChange={(evt)=>this.handleCreateFormInput("team_size", evt)}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>Description</label>
                                        <textarea
                                            className="form-control"
                                            onChange={(evt)=>this.handleCreateFormInput( "description", evt)}></textarea>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>Project Url</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={(evt)=>this.handleCreateFormInput("project_url", evt)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(evt)=>this.handleAddProject()}>Add Project</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}