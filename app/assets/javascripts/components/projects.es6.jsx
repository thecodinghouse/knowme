class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: props.isEditMode,
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
        if(this.state.isEditMode){
            let projects = this.state.projects;
            projects[i][key] = e.target.value;
            this.setState({projects: projects});
            this.handleSave(projects);
        }
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
        if(this.state.isEditMode){
            $.ajax({
                method: 'PATCH',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                data: {projects: data},
                url: '/api/v1/projects_update',
                success: function (result) {
                    console.log(result);
                }
            });
        }
    }

    handleCreateFormInput(key, e) {
        if(this.state.isEditMode){
            let project = this.state.project;
            project[key] = e.target.value;
            this.setState({project: project});
        }
    }

    handleAddProject(){ 
        if(this.state.isEditMode){
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
    }
    handleDeleteProject(i, evt) {
        if(this.state.isEditMode){
            var that = this;
            console.log('delete');
            $.ajax({
                method: 'DELETE',
                headers: {
                    "Authorization": localStorage.getItem('auth_token'),
                },
                url: '/api/v1/projects/' + this.state.projects[i].id,
                success: function (result) {
                    console.log(result);
                    let projects =  that.state.projects;
                    projects.splice(i, 1);
                    that.setState({
                        projects: projects,
                    });
                }
            });
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-lg-12 border-top-1 work-exp position-relative margin-tb20">
                    <a href="#"  data-toggle="modal" data-target="#projectModal"  className="position-absolute add-btn">
                        <span className="fa fa-plus"></span>
                    </a>

                    <h4 className="heading-h4">Projects</h4>
                    {this.state.projects.map((item,i) => (
                        <div className="single-exp position-relative" key={i}>
                            <a href="javascript:void(0)" onClick={(evt)=>this.handleDeleteProject(i,evt)} className="position-absolute delete-btn">
                                <span className="fa fa-trash"></span>
                            </a>
                            <input type="text" className="company-name hide-input col-lg-12" placeholder="Project title" value={item.title || ''} onChange={(evt)=>this.handleChangeInput(i, "title", evt)}/>
                            <input type="text" className="company-designation hide-input col-lg-12" placeholder="http://www.example.com" value={item.project_url || ''} onChange={(evt)=>this.handleChangeInput(i, "project_url", evt)}/>
                            
                            <textarea type="text" className="person-about hide-input col-lg-12" placeholder="Your Name" spellCheck="false" value={item.description || ''} onChange={(evt)=>this.handleChangeInput(i, "description", evt)}>
                            </textarea>
                        </div>
                    ))}
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