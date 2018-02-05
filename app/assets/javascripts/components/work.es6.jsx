class Work extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: [],
            user_id: props.user_id,
            work:{}
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
            url: '/api/v1/works/?id=' + this.state.user_id,
            success: function (result) {
                that.setState({
                    works: result,
                });
            }
        });
    };

    handleChangeInput(i, key, e) {
        let experience_details = this.state.works;
        experience_details[i][key] = e.target.value;
        this.setState({works: experience_details});
        this.handleSave(experience_details);
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
        $.ajax({
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {works: data},
            url: '/api/v1/works_update',
            success: function (result) {
                console.log(result);
            }
        });
    }

    handleCreateFormInput(key, e) {
        let experience_detail = this.state.work;
        experience_detail[key] = e.target.value;
        this.setState({work: experience_detail});
    }

    handleAddExperience(){ 
        var that = this  
        $.ajax({
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            data: {work: that.state.work},
            url: '/api/v1/works',
            success: function (result) {
                console.log(result);
                let experience_details =  that.state.works
                experience_details.push(result)
                that.setState({
                    works: experience_details,
                })
                $('#experienceModal').modal('hide');
            }
        });
    }
    handleDeleteWork(i, evt) {
        var that = this;
        console.log('delete');
        $.ajax({
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('auth_token'),
            },
            url: '/api/v1/works/' + this.state.works[i].id,
            success: function (result) {
                console.log(result);
                let works =  that.state.works;
                works.splice(i, 1);
                that.setState({
                    works: works,
                });
            }
        });

    }
    
    render() {
        return (
            <div>
            <div className="row card mt-5">
                <div className="card-header">
                    Experience Profile
                    <button type="button" className="btn btn-primary btn-sm float-right" data-toggle="modal" data-target="#experienceModal" >+ Add Experience</button>
                </div>
                <div className="card-body">
                    {this.state.works.map((item, i) => (
                        <div className="mt-2" key={i}>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Name Of Company:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.company_name}
                                        onChange={(evt) => this.handleChangeInput(i, "company_name", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Designation:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={item.designation}
                                        onChange={(evt) => this.handleChangeInput(i, "designation", evt)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Year Of start:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={item.year_of_start}
                                        onChange={(evt) => this.handleChangeInput(i, "year_of_start", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Year Of end:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={item.year_of_end}
                                        onChange={(evt) => this.handleChangeInput(i, "year_of_end", evt)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                <label>Location:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={item.location}
                                    onChange={(evt) => this.handleChangeInput(i, "location", evt)}/>
                                </div>
                                <div className="col form-group">
                                <div className="form-check mt-4">
                                    <input className="form-check-input"
                                           type="checkbox"
                                           checked={item.currently_working}
                                           onChange={(evt) => this.handleChangeInput(i, "currently_working", evt)}
                                           id="gridCheck"/>
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Currently Working
                                    </label>
                                </div>
                            </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={(evt)=>this.handleDeleteWork(i,evt)}>-Delete</button>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="modal fade" id="experienceModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Experience</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <div className="mt-2">
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Name Of Company:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={(evt) => this.handleCreateFormInput( "company_name", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Designation:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={(evt) => this.handleCreateFormInput( "designation", evt)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Year Of start:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        onChange={(evt) => this.handleCreateFormInput("year_of_start", evt)}/>
                                </div>
                                <div className="col form-group">
                                    <label>Year Of end:</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        onChange={(evt) => this.handleCreateFormInput( "year_of_end", evt)}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                <label>Location:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={(evt) => this.handleCreateFormInput("location", evt)}/>
                                </div>
                                <div className="col form-group">
                                <div className="form-check mt-4">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        onChange={(evt) => this.handleCreateFormInput("currently_working", evt)}
                                        id="gridCheck"/>
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Currently Working
                                    </label>
                                </div>
                            </div>
                            </div>
                            <hr/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(evt)=>this.handleAddExperience()}>Add Experience</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}